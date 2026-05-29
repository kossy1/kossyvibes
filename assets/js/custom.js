// custom.js - Interactive functionality for Ajeoda Sunday John Portfolio

(function() {
  'use strict';

  // ========================
  // Smooth Scroll with Navbar Offset
  // ========================
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 70;
  
  const allLinks = document.querySelectorAll('a[href^="#"]');
  
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip empty or just "#" links
      if (targetId === "#" || targetId === "" || targetId === "#0") return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        history.pushState(null, null, targetId);
        
        // Close mobile menu if open (Bootstrap 5)
        const bsCollapse = document.querySelector('.navbar-collapse');
        if (bsCollapse && bsCollapse.classList.contains('show')) {
          const toggler = document.querySelector('.navbar-toggler');
          if (toggler) {
            toggler.click();
          }
        }
      }
    });
  });

  // ========================
  // Handle URL Hash on Page Load
  // ========================
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  }

  // ========================
  // Contact Form - Email Validation & Alert (for mailto form)
  // ========================
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('emailAddress');
      const messageInput = document.getElementById('messageText');
      
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      
      // Validate fields
      if (!name) {
        showAlert('❌ Please enter your full name.', 'danger');
        nameInput?.focus();
        return;
      }
      
      if (!email) {
        showAlert('❌ Please enter your email address.', 'danger');
        emailInput?.focus();
        return;
      }
      
      // Basic email validation
      const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
      if (!emailPattern.test(email)) {
        showAlert('❌ Please enter a valid email address (e.g., name@example.com).', 'danger');
        emailInput?.focus();
        return;
      }
      
      if (!message) {
        showAlert('❌ Please write a message before sending.', 'danger');
        messageInput?.focus();
        return;
      }
      
      // Show success alert before opening mail client
      showAlert(`✅ Thanks ${name}! Your default email client will open.`, 'success');
      
      // Build mailto link
      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A-- Sent from Ajeoda Sunday John Portfolio`;
      const mailtoLink = `mailto:ajeoda.sunday@devportfolio.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      
      // Slight delay to show success message, then open email client
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 500);
      
      // Optionally reset form after a delay
      setTimeout(() => {
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (messageInput) messageInput.value = '';
      }, 1000);
    });
  }
  
  // Helper function to show alerts
  function showAlert(message, type) {
    if (!formAlert) return;
    
    formAlert.classList.remove('d-none', 'alert-success', 'alert-danger');
    formAlert.classList.add(`alert-${type}`);
    formAlert.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i> ${message}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      formAlert.classList.add('d-none');
    }, 5000);
  }

  // ========================
  // Navbar Background Change on Scroll
  // ========================
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.96)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.03)';
      }
    }
  });

  // ========================
  // Active Navigation Link Highlight on Scroll
  // ========================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + navbarHeight + 50;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
        link.style.color = '#3b82f6';
        link.style.fontWeight = '600';
      } else {
        link.style.color = '#1e293b';
        link.style.fontWeight = '500';
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

  // ========================
  // Add Animation on Scroll (Simple fade-up)
  // ========================
  const animateElements = document.querySelectorAll('.project-card, .skill-badge, .contact-form-card');
  
  function checkFadeIn() {
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight - 100;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Set initial styles for animation
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', checkFadeIn);
  window.addEventListener('load', checkFadeIn);
  
  // ========================
  // Year Auto-update in Footer (optional)
  // ========================
  const footerYear = document.querySelector('footer .container p');
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
  }
  
  // ========================
  // Close mobile menu when window is resized above breakpoint
  // ========================
  window.addEventListener('resize', function() {
    const bsCollapse = document.querySelector('.navbar-collapse');
    if (window.innerWidth > 992 && bsCollapse && bsCollapse.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) {
        toggler.click();
      }
    }
  });
  
  // ========================
  // Prevent form resubmission on page refresh
  // ========================
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
  
  console.log('Portfolio website loaded successfully | Ajeoda Sunday John');
})();