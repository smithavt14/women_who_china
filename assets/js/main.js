// ----- Variables -----
let cards = document.querySelectorAll('.results > .container > .box');
let blur = document.getElementById('blur-layer');

let dropdown // Keep for closeFilter()

let filters = document.querySelectorAll('.filter-cta');
let filterItems = document.querySelectorAll('.filter__container > .filter-cta > .dropdown > .option');

let specialtyFilterBtn = document.getElementById('filterBtn-specialty');
let regionFilterBtn = document.getElementById('filterBtn-region');

let mobileFilterPopups = document.querySelectorAll('.mobile-filter__container > .popup-container');
let mobileFilterItems = document.querySelectorAll('.popup-container > .option');
let mobileFilterBtns = document.querySelectorAll('.results > .mobile-filter__container > .btn');

let resultsText = document.querySelector('.results > .title');
let resultsContainer = document.querySelector('.results > .container');

let str = document.getElementById('data').dataset.people;
let data = JSON.parse(str);

// ----- Set Active Variable -----
const isMobile = () => {
  return window.innerWidth <= 500
}

const shuffleData = (data) => {
  let i = 0, random = 0, temp

  for (i = data.length - 1; i > 0; i -= 1) {
    random = Math.floor(Math.random() * (i + 1));
    temp = data[i];
    data[i] = data[random];
    data[random] = temp;
  }
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

  !!id ? popup.style.display = 'none' : closeMobileFilter();
};


// ----- Mobile Filter Functions -----
const openMobileFilter = (e) => {
  let btn = e.currentTarget
  let type = btn.dataset.type
  let filter = document.getElementById(`popup-${type}`);

  blur.style.display = 'unset';
  filter.style.bottom = '0';
}

const closeMobileFilter = () => {
  mobileFilterPopups.forEach((filter) => {
    filter.style.bottom = '-40vh';
  });

  blur.style.display = 'none';
}

// ----- Filter Functions -----I
const getActiveItems = (e) => {
  if (isMobile()) {
    specialty = document.querySelector('#popup-specialty > .active');
    region = document.querySelector('#popup-region > .active');
  } else {
    specialty = document.querySelector('#specialty > .active');
    region = document.querySelector('#region > .active');
  }

  return { specialty, region };
}

const changeFilterBtnText = () => {
  let active = getActiveItems();
  specialtyFilterBtn.innerText = active.specialty.dataset.specialty;
  regionFilterBtn.innerText = active.region.dataset.region;
}

const toggleActiveFilters = (e) => {
  e.stopPropagation();

  let active = getActiveItems();
  let item = e.currentTarget;
  let type = item.dataset.type;

  active[type].classList.remove('active');
  item.classList.add('active');

  isMobile() ? closeMobileFilter() : closeFilter();
  isMobile() ? changeMobileFilterBtnText() : changeFilterBtnText();

  changeResults();
};

const insertHTMLElement = (results) => {
  let html = ''

  results.forEach((item) => {
    html += `
    <div class="box" data-id="${item.id}"" data-specialty="${item.specialty}">
      <img class="avatar" src="${item.image}" onerror="this.src='assets/images/default.png'" alt="{{item.name}} image">
      <div class="info">
        <div class="name">${item.first_name} ${item.last_name}</div>
        <div class="specialty">${item.company}</div>
      </div>
    </div>`
  });

  resultsContainer.innerHTML = '';
  resultsContainer.innerHTML = html;
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

const changeMobileFilterBtnText = () => {
  let active = getActiveItems();
  let region = active.region.dataset.region;
  let specialty = active.specialty.dataset.specialty;

  document.getElementById('mobile-btn-specialty').innerText = specialty
  document.getElementById('mobile-btn-region').innerText = region
};

const scrollReveal = () => {
  let options = {
    reset: true,
    duration: 600
  }
  ScrollReveal().reveal('.box', options);
};

const changeResults = () => {
  let active = getActiveItems();
  let specialty = active.specialty.dataset.specialty
  let region = active.region.dataset.region
  let results

  if (specialty === 'All Specialties' && region === 'All Regions') {
    results = data;
  } else if (specialty === 'All Specialties') {
    results = data.filter((item) => item.region === region);
  } else if (region === 'All Regions') {
    results = data.filter((item) => item.specialty === specialty);
  } else {
    results = data.filter((item) => item.specialty === specialty && item.region === region)
  }

  insertHTMLElement(results);
  changeResultsText();
  addEventListenerToResults();
  scrollReveal();
};

const openFilter = (e) => {
  closeFilter();

  let type = e.currentTarget.dataset.type;
  dropdown = document.getElementById(`${type}`);

  dropdown.style.display = 'unset';
}

const closeFilter = () => {
  if (dropdown) dropdown.style.display = 'none';
}

// ----- Event Listeners -----
filterItems.forEach((item) => {
  item.addEventListener('click', toggleActiveFilters);
});

mobileFilterItems.forEach((item) => {
  item.addEventListener('click', toggleActiveFilters);
});

mobileFilterBtns.forEach((item) => {
  item.addEventListener('click', openMobileFilter);
});

filters.forEach((filter) => {
  filter.addEventListener('click', openFilter);
});

blur.addEventListener('click', closeProfilePopUp);

// ----- onLaunch Functions -----
changeResults();
shuffleData(data);
