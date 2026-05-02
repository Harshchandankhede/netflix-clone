const faqButtons = document.querySelectorAll('.faq-question');
const faqAnswers = document.querySelectorAll('.faq-answer');
const ctaForm = document.getElementById('ctaForm');
const ctaEmail = document.getElementById('ctaEmail');
const ctaMsg = document.getElementById('ctaMsg');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('signInModal');
const openBtn = document.getElementById('openSignIn');
const closeBtn = document.getElementById('modalClose');
const signInForm = document.getElementById('signInForm');
const signInMsg = document.getElementById('signInMsg');
const joinNowLink = document.getElementById('joinNowLink');
const modalEmail = document.getElementById('modalEmail');
const navbar = document.querySelector('.navbar');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
let lastFocusedElement = null;

function validateEmail(email) {
  return emailPattern.test(email.trim());
}

function setMessage(element, message, type) {
  element.textContent = message;
  element.className = element.id === 'ctaMsg' ? `cta-msg ${type}` : `modal-hint ${type}`;
}

function closeAllFaq() {
  faqButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
  faqAnswers.forEach((answer) => {
    answer.hidden = true;
  });
}

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    closeAllFaq();

    if (!isExpanded) {
      button.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

ctaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = ctaEmail.value.trim();

  if (!email) {
    setMessage(ctaMsg, 'Email is required.', 'error');
    ctaEmail.focus();
    return;
  }

  if (!validateEmail(email)) {
    setMessage(ctaMsg, 'Please enter a valid email address.', 'error');
    ctaEmail.focus();
    return;
  }

  setMessage(ctaMsg, '✓ You are subscribed. Watchlist updates will land in your inbox.', 'success');
  ctaForm.reset();
});

function openModal() {
  lastFocusedElement = document.activeElement;
  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => modalEmail.focus(), 50);
}

function closeModal() {
  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  signInForm.reset();
  signInMsg.textContent = '';
  signInMsg.className = 'modal-hint';
  if (lastFocusedElement) lastFocusedElement.focus();
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }

  if (e.key === 'Tab' && modalOverlay.classList.contains('active')) {
    const focusable = modal.querySelectorAll('button, a[href], input, textarea, select');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = modalEmail.value.trim();

  if (!email) {
    setMessage(signInMsg, 'Email is required.', 'error');
    modalEmail.focus();
    return;
  }

  if (!validateEmail(email)) {
    setMessage(signInMsg, 'Please enter a valid email address.', 'error');
    modalEmail.focus();
    return;
  }

  setMessage(signInMsg, '✓ Subscription successful. Welcome to CineStream updates.', 'success');
  setTimeout(closeModal, 1400);
});

joinNowLink.addEventListener('click', (e) => {
  e.preventDefault();
  closeModal();
  document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => ctaEmail.focus(), 500);
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(0, 0, 0, 0.82)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'transparent';
    navbar.style.backdropFilter = 'none';
  }
});