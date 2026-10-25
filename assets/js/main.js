document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Nav Toggle
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      mainNav.classList.toggle("is-open");
    });
  }

  // 2. Admission Form Validation
  const admissionForm = document.getElementById("admission-form");
  if (admissionForm) {
    admissionForm.addEventListener("submit", (e) => {
      let isValid = true;
      const emailInput = document.getElementById("guardian-email");
      const nameInput = document.getElementById("student-name");
      const gradeInput = document.getElementById("grade-level");
      const formError = document.getElementById("form-error");
      if(formError) formError.textContent = "";

      if (nameInput && !nameInput.value.trim()) isValid = false;
      if (gradeInput && !gradeInput.value.trim()) isValid = false;
      if (emailInput && !emailInput.value.trim()) {
        isValid = false;
      } else if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) isValid = false;
      }
      if (!isValid) {
        e.preventDefault();
        if(formError) formError.textContent = "Please fill in all required fields and provide a valid email address.";
      }
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 3. Blur Text / Split Text Animation
  if (!prefersReducedMotion) {
    document.querySelectorAll('.blur-text').forEach(el => {
      const text = el.textContent;
      el.innerHTML = '';
      text.split(' ').forEach((word, index) => {
        if (word.trim() !== '') {
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = word + ' ';
          span.style.animationDelay = `${index * 0.1}s`;
          el.appendChild(span);
        } else {
          el.appendChild(document.createTextNode(' '));
        }
      });
    });
  }

  // 4. Count Up Animation
  if (!prefersReducedMotion) {
    const countUpObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || 0);
          const start = parseInt(el.getAttribute('data-start') || 0);
          const suffix = el.getAttribute('data-suffix') || '';
          let current = start;
          const duration = 1500;
          const steps = 60;
          const stepTime = duration / steps;
          const increment = Math.ceil((target - start) / steps) || 1;
          
          const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = `${current}${suffix}`;
          }, stepTime);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.count-up').forEach(el => {
      countUpObserver.observe(el);
    });
  }

  // 5. Spotlight Card Hover
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 6. Smooth Accordions
  document.querySelectorAll('details').forEach(details => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.details-content');
    let isAnimating = false;
    
    if (summary && content) {
      summary.addEventListener('click', (e) => {
        if (prefersReducedMotion) return;
        e.preventDefault();
        if (isAnimating) return;
        
        isAnimating = true;
        if (details.open) {
          const height = content.offsetHeight;
          const animation = content.animate([
            { height: height + 'px', opacity: 1, padding: '1.5rem' },
            { height: '0px', opacity: 0, padding: '0 1.5rem' }
          ], { duration: 300, easing: 'ease-out' });
          content.style.overflow = 'hidden';
          animation.onfinish = () => {
            details.open = false;
            content.style.overflow = '';
            isAnimating = false;
          };
        } else {
          details.open = true;
          // Temporarily display block to get height
          const startHeight = content.offsetHeight;
          const animation = content.animate([
            { height: '0px', opacity: 0, padding: '0 1.5rem' },
            { height: startHeight + 'px', opacity: 1, padding: '1.5rem' }
          ], { duration: 300, easing: 'ease-out' });
          content.style.overflow = 'hidden';
          animation.onfinish = () => {
            content.style.overflow = '';
            isAnimating = false;
          };
        }
      });
    }
  });
});

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const drawer = document.querySelector(".mobile-drawer");

    if (hamburger && drawer) {
        hamburger.addEventListener("click", () => {
            const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
            hamburger.setAttribute("aria-expanded", !isExpanded);
            hamburger.classList.toggle("is-active");
            drawer.classList.toggle("is-open");
            const header = document.querySelector(".site-header");
            if(header) header.classList.toggle("menu-open");
            document.body.style.overflow = isExpanded ? "" : "hidden";
        });
    }
});


// Admissions Form Interactivity
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("admissionsForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            // If running locally, prevent default and show success state
            // In production, Netlify handles the actual submission
            if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
                e.preventDefault();
                const btn = form.querySelector("button[type='submit']");
                const originalText = btn.innerHTML;
                
                btn.innerHTML = "Processing...";
                btn.style.opacity = "0.7";
                btn.disabled = true;

                setTimeout(() => {
                    form.innerHTML = `
                        <div style="text-align: center; padding: 2rem;">
                            <div style="width: 50px; height: 50px; background: rgba(230, 44, 32, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 2px solid var(--color-red);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-red)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                            <h3 style="font-family: var(--font-heading); color: var(--color-slate); margin-bottom: 1rem;">Application Received!</h3>
                            <p style="color: #666; font-size: 1.1rem;">Thank you for applying to Bantu College. Mr. Kwaghtongo D. A.'s admissions team will contact you within 48 hours to schedule the entrance examination.</p>
                        </div>
                    `;
                }, 1500);
            }
        });
    }
});




