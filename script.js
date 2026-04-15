// script.js - scroll reveal, lightbox, random facts, modal (unchanged logic, fully functional)
document.addEventListener('DOMContentLoaded', function() {
  // scroll reveal
  const hiddenElements = document.querySelectorAll('section, .gallery, .text-block, .qr-center, .interactive-module, footer, .stats-grid, .featured-attractions, .testimonials, .practical-info, .itinerary, .cta, .food-neighborhoods, .food-culture, .food-tips');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });
  hiddenElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = document.querySelector('.close-lightbox');
  function openLightbox(src) {
    if (lightbox && lightboxImg) {
      lightboxImg.src = src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
  function closeLightboxModal() {
    if (lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxModal);
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightboxModal(); });
  function bindLightboxToImages() {
    const clickableImages = document.querySelectorAll('.story img, .gallery img, .full-image img');
    clickableImages.forEach(img => {
      img.removeEventListener('click', lightboxHandler);
      img.addEventListener('click', lightboxHandler);
      img.style.cursor = 'pointer';
    });
  }
  function lightboxHandler(e) {
    e.stopPropagation();
    if (e.currentTarget.src) openLightbox(e.currentTarget.src);
  }
  bindLightboxToImages();
  new MutationObserver(() => bindLightboxToImages()).observe(document.body, { childList: true, subtree: true });

  // random facts
  const cityFacts = [
    " Shijiazhuang is known as 'the city pulled by trains'  it grew rapidly thanks to railway junctions.",
    " Xibaipo village is called 'the place where New China walked from'.",
    " The local favorite? 'Anhui Beef Ban Mian'  surprisingly popular and adapted to local taste.",
    " Shijiazhuang Sixian opera is a national intangible cultural heritage.",
    " Zhaozhou Bridge is the oldest open-spandrel stone arch bridge in the world.",
    " Every April, Rongguo Mansion in Zhengding attracts visitors with blooming crabapple flowers."
  ];
  const foodFacts = [
    " Dumplings here are often stuffed with lamb or pork with Chinese chives  true northern comfort.",
    " Handmade noodles are pulled by hand for over a minute  the elasticity creates a signature chew.",
    " Night street stalls serve 'shaokao' (grilled skewers) with cumin and chili.",
    " Garlic and vinegar are essential condiments for many Shijiazhuang noodle dishes.",
    " 'Jianbing guozi' is a popular breakfast crepe, crispy and savory.",
    " Huoguo (hot pot) is beloved especially during cold winters  lamb broth is a classic."
  ];
  function initFact(btnId, facts, displayId) {
    const btn = document.getElementById(btnId);
    const display = document.getElementById(displayId);
    if (btn && display) {
      btn.addEventListener('click', () => {
        const random = facts[Math.floor(Math.random() * facts.length)];
        display.textContent = random;
        display.style.transform = 'scale(1.02)';
        setTimeout(() => { if(display) display.style.transform = ''; }, 200);
      });
    }
  }
  if (document.getElementById('randomFactBtn')) initFact('randomFactBtn', cityFacts, 'funFactText');
  if (document.getElementById('randomFoodFactBtn')) initFact('randomFoodFactBtn', foodFacts, 'funFactText');

  // welcome modal
  const modal = document.getElementById('ShijiazhuangModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const closeModal = () => { modal.style.display = 'none'; document.body.style.overflow = ''; };
    document.querySelector('.Shijiazhuang-close')?.addEventListener('click', closeModal);
    document.getElementById('ShijiazhuangModalCloseBtn')?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  }
});