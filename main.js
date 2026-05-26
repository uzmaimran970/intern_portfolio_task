// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Animate skill bars when visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.classList.add('animated');
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => observer.observe(cat));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navLinksAll.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

// Contact form with validation + backend POST
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

function validateField(id, errorId, validator, msg) {
  const el = document.getElementById(id);
  const err = document.getElementById(errorId);
  if (!validator(el.value.trim())) {
    el.classList.add('error');
    err.textContent = msg;
    return false;
  }
  el.classList.remove('error');
  err.textContent = '';
  return true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate all fields
  const validName = validateField('name', 'nameError', v => v.length >= 2, 'Please enter your name.');
  const validEmail = validateField('email', 'emailError', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email.');
  const validSubject = validateField('subject', 'subjectError', v => v.length >= 3, 'Please enter a subject.');
  const validMsg = validateField('message', 'messageError', v => v.length >= 10, 'Message must be at least 10 characters.');

  if (!validName || !validEmail || !validSubject || !validMsg) return;

  // Show loading state
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  formSuccess.style.display = 'none';
  formError.style.display = 'none';

  const payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim(),
    timestamp: new Date().toISOString()
  };

  try {
    // POST to backend API
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      formSuccess.style.display = 'block';
      form.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    formError.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  }
});

// Clear error on input
['name', 'email', 'subject', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('error');
    const errEl = document.getElementById(id + 'Error');
    if (errEl) errEl.textContent = '';
  });
});
