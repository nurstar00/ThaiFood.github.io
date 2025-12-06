// = фильтр =
const menuItems = [
    { id: 1, name: 'Пад Тай с креветками', price: 2350, description: 'Лапша с креветками и овощами', image: 'menu/pad-thai-shrimp.jpg', category: 'Морепродукты' },
    { id: 2, name: 'Жареный лагман с говядиной', price: 2930, description: 'Острое блюдо из лагмана с говядиной', image: 'menu/lagman-beef.jpg', category: 'Домашняя еда' },
    { id: 3, name: 'Креветки в зеленом кари', price: 2830, description: 'Острые креветки в зеленом соусе', image: 'menu/shrimp-green-curry.jpg', category: 'Морепродукты' },
    { id: 4, name: 'Морепродукты в зелёном кари', price: 2020, description: 'Морепродукты в остром зеленом соусе', image: 'menu/seafood-green-curry.jpg', category: 'Морепродукты' },
    { id: 5, name: 'Морепродукты в кисло-сладком соусе', price: 3520, description: 'Морепродукты в кисло-сладком соусе', image: 'menu/seafood-sweet-sour.jpg', category: 'Морепродукты' },
    { id: 6, name: 'Рыба в кисло-сладком соусе', price: 3350, description: 'Рыба в ароматном кисло-сладком соусе', image: 'menu/fish-sweet-sour.jpg', category: 'Морепродукты' },
    { id: 7, name: 'Говядина в кисло-сладком соусе', price: 2380, description: 'Говядина с овощами в кисло-сладком соусе', image: 'menu/beef-sweet-sour.jpg', category: 'Домашняя еда' },
    { id: 8, name: 'Салат со стеком, лапша с крев.', price: 1520, description: 'Салат со стеком и лапшой с креветками', image: 'menu/salad-steak-noodles.jpg', category: 'Острая' }
];


const categories = ['Все', 'Домашняя еда', 'Морепродукты', 'Острая'];
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
        btn.textContent = category;
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
    
    const filteredItems = activeCategory === 'Все' 
        ? menuItems 
        : menuItems.filter(item => item.category === activeCategory);
    
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Блюд не найдено</p>';
        return;
    }
    
    filteredItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'menu-item';
        itemEl.innerHTML = `
            <div class="item-image"><img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;"></div>
            <div class="item-content">
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
                <div class="item-footer">
                    <div class="item-price">${item.price} ₸</div>
                    <button class="btn-add" data-id="${item.id}">+ Добавить</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(itemEl);

        const addBtn = itemEl.querySelector('.btn-add');
        addBtn.addEventListener('click', () => addToCart(item.id));
    });
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
    console.log(`✓ "${item.name}" добавлено в корзину`);
}

// Удалить из корзины
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    saveCartToStorage();
    console.log(`✓ Товар удален из корзины`);
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
        cartItems.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        checkoutForm.classList.remove('active');
        submitOrderBtn.disabled = true;
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} ₸ × ${item.quantity} = ${item.price * item.quantity} ₸</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" data-id="${item.id}" data-action="decrease">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
                </div>
                <button class="btn-remove" data-id="${item.id}">Удалить</button>
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
        alert('Пожалуйста, заполните все обязательные поля!');
        return;
    }

    // Формирование деталей заказа
    const orderItems = cart.map(item => `${item.name} × ${item.quantity}`).join(', ');
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const details = `
        <strong>Имя:</strong> ${name}<br>
        <strong>Телефон:</strong> ${phone}<br>
        <strong>Адрес:</strong> ${address}<br>
        <strong>Товары:</strong> ${orderItems}<br>
        <strong>Сумма:</strong> ${totalPrice} ₸
        ${comment ? `<br><strong>Комментарий:</strong> ${comment}` : ''}
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
