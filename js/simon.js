$(document).ready(function() {

	let game = {
		sequence: [],
		level: 0,
		isStrict: false,
		isInProgress: false,
		isPlayersTurn: false
	}

	let redTone = new Audio("audio/red.mp3"),
        blueTone = new Audio("audio/blue.mp3"),
        greenTone = new Audio("audio/green.mp3"),
        yellowTone = new Audio("audio/yellow.mp3"),
        wrongTone = new Audio("audio/wrong.wav"),
        fasterTone = new Audio("audio/levelup.wav"),
        fastererTone = new Audio("audio/faster.wav"),
        victoryTone = new Audio("audio/win.wav"),
        colorDanceID,
        playerTurnTimerID,
        addColorID;

	function StartGame() {
		$('.startText').text('Reset')
		game.isInProgress = true;
		GenerateNextColor();
		FlashScore();
		ColorDance();
	}

    function PlayColorTone(color) {
		switch(color) {
			case "red":
				redTone.load();
				redTone.play();
				break;
			case "blue":
				blueTone.load();
				blueTone.play();
				break;
			case "green":
				greenTone.load();
				greenTone.play();
				break;
			case "yellow":
				yellowTone.load();
				yellowTone.play();
				break;
		}
    }

	function GenerateNextColor() {
		let color = Math.floor((Math.random() * 4) +1); //get random number between 1-4
		game.sequence.push($('.' + color).attr('id'));	//each color has a number class 1-4
		game.level++;
		$('#display').text(game.level > 9 ? game.level : "0" + game.level);

		if (game.level == 11) {
			fasterTone.play();
		}
		else if (game.level == 16) {
			fastererTone.play();
		}
		else if (game.level == 21) {
			game.isPlayersTurn = false;
			GameOver();
			FlashScore();
			setTimeout(function() {
				Reset();
			}, 4500);
		}
	}

	function ColorDance() {
		clearTimeout(playerTurnTimerID);
		game.isPlayersTurn = false;

		let i = 0,
			duration = 1000;

		if (game.level > 10 && game.level < 16) {
			duration -= 300;
		}
		else if (game.level > 15) {
			duration -= 500;
		}

		colorDanceID = setInterval(function() {
						$('#' + game.sequence[i]).addClass('add');
						PlayColorTone(game.sequence[i]);

						setTimeout(function() {
							$('#' + game.sequence[i]).removeClass('add');
							i++;
						}, duration-300);

						if (i == game.sequence.length) {
							game.isPlayersTurn = true;
							clearInterval(colorDanceID);
							PlayersTurnTimer();
							correct = 0;
						}
					}, duration);
	}

	function PlayersTurnTimer() {
			clearTimeout(playerTurnTimerID);
			playerTurnTimerID = setTimeout(function() {
								wrongTone.load();
								wrongTone.play();
								ColorDance();
							  }, 6000)
	}

   	function FlashScore() {
   		let flash = true,
   			flashes = 0;

   		let flashScoreID = setInterval(function() {
						   flash ? $('#display').css('visibility', 'hidden') : $('#display').css('visibility', 'visible');
						   flash = !flash;
						   flashes++

						   if (flashes == 4) {
							   clearInterval(flashScoreID);
						   }
					    }, 300)
   	}

    function GameOver() {
    	game.isInProgress = false;
    	game.level > 20 ? ($('#display').text('YOU WIN!'), victoryTone.play()) : $('#display').text('GAME OVER');
    }

	function Reset() {
		game.sequence = [];
		game.level = 0;
		game.isStrict = false;
		game.isInProgress = false;
		game.isPlayersTurn = false;
		$('.startText').text('Start')
		$('.circles').removeClass('add');
		$('#display').text('--');
		$('.strictStart').removeClass('on');
		clearInterval(colorDanceID);
		clearTimeout(playerTurnTimerID);
	}

	$('.circles').mousedown(function() {
		if (game.isPlayersTurn) {
			$('#' + this.id).addClass('add');

			PlayersTurnTimer();

			if (this.id == game.sequence[correct]) {
				PlayColorTone(this.id);
				correct++;
			}
			else {
				wrongTone.load();
				wrongTone.play();
				correct = 0;
				$('.circles').removeClass('add');

				if (game.isStrict) {
					game.isPlayersTurn = false;

					FlashScore();
					setTimeout(function() {
						GameOver();
					}, 1500);
					setTimeout(function() {
						Reset();
					}, 3500);
				}
				else {
					ColorDance();
				}
			}
		}
	});

	$(document).mouseup(function() {
		if (game.isPlayersTurn) {
			$('.circles').removeClass('add');

			PlayersTurnTimer();

			if (correct == game.sequence.length) {
				game.level < 20 ? (GenerateNextColor(), ColorDance()) : GenerateNextColor();
			}
		}
	});

	$('#strictButton').click(function() {
		if (!game.isInProgress) {
			game.isStrict = game.isStrict == false ? true : false;
			$(this).toggleClass('on');
		}
	});

	$('#startButton').click(function() {
		$(this).toggleClass('on');
		game.isInProgress == false ? StartGame() : Reset();
	});
});