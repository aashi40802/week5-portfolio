/* ==========================================================================
   main.js
   Two jobs:
     1. Validate the contact form and show inline error messages.
     2. Reveal sections as they scroll into view (IntersectionObserver).
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CONTACT FORM VALIDATION
   -------------------------------------------------------------------------- */
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("formSuccess");

/**
 * Show or clear an error for one field.
 * @param {string} field - the input's id/name (name, email, message)
 * @param {string} message - error text, or "" to clear
 */
function setError(field, message) {
  const input = document.getElementById(field);
  const errorEl = document.querySelector(`[data-error-for="${field}"]`);

  errorEl.textContent = message;
  // The --error modifier turns the border red (see main.css)
  input.classList.toggle("contact-form__input--error", Boolean(message));
}

/** Basic email shape check — good enough for a portfolio contact form. */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Validate all fields. Returns true only if every field passes.
 * Errors are set as a side effect so the user sees each problem.
 */
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  let valid = true;

  if (name === "") {
    setError("name", "Please enter your name.");
    valid = false;
  } else {
    setError("name", "");
  }

  if (!isValidEmail(email)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  } else {
    setError("email", "");
  }

  if (message.length < 10) {
    setError("message", "Message must be at least 10 characters.");
    valid = false;
  } else {
    setError("message", "");
  }

  return valid;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // handle it ourselves instead of reloading

    if (validateForm()) {
      form.reset();
      successMessage.hidden = false;
    } else {
      successMessage.hidden = true;
    }
  });

  // Clear a field's error the moment the user starts fixing it
  form.querySelectorAll(".contact-form__input").forEach((input) => {
    input.addEventListener("input", () => setError(input.id, ""));
  });
}

/* --------------------------------------------------------------------------
   2. SCROLL REVEAL
   Add .is-visible to each section as it enters the viewport so the CSS
   transition in animations.css can play. Unobserve after the first reveal
   so it only animates once.
   -------------------------------------------------------------------------- */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 } // fire when ~15% of the section is showing
);

sections.forEach((section) => observer.observe(section));

/* --------------------------------------------------------------------------
   3. FOOTER YEAR
   -------------------------------------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
