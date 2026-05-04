// FAQ accordion
const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Close all
    faqButtons.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      document.getElementById(btn.getAttribute('aria-controls')).hidden = true;
    });

    // Open clicked if it was closed
    if (!isExpanded) {
      button.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

// CTA form
const ctaForm = document.getElementById('ctaForm');
const ctaEmail = document.getElementById('ctaEmail');
const ctaMsg = document.getElementById('ctaMsg');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function validateEmail(email) {
  return emailPattern.test(email.trim());
}

function setMsg(el, msg, type) {
  el.textContent = msg;
  el.className = el.id === 'ctaMsg' ? `cta-msg ${type}` : `modal-hint ${type}`;
}

ctaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = ctaEmail.value.trim();
  if (!email) { setMsg(ctaMsg, 'Please enter your email.', 'error'); return; }
  if (!validateEmail(email)) { setMsg(ctaMsg, 'Please enter a valid email address.', 'error'); return; }
  setMsg(ctaMsg, '✓ You\'re subscribed! Expect your first picks this Friday.', 'success');
  ctaForm.reset();
});

// Modal
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('subscribeModal');
const openBtns = [
  document.getElementById('openSubscribe'),
  document.getElementById('openSubscribeBanner')
].filter(Boolean);
const closeBtn = document.getElementById('modalClose');
const subscribeForm = document.getElementById('subscribeForm');
const subscribeMsg = document.getElementById('subscribeMsg');
const joinNowLink = document.getElementById('joinNowLink');
const modalEmail = document.getElementById('modalEmail');
let lastFocused = null;

function openModal() {
  lastFocused = document.activeElement;
  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => modalEmail.focus(), 60);
}

function closeModal() {
  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  subscribeForm.reset();
  subscribeMsg.textContent = '';
  subscribeMsg.className = 'modal-hint';
  if (lastFocused) lastFocused.focus();
}

openBtns.forEach(btn => btn.addEventListener('click', openModal));
closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();

  if (e.key === 'Tab' && modalOverlay.classList.contains('active')) {
    const focusable = modal.querySelectorAll('button, a[href], input');
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

subscribeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = modalEmail.value.trim();
  if (!email) { setMsg(subscribeMsg, 'Please enter your email.', 'error'); return; }
  if (!validateEmail(email)) { setMsg(subscribeMsg, 'Please enter a valid email address.', 'error'); return; }
  setMsg(subscribeMsg, '✓ Subscribed! Welcome to StreamFlix picks.', 'success');
  setTimeout(closeModal, 1500);
});

joinNowLink.addEventListener('click', (e) => {
  e.preventDefault();
  closeModal();
  document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => ctaEmail.focus(), 500);
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 60
    ? 'rgba(10, 10, 15, 0.97)'
    : 'rgba(10, 10, 15, 0.85)';
});