document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('submitBtn');
    const msg = document.getElementById('formMsg');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        msg.textContent = '';
        const name = form.username.value.trim();
        const surname = (form.surname ? form.surname.value.trim() : '');
        const phone = (form.phone ? form.phone.value.trim() : '');
        const email = form.email.value.trim();
        const address = (form.address ? form.address.value.trim() : '');

        function validatePhone(p) {
            return /^[+0-9\s()\-]{7,20}$/.test(p);
        }

        if (!name) {
            msg.style.color = 'crimson';
            msg.textContent = 'Пожалуйста, введите имя.';
            return;
        }
        if (!surname) {
            msg.style.color = 'crimson';
            msg.textContent = 'Пожалуйста, введите фамилию.';
            return;
        }
        if (!validatePhone(phone)) {
            msg.style.color = 'crimson';
            msg.textContent = 'Пожалуйста, введите корректный телефон.';
            return;
        }
        if (!validateEmail(email)) {
            msg.style.color = 'crimson';
            msg.textContent = 'Пожалуйста, введите корректный email.';
            return;
        }
        if (!address) {
            msg.style.color = 'crimson';
            msg.textContent = 'Пожалуйста, укажите адрес.';
            return;
        }

        // Simulate sending with spinner
        btn.disabled = true;
        btn.classList.add('loading');
        const origHTML = btn.innerHTML;
        btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Отправка...';

        setTimeout(() => {
            btn.disabled = false;
            btn.classList.remove('loading');
            btn.innerHTML = origHTML;
            msg.style.color = '#16a34a';
            msg.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
            form.reset();
        }, 900);
    });

    // Phone mask: форматирует в +7 (XXX) XXX-XX-XX при вводе
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        function formatPhone(value) {
            const digits = value.replace(/\D/g, '');
            // Обрезаем до 11 цифр (код страны +7 + 10 цифр)
            let d = digits;
            if (d.startsWith('8')) d = '7' + d.slice(1);
            if (d.length > 11) d = d.slice(0, 11);
            let out = '';
            if (d.length > 0) out = '+' + d[0];
            if (d.length > 1) out += ' (' + (d.slice(1, 4) || '');
            if (d.length >= 4) out += ') ' + (d.slice(4, 7) || '');
            if (d.length >= 7) out += '-' + (d.slice(7, 9) || '');
            if (d.length >= 9) out += '-' + (d.slice(9, 11) || '');
            return out;
        }

        phoneInput.addEventListener('input', function (e) {
            const pos = phoneInput.selectionStart;
            const before = phoneInput.value;
            phoneInput.value = formatPhone(phoneInput.value);
            // простая попытка сохранить курсор в конце
            if (phoneInput.value.length >= before.length) {
                phoneInput.selectionStart = phoneInput.selectionEnd = phoneInput.value.length;
            }
        });

        phoneInput.addEventListener('blur', function () {
            // если введено мало цифр — очистить
            const digits = phoneInput.value.replace(/\D/g, '');
            if (digits.length < 7) phoneInput.value = '';
        });
    }
});
