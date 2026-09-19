// ==========================================
// ШИН — ПАСПОРТ ПИТОМЦА
// ==========================================

const PET_NAME = "Шин";

const BIRTHDAY = "2026-04-24";

// Кормление раз в неделю.
// Первая дата — 15.09.2026.
const FEEDING_DATES = [
    "2026-09-15",
    "2026-09-22",
    "2026-09-29",

    "2026-10-06",
    "2026-10-13",
    "2026-10-20",
    "2026-10-27",

    "2026-11-03",
    "2026-11-10",
    "2026-11-17",
    "2026-11-24",

    "2026-12-01",
    "2026-12-08",
    "2026-12-15",
    "2026-12-22",
    "2026-12-29",

    "2027-01-05",
    "2027-01-12",
    "2027-01-19",
    "2027-01-26",

    "2027-02-02",
    "2027-02-09",
    "2027-02-16",
    "2027-02-23",

    "2027-03-02",
    "2027-03-09",
    "2027-03-16",
    "2027-03-23",
    "2027-03-30"
];

const MONTH_NAMES = [
    "Январь", "Февраль", "Март", "Апрель",
    "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

function pad(number) {
    return String(number).padStart(2, "0");
}

function dateToKey(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDate(key) {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function formatDate(date) {
    return date
        .toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short"
        })
        .replace(".", "");
}


// AGE

function calculateAge() {

    const birthday = parseDate(BIRTHDAY);
    const today = new Date();

    let months =
        (today.getFullYear() - birthday.getFullYear()) * 12 +
        (today.getMonth() - birthday.getMonth());

    if (today.getDate() < birthday.getDate()) {
        months--;
    }

    months = Math.max(0, months);

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0) {
        return remainingMonths > 0
            ? `${years} г. ${remainingMonths} мес.`
            : `${years} г.`;
    }

    return `${remainingMonths} мес.`;
}

document.getElementById("age").textContent =
    calculateAge();


// NEXT FEEDING

function getNextFeeding() {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return FEEDING_DATES
        .map(parseDate)
        .filter(date => date >= today)
        .sort((a, b) => a - b)[0];
}

const nextFeeding = getNextFeeding();

if (nextFeeding) {
    document.getElementById("nextFeed").textContent =
        formatDate(nextFeeding);
}


// CALENDAR

const today = new Date();

let currentMonth =
    new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

function renderCalendar() {

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    document.getElementById("monthTitle").textContent =
        `${MONTH_NAMES[month]} ${year}`;

    const calendar =
        document.getElementById("calendar");

    calendar.innerHTML = "";

    const firstDay =
        new Date(year, month, 1);

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();

    const offset =
        (firstDay.getDay() + 6) % 7;

    // Empty cells before the first day
    for (let i = 0; i < offset; i++) {

        const empty =
            document.createElement("div");

        empty.className = "day empty";

        calendar.appendChild(empty);
    }

    // Month days
    for (let day = 1; day <= daysInMonth; day++) {

        const date =
            new Date(year, month, day);

        const element =
            document.createElement("div");

        element.className = "day";

        element.textContent = day;

        const key = dateToKey(date);

        if (key === dateToKey(today)) {
            element.classList.add("today");
        }

        if (FEEDING_DATES.includes(key)) {
            element.classList.add("feeding");
        }

        calendar.appendChild(element);
    }
}


// MONTH NAVIGATION

document
    .getElementById("previousMonth")
    .addEventListener("click", () => {

        currentMonth =
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
            );

        renderCalendar();
    });


document
    .getElementById("nextMonth")
    .addEventListener("click", () => {

        currentMonth =
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
            );

        renderCalendar();
    });


renderCalendar();
