'use strict';
// import * as basicLightbox from '../node_modules/basiclightbox/src/scripts/main.js'
import { images } from './images-data.js';

const ulEl = document.querySelector('ul');

const createGalleryTemplate = array =>
  array.reduce(
    (accumulator, { preview, original, description }) =>
      accumulator +
      `<li class="gallery-item">
            <a class="gallery-link" href="${original}">
                <img
                    class="gallery-image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`,
    ''
  );

ulEl.innerHTML = createGalleryTemplate(images);

ulEl.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') return;

  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}" alt="${e.target.alt}">`,
    {
      className: 'modal',

      onShow: () => {
        document.addEventListener('keydown', onEscapePress);
      },

      onClose: () => {
        document.removeEventListener('keydown', onEscapePress);
      },
    }
  );

  instance.show();

  function onEscapePress(e) {
    if (e.code === 'Escape') instance.close();
    console.log('Escape');
  }
});

// Кастомний курсор

const cursorEl = document.querySelector('.cursor');
cursorEl.dataset.width = '35';

ulEl.addEventListener('mousemove', e => {
  cursorEl.style.display = 'none';
  if (e.target.nodeName === 'IMG') {
    cursorEl.style.display = 'block';
    e.target.style.cursor = 'none';
    cursorEl.style.transform = `translate(${
      e.clientX - cursorEl.dataset.width / 2
    }px, ${e.clientY}px)`;
    // Або
    //  cursorEl.style.left = `${e.clientX}px`;
    // cursorEl.style.top = `${e.clientY}px`;
  }
});

document.addEventListener('mousedown', e => {
  cursorEl.classList.add('active');
});

document.addEventListener('mouseup', e => {
  cursorEl.classList.remove('active');
});
