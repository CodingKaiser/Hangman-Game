var words = ['this', 'is', 'a', 'test', 'pernicious'];

var game = {
	maxGuesses: 0,
	currentWord: '',
	incompleteWord: [],
	guesses: 0,
	wins: 0,
	guessedLetters: new Set(),
	guessedLettersDisplay: [],

	start: function () {
		this._resetValues();
		var newWord = words[Math.floor(Math.random() * words.length)];
		this.currentWord = newWord;
		this.maxGuesses = newWord.length * 1.5;
		this._setIncompleteWord();
	},

	_resetValues: function() {
		this.guesses = 0;
		this.guessedLetters = new Set();
		this.guessedLettersDisplay = [];
		this.incompleteWord = [];
	},

	_setIncompleteWord: function () {
		var textToDisplay = "";
		for (var i = 0; i < this.currentWord.length; i++) {
			textToDisplay += "_  ";
			this.incompleteWord.push("_");
		}
		document.getElementById("word-thus-far").textContent = textToDisplay;
	},

	_updateIncompleteWord: function () {
		var textToDisplay = "";
		for (var i = 0; i < this.currentWord.length; i++) {
			textToDisplay += this.incompleteWord[i] + " ";
		}
		document.getElementById("word-thus-far").textContent = textToDisplay;
	},

	parseInput: function (character) {
		console.log("Pressed: " + character);
		console.log("Already pressed key? " + (this.guessedLetters.has(character)));
		document.getElementById("solution").textContent = character;
		if (!(this.guessedLetters.has(character))) {
			if (this.currentWord.includes(character)) {
				indexesOfTypedCharacter = [];
				for (var i = 0; i < this.currentWord.length; i++) {
					if (this.currentWord[i] === character) {
						indexesOfTypedCharacter.push(i);
					}
				}
				for (var j = 0; j < indexesOfTypedCharacter.length; j++) {
					this.incompleteWord[indexesOfTypedCharacter[j]] = character;
				}
			} else {
				this.guessedLettersDisplay.push(character);
			}
			this.guessedLetters.add(character);
			this._updateIncompleteWord();
			this.guesses += 1;
		}
		if (this.guesses >= this.maxGuesses) {
			this._resetValues();
			this.start();
		} else if (!(this.incompleteWord.includes("_"))) {
			this._resetValues();
			this.wins += 1;
			document.getElementById("win-number").textContent = this.wins;
			this.start();
		}
	}
}

document.onkeyup = function(event) {
	var keyPressed = event.key;
	game.parseInput(keyPressed);
};

game.start();