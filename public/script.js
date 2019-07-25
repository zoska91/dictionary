// add new Word

const addNewWordBtn = document.querySelector("[data-button='btnAddCard']");

let activeCardaddNewWord = false;
const mainCard = document.querySelector('.main');
const addWordCard = document.querySelector('.addWord');

const closeMainCard = () => {
  mainCard.style.opacity = '0';
  setTimeout(() => {
    mainCard.style.display = 'none';
    addWordCard.style.display = 'block';
    addWordCard.style.opacity = 1;
  }, 200);
};

const closeaddWordCard = () => {
  addWordCard.style.opacity = '0';
  setTimeout(() => {
    addWordCard.style.display = 'none';
    mainCard.style.display = 'block';
    mainCard.style.opacity = 1;
  }, 200);
};

const showNewWordCard = () => {
  if (!activeCardaddNewWord) {
    closeMainCard();
    addNewWordBtn.textContent = 'go back';
    addNewWordBtn.style.borderColor = 'rgb(192, 15, 15)';
  } else {
    closeaddWordCard();
    addNewWordBtn.textContent = 'add new';
    addNewWordBtn.style.borderColor = 'black';
  }
  activeCardaddNewWord = !activeCardaddNewWord;
};

addNewWordBtn.addEventListener('click', showNewWordCard);
document.querySelector("[data-button='btnAddWord']").addEventListener('click', showNewWordCard);

// dictionary

//change first word polish or english

let polishFirst = true;
let polishWordDiv = '';
let englishWordDiv = '';
let wordsList = [];

const whichWordFirst = () => {
  if (polishFirst) {
    polishWordDiv = document.querySelector('.main__first-word');
    englishWordDiv = document.querySelector('.main__second-word');
    document.querySelector('.main__which-language').textContent = 'PL - EN';
  } else {
    polishWordDiv = document.querySelector('.main__second-word');
    englishWordDiv = document.querySelector('.main__first-word');
    document.querySelector('.main__which-language').textContent = 'EN - PL';
  }
};

document.querySelector('.main__change-button').addEventListener('click', () => {
  polishFirst = !polishFirst;
  whichWordFirst();
});

const getAllWord = () => {
  fetch('/words', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(words => {
      console.log(words);
      wordsList = words;
      showWords();
    });
};

const showWords = () => {
  whichWordFirst();
  const numberOfWord = Math.floor(Math.random() * wordsList.length);
  console.log(numberOfWord);
  polishWordDiv.textContent = wordsList[numberOfWord].polishWord;
  englishWordDiv.textContent = wordsList[numberOfWord].englishWord;
  console.log(wordsList[numberOfWord].englishWord);
};

getAllWord();

//show next word
const showBtn = document.querySelector("[data-button='btnShow']");

const showSeconsdWord = () => {
  console.log('ok');
  document.querySelector('.main__second-word').classList.toggle('main__second-word--active');
  showBtn.classList.toggle('main__button--next');

  if (showBtn.textContent === 'show') {
    showBtn.textContent = 'next';
  } else {
    showBtn.textContent = 'show';
    showWords();
  }
};

showBtn.addEventListener('click', showSeconsdWord);
