// ----- Variables -----
let cards = document.querySelectorAll('.results > .container > .box');
let blur = document.getElementById('blur-layer');
let filterModule = document.querySelector('.filter__container');
let filterItems = document.querySelectorAll('.filter__container > .items > .item');
let filterBox = document.getElementById('filter');
let activeFilter = document.querySelector('.activeFilter');
let submit = document.getElementById('submit-btn');


// ----- Functions -----
const openPopup = (id) => {
  let popup = document.getElementById(`popup-${id}`);

  popup.style.display = 'block';
  blur.style.display = 'block';
  blur.dataset.id = id;
};

const closePopup = () => {
  let blur = document.getElementById('blur-layer');
  let id = blur.dataset.id;
  let popup = document.getElementById(`popup-${id}`);

  blur.style.display = 'none';
  delete blur.dataset.id;

  !!id ? popup.style.display = 'none' : filterModule.style.display = 'none';
};

const openFilter = () => {
  filterModule.style.display = 'flex';
  blur.style.display = 'block';
};

const toggleActiveFilters = (e) => {
  let item = e.currentTarget;
  let category = item.dataset.category;

  activeFilter.classList.toggle('activeFilter');
  item.classList.toggle('activeFilter');

  activeFilter = item;

  displayCategories();
};

const displayCategories = () => {
  let active = document.querySelector('.activeFilter');
  let category = active.dataset.category;
  let text = document.querySelector('#filter > .text');

  // Display category profiles
  cards.forEach((card) => {
    if (card.dataset.category === 'category') {
      card.style.display = 'flex';
    } else if (category === 'All categories') {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  // Change innerText of filterBox
  text.innerText = category;

  // Close filter window
  closePopup();
};


// ----- Event Listeners -----
cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    let id = e.currentTarget.dataset.id;

    openPopup(id);
  })
});

filterItems.forEach((item) => {
  item.addEventListener('click', toggleActiveFilters);
});

blur.addEventListener('click', closePopup);
filterBox.addEventListener('click', openFilter);
