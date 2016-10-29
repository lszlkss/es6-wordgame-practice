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
		this._mask = new Array(word.length + 1).join('_');

		checkAlphabet(this._alphabet, this._word);
	}

	tryLetter(letter) {
		letter = letter.toUpperCase();

		String.prototype.allIndexOf = function(val) {
			var indexArr = [];

			for(let i = 0; i < this.length; i++) {
				if(this[i] == val) {
					indexArr.push(i);
				}
			}

			return indexArr;
		}

		if(this._word.indexOf(letter) === -1) {
			this._maxAttempts--;

			return false;
		} else {
			var indexes = this._word.allIndexOf(letter);

			for(let i = 0; i < indexes.length; i++) {
				let tmp = this._mask.split('');
				tmp[indexes[i]] = letter;
				this._mask = tmp.join('');
			}

			return true;
		}
	}

	isGameOver() {
		if(this._maxAttempts <= 0) {
			return 1;
		}

		if(this._mask == this._word) {
			return 2;
		} else {
			return 0;
		}
	}

	get word() {
		return this._word;
	}

	get mask() {
		return this._mask;
	}

	get maxAttempts() {
		return this._maxAttempts;
	}

	get alphabet() {
		return this._alphabet;
	}
}
