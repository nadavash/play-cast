var Log = require('../logger.js');

module.exports TicTacToe;

function TicTacToe() {
	var EMPTY = 0;

	this.gameBoard = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];

	this.currentPlayer = 0;

	this.turns = 0;

	var winner;

	this.get = function(position) {
		return gameBoard[position.x, position.y];
	}

	this.set = function(position, value) {
		gameBoard[position.x, position.y] = value;
	}

	this.getCurrentPlayer = function() {
		return this.currentPlayer + 1;
	}

	function checkWinner(gameBoard) {
		// check horizontal
		for (int i = 0; i < gameBoard.size; ++i) {
			if (gameBoard[i][0] === gameBoard[i][1] &&
				gameBoard[i][0] === gameBoard[i][2] &&
				gameBoard[i][0] !== 0) {
				return gameBoard[i][0];
			}
		}

		// check vertical
		for (int i = 0; i < gameBoard.size; ++i) {
			if (gameBoard[0][i] === gameBoard[1][i] &&
				gameBoard[0][i] === gameBoard[2][i] &&
				gameBoard[0][i] != 0) {
				return gameBoard[0][i];
			}
		}

		// check diagonals
		if (gameBoard[0][0] === gameBoard[1][1] &&
			gameBoard[0][0] === gameBoard[2][2] &&
			gameBoard[0][0] !== 0) {
			return gameBoard[0][0];
		}

		if (gameBoard[0][2] === gameBoard[1][1] &&
			gameBoard[0][2] === gameBoard[2][0] &&
			gameBoard[0][2] !== 0) {
			return gameBoard[0][2];
		}
	}

	/**
	 * Play a single turn of tic tac toe
	 * @param  {Object} position An x and y position object.
	 * @return {String} Error string if an error occured.  
	 */
	this.play = function(position) {
		if (this.gameOver()) {
			return "The game is over!";
		}

		if (this.get(position) == EMPTY) {
			this.set(position, this.getCurrentPlayer());
			++this.turns;
		} else {
			return "This block is already filled; pick another one";
		}

		this.winner = checkWinner();
	}

	this.getWinner = function() {
		if (this.winner) {
			return winner;
		}
	}

	this.gameOver = function() {
		return this.winner || this.turns === 9;
	}

}