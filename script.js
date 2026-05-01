// ── FAQ Accordion ──
const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = answer.style.maxHeight;

    // Close all
    document.querySelectorAll(".faq-answer").forEach((item) => {
      item.style.maxHeight = null;
    });
    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Toggle current
    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      button.classList.add("active");
    }
  });
});

// ── CTA Form ──
const ctaForm = document.getElementById("ctaForm");
const ctaEmail = document.getElementById("ctaEmail");
const ctaMsg = document.getElementById("ctaMsg");

ctaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = ctaEmail.value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

  if (!email) {
    ctaMsg.textContent = "Email is required.";
    ctaMsg.className = "cta-msg error";
  } else if (!emailPattern.test(email)) {
    ctaMsg.textContent = "Please enter a valid email address.";
    ctaMsg.className = "cta-msg error";
  } else {
    ctaMsg.textContent = "✓ You're all set! Check your inbox to get started.";
    ctaMsg.className = "cta-msg success";
    ctaEmail.value = "";
  }
});

// ── Sign In Modal ──
const modalOverlay = document.getElementById("modalOverlay");
const openBtn = document.getElementById("openSignIn");
const closeBtn = document.getElementById("modalClose");
const signInForm = document.getElementById("signInForm");
const signInMsg = document.getElementById("signInMsg");
const joinNowLink = document.getElementById("joinNowLink");

openBtn.addEventListener("click", () => {
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("modalEmail").value.trim();

  if (!email) {
    signInMsg.textContent = "Please fill in all fields.";
    signInMsg.style.color = "#e87c03";
  } else {
    signInMsg.textContent = "✓ Subscribed successfully! Redirecting...";
    signInMsg.style.color = "#4ade80";
    setTimeout(() => {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
      signInMsg.textContent = "";
      signInForm.reset();
    }, 2000);
  }
});

joinNowLink.addEventListener("click", (e) => {
  e.preventDefault();
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => ctaEmail.focus(), 600);
});

// ── Navbar scroll effect ──
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 60) {
    navbar.style.background = "rgba(0,0,0,0.92)";
  } else {
    navbar.style.background = "transparent";
  }
});

console.log("CineStream landing page loaded");