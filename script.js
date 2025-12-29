// Initialize AOS (Animate On Scroll)
if (window.AOS) {
  AOS.init({
    duration: 800,
    offset: 120,
    once: true,
    easing: 'cubic-bezier(.2,.8,.2,1)'
  });
}

// Smooth scroll for header nav
document.querySelectorAll('header .header nav a, .header a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const href = this.getAttribute('href');
    if(!href || href.indexOf('#') !== 0) return;
    const el = document.querySelector(href);
    if(!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({top, behavior:'smooth'});
  });
});

// Typewriter-like subtle effect for hero subtitle
(function typewriter(){
  const el = document.querySelector('.typewriter');
  if(!el) return;
  const full = el.textContent.trim();
  el.textContent = '';
  let i=0;
  const speed = 18;
  function step(){
    el.textContent += full.charAt(i);
    i++;
    if(i < full.length) setTimeout(step, speed);
    else {
      // small loop: subtle 'blink' using class
      el.classList.add('done');
    }
  }
  setTimeout(step, 400);
})();

// Make timeline items float slightly (subtle)
(function addFloat(){
  const items = document.querySelectorAll('.timeline-item .timeline-content');
  items.forEach((it, idx) => {
    it.style.animation = `floaty ${6 + (idx%3)}s ease-in-out ${idx*120}ms infinite`;
  });

  const style = document.createElement('style');
  style.innerHTML = `@keyframes floaty {0%{transform:translateY(0px)}50%{transform:translateY(-6px)}100%{transform:translateY(0px)}}`;
  document.head.appendChild(style);
})();

// update active nav link on scroll
(function activeNavOnScroll(){
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header nav a');
  function activate(){
    let idx = sections.length;
    while(--idx && window.scrollY + 150 < sections[idx].offsetTop) {}
    navLinks.forEach(a => a.classList.remove('active'));
    const id = sections[idx].getAttribute('id');
    const activeLink = document.querySelector('.header nav a[href="#' + id + '"]');
    if(activeLink) activeLink.classList.add('active');
  }
  activate();
  window.addEventListener('scroll', activate);
})();

// Fix external social links that had spaces (sanity check)
(function fixLinks(){
  // LinkedIn: ensure lowercase and replace spaces
  const ln = document.querySelectorAll('a[href*="linkedin.com"]');
  ln.forEach(a=>{
    a.href = a.href.replace(/\s+/g, '-').replace(/\/in\/-+/,'/in/').toLowerCase();
  });
})();

// small accessibility: press 'c' to go contact
window.addEventListener('keydown', (e) => {
  if(e.key === 'c' || e.key === 'C'){
    const el = document.getElementById('contact');
    if(!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({top, behavior:'smooth'});
  }
});
