var words = [['parking', 'https://www.youtube.com/embed/lkq-Fd9TU8k'], 
			['jolly', 'https://www.youtube.com/embed/TQSMmwQyEjk'], 
			['schroedinger', 'https://www.youtube.com/embed/6HJqPZ-KmZs'], 
			['flagpole', 'https://www.youtube.com/embed/b8U1na74Bcc'], 
			['marijuana', 'https://www.youtube.com/embed/SAPKjWHikzM'], 
			['abraxas', 'https://www.youtube.com/embed/3tfI9tTzlI0'], 
			['breakdown', 'https://www.youtube.com/embed/uvIZ4ST6HqE'], 
			['gambling', 'https://www.youtube.com/embed/uyj1CeZt23A'], 
			['marshak', 'https://www.youtube.com/embed/aQQsBjOrNMY']];
var allowedChars = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

var game = {
	maxGuesses: 0,
	currentWordIndex: -1,
	currentWord: '',
	incompleteWord: [],
	guesses: 0,
	wins: 0,
	guessedLetters: new Set(),
	guessedLettersDisplay: [],

	start: function () {
		this._resetValues();
		this._updateCurrentWordIndex();
		this._setNewWordAndUpdateVideo();
		this._setIncompleteWord();
		this._updateNumberOfGuessesRemainingHTML();
		this._updateIncorrectGuessesHTML();
		this._updateIncompleteWordHTML();
	},


	parseInput: function (character) {
		console.log("Pressed: " + character);
		if (this._isValidCharacter(character) && 
			this._isUniqueCharacter(character)) {
			console.log("Already pressed key? " + 
				(this.guessedLetters.has(character)));
			this._parseLetter(character);
		}
		if (this._currentWordHasBeenGuessed()) {
			this._resetValues();
			this.wins += 1;
			this._updateWinsHTML();
			this.start();
		} else if (this.guesses >= this.maxGuesses) {
			this._resetValues();
			this.start();
		}
	},

	_parseLetter(character) {
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
			this._updateIncorrectGuessesHTML();
		}
		this.guessedLetters.add(character);
		this._updateIncompleteWordHTML();
		this._updateNumberOfGuessesRemainingHTML();
		this.guesses += 1;
	},

	_resetValues: function() {
		this.guesses = 0;
		this.guessedLetters = new Set();
		this.guessedLettersDisplay = [];
		this.incompleteWord = [];
	},

	_updateCurrentWordIndex() {
		if (this.currentWordIndex < words.length - 1) {
			this.currentWordIndex += 1;
		} else {
			this.currentWordIndex = 0;
		}
	},

	_setNewWordAndUpdateVideo() {
		var newWord = words[this.currentWordIndex][0];
		var hintVideo = words[this.currentWordIndex][1];
		this.currentWord = newWord;
		this.maxGuesses = Math.round(newWord.length * 1.75);
		document.getElementById("main-image").src = hintVideo;
	},

	_setIncompleteWord: function () {
		var textToDisplay = "";
		for (var i = 0; i < this.currentWord.length; i++) {
			textToDisplay += "_  ";
			this.incompleteWord.push("_");
		}
		document.getElementById("word-thus-far").textContent = textToDisplay;
	},

	_updateIncompleteWordHTML: function () {
		var textToDisplay = "";
		for (var i = 0; i < this.currentWord.length; i++) {
			textToDisplay += this.incompleteWord[i] + " ";
		}
		document.getElementById("word-thus-far").textContent = textToDisplay;
	},

	_updateIncorrectGuessesHTML: function () {
		var textToDisplay = "";
		for (var i = 0; i < this.guessedLettersDisplay.length; i++) {
			textToDisplay += this.guessedLettersDisplay[i].toUpperCase() + " ";
		}
		document.getElementById("guess-letters-incorrect").textContent = textToDisplay;
	},

	_updateNumberOfGuessesRemainingHTML: function () {
		document.getElementById("guess-number").textContent = this.maxGuesses - this.guesses - 1;
	},

	_updateWinsHTML() {
		document.getElementById("win-number").textContent = this.wins;
	},

	_isValidCharacter(character) {
		return allowedChars.has(character.toLowerCase());
	},

	_isUniqueCharacter(character) {
		return !(this.guessedLetters.has(character));
	},

	_currentWordHasBeenGuessed() {
		return !(this.incompleteWord.includes("_"));
	}
}

document.onkeyup = function(event) {
	var keyPressed = event.key;
	game.parseInput(keyPressed);
};

game.start();