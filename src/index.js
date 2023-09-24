import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_egGIelRxtkDlvS02w1r6p3mNHbz1SUFiWS2aUaon2Ccj6uToXGTmjb975Wttdmo0';
const url =
  'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng';

// Select DOM elements
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImage = catInfo.querySelector('img');
const breedName = document.querySelector('.cat-breed');
const description = catInfo.querySelector('.description');
const temperament = catInfo.querySelector('.temperament');

// Function to fetch cat breeds
function fetchBreeds() {
  loader.style.display = 'block';
  error.style.display = 'none';
  breedSelect.style.display = 'none';

  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      const breeds = response.data;
      populateBreedSelect(breeds);
    })
    .catch(error => {
      Notiflix.Notify.failure('Error fetching breeds:', error);
      showError();
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

// Function to populate breed select options
function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
  breedSelect.style.display = 'block';
}

// Function to fetch cat information by breed ID
function fetchCatByBreed(breedId) {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.style.display = 'none';

  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const catData = response.data[0];
      displayCatInfo(catData);
    })
    .catch(error => {
      Notiflix.Notify.failure('Error fetching breeds:', error);
      showError();
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

// Function to display cat information
function displayCatInfo(catData) {
  catImage.src = catData.url;
  breedName.textContent = catData.breeds[0].name;
  description.innerHTML = `<b>Description:</b> ${catData.breeds[0].description}`;
  temperament.innerHTML = `<b>Temperament:</b> ${catData.breeds[0].temperament}`;
  catInfo.style.display = 'flex';
}

// Function to show error message
function showError() {
  error.style.display = 'block';
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';
}

// Event listener for breed selection
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId);
  }
});

fetchBreeds();
