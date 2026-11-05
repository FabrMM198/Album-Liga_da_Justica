const bookElement = document.getElementById('book');

const navigation = document.createElement('div');
navigation.className = 'album-navigation';
navigation.innerHTML = `
  <button type="button" class="previous-page" aria-label="Página anterior">←</button>
  <button type="button" class="next-page" aria-label="Próxima página">→</button>
`;
document.body.appendChild(navigation);

const previousButton = navigation.querySelector('.previous-page');
const nextButton = navigation.querySelector('.next-page');
const availableHeight = Math.max(400, window.innerHeight - 80);
const pageWidth = Math.min(560, (window.innerWidth - 150) / 2, availableHeight * 560 / 850);
const pageHeight = pageWidth * 850 / 560;

const pageFlip = new St.PageFlip(bookElement, {
  width: Math.floor(pageWidth),
  height: Math.floor(pageHeight),
  size: 'fixed',
  minWidth: 280,
  maxWidth: 560,
  minHeight: 425,
  maxHeight: 850,
  maxShadowOpacity: 0.6,
  showCover: true,
  usePortrait: true,
  mobileScrollSupport: false,
  drawShadow: true,
  flippingTime: 700
});

const albumPages = document.querySelectorAll('.flip-book > .page');
pageFlip.loadFromHTML(albumPages);

function updateNavigation(event = null) {
  const current = event?.data?.currentPage ?? pageFlip.getCurrentPageIndex();
  const total = pageFlip.getPageCount();
  previousButton.disabled = current === 0;
  nextButton.disabled = current >= total - 1;
}

previousButton.addEventListener('click', () => pageFlip.flipPrev());
nextButton.addEventListener('click', () => pageFlip.flipNext());

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown') pageFlip.flipNext();
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') pageFlip.flipPrev();
});

pageFlip.on('flip', updateNavigation);
pageFlip.on('changeState', () => updateNavigation());
updateNavigation();

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => window.location.reload(), 150);
});
