// ----- Variables -----
let cards = document.querySelectorAll('.results > .container > .box');
let blur = document.getElementById('blur-layer');
let filterItems = document.querySelectorAll('.filter__container > .option');
let active = document.querySelector('.filter__container > .active');
let results = document.querySelector('.results > .title')


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

const toggleActiveFilters = (e) => {
  let item = e.currentTarget;
  let category = item.dataset.category;

  active.classList.toggle('active');
  item.classList.toggle('active');

  active = item;

  displayCategories();
};

const displayCategories = () => {
  let active = document.querySelector('.filter__container > .active');
  let category = active.dataset.category;

  // Display category profiles
  cards.forEach((card) => {
    if (card.dataset.category === 'category') {
      card.classList.remove('hidden');
      setTimeout(() => {
        card.classList.remove('invisible');
      }, 100);
    } else if (category === 'All') {
      card.classList.remove('hidden');
      setTimeout(() => {
        card.classList.remove('invisible');
      }, 100);
    } else {
      card.classList.add('invisible');
      setTimeout(() => {
        card.classList.add('hidden');
      }, 100);
    }
  });

  // Change the # in Results text
  setTimeout(() => {
    changeResultsText()
  }, 100)
};

const changeResultsText = () => {
  let hiddenCards = document.querySelectorAll('.results > .container > .hidden');
  let number = cards.length - hiddenCards.length

  results.innerHTML = `SHOWING ${number} RESULTS`
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
