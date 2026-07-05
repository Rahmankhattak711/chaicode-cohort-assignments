const socket = io("http://localhost:3000");
const PAGE_SIZE = 100;
const TOTAL_ITEMS = 1_000_000;
let currentStart = 0;
let currentEnd = PAGE_SIZE - 1;
const loadedState = new Map();

const checkboxGrid = document.getElementById("checkbox-grid");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const rangeLabel = document.getElementById("range-label");
const pageLabel = document.getElementById("page-label");
const statusText = document.getElementById("status-text");
const checkedCount = document.getElementById("checked-count");
const footerCount = document.getElementById("footer-count");
const footerRange = document.getElementById("footer-range");

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const formatNumber = (value) => new Intl.NumberFormat().format(value);

function updateControls(totalChecked) {
  const page = Math.floor(currentStart / PAGE_SIZE) + 1;
  const pages = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);
  rangeLabel.textContent = `${formatNumber(currentStart)}–${formatNumber(currentEnd)}`;
  pageLabel.textContent = `Page ${page} / ${pages}`;
  checkedCount.textContent = `${formatNumber(totalChecked)} boxes are checked`;
  footerCount.textContent = `${formatNumber(totalChecked)} boxes are checked`;
  footerRange.textContent = `Showing ${formatNumber(currentEnd - currentStart + 1)} boxes`;
  prevBtn.disabled = currentStart === 0;
  nextBtn.disabled = currentEnd >= TOTAL_ITEMS - 1;
}

function renderItems(items, totalChecked) {
  checkboxGrid.innerHTML = items
    .map((item) => {
      const checked = item.checked ? "checked" : "";
      return `
            <div class="checkbox-cell">
              <input type="checkbox" id="checkbox-${item.id}" data-id="${item.id}" ${checked} />
            </div>
          `;
    })
    .join("");

  checkboxGrid
    .querySelectorAll("input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const id = Number(event.target.dataset.id);
        const checked = event.target.checked;
        loadedState.set(id, checked);
        socket.emit("toggle-checkbox", { id, checked });
        updateControls(totalChecked + (checked ? 1 : -1));
      });
    });
}

function showStatus(message) {
  statusText.textContent = message;
}

function requestRange(start) {
  const nextStart = clamp(start, 0, TOTAL_ITEMS - PAGE_SIZE);
  const nextEnd = nextStart + PAGE_SIZE - 1;
  showStatus("Loading range...");
  socket.emit("load-range", { start: nextStart, end: nextEnd });
}

socket.on("connect", () => {
  showStatus("Connected. Loading first range...");
  requestRange(0);
});

socket.on("disconnect", () => {
  showStatus("Disconnected. Reconnecting...");
});

socket.on("range-data", ({ start, end, total, totalChecked, items }) => {
  currentStart = start;
  currentEnd = end;
  renderItems(items, totalChecked);
  updateControls(totalChecked);
  showStatus(
    `Loaded ${formatNumber(items.length)} boxes from ${formatNumber(start)} to ${formatNumber(end)}.`,
  );
});

socket.on("checkbox-updated", ({ id, checked, totalChecked }) => {
  loadedState.set(id, checked);
  const checkbox = document.querySelector(`#checkbox-${id}`);
  if (checkbox) checkbox.checked = checked;
  updateControls(totalChecked);
});

prevBtn.addEventListener("click", () => requestRange(currentStart - PAGE_SIZE));
nextBtn.addEventListener("click", () => requestRange(currentStart + PAGE_SIZE));
