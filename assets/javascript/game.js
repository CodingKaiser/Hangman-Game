var guesses = 8;
var words = ['this', 'is', 'a', 'test', 'pernicious'];

var game = {
	currentWord: '',
	incompleteWord: [],
	guessesRemaining: 0,
	wins: 0,
	guessedLetters: [],

	start: function () {
		var newWord = words[Math.floor(Math.random() * words.length)];
		this.currentWord = newWord;
		this._setIncompleteWord();
	},

	_setIncompleteWord: function () {
		for (var i = 0; i < this.currentWord.length; i++) {
			this.incompleteWord += ["_"];
		}
		console.log(this.incompleteWord);
	},

	parseInput: function (character) {
		console.log("Pressed: " + character);
		document.getElementById("solution").textContent = keyPressed;
	}
}

document.onkeyup = function(event) {
	var keyPressed = event.key;
	console.log(keyPressed);
	game.test(keyPressed);
};

game.start();