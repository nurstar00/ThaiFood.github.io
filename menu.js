// = фильтр =
const menuItems = [
    { id: 1, name: 'ПАД ТАЙ С КРЕВЕТКАМИ', price: 2930, description: 'Жареная рисовая лапша. В составе: креветки, соя проросшая, тофу, яйцо, жаренный арахис и специи.', image: 'menu/Пад Тай с креветками.jpg', category: 'Креветки' },
    { id: 2, name: 'ЖАРЕНЫЙ ЛАГМАН С ГОВЯДИНОЙ', price: 2930, description: 'Острое блюдо из лагмана с говядиной', image: 'menu/Жаренный лагман с Говядиной.jpg', category: 'Говядина' },
    { id: 3, name: 'TOM YAM С КРЕВЕТКАМИ', price: 3480, description: 'Знаменитый тайский суп на основе куриного бульона с добавлением острой пасты TomYam. Состав: королевские креветки, шампиньоны, лемонграсс, галангал, каффиралайм, кинза, молоко. Подается с рисом.', image: 'menu/Том Ям с Креветками.jpg', category: 'Креветки' },
    { id: 4, name: 'TOM YAM С МОРЕПРОДУКТАМИ', price: 3740, description: 'Знаменитый тайский суп с кальмаром, осьминогом, королевской мидией и креветками.', image: 'menu/Том Ям с Морепродуктами.jpg', category: 'Морепродукты' },
    { id: 5, name: 'TOM KHA С КРЕВЕТКАМИ', price: 3680, description: 'Нежный суп на курином бульоне и кокосовом молоке с креветками и тайскими травами.', image: 'menu/Том Кна С Креветками.jpeg', category: 'Креветки' },
    { id: 6, name: 'TOM KHA С КУРИЦЕЙ', price: 3460, description: 'Нежный суп на курином бульоне и кокосовом молоке с куриным филе и специями.', image: 'menu/Том Кна с Курицей.jpg', category: 'Курица' },
    { id: 7, name: 'TOM YAM С КУРИЦЕЙ', price: 3170, description: 'Знаменитый острый суп TomYam с куриным филе и тайскими травами.', image: 'menu/Тм Ям с Курицей.jpeg', category: 'Курица' },
    { id: 8, name: 'ГОВЯДИНА В ЗЕЛЕНОМ КАРРИ', price: 3290, description: 'Говядина, стручковая фасоль в соусе зеленый карри с кокосовым молоком', image: 'menu/говядина в зеленом карри 1.jpg', category: 'Говядина' }
];


const categories = ['Все', 'Креветки', 'Морепродукты', 'Говядина', 'Курица'];

// Мэпинг русских названий категорий на ключи переводов
const categoryLabelKey = {
    'Все': 'category.all',
    'Креветки': 'category.shrimp',
    'Морепродукты': 'category.seafood',
    'Говядина': 'category.beef',
    'Курица': 'category.chicken'
};
let activeCategory = 'Все';
















































let cart = [];

const menuGrid = document.getElementById('menuGrid');
const filterButtons = document.getElementById('filterButtons');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const modalClose = document.getElementById('modalClose');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutForm = document.getElementById('checkoutForm');
const submitOrderBtn = document.getElementById('submitOrder');
const cancelOrderBtn = document.getElementById('cancelOrder');
const successMessage = document.getElementById('successMessage');
const continueShopBtn = document.getElementById('continueShop');
const clientName = document.getElementById('clientName');
const clientPhone = document.getElementById('clientPhone');
const clientAddress = document.getElementById('clientAddress');
const clientComment = document.getElementById('clientComment');
const orderDetails = document.getElementById('orderDetails');

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('✓ menu.js загружен — DOM готов');
    
    loadCartFromStorage();
    renderFilterButtons();
    renderMenu();
    updateCartUI();
    setupEventListeners();
});

function renderFilterButtons() {
    filterButtons.innerHTML = '';
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        if (category === activeCategory) {
            btn.classList.add('active');
        }
        // Отображаем перевод метки категории, если он есть
        btn.textContent = categoryLabelKey[category] ? t(categoryLabelKey[category]) : category;
        btn.addEventListener('click', () => filterByCategory(category));
        filterButtons.appendChild(btn);
    });
}

// Фильтрация по категории
function filterByCategory(category) {
    activeCategory = category;
    renderFilterButtons();
    renderMenu();
    console.log(`✓ Фильтр изменен на: ${category}`);
}

