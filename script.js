// ============================================
//  EXPLORE GOKARNA — script.js
// ============================================

// ── 1. NAVBAR: scroll effect + mobile toggle ──

const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

// Add 'scrolled' class when page is scrolled down
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Toggle mobile menu open/close
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});


// ── 2. BOOK NOW POPUP ──

const bookBtn       = document.getElementById('bookBtn');
const popupOverlay  = document.getElementById('popupOverlay');
const popupClose    = document.getElementById('popupClose');
const popupOk       = document.getElementById('popupOk');

// Show popup
bookBtn.addEventListener('click', () => {
  popupOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
});

// Close popup helpers
function closePopup() {
  popupOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

popupClose.addEventListener('click', closePopup);
popupOk.addEventListener('click', closePopup);

// Close popup when clicking outside the popup box
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) closePopup();
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePopup();
    closeLightbox();
  }
});


// ── 3. GALLERY LIGHTBOX ──

// Data: images + captions
const galleryData = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', caption: 'Om Beach — Gokarna' },
  { src: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', caption: 'Kudle Beach Sunset' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', caption: 'Clifftop Trails' },
  { src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=85', caption: 'Paradise Beach' },
  { src: 'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200&q=85', caption: 'Mahabaleshwar Temple' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=85', caption: 'Half Moon Beach' },
];

const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');

let currentIndex = 0;

// Open lightbox with clicked image
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    currentIndex = parseInt(item.dataset.index);
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  lbImg.src     = galleryData[index].src;
  lbCaption.textContent = galleryData[index].caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryData.length;
  openLightbox(currentIndex);
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

// Close lightbox clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard arrow navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});


// ── 4. CONTACT FORM VALIDATION ──

const form        = document.getElementById('contactForm');
const nameInput   = document.getElementById('name');
const emailInput  = document.getElementById('email');
const msgInput    = document.getElementById('message');
const nameErr     = document.getElementById('nameErr');
const emailErr    = document.getElementById('emailErr');
const msgErr      = document.getElementById('msgErr');
const formSuccess = document.getElementById('formSuccess');

// Simple email format check using a regex
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Show or hide an error
function setError(input, errEl, show) {
  if (show) {
    input.classList.add('error');
    errEl.classList.add('visible');
  } else {
    input.classList.remove('error');
    errEl.classList.remove('visible');
  }
}

// Live validation: clear error as user types
nameInput.addEventListener('input',  () => setError(nameInput,  nameErr,  false));
emailInput.addEventListener('input', () => setError(emailInput, emailErr, false));
msgInput.addEventListener('input',   () => setError(msgInput,   msgErr,   false));

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent real submission

  let valid = true;

  // Check name
  if (nameInput.value.trim() === '') {
    setError(nameInput, nameErr, true);
    valid = false;
  }

  // Check email
  if (!isValidEmail(emailInput.value.trim())) {
    setError(emailInput, emailErr, true);
    valid = false;
  }

  // Check message
  if (msgInput.value.trim() === '') {
    setError(msgInput, msgErr, true);
    valid = false;
  }

  // If all valid, show success message and reset
  if (valid) {
    formSuccess.classList.add('visible');
    form.reset();

    // Hide success after 5 seconds
    setTimeout(() => {
      formSuccess.classList.remove('visible');
    }, 5000);
  }
});


// ── 5. SCROLL FADE-IN ANIMATION ──

// IntersectionObserver watches elements and adds 'visible' when they enter viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  {
    threshold: 0.12,       // trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px',
  }
);

// Observe all elements with the fade-in-scroll class
document.querySelectorAll('.fade-in-scroll').forEach(el => {
  observer.observe(el);
});
