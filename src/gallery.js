import { refs } from './index.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { totalHitsMessage } from './index.js';
// =====

export function makeGallery(item) {
  if (item.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }

  makeGalleryMarkup(item);
  Gallery.refresh();
  totalHitsMessage(item);
}
// =====

let Gallery = new SimpleLightbox('.gallery a', {
  captionsData: `alt`,
  captionDelay: 250,
});

function makeGalleryMarkup(array) {
  const markup = array.hits.reduce(
    (acc, image) =>
      acc +
      `<div class="photo-card"><a href="${image.largeImageURL}" class="gallery__link">
  <img src="${image.webformatURL}" alt="${image.tags}" width="450px" height="294px" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${image.downloads}
    </p>
  </div></a>
</div>`,
    '',
  );

  refs.imgContainer.insertAdjacentHTML('beforeend', markup);
}