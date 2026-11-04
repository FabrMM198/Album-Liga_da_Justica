const pages = [...document.querySelectorAll('.page')];

let currentPage = 0;
let isTurning = false;

const navigation = document.createElement('div');
navigation.className = 'album-navigation';
navigation.innerHTML = `
  <button type="button" class="previous-page" aria-label="Página anterior">←</button>
  <span class="page-counter" aria-live="polite"></span>
  <button type="button" class="next-page" aria-label="Próxima página">→</button>
`;
document.body.appendChild(navigation);

const previousButton = navigation.querySelector('.previous-page');
const nextButton = navigation.querySelector('.next-page');
const pageCounter = navigation.querySelector('.page-counter');

function updateNavigation() {
  pageCounter.textContent = `${currentPage + 1} / ${pages.length}`;
  previousButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage === pages.length - 1;
}

function showPage(index, direction = 1) {
  if (isTurning || index < 0 || index >= pages.length || index === currentPage) return;

  isTurning = true;
  const oldPage = pages[currentPage];
  const newPage = pages[index];

  oldPage.classList.remove('active');
  oldPage.classList.add(direction > 0 ? 'turn-next-out' : 'turn-prev-out');

  window.setTimeout(() => {
    oldPage.classList.remove('turn-next-out', 'turn-prev-out');
    currentPage = index;
    newPage.classList.add('active');
    updateNavigation();
    isTurning = false;
  }, 350);
}

function nextPage() {
  showPage(currentPage + 1, 1);
}

function previousPage() {
  showPage(currentPage - 1, -1);
}

previousButton.addEventListener('click', previousPage);
nextButton.addEventListener('click', nextPage);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown') nextPage();
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') previousPage();
});

let touchStartX = 0;
document.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) < 50) return;
  if (distance < 0) nextPage();
  else previousPage();
}, { passive: true });

pages.forEach((page, index) => {
  page.classList.toggle('active', index === currentPage);
});
updateNavigation();
