// script.js - scroll reveal, lightbox modal, interactive random facts (city & food pages)

// -------------------- SCROLL REVEAL (Intersection Observer) --------------------
const hiddenElements = document.querySelectorAll('section, .gallery, .text-block, .qr-center, .interactive-module, footer');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

hiddenElements.forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// -------------------- LIGHTBOX MODAL (Image Zoom) --------------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

// Function to open lightbox with clicked image
function openLightbox(imgSrc) {
  if (lightbox && lightboxImg) {
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Close lightbox
function closeLightboxModal() {
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
}

if (closeLightbox) {
  closeLightbox.addEventListener('click', closeLightboxModal);
}
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightboxModal();
  });
}

// Attach click event to all images that should open lightbox
// (story images, gallery images, full-image images)
function bindLightboxToImages() {
  const clickableImages = document.querySelectorAll('.story img, .gallery img, .full-image img');
  clickableImages.forEach(img => {
    // remove any previous listener to avoid duplicates
    img.removeEventListener('click', lightboxHandler);
    img.addEventListener('click', lightboxHandler);
    img.style.cursor = 'pointer';
  });
}

function lightboxHandler(e) {
  e.stopPropagation();
  const targetImg = e.currentTarget;
  if (targetImg.src) {
    openLightbox(targetImg.src);
  }
}

// -------------------- RANDOM FACTS (based on page) --------------------
// City facts (for index.html)
const cityFacts = [
  "?? Shijiazhuang is known as 'the city pulled by trains' — it grew rapidly thanks to railway junctions.",
  "??? Xibaipo village (near Shijiazhuang) is called 'the place where New China walked from'.",
  "?? The local favorite? 'Anhui Beef Ban Mian' — surprisingly popular and adapted to local taste.",
  "?? Shijiazhuang Sixian opera is a national intangible cultural heritage, known for passionate vocals.",
  "?? North China Pharmaceutical Factory was a key project of the first Five-Year Plan, a symbol of industrial memory.",
  "?? Zhaozhou Bridge, the oldest open-spandrel stone arch bridge, lies in Zhao County under Shijiazhuang.",
  "?? Every April, Rongguo Mansion in Zhengding attracts visitors with blooming crabapple flowers.",
  "?? Shijiazhuang Station is a major high-speed rail hub connecting Beijing, Zhengzhou, and Xi'an."
];

// Food facts (for food.html)
const foodFacts = [
  "?? Dumplings here are often stuffed with lamb or pork with Chinese chives — true northern comfort.",
  "?? Handmade noodles are pulled by hand for over a minute — the elasticity creates a signature chew.",
  "?? Night street stalls serve 'shaokao' (grilled skewers) with cumin and chili, a local obsession.",
  "?? Garlic and vinegar are essential condiments for many Shijiazhuang noodle dishes.",
  "?? 'Jianbing guozi' is a popular breakfast crepe, crispy and savory, sold on many corners.",
  "?? Huoguo (hot pot) is beloved especially during cold winters — lamb broth is a classic.",
  "?? 'Lu rou' braised pork is often added to noodles or rice for a hearty meal.",
  "?? Millet porridge is a traditional breakfast, warm and slightly sweet, simple and nourishing."
];

// Helper to set random fact button
function initRandomFact(buttonId, factArray, displayId) {
  const btn = document.getElementById(buttonId);
  const displayPara = document.getElementById(displayId);
  if (btn && displayPara) {
    // remove old listener and set new
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * factArray.length);
      displayPara.textContent = factArray[randomIndex];
      // micro bounce effect
      displayPara.style.transform = 'scale(1.02)';
      setTimeout(() => { if(displayPara) displayPara.style.transform = ''; }, 200);
    });
  }
}

// Detect page by checking unique elements (city page has "City Slices", food page has "Taste Discoveries")
setTimeout(() => {
  if (document.querySelector('.interactive-module h2')?.innerText.includes('City Slices')) {
    initRandomFact('randomFactBtn', cityFacts, 'funFactText');
  } else if (document.querySelector('.interactive-module h2')?.innerText.includes('Taste Discoveries')) {
    initRandomFact('randomFoodFactBtn', foodFacts, 'funFactText');
  } else {
    // fallback for city page if button id mismatch
    const cityBtn = document.getElementById('randomFactBtn');
    if (cityBtn) initRandomFact('randomFactBtn', cityFacts, 'funFactText');
    const foodBtn = document.getElementById('randomFoodFactBtn');
    if (foodBtn) initRandomFact('randomFoodFactBtn', foodFacts, 'funFactText');
  }
  
  // Re-bind lightbox after dynamic content or on page load
  bindLightboxToImages();
  
  // Also observe any dynamically added images (no dynamic addition but safe)
  const observerForImages = new MutationObserver(() => bindLightboxToImages());
  observerForImages.observe(document.body, { childList: true, subtree: true });
}, 50);

// Initial binding on load
window.addEventListener('load', () => {
  bindLightboxToImages();
});
// ==================== Wuhan Popup Modal (网页内弹窗) ====================
// 等待 DOM 加载完成后显示弹窗
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('wuhanModal');
  const closeSpan = document.querySelector('.wuhan-close');
  const closeBtn = document.getElementById('wuhanModalCloseBtn');

  if (modal) {
    // 显示弹窗
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 禁止背景滚动

    // 关闭函数
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    // 点击 × 关闭
    if (closeSpan) closeSpan.addEventListener('click', closeModal);
    // 点击按钮关闭
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    // 点击模态窗背景关闭
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }
});