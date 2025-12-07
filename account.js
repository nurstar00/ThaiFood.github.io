// Простая front-end логика личного кабинета на localStorage
(() => {
  const LS_KEYS = { ORDERS: 'tf_current_orders', HISTORY: 'tf_order_history', FAVS: 'tf_favorites' };

  function $(sel, root = document) { return root.querySelector(sel) }
  function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)) }

  function seedIfEmpty() {
    if (!localStorage.getItem(LS_KEYS.ORDERS)) {
      const sample = [
        { id: genId(), items: ['Pad Thai', 'Tom Yum'], total: 1290, status: 'Готовится', createdAt: Date.now(), eta: 25 },
        { id: genId(), items: ['Spring Rolls'], total: 450, status: 'Принят', createdAt: Date.now(), eta: 35 }
      ];
      localStorage.setItem(LS_KEYS.ORDERS, JSON.stringify(sample));
    }
    if (!localStorage.getItem(LS_KEYS.HISTORY)) localStorage.setItem(LS_KEYS.HISTORY, JSON.stringify([]));
    if (!localStorage.getItem(LS_KEYS.FAVS)) localStorage.setItem(LS_KEYS.FAVS, JSON.stringify([
      { id: 'f1', name: 'Pad Thai', price: 690 }, { id: 'f2', name: 'Tom Yum', price: 600 }
    ]));
  }

  function genId() { return 'o' + Math.random().toString(36).slice(2,9) }

  function read(key){ try { return JSON.parse(localStorage.getItem(key) || 'null') } catch(e){ return null } }
  function write(key, value){ localStorage.setItem(key, JSON.stringify(value)) }

  function render() {
    renderCurrent(); renderHistory(); renderFavs();
  }

  function renderCurrent(){
    const list = read(LS_KEYS.ORDERS) || [];
    const container = $('#orders-list'); container.innerHTML='';
    $('#no-orders').style.display = list.length ? 'none' : 'block';
    list.forEach(o => {
      const el = document.createElement('div'); el.className='order-card';
      el.innerHTML = `<div class="order-info">
        <div><strong>№${o.id}</strong> — ${o.items.join(', ')}</div>
        <div class="order-meta">Заказано: ${new Date(o.createdAt).toLocaleString()} • ETA: ${o.eta} мин • Статус: <span class="status">${o.status}</span></div>
        <div class="progress" data-id="${o.id}"><i style="width:${statusToPercent(o.status)}%"></i></div>
      </div>
      <div class="order-actions">
        <button class="btn-track" data-id="${o.id}">Обновить статус</button>
        <button class="btn-deliver" data-id="${o.id}">Отметить полученным</button>
        <button class="btn-cancel" data-id="${o.id}">Отменить</button>
      </div>`;
      container.appendChild(el);
    });
  }

  function renderHistory(){
    const list = read(LS_KEYS.HISTORY) || [];
    const container = $('#history-list'); container.innerHTML='';
    $('#no-history').style.display = list.length ? 'none' : 'block';
    list.slice().reverse().forEach(o => {
      const el = document.createElement('div'); el.className='order-card';
      el.innerHTML = `<div class="order-info">
        <div><strong>№${o.id}</strong> — ${o.items.join(', ')}</div>
        <div class="order-meta">Заказ завершён: ${new Date(o.completedAt || Date.now()).toLocaleString()} • Сумма: ${o.total} ₽</div>
      </div>
      <div class="order-actions">
        <button class="btn-view" data-id="${o.id}">Повторить</button>
      </div>`;
      container.appendChild(el);
    });
  }

  function renderFavs(){
    const list = read(LS_KEYS.FAVS) || [];
    const container = $('#favorites-list'); container.innerHTML='';
    $('#no-favorites').style.display = list.length ? 'none' : 'block';
    list.forEach(f => {
      const el = document.createElement('div'); el.className='fav-card';
      el.innerHTML = `<div class="order-info"><strong>${f.name}</strong><div class="order-meta">${f.price} ₽</div></div>
      <div class="order-actions">
        <button class="btn-remove-fav" data-id="${f.id}">Удалить</button>
      </div>`;
      container.appendChild(el);
    });
  }

  function statusToPercent(status){
    switch(status){ case 'Принят': return 20; case 'Готовится': return 50; case 'В пути': return 80; case 'Доставлен': return 100; default: return 10 }
  }

  function bind() {
    document.addEventListener('click', e => {
      const t = e.target;
      if (t.matches('.tab-btn')) { switchTab(t.dataset.tab); }
      if (t.matches('.btn-track')) { simulateProgress(t.dataset.id) }
      if (t.matches('.btn-deliver')) { markDelivered(t.dataset.id) }
      if (t.matches('.btn-cancel')) { cancelOrder(t.dataset.id) }
      if (t.matches('.btn-remove-fav')) { removeFav(t.dataset.id) }
      if (t.matches('.btn-view')) { repeatOrder(t.dataset.id) }
    });
  }

  function switchTab(name){ $all('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===name)); $all('.tab').forEach(t=>t.classList.toggle('active', t.id===name)); }

  function simulateProgress(orderId){
    const orders = read(LS_KEYS.ORDERS) || [];
    const o = orders.find(x=>x.id===orderId); if(!o) return;
    if (o.status === 'Принят') o.status = 'Готовится'; else if(o.status==='Готовится') o.status='В пути'; else if(o.status==='В пути') o.status='Доставлен';
    write(LS_KEYS.ORDERS, orders); renderCurrent();
  }

  function markDelivered(orderId){
    let orders = read(LS_KEYS.ORDERS) || []; let history = read(LS_KEYS.HISTORY) || [];
    const idx = orders.findIndex(x=>x.id===orderId); if(idx<0) return;
    const o = orders.splice(idx,1)[0]; o.status='Доставлен'; o.completedAt = Date.now(); history.push(o); write(LS_KEYS.ORDERS, orders); write(LS_KEYS.HISTORY, history); render();
  }

  function cancelOrder(orderId){
    let orders = read(LS_KEYS.ORDERS) || [];
    orders = orders.filter(x=>x.id!==orderId); write(LS_KEYS.ORDERS, orders); render();
  }

  function removeFav(id){ let favs = read(LS_KEYS.FAVS) || []; favs = favs.filter(f=>f.id!==id); write(LS_KEYS.FAVS, favs); renderFavs(); }

  function repeatOrder(id){ // простая имитация повтора из истории
    const history = read(LS_KEYS.HISTORY) || []; const item = history.find(h=>h.id===id); if(!item) return; const orders = read(LS_KEYS.ORDERS) || [];
    const newOrder = { id: genId(), items: item.items, total: item.total, status: 'Принят', createdAt: Date.now(), eta: 30 };
    orders.push(newOrder); write(LS_KEYS.ORDERS, orders); render(); switchTab('orders');
  }

  // init
  document.addEventListener('DOMContentLoaded', () => { seedIfEmpty(); bind(); render(); });

})();
