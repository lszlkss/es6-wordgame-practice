class wordGame {
	constructor(word, maxAttempts, alphabet) {
		this._gameModel = new wordGameModel(word, maxAttempts, alphabet);
	}

	initUI() {
		var gameModel = this._gameModel;
		var gameDiv = this._uiDiv;
		var partialDiv = this._partialDiv;
		var attemptsDiv = this._attemptsDiv;

		for(let i = 0; i < gameModel.alphabet.length; i++) {
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
				} else {
					btn.className = 'btn btn-danger';
				}

				partialDiv.innerHTML = '<h2>' + gameModel.mask + '</h2>';
				attemptsDiv.innerHTML = '<h4>' + gameModel.maxAttempts + ' attempts left</h4>';

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
}
