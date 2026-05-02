const images = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  // ... додайте сюди решту об'єктів з масиву images ...
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainer = document.querySelector('.gallery');

// 1. Створення розмітки
const markup = images
  .map(({ preview, original, description }) => {
    return `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
  })
  .join('');

galleryContainer.innerHTML = markup;

// 2. Делегування та обробка кліку
galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  // Забороняємо перехід за посиланням за замовчуванням
  event.preventDefault();

  // Перевіряємо, чи клікнули саме по зображенню
  const isImageEl = event.target.classList.contains('gallery-image');
  if (!isImageEl) return;

  // Отримуємо посилання на велике зображення
  const largeImageUrl = event.target.dataset.source;
  const imageAlt = event.target.alt;

  // 3. Відкриття модального вікна basicLightbox
  const instance = basicLightbox.create(`
    <div class="modal">
        <img src="${largeImageUrl}" alt="${imageAlt}" width="800" height="600">
    </div>
  `, {
      // Додатково: закриття по клавіші Escape
      onShow: (instance) => {
          window.addEventListener('keydown', onEscKeyPress);
      },
      onClose: (instance) => {
          window.removeEventListener('keydown', onEscKeyPress);
      }
  });

  instance.show();

  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}