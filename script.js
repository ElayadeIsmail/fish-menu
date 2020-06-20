const plates = document.querySelector(".plates");
const form = document.querySelector(".add-items");
const checkAllBtn = document.querySelector(".check-all");
const clearAllBtn = document.querySelector(".check-clear");
const clearItemsBtn = document.querySelector(".clear-items");
let items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  const text = this.querySelector('[name="item"]').value;
  const item = { text, done: false };
  e.preventDefault();
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  populateItems(items, plates);
  form.reset();
}

function populateItems(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
    <li>
     <input type="checkbox" id="item${i}" data-index=${i} ${
        plate.done ? "checked" : ""
      } />
     <label for="item${i}">${plate.text}</label>
     <a class='delete' data-index=${i}>X</a>
     </li>   
    `;
    })
    .join("");
}
function deleteItem(e) {
  const el = e.target;
  el.parentElement.remove();
  const index = el.dataset.index;
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  populateItems(items, plates);
}
function toggleDone(e) {
  const el = e.target.dataset.index;
  items[el].done = !items[el].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateItems(items, plates);
}
function checkAll() {
  if (items.length === 0) return;
  items.map((item) => (item.done = true));
  populateItems(items, plates);
}
function clearAll() {
  if (items.length === 0) return;
  items.map((item) => (item.done = false));
  populateItems(items, plates);
}
function clearItems() {
  items = [];
  populateItems(items, plates);
  localStorage.setItem("items", JSON.stringify(items));
}
plates.addEventListener("click", (e) => {
  if (e.target.matches("input")) {
    toggleDone(e);
  } else if (e.target.classList.contains("delete")) {
    deleteItem(e);
  }
});
populateItems(items, plates);
form.addEventListener("submit", addItem);

checkAllBtn.addEventListener("click", checkAll);
clearAllBtn.addEventListener("click", clearAll);
clearItemsBtn.addEventListener("click", clearItems);
