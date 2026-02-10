// DOM references
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const joinBtn = document.getElementById("joinBtn");
const joinModal = document.getElementById("joinModal");
const closeJoinModal = document.getElementById("closeJoinModal");
const joinForm = document.getElementById("joinForm");
const joinMessageBox = document.getElementById("joinMessageBox");
const contactForm = document.getElementById("contactForm");
const contactMessageBox = document.getElementById("contactMessageBox");
const enrollButtons = document.querySelectorAll(".enroll-btn");

// Basic email validation pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Join modal open/close
joinBtn.addEventListener("click", () => {
  openJoinModal();
  joinMessageBox.textContent = "";
});

closeJoinModal.addEventListener("click", closeJoinModalHandler);
joinModal.addEventListener("click", (event) => {
  if (event.target === joinModal) closeJoinModalHandler();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && joinModal.classList.contains("show")) {
    closeJoinModalHandler();
  }
});

function openJoinModal() {
  joinModal.classList.add("show");
  joinModal.setAttribute("aria-hidden", "false");
}

function closeJoinModalHandler() {
  joinModal.classList.remove("show");
  joinModal.setAttribute("aria-hidden", "true");
}

// Join form validation
joinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = joinForm.fullName.value.trim();
  const email = joinForm.email.value.trim();
  const phone = joinForm.phone.value.trim();
  const courseInterest = joinForm.courseInterest.value.trim();

  if (!fullName || !email || !phone || !courseInterest) {
    setMessage(joinMessageBox, "Please fill in all Join With Us form fields.", false);
    return;
  }

  if (!emailPattern.test(email)) {
    setMessage(joinMessageBox, "Please enter a valid email address.", false);
    return;
  }

  setMessage(joinMessageBox, "Success! Your join request has been submitted.", true);
  joinForm.reset();
});

// Contact form validation
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    setMessage(contactMessageBox, "Please fill in all contact form fields.", false);
    return;
  }

  if (!emailPattern.test(email)) {
    setMessage(contactMessageBox, "Please enter a valid email address.", false);
    return;
  }

  setMessage(contactMessageBox, "Thank you! Your message has been sent successfully.", true);
  contactForm.reset();
});

// Course CTA interactions -> open Join modal
enrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openJoinModal();
    joinMessageBox.textContent = "";
  });
});

function setMessage(element, message, success) {
  element.textContent = message;
  element.style.color = success ? "var(--success)" : "var(--error)";
}
