var Log = require('../logger.js'),
	_ = require('lodash');

module.exports = TicTacToe;

function TicTacToe() {
	this.board = [
		[undefined,undefined,undefined],
		[undefined,undefined,undefined],
		[undefined,undefined,undefined]
	];
	this.maxPlayers = 2;
	this.minPlayers = 2;
	this.players = [];
	this.finished = false;
	this.name = 'tictactoe';

	this.count = 0;
}

_.extend(TicTacToe.prototype, {

	update: function(move, user, callback) {
		if (this.players.length !== this.maxPlayers) {
			return callback("You can only have two players.");
		}

		if (this.get(move) !== undefined) {
			return callback("There is already a piece there.");
		}

		Log.info('count:', this.count, this.count % 2);
		if (user.id !== this.players[this.count % 2]) {
			return callback("Now is not your turn.");
		}

		this.set(move, this.count % 2);

		this.winner = this.checkWinner();
		this.finished = !!this.winner || ++this.count === 9;

		return callback(null, this.getState());
	},

	getState: function() {
		return {
			board: this.board,
			winner: this.winner,
			finished: this.finished,
			turn: this.players[this.count]
		};
	},

	checkWinner: function() {
		var gameBoard = this.board;

		console.log(gameBoard);

		// check horizontal
		for (var i = 0; i < gameBoard.length; ++i) {
			if (gameBoard[i][0] === gameBoard[i][1] &&
				gameBoard[i][0] === gameBoard[i][2] &&
				gameBoard[i][0] !== undefined) {
				return this.players[gameBoard[i][0]];
			}
		}

		// check vertical
		for (var i = 0; i < gameBoard.length; ++i) {
			if (gameBoard[0][i] === gameBoard[1][i] &&
				gameBoard[0][i] === gameBoard[2][i] &&
				gameBoard[0][i] !== undefined) {
				return this.players[gameBoard[0][i]];
			}
		}

		// check diagonals
		if (gameBoard[0][0] === gameBoard[1][1] &&
			gameBoard[0][0] === gameBoard[2][2] &&
			gameBoard[0][0] !== undefined) {
			return this.players[gameBoard[0][0]];
		}

		if (gameBoard[0][2] === gameBoard[1][1] &&
			gameBoard[0][2] === gameBoard[2][0] &&
			gameBoard[0][2] !== undefined) {
			return this.players[gameBoard[0][2]];
		}

		return null;
	},

	setUsers: function(players) {
		Log.info('adding players', players, players.length, this.maxLength);
		this.players = players;
	},

	get: function(pos) {
		return this.board[pos.x][pos.y];
	},

	set: function(pos, value) {
		this.board[pos.x][pos.y] = value;
	}
});
