document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Menu Hamburger (Mobile) ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Đóng menu khi nhấp vào bất kỳ link nào
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });


  // --- 2. Dark/Light Mode Switch ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Kiểm tra trạng thái đã lưu
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  });


  // --- 3. Tìm kiếm & Lọc Dự Án ---
  const searchInput = document.getElementById('search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  let currentCategory = 'all';
  let currentSearch = '';

  function filterProjects() {
    projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags');
      const title = card.getAttribute('data-title').toLowerCase();
      
      const matchesCategory = currentCategory === 'all' || tags.includes(currentCategory);
      const matchesSearch = title.includes(currentSearch.toLowerCase()) || tags.toLowerCase().includes(currentSearch.toLowerCase());

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      filterProjects();
    });
  });

  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    filterProjects();
  });


  // --- 4. Validate Form & Đếm số ký tự ---
  const contactForm = document.getElementById('contact-form');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  // Đếm số ký tự textarea
  messageInput.addEventListener('input', () => {
    const len = messageInput.value.length;
    charCount.textContent = `${len}/300`;
  });

  // Validation Form khi submit
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset thông báo lỗi
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';
    document.getElementById('form-success').style.display = 'none';

    // Validate Name
    if (nameInput.value.trim() === '') {
      document.getElementById('name-error').textContent = 'Vui lòng nhập họ tên của bạn.';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById('email-error').textContent = 'Email không hợp lệ.';
      isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim().length < 10) {
      document.getElementById('message-error').textContent = 'Nội dung tin nhắn phải có ít nhất 10 ký tự.';
      isValid = false;
    }

    if (isValid) {
      const successDiv = document.getElementById('form-success');
      successDiv.textContent = 'Gửi tin nhắn thành công! Cảm ơn bạn đã liên hệ.';
      successDiv.style.display = 'block';
      contactForm.reset();
      charCount.textContent = '0/300';
    }
  });


  // --- 5. Scroll Reveal Effect ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


  // --- 6. Cập nhật năm tự động ở Footer ---
  document.getElementById('current-year').textContent = new Date().getFullYear();

});