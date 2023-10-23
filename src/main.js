// Create variables targetting the relevant DOM elements here 👇
var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var coverTagline1 = document.querySelector('.tagline-1');
var coverTagline2 = document.querySelector('.tagline-2');
var userCover = document.querySelector('.user-cover');
var userTitle = document.querySelector('.user-title');
var userDesc1 = document.querySelector('.user-desc1');
var userDesc2 = document.querySelector('.user-desc2');
var randomCoverButton = document.querySelector('.random-cover-button')
var saveCoverButton = document.querySelector('.save-cover-button');
var viewSavedButton = document.querySelector('.view-saved-button');
var makeCoverButton = document.querySelector('.make-new-button');
var homeButton = document.querySelector('.home-button');
var makeMyBookButton = document.querySelector('.create-new-book-button');
var homeView = document.querySelector('.home-view');
var formView = document.querySelector('.form-view');
var savedView = document.querySelector('.saved-view');
var savedCoversSection = document.querySelector('.saved-covers-section');

// We've provided a few variables below
var savedCovers = [];
var currentCover = {};

// Add your event listeners here 👇
window.addEventListener('load', generateRandomCover);
window.addEventListener('load', displaySavedCovers);
randomCoverButton.addEventListener('click', showHomeView);
saveCoverButton.addEventListener('click', addCoverToSavedCovers);
viewSavedButton.addEventListener('click', showSavedView);
makeCoverButton.addEventListener('click', showFormView);
makeMyBookButton.addEventListener('click', makeBook);
homeButton.addEventListener('click', showHomeView);

// Create your event handlers and other functions here 👇
function addCoverToSavedCovers() {
  if (savedCovers.includes(currentCover)) {
  } else {
    savedCovers.push(currentCover);
  }
}

function displaySavedCovers() {
  savedCoversSection.innerHTML = ""; 
  for (var i = 0; i < savedCovers.length; i++) {
    var currentCover = savedCovers[i];

    var miniCoverDiv = document.createElement('div');
    miniCoverDiv.classList.add('mini-cover');
    miniCoverDiv.id = i; // Add id property to identify the cover

    var miniCoverImage = document.createElement('img');
    miniCoverImage.src = currentCover.coverImg;
    miniCoverImage.classList.add('mini-cover');

    var miniCoverTitle = document.createElement('h2');
    miniCoverTitle.innerText = currentCover.title;
    miniCoverTitle.classList.add('cover-title');

    var miniCoverTagline1 = document.createElement('h3');
    miniCoverTagline1.innerText = currentCover.tagline1;
    miniCoverTagline1.classList.add('tagline');

    var miniCoverTagline2 = document.createElement('h3');
    miniCoverTagline2.innerText = currentCover.tagline2;
    miniCoverTagline2.classList.add('tagline');

    miniCoverDiv.appendChild(miniCoverImage);
    miniCoverDiv.appendChild(miniCoverTitle);
    miniCoverDiv.appendChild(miniCoverTagline1);
    miniCoverDiv.appendChild(miniCoverTagline2);

    savedCoversSection.appendChild(miniCoverDiv);

    miniCoverDiv.addEventListener('dblclick', deleteSavedCover);
  }
}

function deleteSavedCover(event) {
  var coverSelected = event.currentTarget.id;
  savedCovers.splice(coverSelected, 1);
  displaySavedCovers();
}


function generateRandomCover() {
  var imgSrc = covers[getRandomIndex(covers)];
  var title = titles[getRandomIndex(titles)];
  var descriptor1 = descriptors[getRandomIndex(descriptors)];
  var descriptor2 = descriptors[getRandomIndex(descriptors)];
  coverImage.src = imgSrc;
  coverTitle.innerText = title;
  coverTagline1.innerText = descriptor1;
  coverTagline2.innerText = descriptor2;

  currentCover = createCover(imgSrc, title, descriptor1, descriptor2);
}

function generateUserCover() {
  coverImage.src = userCover
  coverTitle.innerText = userTitle;
  coverTagline1.innerText = userDesc1;
  coverTagline2.innerText = userDesc2;

  currentCover = createCover(userCover, userTitle, userDesc1, userDesc2);
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function showFormView() {
 hide(homeView);
 hide(saveCoverButton);
 hide(randomCoverButton);
 hide(savedView);
 show(formView);
 show(homeButton);
}

 function showSavedView() {
  hide(formView);
  hide(homeView);
  show(savedView);
  hide(saveCoverButton);
  displaySavedCovers();
 }

 function showHomeView() {
  hide(formView);
  show(homeView);
  show(saveCoverButton);
  show(randomCoverButton);
  hide(homeButton);
  generateRandomCover();
 }

 function makeBook (event) {
  event.preventDefault();
  userCover = userCover.value;
  userTitle = userTitle.value;
  userDesc1 = userDesc1.value;
  userDesc2 = userDesc2.value;
  userInput = createCover(userCover, userTitle, userDesc1, userDesc2);
  covers.push(userInput.coverImg);
  titles.push(userInput.title);
  descriptors.push(userInput.tagline1);
  descriptors.push(userInput.tagline2);
  hide(formView);
  show(homeView);
  show(saveCoverButton);
  show(randomCoverButton);
  hide(homeButton);
  generateUserCover();
 }

// We've provided two functions to get you started
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2
  }
  return cover;
}