// Переводы для сайта
const translations = {
  ru: {
    // Навигация
    main: 'Главное',
    menu: 'Меню',
    about: 'Тайланд',
    reviews: 'Отзывы',
    registration: 'Регистрация',
    cabinet: 'Профиль',
    cart: 'корзина',

    // Главная страница
    taste: 'Попробуйте вкус Тайланда',
    order: 'THAIFOOD №6 Almaty',
    authentic: 'Аутентичная тайская кухня',
    fresh: 'У нас свежие ингредиенты и традиционные рецепты',
    delicious: 'Вкусные блюда, приготовленные с любовью',
    orderBtn: 'Заказать',

    // Меню
    ourMenu: 'Наше меню',
    addToCart: 'В корзину',
    price: '₸',
    add_button: '+ Добавить',
    // Категории
    'category.all': 'Все',
    'category.shrimp': 'Креветки',
    'category.seafood': 'Морепродукты',
    'category.beef': 'Говядина',
    'category.chicken': 'Курица',
    empty_cart: 'Корзина пуста',
    added_to_cart: 'добавлено в корзину',
    item_removed: 'Товар удален из корзины',
    no_items_found: 'Блюд не найдено',
    fill_required: 'Пожалуйста, заполните все обязательные поля!',
    items: 'Товары:',
    comment: 'Комментарий:',
    remove: 'Удалить',

    // Блюда (ключи для меню)
    'dish.1.name': 'ПАД ТАЙ С КРЕВЕТКАМИ',
    'dish.1.desc': 'Жареная рисовая лапша. В составе: креветки, соя проросшая, тофу, яйцо, жаренный арахис и специи.',
    'dish.2.name': 'ЖАРЕНЫЙ ЛАГМАН С ГОВЯДИНОЙ',
    'dish.2.desc': 'Острое блюдо из лагмана с говядиной',
    'dish.3.name': 'TOM YAM С КРЕВЕТКАМИ',
    'dish.3.desc': 'Знаменитый тайский суп на основе куриного бульона с добавлением острой пасты TomYam. Состав: королевские креветки, шампиньоны, лемонграсс, галангал, каффиралайм, кинза, молоко. Подается с рисом.',
    'dish.4.name': 'TOM YAM С МОРЕПРОДУКТАМИ',
    'dish.4.desc': 'Знаменитый тайский суп с кальмаром, осьминогом, королевской мидией и креветками.',
    'dish.5.name': 'TOM KHA С КРЕВЕТКАМИ',
    'dish.5.desc': 'Нежный суп на курином бульоне и кокосовом молоке с креветками и тайскими травами.',
    'dish.6.name': 'TOM KHA С КУРИЦЕЙ',
    'dish.6.desc': 'Нежный суп на курином бульоне и кокосовом молоке с куриным филе и специями.',
    'dish.7.name': 'TOM YAM С КУРИЦЕЙ',
    'dish.7.desc': 'Знаменитый острый суп TomYam с куриным филе и тайскими травами.',
    'dish.8.name': 'ГОВЯДИНА В ЗЕЛЕНОМ КАРРИ',
    'dish.8.desc': 'Говядина, стручковая фасоль в соусе зеленый карри с кокосовым молоком',

    // О нас
    aboutUs: 'Я',
    ourLocations: 'Наши заведения',
    clickMap: 'Нажмите на THAIFOOD6 чтобы открыть маршрут или используйте ссылку ниже:',
    location: 'Местоположение:',
    openOn2GIS: 'Открыть на 2GIS (Алматы)',
    aboutThai: 'О тайской кухне',
    aboutDeveloper: 'О разработчике',
    recipe: 'Хотите приготовить Том Ям Кунг дома?',
    // Текст о разработчике (может содержать параграфы)
    aboutDeveloper_text: `Здравствуйте! Меня зовут Болат Нұрсұлтан, я студент 1-го курса Satbayev University.

  Данный веб-сайт был разработан в качестве итогового проекта за первый семестр под руководством преподавателя Жекембаевой Майгуль.

  В качестве тематики я выбрал доставку тайской еды, вдохновившись семейным делом — уютным кафе моих родителей. Здесь я применил все свои знания, чтобы сделать ваш заказ удобным и приятным. Благодарю за внимание!`,

    // Личный кабинет
    myProfile: 'Мой профиль',
    fullName: 'ФИО:',
    phone: 'Номер телефона:',
    address: 'Адрес доставки:',
    email: 'Email:',
    currentOrders: 'Текущие заказы',
    orderHistory: 'История заказов',
    favorites: 'Избранное',
    noOrders: 'Нет текущих заказов.',
    orderStatus: 'Статус:',
    inTransit: 'В пути',
    delivered: 'Доставлен',
    repeatOrder: 'Повторить заказ',
    sum: 'Сумма:',
    date: 'Дата:',
    estTime: 'Ориентировочное время доставки:',
    min: 'мин',

    // Регистрация/Отзывы
    reviews_title: 'Отзывы клиентов',
    registration_title: 'Регистрация',
    // Регистрация: лейблы и подсказки
    reg_support_small: 'ЗАКАЗЫ И ПОДДЕРЖКА',
    reg_fill_form: 'Заполните форму',
    reg_lead: '',
    reg_name: 'Имя',
    reg_surname: 'Фамилия',
    reg_phone: 'Телефон',
    reg_email: 'Электронная почта',
    reg_address: 'Адрес доставки',
    reg_placeholder_name: 'Айдос',
    reg_placeholder_surname: 'Серіков',
    reg_placeholder_phone: '+7 (777) 123-00-00',
    reg_placeholder_email: 'you@gmail.com',
    reg_placeholder_address: 'ул. Абая, д. 1, кв. 10',
    reg_submit: 'Регистрация',
    reg_validate_name: 'Пожалуйста, введите имя.',
    reg_validate_surname: 'Пожалуйста, введите фамилию.',
    reg_validate_phone: 'Пожалуйста, введите корректный телефон.',
    reg_validate_email: 'Пожалуйста, введите корректный email.',
    reg_validate_address: 'Пожалуйста, укажите адрес.',
    reg_sending: 'Отправка...',
    reg_success: 'Спасибо! Мы свяжемся с вами в ближайшее время.',

    // Отзывы
    reviews_intro: 'Поделитесь впечатлением о заказе — это поможет нам стать лучше.',
    reviews_leave_title: 'Оставить отзыв',
    reviews_name: 'Имя',
    reviews_name_placeholder: 'Ваше имя',
    reviews_rating: 'Оценка',
    reviews_option_choose: 'Выберите',
    reviews_option_5: '5 — Отлично',
    reviews_option_4: '4 — Очень хорошо',
    reviews_option_3: '3 — Нормально',
    reviews_option_2: '2 — Плохо',
    reviews_option_1: '1 — Ужасно',
    reviews_message: 'Комментарий',
    reviews_message_placeholder: 'Напишите ваш отзыв',
    reviews_submit: 'Отправить отзыв',
    reviews_clear: 'Очистить',
    reviews_no_reviews: 'Пока нет отзывов. Будьте первым!',
    reviews_fill_all: 'Пожалуйста, заполните все поля.',
    reviews_confirm_delete: 'Удалить этот отзыв?',
    reviews_confirm_clear: 'Очистить форму?',
    reviews_latest: 'Последние отзывы',

    // Корзина
    yourCart: 'Ваша корзина',
    total: 'Всего:',
    checkout: 'Оформить заказ',
    checkoutTitle: 'Оформление заказа',
    clientName: 'Ваше имя',
    clientPhone: 'Номер телефона',
    clientAddress: 'Адрес доставки',
    clientComment: 'Комментарий (опционально)',
    submitOrder: 'Оформить заказ',
    cancel: 'Отмена',
    cancel_order: 'Отменить',
    track: 'Отследить',
    reorder: 'Повторить заказ',
    successTitle: 'Заказ успешно принят!',
    successMsg: 'Спасибо за заказ!',
    continueShop: 'Продолжить покупки'
  },
  kk: {
    // Навигация
    main: 'Негіздемеі',
    menu: 'Мәзір',
    about: 'Тайланд',
    reviews: 'Пікірлер',
    registration: 'Тіркелу',
    cabinet: 'Профиль',
    cart: 'себет',

    // Главная страница
    taste: 'Тайланд дәмін сезініңіз',
    order: 'THAIFOOD №6 Алматы',
    authentic: 'Аутентті тайланд тағамы',
    fresh: 'Бізде балғын ингредиенттер мен дәстүрлі рецепттер ',
    delicious: 'Махаббатпен дайындалған дәмді тағамдар',
    orderBtn: 'Тапсырыс беру',

    // Меню
    ourMenu: 'Біздің мәзір',
    addToCart: 'Себетке қосу',
    price: '₸',
    add_button: '+ Қосу',
    // Санаттар
    'category.all': 'Барлығы',
    'category.shrimp': 'Асшаяндар',
    'category.seafood': 'Теңіз өнімдері',
    'category.beef': 'Сиыр еті',
    'category.chicken': 'Тауық',
    empty_cart: 'Себет бос',
    added_to_cart: 'себетке қосылды',
    item_removed: 'Тауар себеттен алынды',
    no_items_found: 'Тағам табылмады',
    fill_required: 'Өтінеміз, барлық міндетті өрістерді толтырыңыз!',
    items: 'Тауарлар:',
    comment: 'Пікір:',
    remove: 'Жою',

    // Тағамдар (кілттер меню үшін) - Қазакша мәтінді сіз жіберген нұсқа бойынша қойдық
    'dish.1.name': 'АСШАЯН ҚОСЫЛҒАН ПАД ТАЙ',
    'dish.1.desc': 'Қуырылған күріш кеспесі. Құрамында: асшаяндар, өнген соя, тофу, жұмыртқа, қуырылған жержаңғақ және дәмдеуіштер.',
    'dish.2.name': 'Қуырылған лагман сиыр етімен',
    'dish.2.desc': 'Сиыр еті қосылған қуырылған лагман',
    'dish.3.name': 'Асшаян қосылған TOM YAM',
    'dish.3.desc': 'Тауық сорпасы мен ащы Tom Yam пастасы, тай шөптері мен дәмдеуіштері негізінде дайындалған әйгілі тай сорпасы. Құрамында: патша асшаяндары, шампиньондар, лемонграсс, галангал, каффир-лайм, кинза, сүт. Бұқтырылған күрішпен беріледі.',
    'dish.4.name': 'Теңіз өнімдері қосылған TOM YAM',
    'dish.4.desc': 'Тауық сорпасы мен ащы Tom Yam пастасы, тай шөптері мен дәмдеуіштері негізінде дайындалған әйгілі тай сорпасы. Құрамында: кальмар, сегізаяқ, қабықтағы патша мидиясы, патша асшаяндары, шампиньондар, лемонграсс, галангал, лайм жапырағы, кинза, сүт. Бұқтырылған күрішпен беріледі.',
    'dish.5.name': 'АСШАЯН ҚОСЫЛҒАН TOM KHA',
    'dish.5.desc': 'Тауық сорпасы мен кокос сүтінде дайындалады. Тай шөптері мен дәмдеуіштерінің арқасында дәмі нәзік тәтті әрі хош иісті. Құрамында: патша асшаяндары, шампиньондар, лемонграсс, галангал, каффир-лайм, кинза, кокос сүті. Бұқтырылған күрішпен беріледі.',
    'dish.6.name': 'Тауық еті қосылған TOM KHA',
    'dish.6.desc': 'Әйгілі тай сорпаларының ішіндегі ең нәзігі. Тауық сорпасы мен кокос сүтінде дайындалады. Тай шөптері мен дәмдеуіштерінің арқасында дәмі нәзік тәтті әрі хош иісті. Құрамында: тауық сүбесі, шампиньондар, лемонграсс, галангал, каффир-лайм, кинза, кокос сүті. Бұқтырылған күрішпен беріледі.',
    'dish.7.name': 'Тауық еті қосылған TOM YAM',
    'dish.7.desc': 'Тауық сорпасы мен ащы Tom Yam пастасы, тай шөптері мен дәмдеуіштері негізінде дайындалған әйгілі тай сорпасы. Құрамында: тауық сүбесі, шампиньондар, лемонграсс, галангал, каффир-лайм, кинза, сүт. Бұқтырылған күрішпен беріледі.',
    'dish.8.name': 'ЖАСЫЛ КАРРИДЕГІ СИЫР ЕТІ',
    'dish.8.desc': 'Құрамы: сиыр еті, кокос сүті қосылған жасыл карри тұздығындағы жасыл үрмебұршақ.',

    // О нас
    aboutUs: 'Мен',
    ourLocations: 'Біздің орынымыз',
    clickMap: 'Маршрутты ашу үшін картадағы THAIFOOD6  басыңыз немесе төменде сілтемені пайдаланыңыз:',
    location: 'Орналасқандығы:',
    openOn2GIS: '2GIS ішінде ашу (Алматы)',
    aboutThai: 'Тайланд тағамы туралы',
    aboutDeveloper: 'Әзірлеуші туралы',
    recipe: 'Үйде Том Ям Кунг дайындағысыңыз ба?',
    // Дамытушы туралы мәтін
    aboutDeveloper_text: `​Сәлеметсіздер ме! Менің есімім — Болат Нұрсұлтан, мен Satbayev University-дің 1-курс студентімін. <br>
​Бұл веб-сайт оқытушы Жекембаева Майгүлдің жетекшілігімен бірінші семестрдің қорытынды жобасы ретінде әзірленді.
​Отбасылық кәсібіміз — ата-анамның жайлы дәмханасынан шабыт алып, жоба тақырыбы ретінде тай тағамдарын жеткізу қызметін таңдадым. Тапсырыс беру үдерісі сіздер үшін ыңғайлы әрі жағымды болуы мақсатында мен бұл жерде бар білімімді қолдандым.
<br>​Назар аударғандарыңызға рақмет!
`,

    // Личный кабинет
    myProfile: 'Менің профилім',
    fullName: 'Толық аты:',
    phone: 'Телефон нөмері:',
    address: 'Жеткізу мекенжайы:',
    email: 'Email:',
    currentOrders: 'Ағымды тапсырыстар',
    orderHistory: 'Тапсырыс тарихы',
    favorites: 'Ең сүйіктілері',
    noOrders: 'Ағымды тапсырыстар жоқ.',
    orderStatus: 'Күйі:',
    inTransit: 'Жолда',
    delivered: 'Жеткізілді',
    repeatOrder: 'Қайта тапсырыс',
    sum: 'Бағасы:',
    date: 'Күні:',
    estTime: 'Жеткуздің болжалды уақыты:',
    min: 'мин',

    // Регистрация/Отзывы
    reviews_title: 'Клиенттердің пікірлері',
    registration_title: 'Тіркелу',
    // Тіркелу: белгілер және нұсқаулар
    reg_support_small: 'Тапсырыстар және қолдау',
    reg_fill_form: 'Форманы толтырыңыз',
    reg_lead: '',
    reg_name: 'Аты',
    reg_surname: 'Тегі',
    reg_phone: 'Телефон',
    reg_email: 'Электрондық пошта',
    reg_address: 'Жеткізу мекенжайы',
    reg_placeholder_name: 'Айдос',
    reg_placeholder_surname: 'Серіков',
    reg_placeholder_phone: '+7 (777) 123-00-00',
    reg_placeholder_email: 'you@gmail.com',
    reg_placeholder_address: 'Абай к-сі, 1 үй, 10 пәтер',
    reg_submit: 'Тіркелу',
    reg_validate_name: 'Өтінеміз, есімді енгізіңіз.',
    reg_validate_surname: 'Өтінеміз, текті енгізіңіз.',
    reg_validate_phone: 'Өтінеміз, дұрыс телефон нөмірін енгізіңіз.',
    reg_validate_email: 'Өтінеміз, дұрыс электрондық поштаны енгізіңіз.',
    reg_validate_address: 'Өтінеміз, мекенжайды көрсетіңіз.',
    reg_sending: 'Жіберілуде...',
    reg_success: 'Рахмет! Біз сізбен жақын уақытта хабарласамыз.',

    // Пікірлер
    reviews_intro: 'Тапсырыс туралы әсеріңізбен бөлісіңіз — бұл бізге жақсартуға көмектеседі.',
    reviews_leave_title: 'Пікір қалдыру',
    reviews_name: 'Аты',
    reviews_name_placeholder: 'Сіздің атыңыз',
    reviews_rating: 'Бағалау',
    reviews_option_choose: 'Таңдаңыз',
    reviews_option_5: '5 — Өте жақсы',
    reviews_option_4: '4 — Жақсы',
    reviews_option_3: '3 — Қанағаттанарлық',
    reviews_option_2: '2 — Нашар',
    reviews_option_1: '1 — Өте нашар',
    reviews_message: 'Пікір',
    reviews_message_placeholder: 'Пікіріңізді жазыңыз',
    reviews_submit: 'Пікір жіберу',
    reviews_clear: 'Тазалау',
    reviews_no_reviews: 'Әзірге пікірлер жоқ. Бірінші болыңыз!',
    reviews_fill_all: 'Өтінеміз, барлық өрістерді толтырыңыз.',
    reviews_confirm_delete: 'Бұл пікірді өшіру керек пе?',
    reviews_confirm_clear: 'Форманы тазалау керек пе?',
    reviews_latest: 'Соңғы пікірлер',

    // Корзина
    yourCart: 'Сіздің себетініз',
    total: 'Барлығы:',
    checkout: 'Тапсырысты ресімдеу',
    checkoutTitle: 'Тапсырыс ресімдеу',
    clientName: 'Сіздің атыңыз',
    clientPhone: 'Телефон нөмері',
    clientAddress: 'Жеткізу мекенжайы',
    clientComment: 'Пікір (міндетті емес)',
    submitOrder: 'Тапсырысты ресімдеу',
    cancel: 'Бас тарту',
    cancel_order: 'Тапсырысты болдырмау',
    track: 'Бақылау',
    reorder: 'Тапсырысты қайталау',
    successTitle: 'Тапсырыс сәтті қабылданды!',
    successMsg: 'Тапсырыс үшін рахмет!',
    continueShop: 'Сатып алуды жалғастыру'
  }
};