// Рендер меню блюд
function renderMenu() {
    menuGrid.innerHTML = '';
    // Фильтрация: если выбрано "Все" — показать все, иначе проверить по ключевым словам
    const filteredItems = activeCategory === 'Все'
        ? menuItems
        : menuItems.filter(item => matchesCategory(item, activeCategory));
    
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #999;">${t('no_items_found')}</p>`;
        return;
    }
    
    filteredItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'menu-item';
        itemEl.innerHTML = `
            <div class="item-image"><img src="${item.image}" loading="lazy" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;"></div>
            <div class="item-content">
                <div class="item-name">${t('dish.' + item.id + '.name')}</div>
                <div class="item-description">${t('dish.' + item.id + '.desc')}</div>
                <div class="item-footer">
                    <div class="item-price">${item.price} ₸</div>
                    <button class="btn-add" data-id="${item.id}">${t('add_button')}</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(itemEl);

        const addBtn = itemEl.querySelector('.btn-add');
        addBtn.addEventListener('click', () => addToCart(item.id));
    });
}

// Проверка соответствия элемента выбранной категории по имени/описанию/категории
function matchesCategory(item, category) {
    const text = (item.name + ' ' + item.description + ' ' + (item.category || '')).toLowerCase();
    switch (category) {
        case 'Креветки':
            return /кревет|креветки|shrimp/.test(text);
        case 'Морепродукты':
            return /морепродукт|море|seafood|кальмар|осьминог|мидия|рыба/.test(text);
        case 'Говядина':
            return /говядин|beef|стейк/.test(text);
        case 'Курица':
            return /куриц|chicken|куриное|филе/.test(text);
        default:
            return item.category === category;
    }
}

// Добавить в корзину
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const cartItem = cart.find(c => c.id === itemId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartUI();
    saveCartToStorage();
    showNotification(`✓ "${t('dish.' + item.id + '.name')}" ${t('added_to_cart')}`);
    console.log(`✓ "${t('dish.' + item.id + '.name')}" ${t('added_to_cart')}`);
}

// Удалить из корзины
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    saveCartToStorage();
    showNotification(`✓ ${t('item_removed')}`);
    console.log(`✓ ${t('item_removed')}`);
}

// Показать уведомление
function showNotification(message) {
    let notification = document.getElementById('notification');
    
    // Если уведомления еще нет - создаем
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Автоматически скрыть через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 2700);
}

// Изменить количество
function updateQuantity(itemId, change) {
    const cartItem = cart.find(c => c.id === itemId);
    if (!cartItem) return;

    cartItem.quantity += change;
    if (cartItem.quantity < 1) {
        removeFromCart(itemId);
    } else {
        updateCartUI();
        saveCartToStorage();
    }
}

// Обновить UI корзины
function updateCartUI() {
    // Обновить счетчик товаров
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Обновить список товаров в модале
    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart">${t('empty_cart')}</div>`;
        checkoutForm.classList.remove('active');
        submitOrderBtn.disabled = true;
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${t('dish.' + item.id + '.name')}</div>
                    <div class="cart-item-price">${item.price} ₸ × ${item.quantity} = ${item.price * item.quantity} ₸</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" data-id="${item.id}" data-action="decrease">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
                </div>
                <button class="btn-remove" data-id="${item.id}">${t('remove')}</button>
            `;
            cartItems.appendChild(cartItemEl);

            // События для кнопок количества
            cartItemEl.querySelector('[data-action="decrease"]').addEventListener('click', 
                () => updateQuantity(item.id, -1));
            cartItemEl.querySelector('[data-action="increase"]').addEventListener('click', 
                () => updateQuantity(item.id, 1));
            cartItemEl.querySelector('.btn-remove').addEventListener('click', 
                () => removeFromCart(item.id));
        });

        checkoutForm.classList.add('active');
        submitOrderBtn.disabled = false;
    }

    // Обновить общую сумму
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total} ₸`;
}

// Открыть корзину
function openCart() {
    cartModal.classList.add('active');
    console.log('✓ Корзина открыта');
}

// Закрыть корзину
function closeCart() {
    cartModal.classList.remove('active');
    successMessage.classList.remove('active');
    checkoutForm.classList.add('active');
    console.log('✓ Корзина закрыта');
}

// Оформить заказ
function submitOrder(e) {
    e.preventDefault();

    const name = clientName.value.trim();
    const phone = clientPhone.value.trim();
    const address = clientAddress.value.trim();
    const comment = clientComment.value.trim();

    if (!name || !phone || !address) {
        alert(t('fill_required'));
        return;
    }

    // Формирование деталей заказа
    const orderItems = cart.map(item => `${t('dish.' + item.id + '.name')} × ${item.quantity}`).join(', ');
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const details = `
        <strong>${t('fullName')}</strong> ${name}<br>
        <strong>${t('phone')}</strong> ${phone}<br>
        <strong>${t('address')}</strong> ${address}<br>
        <strong>${t('items')}</strong> ${orderItems}<br>
        <strong>${t('sum')}</strong> ${totalPrice} ₸
        ${comment ? `<br><strong>${t('comment')}</strong> ${comment}` : ''}
    `;

    orderDetails.innerHTML = details;

    // Показать сообщение об успехе
    checkoutForm.classList.remove('active');
    successMessage.classList.add('active');

    console.log('✓ Заказ оформлен:', { name, phone, address, comment, total: totalPrice });

    // Очистить корзину и форму
    setTimeout(() => {
        cart = [];
        updateCartUI();
        clearCheckoutForm();
        saveCartToStorage();
    }, 2000);
}

// Очистить форму
function clearCheckoutForm() {
    clientName.value = '';
    clientPhone.value = '';
    clientAddress.value = '';
    clientComment.value = '';
}

// Сохранить корзину в localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Загрузить корзину из localStorage
function loadCartFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
            console.log('✓ Корзина загружена из памяти браузера');
        } catch (e) {
            console.error('Ошибка загрузки корзины:', e);
            cart = [];
        }
    }
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
function setupEventListeners() {
    // Открыть/закрыть корзину
    cartIcon.addEventListener('click', openCart);
    modalClose.addEventListener('click', closeCart);
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCart();
    });

    // Оформление заказа
    submitOrderBtn.addEventListener('click', submitOrder);
    cancelOrderBtn.addEventListener('click', closeCart);
    continueShopBtn.addEventListener('click', closeCart);
}
