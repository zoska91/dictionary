//show Word
const showBtn = document.querySelector("[data-button='btnShow']");

const showSeconsdWord = () => {
  console.log('ok');
  document.querySelector('.main__second-word').classList.toggle('main__second-word--active');
  showBtn.classList.toggle('main__button--next');

  if (showBtn.textContent === 'show') showBtn.textContent = 'next';
  else showBtn.textContent = 'show';
};

showBtn.addEventListener('click', showSeconsdWord);

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
// const wordsTable = document.querySelector('.words');

// const btnShowWords = document.querySelector('.showWords');

// const showWords = words => {
//   words.forEach(word => {
//     div = document.createElement('div');
//     wordsTable.appendChild(div);

//     div.textContent = `${word.englishWord} - ${word.polishWord}`;
//   });
//   console.log(words[1]);
// };

// btnShowWords.addEventListener('click', () => {
//   fetch('/words', {
//     method: 'GET'
//   })
//     .then(res => res.json())
//     .then(words => {
//       console.log(words);
//       showWords(words);
//     });
// });
