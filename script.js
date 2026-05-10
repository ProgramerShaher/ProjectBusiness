// Initialize Lucide Icons
lucide.createIcons();

// --- Header Scroll State ---
const header = document.getElementById('main-header');
const headerContainer = header.querySelector('.container');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('shadow-lg');
    header.classList.remove('shadow-md');
    headerContainer.classList.remove('h-20');
    headerContainer.classList.add('h-16');
  } else {
    header.classList.remove('shadow-lg');
    header.classList.add('shadow-md');
    headerContainer.classList.remove('h-16');
    headerContainer.classList.add('h-20');
  }
}, { passive: true });

// --- Scroll To Top Button ---
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    scrollTopBtn.classList.add('opacity-100', 'translate-y-0');
  } else {
    scrollTopBtn.classList.remove('opacity-100', 'translate-y-0');
    scrollTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
  }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Scroll Animation (Intersection Observer) ---
const observeElements = () => {
  const elements = document.querySelectorAll('.fade-up, .fade-right, .fade-left, .scale-in:not(.gallery-item)');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );
  elements.forEach((el) => observer.observe(el));
};
observeElements();

// --- Counter Animation ---
const counters = document.querySelectorAll('.animated-counter');
const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.getAttribute('data-value').replace(/[^0-9]/g, ''));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const steps = 60;
        const increment = targetValue / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetValue) {
            el.innerText = targetValue + suffix;
            clearInterval(timer);
          } else {
            el.innerText = Math.floor(current) + suffix;
          }
        }, duration / steps);

        obs.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach(counter => counterObserver.observe(counter));

// --- Gallery Filter ---
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active state from all
    filterButtons.forEach(b => {
      b.classList.remove('bg-brand-dark', 'text-white', 'shadow-premium');
      b.classList.add('bg-gray-50', 'text-brand-dark/70');
    });
    // Add active state to clicked
    btn.classList.remove('bg-gray-50', 'text-brand-dark/70');
    btn.classList.add('bg-brand-dark', 'text-white', 'shadow-premium');

    const filter = btn.getAttribute('data-filter');

    let delayIndex = 0;
    galleryItems.forEach((item) => {
      item.style.animation = 'none'; // reset animation
      // force reflow
      void item.offsetWidth;

      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        item.style.animation = `galleryFadeIn 0.5s ease-out ${delayIndex * 0.08}s both`;
        delayIndex++;
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// --- Mobile Menu Toggle ---
const menuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

function openMenu() {
  mobileMenu.classList.remove('translate-x-full');
  mobileMenu.classList.add('translate-x-0');
  mobileMenuOverlay.classList.remove('hidden');
}

function closeMenu() {
  mobileMenu.classList.add('translate-x-full');
  mobileMenu.classList.remove('translate-x-0');
  mobileMenuOverlay.classList.add('hidden');
}

menuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
mobileMenuOverlay.addEventListener('click', closeMenu);

// Mobile Nav Links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    closeMenu();
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Desktop Nav Links
const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');
desktopNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      // Offset for sticky header (80px or 64px depending on scroll)
      const offset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});
