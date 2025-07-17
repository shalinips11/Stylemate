const calendarGrid = document.getElementById('calendarGrid');
const monthYear = document.getElementById('monthYear');
const popup = document.getElementById('popup');
const noteInput = document.getElementById('noteInput');

let currentDate = new Date();
let selectedDate = null;

// Retrieve events from localStorage (if any)
let events = JSON.parse(localStorage.getItem('events')) || {};

function renderCalendar() {
    calendarGrid.innerHTML = '';
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Creating empty grid cells for the days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.insertAdjacentHTML('beforeend', `<div></div>`);
    }

    // Creating grid cells for each date of the month
    for (let date = 1; date <= lastDate; date++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('calendar-day');
        dateCell.textContent = date;
        dateCell.addEventListener('click', () => openPopup(date));

        const event = events[`${currentDate.getFullYear()}-${currentDate.getMonth()}-${date}`];
        if (event) {
            const iconContainer = document.createElement('span');
            iconContainer.className = 'icon';
            if (event.eventType.birthday) iconContainer.textContent += '🎂';
            if (event.eventType.party) iconContainer.textContent += '🎉';
            if (event.eventType.marriage) iconContainer.textContent += '💍';
            if (event.eventType.festival) iconContainer.textContent += '🎆';
            dateCell.appendChild(iconContainer);
        }

        calendarGrid.appendChild(dateCell);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function openPopup(date) {
    selectedDate = date;
    noteInput.value = events[`${currentDate.getFullYear()}-${currentDate.getMonth()}-${date}`]?.note || '';
    popup.style.display = 'block';
}

function saveEvent() {
    const eventType = {
        birthday: document.getElementById('birthday').checked,
        party: document.getElementById('party').checked,
        marriage: document.getElementById('marriage').checked,
        festival: document.getElementById('festival').checked,
    };

    const note = noteInput.value;
    // Save the event to the events object
    events[`${currentDate.getFullYear()}-${currentDate.getMonth()}-${selectedDate}`] = { eventType, note };
    
    // Store events in localStorage
    localStorage.setItem('events', JSON.stringify(events));

    renderCalendar();
    closePopup();
}

function closePopup() {
    document.getElementById('birthday').checked = false;
    document.getElementById('party').checked = false;
    document.getElementById('marriage').checked = false;
    document.getElementById('festival').checked = false;
    popup.style.display = 'none';
}

renderCalendar();
