# Álbum da Liga da Justiça — DC Comics

Projeto web de um álbum interativo de figurinhas dedicado a personagens da Liga da Justiça e da Sociedade da Justiça da DC Comics.

O objetivo do projeto é praticar desenvolvimento front-end com HTML, CSS e JavaScript, além de criar uma experiência visual semelhante à de um álbum físico, com capa, contracapa, páginas ilustradas, espaços para figurinhas e virada realista das folhas.

## Funcionalidades

- Navegação entre páginas com efeito realista de virada.
- Capa, páginas internas e contracapa separadas.
- Grade de espaços para figurinhas em cada página.
- Colagem e remoção de figurinhas por clique.
- Navegação por botões, teclado e gestos do PageFlip.
- Layout proporcional ajustado ao tamanho da tela.
- Imagens otimizadas em formato WebP.
- Biblioteca PageFlip armazenada localmente, sem dependência de CDN.
- Código organizado em arquivos separados por responsabilidade.

## Tecnologias

- HTML5.
- CSS3.
- JavaScript moderno.
- PageFlip 2.0.7.
- GitHub Pages para publicação, quando configurado.

## Estrutura do projeto

```text
.
├── index.html
├── app.js
├── style.css
├── README.md
├── assets/
│   ├── figurinhas/
│   ├── img/
│   └── vendor/
│       └── page-flip.browser.min.js
└── styles/
    ├── album-navigation.css
    ├── cover.css
    ├── page.css
    └── sticker-slot.css
```

## Arquivos principais

### `index.html`

Contém toda a estrutura do álbum:

- Capa e contracapa.
- Páginas internas.
- Informações dos personagens.
- Espaços numerados para as figurinhas.
- Importações dos arquivos CSS, JavaScript e da biblioteca PageFlip.

É o arquivo carregado pelo navegador quando o projeto é aberto.

### `app.js`

Responsável pelas interações e pelo comportamento do álbum:

- Inicializa o PageFlip.
- Calcula largura e altura proporcionais das páginas.
- Cria os botões de página anterior e próxima.
- Permite navegação por teclado.
- Atualiza o estado dos controles de navegação.
- Associa cada número de figurinha ao caminho de sua imagem.
- Permite colar ou remover uma figurinha por meio de clique.
- Impede que um clique dentro do espaço vire a página.

### `style.css`

Contém o estilo global da aplicação:

- Paleta de cores.
- Fundo principal.
- Reset básico de margens.
- Centralização do álbum.
- Altura e comportamento geral do corpo da página.

## Arquivos CSS especializados

### `styles/cover.css`

Estiliza a capa e a contracapa:

- Imagens de fundo.
- Títulos da capa.
- Logo da DC.
- Informações da contracapa.
- Código de barras.
- Molduras e sombras.

### `styles/page.css`

Define a aparência geral das páginas internas:

- Proporções das folhas.
- Viewport do álbum.
- Cabeçalhos das páginas.
- Títulos e descrições.
- Centralização e apresentação visual.
- Comportamento de seleção de texto.

### `styles/sticker-slot.css`

Controla os espaços reservados para figurinhas:

- Grade das páginas.
- Número, nome e descrição dos personagens.
- Molduras dos espaços.
- Imagens das figurinhas.
- Enquadramento proporcional sem corte dos personagens.
- Animação ao colar uma figurinha.
- Estado visual quando o espaço está preenchido.

### `styles/album-navigation.css`

Define a aparência dos controles externos do álbum:

- Botão de página anterior.
- Botão de próxima página.
- Posicionamento lateral.
- Estados desabilitados.
- Estilos responsivos dos controles.

## Assets

### `assets/figurinhas/`

Contém as imagens das 40 figurinhas e logos em formato WebP, com dimensões otimizadas para os espaços do álbum.

### `assets/img/`

Contém imagens gerais da interface, como:

- Logo da DC Comics.
- Imagem de fundo da capa.
- Imagem de fundo da contracapa.

### `assets/vendor/`

Contém bibliotecas externas armazenadas junto ao projeto.

- `page-flip.browser.min.js`: versão 2.0.7 da biblioteca PageFlip utilizada pelo álbum. Esta cópia local evita dependência direta da CDN.

## Como executar

Como o projeto usa arquivos HTML, CSS, JavaScript e imagens locais, ele pode ser executado diretamente em um navegador.

Para uma experiência mais adequada, execute por meio de um servidor local, por exemplo:

```bash
python -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

Outra opção é publicar a pasta do projeto em um servidor estático, como o GitHub Pages.

## Uso das figurinhas

- Clique dentro de um espaço vazio para colar a figurinha correspondente.
- Clique novamente sobre uma figurinha colada para removê-la.
- Clique nas áreas externas do espaço para usar os controles de virada da página.
- Use as setas do teclado para navegar entre as páginas.

## Objetivos futuros

- Salvar figurinhas coladas com `localStorage`.
- Melhorar a navegação exclusivamente por teclado.
- Adicionar estados acessíveis para leitores de tela.
- Implementar carregamento progressivo das imagens.
- Adicionar testes automatizados.
- Melhorar o funcionamento offline.

## Licença

Este projeto foi criado para fins educacionais e de estudo em desenvolvimento web. Verifique separadamente os direitos das imagens, personagens e marcas utilizadas antes de reutilização comercial.
