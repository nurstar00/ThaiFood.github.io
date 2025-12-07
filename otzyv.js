(function () {
	const STORAGE_KEY = 'thaifood_reviews_v1';

	const form = document.getElementById('reviewForm');
	const reviewsContainer = document.getElementById('reviews');
	const yearEl = document.getElementById('year');
	const clearBtn = document.getElementById('clearBtn');

 	function animateHeaderOverlay(){
 		const overlay = document.querySelector('.header-overlay');
 		if (!overlay || !overlay.animate) return;
 		overlay.animate([
 			{transform: 'translateX(-8%)'},
 			{transform: 'translateX(8%)'},
 			{transform: 'translateX(-8%)'}
 		], {duration: 8000, iterations: Infinity, easing: 'linear'});
 	}

 	function animateOrnaments(){
 		const ornaments = document.querySelectorAll('.anim-ornaments .ornament');
 		if (!ornaments || ornaments.length === 0) return;
 		ornaments.forEach((el, i) => {
 			const dur = [6000,7000,5500][i % 3];
 			const amp = [14,20,12][i % 3];
 			const rot = [-6,8,6][i % 3];
 			if (el.animate) {
 				el.animate([
 					{transform: `translateY(0px) rotate(${rot * -1}deg)`},
 					{transform: `translateY(-${amp}px) rotate(${rot}deg)`},
 					{transform: `translateY(0px) rotate(${rot * -1}deg)`}
 				], {duration: dur, iterations: Infinity, easing: 'ease-in-out'});
 			}
 		});
 	}

 	function animateSections(){
 		const sections = document.querySelectorAll('.review-form-section, .reviews-list-section');
 		sections.forEach((s, idx) => {
			if (!s.animate) return;
 			s.animate([
 				{opacity:0, transform:'translateY(8px) scale(.995)'},
 				{opacity:1, transform:'none'}
 			], {duration: 700, easing: 'cubic-bezier(.2,.9,.2,1)', fill:'forwards', delay: idx * 80});
 		});
 	}


	function getReviews() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			return raw ? JSON.parse(raw) : [];
		} catch (e) {
			console.error('Не удалось прочитать отзывы:', e);
			return [];
		}
	}

	function saveReviews(list) {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
		} catch (e) {
			console.error('Не удалось сохранить отзывы:', e);
		}
	}

	function renderReviews() {
		const reviews = getReviews().slice().reverse();
		if (reviews.length === 0) {
			reviewsContainer.innerHTML = `<p class="no-reviews">${t('reviews_no_reviews')}</p>`;
			return;
		}

		reviewsContainer.innerHTML = '';
		reviews.forEach((r) => {
			const card = document.createElement('article');
			card.className = 'review-card';
			
			card.style.opacity = '0';
			card.style.transform = 'translateY(12px) scale(.995)';

			const header = document.createElement('div');
			header.className = 'review-header';
			header.innerHTML = `<strong class="review-name">${escapeHtml(r.name)}</strong>
				<span class="review-rating">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>`;

			const body = document.createElement('p');
			body.className = 'review-body';
			body.textContent = r.message;

			const footer = document.createElement('div');
			footer.className = 'review-footer';
			const date = new Date(r.created);
			footer.innerHTML = `<time>${date.toLocaleString()}</time>
					<button class="delete-btn" data-id="${r.id}">${t('remove')}</button>`;

			card.appendChild(header);
			card.appendChild(body);
			card.appendChild(footer);
	 			reviewsContainer.appendChild(card);
	 			
			const createdAgo = Date.now() - new Date(r.created).getTime();
			if (createdAgo < 3000) {
				if (card.animate) {
					card.animate([
						{opacity:0, transform:'translateY(10px) scale(.98)'},
						{transform:'translateY(-6px) scale(1.02)'},
						{opacity:1, transform:'none'}
					], {duration:480, easing:'cubic-bezier(.2,.9,.2,1)', fill:'forwards'});
				} else {
					card.style.opacity = '1'; card.style.transform = 'none';
				}
			} else {
				
				if (card.animate) {
					card.animate([
						{opacity:0, transform:'translateY(12px) scale(.995)'},
						{opacity:1, transform:'none'}
					], {duration:450, easing:'cubic-bezier(.2,.9,.2,1)', fill:'forwards'});
				} else {
					card.style.opacity = '1'; card.style.transform = 'none';
				}
			}
		});

	
		observeCards();
	}

	function addReview(review) {
		const list = getReviews();
		list.push(review);
		saveReviews(list);
		renderReviews();
	}

	function deleteReview(id) {
		let list = getReviews();
		list = list.filter(r => r.id !== id);
		saveReviews(list);
		renderReviews();
	}

	function escapeHtml(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		const name = form.name.value.trim();
		const rating = parseInt(form.rating.value, 10);
		const message = form.message.value.trim();

		if (!name || !rating || !message) {
			alert(t('reviews_fill_all'));
			return;
		}

		const review = {
			id: Date.now().toString(36) + Math.random().toString(36).slice(2,8),
			name,
			rating,
			message,
			created: new Date().toISOString()
		};


		const submitBtn = document.getElementById('submitBtn');
		if (submitBtn && submitBtn.animate) {
			submitBtn.animate([
				{transform:'scale(1)'},
				{transform:'scale(1.04)'},
				{transform:'scale(1)'}
			], {duration:700, easing:'ease-in-out'});
		}
		addReview(review);
		form.reset();
	});

	
		reviewsContainer.addEventListener('click', function (e) {
			const btn = e.target.closest('.delete-btn');
			if (!btn) return;
			const id = btn.getAttribute('data-id');
			if (confirm(t('reviews_confirm_delete'))) {
				deleteReview(id);
			}
		});

		clearBtn.addEventListener('click', function () {
			if (confirm(t('reviews_confirm_clear'))) form.reset();
		});

	
	let cardObserver = null;
	function observeCards(){
		if ('IntersectionObserver' in window) {
			if (cardObserver) cardObserver.disconnect();
			cardObserver = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						if (entry.target.animate) {
							entry.target.animate([
								{opacity:0, transform:'translateY(12px) scale(.995)'},
								{opacity:1, transform:'none'}
							], {duration:450, easing:'cubic-bezier(.2,.9,.2,1)', fill:'forwards'});
						} else {
							entry.target.style.opacity = '1';
							entry.target.style.transform = 'none';
						}
					}
				});
			}, {threshold: 0.12});
			document.querySelectorAll('.review-card').forEach(el => cardObserver.observe(el));
		} else {
			
			document.querySelectorAll('.review-card').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
		}
	}

 	
 	try { animateHeaderOverlay(); animateOrnaments(); animateSections(); } catch (e) {  }

	
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	
	renderReviews();
})();

