class wordGameModel {
	constructor(word, maxAttempts, alphabet) {
		function fillAlphabet() {
			var alphabet = [];

			for(let c = 'A'.charCodeAt(0); c <= 'Z'.charCodeAt(0); c++) {
				alphabet.push(String.fromCharCode(c));
			}

			return alphabet;
		}

		function checkAlphabet(alphabet, word) {
			var found = false;

			for(let i = 0;i < word.length && !found; i++) {
				if(alphabet.indexOf(word[i].toUpperCase()) == -1) {
					throw new Error('Invalid word/alphabet');
					found = false;
				}
			}
		}

		this._word = word.toUpperCase();
		this._maxAttempts = maxAttempts;
		this._alphabet = (alphabet === undefined) ? fillAlphabet() : alphabet.map(function(c) { return c.toUpperCase(); });
		this._matchedLetters = [];

		checkAlphabet(this._alphabet, this._word);
	}

	tryLetter(letter) {
		letter = letter.toUpperCase();

		if(this._word.indexOf(letter) === -1) {
			this._maxAttempts--;

			return false;
		} else {
			if(this._matchedLetters.indexOf(letter) === -1) {
				this._matchedLetters.push(letter);
			}

			return true;
		}
	}

	isGameOver() {
		if(this._maxAttempts <= 0) {
			return 1;
		}

		if(this._matchedLetters.length == this._word.length) {
			return 2;
		} else {
			return 0;
		}
	}

	get word() {
		return this._word;
	}

	get maxAttempts() {
		return this._maxAttempts;
	}

	get alphabet() {
		return this._alphabet;
	}

	get matchedLetters() {
		return this._matchedLetters;
	}
}
