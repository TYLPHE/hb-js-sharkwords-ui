const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the letters in `word` and create divs.
// The divs should be appended to the section with id="word-container".
//
// Use the following template string to create each div:
// `<div class="letter-box ${letter}"></div>`
//
const createDivsForChars = (word) => {
  const container = document.querySelector('#word-container');
  for (letter of word) {
    const divStr = `<div class="letter-box ${letter}"></div>`;
    container.insertAdjacentHTML('beforeend', divStr);
  }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons".
const generateLetterButtons = () => {
  const container = document.querySelector('#letter-buttons');
  for (letter of ALPHABET) {
    container.insertAdjacentHTML('beforeend', `<button>${letter}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter, word) => {
  return word.includes(letter);
};

const handleCorrectGuess = (letter) => {
  const containers = document.querySelectorAll(`.${letter}`);
  for (const container of containers) {
    container.textContent = letter;
  }
}

const handleWrongGuess = () => {
  numWrong += 1;
  
  const image = document.querySelector('img');
  image.src = `/static/images/guess${numWrong}.png`;
  
  if (numWrong === 5) {
    const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
      disableLetterButton(button);
    }

    const link = document.querySelector('a');
    link.style.display = '';

  }
}

const resetGame = () => {
  window.location = '/sharkwords';
}

// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess
  // You can change this to choose a random word from WORDS once you
  // finish this lab but we hard code it so we know what the word is
  // and can tell if things look correct for this word
  // const word = 'hello';
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];

  createDivsForChars(word);

  generateLetterButtons();

  // Add event listener to each letter button
  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    button.addEventListener('click', () => {
      disableLetterButton(button);
      const exists = isLetterInWord(button.textContent, word);
      if (exists) {
        handleCorrectGuess(button.textContent);

        const letterBox = document.querySelectorAll('.letter-box');
        // Match count with word length to determine winner
        let count = 0;
        for (const box of letterBox) {
          if (box.textContent) {
            count += 1;
          }
        }
        if (count == word.length) {
          const link = document.querySelector('a');
          link.textContent = 'You win! Click here to play again.';
          link.style.display = '';
        }
      } else {
        handleWrongGuess();
      }
    })
  }
  
  const link = document.querySelector('a');
  link.addEventListener('click', resetGame);
})();
