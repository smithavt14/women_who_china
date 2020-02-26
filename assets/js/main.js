// ----- Variables -----
let cards = document.querySelectorAll('.results > .container > .box');
let blur = document.getElementById('blur-layer');

let filter = document.querySelector('.filter__container');
let filterItems = document.querySelectorAll('.filter__container > .option');

let mobileFilter = document.querySelector('.mobile-filter__container');
let mobileFilterItems = document.querySelectorAll('.popup-container > .option');
let mobileFilterBtn = document.querySelector('.results > .mobile-filter__container > .btn');
let mobileFilterPopUp = document.querySelector('.popup-container');

let resultsText = document.querySelector('.results > .title');
let resultsContainer = document.querySelector('.results > .container');

let popupTextArray = document.querySelectorAll('#text');

let str = document.getElementById('data').dataset.people;
let data = JSON.parse(str);

// ----- Set Active Variable -----
const retrieveActiveFilterOption = () => {
  active = window.innerWidth > 500 ? document.querySelector('.filter__container > .active') : document.querySelector('.popup-container > .active');
  return (active);
}

// ----- Profile Popup Functions -----
const openProfilePopUp = (e) => {
  let id = e.currentTarget.dataset.id
  let popup = document.getElementById(`popup-${id}`);

  popup.style.display = 'flex';
  blur.style.display = 'block';
  blur.dataset.id = id;
};

const closeProfilePopUp = () => {
  let blur = document.getElementById('blur-layer');
  let id = blur.dataset.id;
  let popup = document.getElementById(`popup-${id}`);

  blur.style.display = 'none';
  delete blur.dataset.id;

  !!id ? popup.style.display = 'none' : mobileFilterPopUp.style.bottom = '-40vh';
};


// ----- Mobile Filter Functions -----
const openMobileFilter = (e) => {
  blur.style.display = 'unset';
  mobileFilterPopUp.style.bottom = '0';
}

const closeMobileFilter = () => {
  blur.style.display = 'none';
  mobileFilterPopUp.style.bottom = '-40vh';
}

// ----- Desktop Filter Functions -----
const toggleActiveFilters = (e) => {
  active = retrieveActiveFilterOption();

  let item = e.currentTarget;
  let specialty = item.dataset.specialty;

  active.classList.remove('active');
  item.classList.add('active');

  changeMobileFilterBtnText(specialty);
  changeResults(specialty);
  closeMobileFilter();
};

// ----- Result Card Functions -----
const createHTMLElement = (activeResults) => {
  let html = ''

  activeResults.forEach((item) => {
    html += `
    <div class="box" data-id="${item.id}"" data-specialty="${item.specialty}">
      <img class="avatar" src="${item.image}" onerror="this.src='assets/images/default.png'" alt="{{item.name}} image">
      <div class="info">
        <div class="name">${item.first_name} ${item.last_name}</div>
        <div class="specialty">${item.company}</div>
      </div>
    </div>`
  });

  return(html)
};

const addEventListenerToResults = () => {
  let cards = document.querySelectorAll('.results > .container > .box');

  cards.forEach((card) => {
    card.addEventListener('click', openProfilePopUp);
  });
};

const changeResultsText = () => {
  let cards = document.querySelectorAll('.results > .container > .box');
  resultsText.innerHTML = `SHOWING ${cards.length} RESULTS`;
};

const changeMobileFilterBtnText = (specialty) => {
  mobileFilterBtn.innerHTML = specialty
};

const scrollReveal = () => {
  let options = {
    reset: true,
    duration: 600
  }
  ScrollReveal().reveal('.box', options);
};

const changeResults = (specialty) => {

  if (specialty === 'All Specialties') {
    let activeResults = data;
    let html = createHTMLElement(activeResults);
    resultsContainer.innerHTML = '';
    resultsContainer.innerHTML = html;
  } else {
    let activeResults = data.filter((item) => item.specialty === specialty);
    let html = createHTMLElement(activeResults);
    resultsContainer.innerHTML = '';
    resultsContainer.innerHTML = html;
  }

  changeResultsText();
  addEventListenerToResults();
  scrollReveal();
};

const shortenText = () => {
  popupTextArray.forEach((text) => {
    text.innerHTML = text.innerHTML.substring(0, 250);
  })
}

// ----- Event Listeners -----
filterItems.forEach((item) => {
  item.addEventListener('click', toggleActiveFilters);
});

mobileFilterItems.forEach((item) => {
  item.addEventListener('click', toggleActiveFilters);
});

blur.addEventListener('click', closeProfilePopUp);

mobileFilterBtn.addEventListener('click', openMobileFilter);

// ----- onLaunch Functions -----
changeResults('All Specialties');
