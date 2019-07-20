const wordsTable = document.querySelector('.words');

const btnShowWords = document.querySelector('.showWords');

const showWords = words => {
  words.forEach(word => {
    div = document.createElement('div');
    wordsTable.appendChild(div);

    div.textContent = `${word.englishWord} - ${word.polishWord}`;
  });
  console.log(words[1]);
};

btnShowWords.addEventListener('click', () => {
  fetch('/words', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(words => {
      console.log(words);
      showWords(words);
    });
});
