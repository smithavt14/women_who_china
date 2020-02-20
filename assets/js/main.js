// ----- Variables -----
let cards = document.querySelectorAll('.results > .container > .box');
let blur = document.getElementById('blur-layer');
let filterItems = document.querySelectorAll('.filter__container > .option');
let active = document.querySelector('.filter__container > .active');
let resultsText = document.querySelector('.results > .title');
let resultsContainer = document.querySelector('.results > .container');

let str = document.getElementById('data').dataset.people;
let data = JSON.parse(str);

// ----- Functions -----
const openPopup = (event) => {
  let id = event.currentTarget.dataset.id
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

  changeResults(category);
};

const removeHiddenClass = (card) => {
  card.classList.remove('hidden');
  setTimeout(() => {
    card.classList.remove('invisible');
  }, 100);
};

const addHiddenClass = (card) => {
  card.classList.add('invisible');
  setTimeout(() => {
    card.classList.add('hidden');
  }, 100);
};

const displayCategories = () => {
  let active = document.querySelector('.filter__container > .active');
  let category = active.dataset.category;

  // Display category profiles
  cards.forEach((card) => {
    if (card.dataset.category === 'category') {
      removeHiddenClass(card);
    } else if (category === 'All') {
      removeHiddenClass(card);
    } else {
      addHiddenClass(card);
    }
  });

  // Change the # in Results text
  setTimeout(() => {
    changeResultsText();
  }, 100)
};
const createHTMLElement = (activeResults) => {
  let html = ''

  activeResults.forEach((item) => {
    html += `
    <div class="box" data-id="${item.id}"" data-category="${item.category}">
      <img class="avatar" src="${ item.image }" alt="${item.name}">
      <div class="info">
        <div class="name">${item.name}</div>
        <div class="category">${item.category}</div>
      </div>
    </div>`
  });

  return(html)
};

const addEventListenerToResults = () => {
  let cards = document.querySelectorAll('.results > .container > .box');

  cards.forEach((card) => {
    card.addEventListener('click', openPopup);
  });
};

const changeResultsText = () => {
  let cards = document.querySelectorAll('.results > .container > .box');

  resultsText.innerHTML = `SHOWING ${cards.length} RESULTS`;
};

const scrollReveal = () => {
  let options = {
    reset: true,
    duration: 1500
  }
  ScrollReveal().reveal('.box', options);
};

const changeResults = () => {
  let category = document.querySelector('.filter__container > .active').dataset.category;

  if (category === 'All') {
    let activeResults = data;
    let html = createHTMLElement(activeResults);
    resultsContainer.innerHTML = '';
    resultsContainer.innerHTML = html;
  } else {
    let activeResults = data.filter((item) => item.category === category);
    let html = createHTMLElement(activeResults);
    resultsContainer.innerHTML = '';
    resultsContainer.innerHTML = html;
  }

  changeResultsText();
  addEventListenerToResults();
  scrollReveal();
};

// ----- Event Listeners -----
filterItems.forEach((item) => {
  item.addEventListener('click', toggleActiveFilters);
});

blur.addEventListener('click', closePopup);

// ----- onLaunch Functions -----
changeResults();
