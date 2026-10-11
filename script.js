const monthYear = document.getElementById('monthYear');
const daysContainer = document.getElementById('daysContainer');
const selectedDateDisplay = document.getElementById('selectedDate');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const todayBtn = document.getElementById('todayBtn');

let currentDate = new Date();
let selectedDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  monthYear.textContent = `${monthNames[month]} ${year}`;
  daysContainer.innerHTML = '';

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dayEl = document.createElement('div');
    dayEl.className = 'day other';
    dayEl.textContent = day;
    daysContainer.appendChild(dayEl);
  }

  const today = new Date();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayEl = document.createElement('button');
    dayEl.type = 'button';
    dayEl.className = 'day';
    dayEl.textContent = day;

    if (date.toDateString() === today.toDateString()) {
      dayEl.classList.add('today');
    }

    if (date.toDateString() === selectedDate.toDateString()) {
      dayEl.classList.add('selected');
    }

    dayEl.addEventListener('click', () => {
      selectedDate = new Date(date);
      selectedDateDisplay.textContent = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      renderCalendar();
    });

    daysContainer.appendChild(dayEl);
  }

  const totalCells = daysContainer.children.length;
  const remainingCells = 42 - totalCells;

  for (let day = 1; day <= remainingCells; day++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'day other';
    dayEl.textContent = day;
    daysContainer.appendChild(dayEl);
  }
}

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

todayBtn.addEventListener('click', () => {
  currentDate = new Date();
  selectedDate = new Date();
  selectedDateDisplay.textContent = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  renderCalendar();
});

selectedDateDisplay.textContent = selectedDate.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

renderCalendar();
