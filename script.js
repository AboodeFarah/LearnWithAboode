// Global DOM references (available on specific pages only)
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const contactForm = document.getElementById("contactForm");
const contactMessageBox = document.getElementById("contactMessageBox");
const joinPageForm = document.getElementById("joinPageForm");
const joinPageMessage = document.getElementById("joinPageMessage");

// Basic validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberPattern = /^[0-9+\-\s()]{6,20}$/;

// Mobile menu toggle (homepage)
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Smooth scrolling for internal links only
if (navMenu) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      navMenu.classList.remove("open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Contact form validation (homepage)
if (contactForm && contactMessageBox) {
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
}

// Join page validation (new file/page)
if (joinPageForm && joinPageMessage) {
  joinPageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = joinPageForm.name.value.trim();
    const email = joinPageForm.email.value.trim();
    const number = joinPageForm.number.value.trim();
    const gender = joinPageForm.gender.value;
    const country = joinPageForm.country.value.trim();

    if (!name || !email || !number || !gender || !country) {
      setMessage(joinPageMessage, "Please fill in all join form fields.", false);
      return;
    }

    if (!emailPattern.test(email)) {
      setMessage(joinPageMessage, "Please enter a valid email address.", false);
      return;
    }

    if (!numberPattern.test(number)) {
      setMessage(joinPageMessage, "Please enter a valid phone number.", false);
      return;
    }

    setMessage(joinPageMessage, "Success! You have joined LearnWithAboode.", true);
    joinPageForm.reset();
  });
}

function setMessage(element, message, success) {
  element.textContent = message;
  element.style.color = success ? "var(--success)" : "var(--error)";
}
