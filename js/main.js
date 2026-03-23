// amAnye Investment — main.js

// =============================================
// NAV SCROLL
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// =============================================
// MOBILE BURGER MENU
// =============================================
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// =============================================
// REVEAL ON SCROLL
// =============================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// =============================================
// FAQ ACCORDION
// =============================================
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all
    document.querySelectorAll('.faq__q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // Toggle current
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// =============================================
// CONTACT FORM
// =============================================
const submitBtn = document.getElementById('submitBtn');
const formNote = document.getElementById('formNote');

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value;
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !subject || !message) {
      formNote.style.color = '#e17055';
      formNote.textContent = 'Please fill in all required fields.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formNote.style.color = '#e17055';
      formNote.textContent = 'Please enter a valid email address.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      formNote.style.color = 'var(--accent-green)';
      formNote.textContent = '✓ Message sent! We\'ll respond within 24 hours.';
      document.getElementById('fname').value = '';
      document.getElementById('femail').value = '';
      document.getElementById('fphone').value = '';
      document.getElementById('fsubject').value = '';
      document.getElementById('fmessage').value = '';
      setTimeout(() => { formNote.textContent = ''; }, 5000);
    }, 1800);
  });
}

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});
