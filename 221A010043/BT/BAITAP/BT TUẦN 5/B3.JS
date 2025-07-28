document.addEventListener('DOMContentLoaded', () => {
    const dateInputContainer = document.querySelector('.date-input-container');
    const datepickerDropdown = document.querySelector('.datepicker-dropdown');
    const navPrev = document.querySelector('.nav-prev');
    const navNext = document.querySelector('.nav-next');
    const monthYearSpan = document.querySelector('.month-year');
    const calendarGrid = document.querySelector('.calendar-grid');

    let currentDate = new Date();

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYearSpan.textContent = `${getMonthName(month)} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        calendarGrid.innerHTML = '';
        
        const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        dayHeaders.forEach(header => {
            const dayHeaderCell = document.createElement('div');
            dayHeaderCell.classList.add('day-header');
            dayHeaderCell.textContent = header;
            calendarGrid.appendChild(dayHeaderCell);
        });

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell', 'other-month');
            dayCell.textContent = daysInPrevMonth - i;
            calendarGrid.appendChild(dayCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell');
            dayCell.textContent = i;
            if (i === currentDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                dayCell.classList.add('active');
            }
            dayCell.addEventListener('click', () => {
                const allActiveCells = document.querySelectorAll('.day-cell.active');
                allActiveCells.forEach(cell => cell.classList.remove('active'));
                dayCell.classList.add('active');
                updateInput(year, month, i);
                datepickerDropdown.style.display = 'none';
            });
            calendarGrid.appendChild(dayCell);
        }

        const totalCells = firstDayOfMonth + daysInMonth;
        const cellsToAdd = 42 - totalCells;
        for (let i = 1; i <= cellsToAdd; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell', 'other-month');
            dayCell.textContent = i;
            calendarGrid.appendChild(dayCell);
        }
    };

    const getMonthName = (monthIndex) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    };

    const updateInput = (year, month, day) => {
        const formattedMonth = String(month + 1).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        const formattedDate = `${formattedMonth}/${formattedDay}/${year} 05:00:00 PM`;
        dateInputContainer.textContent = formattedDate;
    };

    dateInputContainer.addEventListener('click', () => {
        if (datepickerDropdown.style.display === 'block') {
            datepickerDropdown.style.display = 'none';
        } else {
            datepickerDropdown.style.display = 'block';
        }
    });

    navPrev.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    navNext.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    document.addEventListener('click', (event) => {
        const isClickInside = dateInputContainer.contains(event.target) || datepickerDropdown.contains(event.target);
        if (!isClickInside) {
            datepickerDropdown.style.display = 'none';
        }
    });

    renderCalendar();
});