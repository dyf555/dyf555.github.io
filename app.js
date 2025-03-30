function initCalendar() {
  const yearSelect = document.getElementById('yearSelect');
  const monthSelect = document.getElementById('monthSelect');
  
  // 生成年份选项（前后20年）
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 20; i <= currentYear + 20; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i + '年';
    yearSelect.add(option);
  }

  // 生成月份选项
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i + '月';
    monthSelect.add(option);
  }

  // 设置当前年月
  const currentMonth = new Date().getMonth() + 1;
  yearSelect.value = currentYear;
  monthSelect.value = currentMonth;

  // 初始化日历
  updateCalendar();

  // 添加事件监听
  yearSelect.addEventListener('change', updateCalendar);
  monthSelect.addEventListener('change', updateCalendar);
}

function updateCalendar() {
  const year = parseInt(document.getElementById('yearSelect').value);
  const month = parseInt(document.getElementById('monthSelect').value);
  const tbody = document.querySelector('#calendarTable tbody');
  
  tbody.innerHTML = '';

  // 计算当月天数
  const daysInMonth = new Date(year, month, 0).getDate();
  // 获取当月第一天星期几（0=周日）
  const firstDay = new Date(year, month - 1, 1).getDay();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        cell.textContent = '';
      } else if (date > daysInMonth) {
        cell.textContent = '';
      } else {
        cell.textContent = date;
        // 高亮当前日期
        if (year === new Date().getFullYear() && 
            month === new Date().getMonth() + 1 &&
            date === new Date().getDate()) {
          cell.classList.add('current-day');
        }
        date++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
    if (date > daysInMonth) break;
  }
}

// 初始化日历
window.onload = initCalendar;

// 初始化Swiper轮播图
const swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }
});

// 新增导航交互代码
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.main-nav a');
  
  function smoothScroll(target) {
    const element = document.querySelector(target);
    if(element) {
      const offset = 80;
      const position = element.offsetTop - offset;
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      smoothScroll(target);
    });
  });

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 80;
    navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if(section && section.offsetTop <= scrollPosition && 
         section.offsetTop + section.offsetHeight > scrollPosition) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
});