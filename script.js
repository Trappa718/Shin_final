// ================================
// Pink / orange corn snake passport
// ================================
// Чтобы изменить имя:
const PET_NAME = "Шин";

// Даты кормления.
// Ниже пример: кормление каждое воскресенье.
// Замените даты на свой реальный график в формате YYYY-MM-DD.
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
  "2027-03-30",
  "2027-04-06"
];

const BIRTHDAY = "2026-04-24";
const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

document.querySelector("h1").textContent = PET_NAME;

const pad = n => String(n).padStart(2, "0");
const dateKey = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

function parseLocal(key) {
  const [y,m,d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatShort(d) {
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }).replace(".", "");
}

function ageText() {
  const birth = parseLocal(BIRTHDAY);
  const now = new Date();
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months--;
  months = Math.max(0, months);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years) return `${years} г. ${rest ? rest + " мес." : ""}`.trim();
  return `${rest} мес.`;
}
document.getElementById("age").textContent = ageText();

const today = new Date();
const upcoming = FEEDING_DATES
  .map(parseLocal)
  .filter(d => d >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
  .sort((a,b) => a-b)[0];
document.getElementById("nextFeedLabel").textContent = upcoming ? formatShort(upcoming) : "—";

let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);

function renderCalendar() {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  document.getElementById("monthTitle").textContent = `${monthNames[month]} ${year}`;

  const grid = document.getElementById("calendar");
  grid.innerHTML = "";

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // JS: Sunday=0, convert to Monday=0
  const offset = (firstDay.getDay() + 6) % 7;

  for (let i = 0; i < offset; i++) {
    const el = document.createElement("div");
    el.className = "day empty";
    grid.appendChild(el);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const key = dateKey(d);
    const el = document.createElement("div");
    el.className = "day";
    el.textContent = day;

    if (key === dateKey(today)) el.classList.add("today");
    if (FEEDING_DATES.includes(key)) el.classList.add("feeding");

    grid.appendChild(el);
  }
}

document.getElementById("prevMonth").addEventListener("click", () => {
  viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
  renderCalendar();
});
document.getElementById("nextMonth").addEventListener("click", () => {
  viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
  renderCalendar();
});

renderCalendar();