// Функция для получения текущего языка
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'ru';
}

// Функция для установки языка
function setLanguage(lang) {
  if (lang === 'ru' || lang === 'kk') {
    localStorage.setItem('language', lang);
    location.reload(); // Перезагружаем страницу для применения переводов
  }
}

// Функция для перевода текста
function t(key) {
  const lang = getCurrentLanguage();
  return translations[lang][key] || translations['ru'][key] || key;
}

// Функция для перевода всех элементов на странице
function translatePage() {
  const lang = getCurrentLanguage();
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang][key] || key;
    
    // Если элемент имеет дочерние элементы (кроме span с cart-count), очищаем только текст
    if (el.children.length > 0 && !el.querySelector('.cart-count')) {
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = text;
        }
      });
    } else {
      el.textContent = text;
    }
  });

  // Обработка HTML-содержимого: data-i18n-html (для параграфов с переносами и форматированием)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const html = translations[lang][key] || '';
    el.innerHTML = html;
  });
  
  // Обработка placeholder для input'ов: data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = translations[lang][key] || '';
    if ('placeholder' in el) el.placeholder = text;
  });

  // Обновляем data-attribute для кнопок табов
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const key = btn.getAttribute('data-i18n');
    if (key) {
      btn.textContent = translations[lang][key] || key;
    }
  });
}

// Применяем переводы при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  translatePage();
  
  // Обновляем класс активного языка в кнопках
  const lang = getCurrentLanguage();
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });
});
