// header.js — общий скрипт для навбара: dropdown аккаунта и выход (симуляция)
(function(){
  function onReady(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }

  onReady(()=>{
    // mobile nav toggle
    const navToggles = document.querySelectorAll('.nav-toggle');
    navToggles.forEach(btn => {
      const header = btn.closest('.site-header');
      const nav = header && header.querySelector('.main-nav');
      btn.addEventListener('click', (e)=>{
        e.preventDefault();
        if(!nav) return;
        const isOpen = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    });

    document.querySelectorAll('.account-nav').forEach(nav => {
      const link = nav.querySelector('.account-link');
      const dropdown = nav.querySelector('.account-dropdown');

      // toggle on click
      link.addEventListener('click', (e)=>{
        e.preventDefault();
        const isOpen = nav.classList.toggle('open');
        link.setAttribute('aria-expanded', String(isOpen));
        if(isOpen) dropdown.setAttribute('aria-hidden','false'); else dropdown.setAttribute('aria-hidden','true');
      });

      // close when clicking outside
      document.addEventListener('click', (e)=>{
        if(!nav.contains(e.target)){
          nav.classList.remove('open');
          link.setAttribute('aria-expanded','false');
          dropdown.setAttribute('aria-hidden','true');
        }
      });
    });
  });
})();
