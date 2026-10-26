const cover = document.getElementById("cover");
const pages = [
  document.getElementById("page1"),
  document.getElementById("page2"),
  document.getElementById("page3"),
  document.getElementById("page4"),
  document.getElementById("backCover")
];
const statusText = document.getElementById("status");
let currentPage = -1;
let isOpen = false;

function updateBook() {
  cover.classList.toggle("turned", isOpen);
  pages.forEach((page, index) => {
    page.classList.toggle("turned", index < currentPage);
    page.style.zIndex = String(20 + index);
  });
  statusText.textContent = !isOpen ? "Book is closed" :
    currentPage >= pages.length ? "You reached the back cover" :
    `Book opened • Page ${Math.max(1, currentPage + 1)} of ${pages.length}`;
}
function openBook() {
  isOpen = true;
  currentPage = 0;
  updateBook();
}
function nextPage() {
  if (!isOpen) { openBook(); return; }
  if (currentPage < pages.length) currentPage++;
  updateBook();
}
function previousPage() {
  if (currentPage > 0) currentPage--;
  else if (currentPage === 0) { isOpen = false; currentPage = -1; }
  updateBook();
}
document.getElementById("openBook").addEventListener("click", openBook);
document.querySelectorAll(".next").forEach(button => button.addEventListener("click", nextPage));
document.querySelectorAll(".prev").forEach(button => button.addEventListener("click", previousPage));
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") nextPage();
  if (event.key === "ArrowLeft") previousPage();
});
updateBook();
