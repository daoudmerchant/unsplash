import './style.scss';
import getPhotos from './photos';
import { fillBody } from './dom';

let currentSearchTerm;

const updatePagination = pageNo => {
  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');
  const prevCounter = document.querySelector('#prevpage');
  const nextCounter = document.querySelector('#nextpage');
  if (pageNo === 1) {
    prevButton.disabled = true;
    nextButton.disabled = false;
    prevCounter.textContent = "";
    nextCounter.textContent = "2";
    return;
  }
  if (pageNo === 2) {
    prevButton.disabled = false;
  }
  prevCounter.textContent = pageNo - 1;
  nextCounter.textContent = pageNo + 1;
}

const changePage = async (e) => {
  if (!currentSearchTerm) {
    return;
  }
  if(e.target.innerHTML === "Next") {
    pagination.increment()
  }
  else if (e.target.innerHTML === "Previous"){
    pagination.decrement()
  }
  const photoDataArray = await getPhotos(currentSearchTerm, pagination.current);
  renderPhotos(photoDataArray);
  updatePagination(pagination.current)
}

const pagination = (() =>{
  let pageNumber = 1;
  return {
    get current(){
      return pageNumber
    },
    increment(){
      pageNumber++
    },
    decrement(){
      pageNumber--
    },
    reset() {
      pageNumber = 1;
    }
  }
})()

let state = [];

const updateState = (...strings) => {
  strings.forEach(string => {
    if (!state.find(str => str === string)) {
      state = [string, ...state]
    } else {
      state.sort((a) => a === string ? -1 : 0)
    }
  })
  window.history.replaceState(state, '');
  window.localStorage.setItem('searches', JSON.stringify(state));
  window.dispatchEvent(new Event('statechange'));
};

const updateDatalist = () => {
  const searchTerms = window.history.state;
  if (!searchTerms.length) {
    return;
  }
  const existingDataList = document.querySelector('#prevsearches');
  const dataList = existingDataList || document.createElement('datalist');
  if (!existingDataList) {
    dataList.id = 'prevsearches';
  }
  const options = searchTerms.map(term => `<option value="${term}">`).join('');
  dataList.innerHTML = options;
  if (existingDataList) {
    return;
  }
  const form = document.querySelector('form');
  form.appendChild(dataList);
};

const renderPhotos = photoArray => {
  const photos = photoArray.map(photo => {
    return `
        <div class="card">
          <img class="image" src=${photo.urls.small} alt=${photo.alt_description}>
          <div class="card__info">
            ${photo.description ? `<p class="card__description">"${photo.description}"</p>` : "<p></p>"}
            <p class="card__photographer">${photo.user.name}</p>
            <div class="card__extra-info">
              <div class="card__socials">
                ${photo.user.portfolio_url
                  ? `<a href="${photo.user.portfolio_url}" target="__blank">
                      <img class="card__icon" src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg">
                    </a>`
                  : ""}
                ${photo.user.instagram_username
                  ? `<a href="https://www.instagram.com/${photo.user.instagram_username}" target="__blank">
                      <img class="card__icon" src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg">
                    </a>`
                  : ""}
                ${photo.user.twitter_username
                  ? `<a href="https://www.twitter.com/${photo.user.twitter_username}" target="__blank">
                      <img class="card__icon" src="https://upload.wikimedia.org/wikipedia/sco/9/9f/Twitter_bird_logo_2012.svg">
                    </a>`
                  : ""}
              </div>
              <p class="card__date">${new Date(photo.created_at).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}</p>
            </div>
          </div>
        </div>
    `}).join('');
  document.querySelector('#photoBox').innerHTML = photos;
};

const handleSubmit = async e => {
  e.preventDefault();
  const input = e.target.firstElementChild;
  const searchTerm = input.value;
  if (!searchTerm.length) {
    return;
  }
  pagination.reset();
  currentSearchTerm = searchTerm;
  const photoDataArray = await getPhotos(searchTerm);
  renderPhotos(photoDataArray);
  updateState(searchTerm);
  updatePagination(1)
  input.value = '';
  document.querySelector('.main').scrollTop = 0;
};

const initialise = () => {
  fillBody();
  document.querySelector('form').addEventListener('submit', handleSubmit);
  document.querySelector("#next").addEventListener("click", changePage);
  document.querySelector("#prev").addEventListener("click", changePage);
  const prevState = window.localStorage.getItem('searches');
  if (!prevState) {
    return;
  }
  updateState(...JSON.parse(prevState));
};

window.onload = initialise;
window.addEventListener('statechange', updateDatalist);
