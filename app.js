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

const imagensFigurinhas = {
    1: './assets/figurinhas/01-superman.webp',
    2: './assets/figurinhas/02-batman.webp',
    3: './assets/figurinhas/03-wonder-woman.webp',
    4: './assets/figurinhas/04-flash.webp',
    5: './assets/figurinhas/05-lantern-hal.webp',
    6: './assets/figurinhas/06-lantern-john.webp',
    7: './assets/figurinhas/07-aquaman.webp',
    8: './assets/figurinhas/08-martian-manhunter.webp',
    9: './assets/figurinhas/09-lantern-guy.webp',
    10: './assets/figurinhas/10-hawkwoman.webp',
    11: './assets/figurinhas/11-cyborg.webp',
    12: './assets/figurinhas/12-beetle-ted.webp',
    13: './assets/figurinhas/13-booster-gold.webp',
    14: './assets/figurinhas/14-john-constantine.webp',
    15: './assets/figurinhas/15-zatanna-zatara.webp',
    16: './assets/figurinhas/16-etrigan.webp',
    17: './assets/figurinhas/17-deadman.webp',
    18: './assets/figurinhas/18-swamp-thing.webp',
    19: './assets/figurinhas/19-green-arrow.webp',
    20: './assets/figurinhas/20-black-canary.webp',
    21: './assets/figurinhas/21-mera.webp',
    22: './assets/figurinhas/22-supergirl.webp',
    23: './assets/figurinhas/23-atom.webp',
    24: './assets/figurinhas/24-kid-flash.webp',
    25: './assets/figurinhas/25-beetle-jaime.webp',
    26: './assets/figurinhas/26-nightwing.webp',
    27: './assets/figurinhas/27-mister-terrific.webp',
    28: './assets/figurinhas/28-rick-flag.webp',
    29: './assets/figurinhas/29-max-lord.webp',
    30: './assets/figurinhas/30-doctor-fate.webp',
    31: './assets/figurinhas/31-flash-jay.webp',
    32: './assets/figurinhas/32-lantern-alan.webp',
    33: './assets/figurinhas/33-wildcat.webp',
    34: './assets/figurinhas/34-hawkman.webp',
    35: './assets/figurinhas/35-hawkgirl-shiera.webp',
    36: './assets/figurinhas/36-sandman.webp',
    37: './assets/figurinhas/37-stargirl.webp',
    38: './assets/figurinhas/38-jl-logo.webp',
    39: './assets/figurinhas/39-js-logo.webp',
    40: './assets/figurinhas/40-dc-logo.webp'
}

function configurarCliquesFigurinhas() {
    const slots = document.querySelectorAll('.sticker-slot');

    slots.forEach(slot => {
        // PageFlip captura o início da interação pelo ponteiro, antes do click.
        ['pointerdown', 'mousedown', 'touchstart'].forEach((tipo) => {
            slot.addEventListener(tipo, (e) => {
                e.stopPropagation();
            }, { passive: true });
        });

        slot.addEventListener('pointerup', (e) => {
            e.stopPropagation();
        });

        slot.addEventListener('click', (e) => {
            // Impede que o clique concluído propagação para o PageFlip.
            e.stopPropagation();
            e.preventDefault();

            // 1. Verifica se já tem uma figurinha colada
            const imagemExistente = slot.querySelector('.sticker-img');

            if (imagemExistente) {
                // SE JÁ TEM: Remove a imagem e restaura o slot vazio
                imagemExistente.remove();
                slot.classList.remove('slot-preenchido');
                return;
            }

            // 2. SE NÃO TEM: Identifica qual é o número da figurinha (#01 -> 1)
            const numeroElemento = slot.querySelector('.slot-number');
            if (!numeroElemento) return;

            const id = parseInt(numeroElemento.textContent.replace('#', ''), 10);
            const nomeElemento = slot.querySelector('.slot-name');
            const nomeHeroi = nomeElemento ? nomeElemento.textContent : `Figurinha ${id}`;

            // 3. Obtém o caminho da imagem
            const caminhoImagem = imagensFigurinhas[id] || `./assets/figurinhas/${String(id).padStart(2, '0')}.webp`;

            // 4. Cria e insere o elemento <img>
            const img = document.createElement('img');
            img.src = caminhoImagem;
            img.alt = nomeHeroi;
            img.className = 'sticker-img';

            // Se der erro ao encontrar a imagem, avisa no console
            img.onerror = () => {
                console.warn(`Imagem não encontrada para o herói: ${nomeHeroi} no caminho: ${caminhoImagem}`);
                img.remove();
                slot.classList.remove('slot-preenchido');
                alert(`Imagem da figurinha #${id} não encontrada em: ${caminhoImagem}`);
            };

            // Adiciona a classe e insere a imagem no slot
            slot.classList.add('slot-preenchido');
            slot.appendChild(img);
        });
    });
}

document.addEventListener('DOMContentLoaded', configurarCliquesFigurinhas);