import './css/styles.css';
import { makeGallery } from './gallery.js';
import Notiflix from 'notiflix';
// =====

export const refs = {
  searchForm: document.querySelector('.search-form'),
  imgContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

class ImgPixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getImgFunc = async () => {
    const baseUrl = 'https://pixabay.com/api/';
    const key = '27175949-84e0db39c540526a02718e2dc';

    const response = await axios.get(
      `${baseUrl}?key=${key}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&q=${this.searchQuery}&page=${this.page}`,
    );

    console.log(response);
    return response.data;
  };
  getImg = async () => {
    try {
      const response = await this.getImgFunc({});
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
// =====

const axios = require('axios').default;

const imgPixabay = new ImgPixabay();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onBtnClick);
refs.loadMoreBtn.style.display = 'none';
// =====

function onSearch(element) {
  refs.loadMoreBtn.style.display = 'none';
  totalHitsNull();
  element.preventDefault();
  imgPixabay.page = 1;
  clearImgContainer();
  imgPixabay.query = element.currentTarget.elements.searchQuery.value.trim();
  imgPixabay.getImg().then(makeGallery);
  imgPixabay.resetPage();

  if (imgPixabay.query === '') {
    return Notiflix.Notify.warning('Please, enter something!');
  }
}

function onBtnClick() {
  imgPixabay.page += 1;
  imgPixabay.getImg().then(makeGallery);
}

function clearImgContainer() {
  refs.imgContainer.innerHTML = '';
}

let totalHitsCount = 0;
export function totalHitsMessage(item) {
  totalHitsCount = totalHitsCount + 40;
  if (item.totalHits - totalHitsCount >= 1) {
    refs.loadMoreBtn.style.display = 'flex';
  }
  if (item.totalHits - totalHitsCount < 1 && item.totalHits !== 0) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.style.display = 'none';
  }
  if (imgPixabay.page === 1 && item.totalHits !== 0) {
    Notiflix.Notify.info(`Hooray! We found ${item.totalHits} images.`);
  }
  console.log(totalHitsCount);
}

function totalHitsNull() {
  totalHitsCount = 0;
}

