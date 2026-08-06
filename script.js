// Render Lucide Icons
lucide.createIcons();

// Simple Scroll Reveal Trigger
window.addEventListener('scroll', () => {
  const reveals = document.querySelectorAll('.scroll-reveal');
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add('active');
    }
  });
});
window.dispatchEvent(new Event('scroll'));

// Navbar Sliding Pill Indicator & Scroll Spy
const nav = document.querySelector('nav');
const indicator = document.getElementById('nav-indicator');
const navLinks = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section');

function updateIndicator(element) {
  if (!indicator || !element) return;
  indicator.style.width = `${element.offsetWidth}px`;
  indicator.style.height = `${element.offsetHeight}px`;
  indicator.style.left = `${element.offsetLeft}px`;
  indicator.style.top = `${element.offsetTop}px`;
}

let activeLink = document.querySelector('.nav-btn.active') || navLinks[0];
updateIndicator(activeLink);

// Saat mouse mendekati menu lain (hover), kotak akan ikut berpindah sementara
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => updateIndicator(link));
});

// Saat mouse keluar dari navbar, kotak kembali ke menu yang sedang aktif/dilihat
if (nav) {
  nav.addEventListener('mouseleave', () => {
    updateIndicator(activeLink);
  });
}

// Saat menu diklik
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    activeLink = link;
    updateIndicator(link);
  });
});

// Scroll Spy (Kotak otomatis berpindah saat halaman di-scroll ke Home, Projects, Skills, dll)
const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -60% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      const targetLink = document.querySelector(`.nav-btn[href="#${id}"]`);
      if (targetLink) {
        navLinks.forEach(l => l.classList.remove('active'));
        targetLink.classList.add('active');
        activeLink = targetLink;
        updateIndicator(targetLink);
      }
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Menyesuaikan ukuran kotak saat layar di-resize
window.addEventListener('resize', () => {
  updateIndicator(activeLink);
});