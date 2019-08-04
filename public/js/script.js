// // toggleCard
const mainCard = document.querySelector('.main');
const addWordCard = document.querySelector('.addWord');
const allWordsOrSearchResult = document.querySelector('.allWordsOrSearchResult');
let activeCard = mainCard;
let textInButton = '';

//buttons

const btnAddNewWordCard = document.querySelector("[data-button='btnAddWordCard']");
const btnShowAllWordsCard = document.querySelector("[data-button='btnShowAllWordsCard']");

const toggleCard = (openCard, btn) => {
  if (activeCard === openCard) {
    const changeCards = new Card(openCard, mainCard);
    changeCards.toggleCard();
    btn.style.borderColor = 'white';
    btn.textContent = textInButton;
    activeCard = mainCard;
  } else {
    textInButton = btn.textContent;
    const changeCards = new Card(activeCard, openCard);
    changeCards.toggleCard();
    btn.style.borderColor = 'rgb(192, 15, 15)';
    btn.textContent = 'go back';
    activeCard = openCard;
  }
};

btnAddNewWordCard.addEventListener('click', () => toggleCard(addWordCard, btnAddNewWordCard));
btnShowAllWordsCard.addEventListener('click', () => toggleCard(allWordsOrSearchResult, btnShowAllWordsCard));

// dictionary

//change first word - polish or english

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

// show word
const showWords = () => {
  whichWordFirst();
  const numberOfWord = Math.floor(Math.random() * wordsList.length);
  polishWordDiv.textContent = wordsList[numberOfWord].polishWord;
  englishWordDiv.textContent = wordsList[numberOfWord].englishWord;
};

// get all from db
const getAllWord = () => {
  fetch('/words', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(words => {
      wordsList = words;
      showWords();
    });
};

getAllWord();

//show next word and change button
const showBtn = document.querySelector("[data-button='btnShow']");

const showSeconsdWord = () => {
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

//show all words
const wordsInList = words => {
  allWordsOrSearchResult.innerHTML = '';
  console.log(words);
  words.forEach(word => {
    const divWord = document.createElement('div');
    divWord.classList.add('oneWord');
    divWord.textContent = `${word.polishWord} - ${word.englishWord}`;
    allWordsOrSearchResult.appendChild(divWord);
  });
};

btnShowAllWordsCard.addEventListener('click', () => {
  wordsInList(wordsList);
});

//search

const searchInput = document.querySelector('.header__input');
const searchForm = document.querySelector('.header__search');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchValue = searchInput.value;
  let result = wordsList.filter(
    word => word.polishWord.includes(searchValue) || word.englishWord.includes(searchValue)
  );
  wordsInList(result);
  const changeCards = new Card(activeCard, allWordsOrSearchResult);
  changeCards.toggleCard();
});
