class wordGame {
	constructor(word, maxAttempts, alphabet) {
		this._gameModel = new wordGameModel(word, maxAttempts, alphabet);
	}

	set partialDiv(value) {
		this._partialDiv = document.getElementById(value);
		this._partialDiv.innerHTML = '';
	}

	set uiDiv(value) {
		this._uiDiv = document.getElementById(value);
		this._uiDiv.innerHTML = '';
	}

	set attemptsDiv(value) {
		this._attemptsDiv = document.getElementById(value);
		this._attemptsDiv.innerHTML = '';
	}

	initUI() {
		function fillPlaceholderAt(model, where, character, current) {
			var s = '';

			for(let i = 0; i < model.word.length; i++) {
				if(where == i) {
					s += character;
				} else if(current !== undefined && current[i] != '_') {
					s += current[i];
				} else {
					s += '_';
				}
			}

			return s;
		}

		var gameModel = this._gameModel;
		var gameDiv = this._uiDiv;
		var placeholder = fillPlaceholderAt(gameModel, -1, '_');
		var partialDiv = this._partialDiv;
		var attemptsDiv = this._attemptsDiv;
		partialDiv.innerHTML = '<h2>' + placeholder + '</h2>';

		for(let i = 0; i < this._gameModel.alphabet.length; i++) {
			var letter = document.createElement('button');
			var overText = '';

			letter.id = gameModel.alphabet[i];
			letter.className = 'btn btn-primary';
			letter.innerHTML = gameModel.alphabet[i];
			letter.type = 'button';
			letter.addEventListener('click', function(e) {
				var btn = document.getElementById(e.target.id);
				btn.disabled = 'disabled';

				if(gameModel.tryLetter(gameModel.alphabet[i])) {
					btn.className = 'btn btn-success';
					placeholder = fillPlaceholderAt(gameModel, gameModel.word.indexOf(e.target.id), e.target.id, placeholder);
				} else {
					btn.className = 'btn btn-danger';
				}

				partialDiv.innerHTML = '<h2>' + placeholder + '</h2>';
				attemptsDiv.innerHTML = '<h2>' + gameModel.maxAttempts + '</h2>';

				if(gameModel.isGameOver() == 1) {
					overText = 'You have lost this game.';
				} else if(gameModel.isGameOver() == 2) {
					overText = 'You have won this game.';
				}

				if(gameModel.isGameOver()) {
					gameDiv.innerHTML = '<h2>' + overText + '</h2>';
				}
			});

			gameDiv.appendChild(letter);
		}
	}
}
