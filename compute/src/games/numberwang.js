var _ = require('lodash'),
    Log = require('../logger.js');

module.exports = Numberwang;

function Numberwang() {
    this.number = Math.floor(Math.random() * 100);
    this.finished = false;
    this.lastGuess = null;

    this.players = [];
    this.maxPlayers = 1;
    this.minPlayers = 1;
    this.name = 'numberwang';
}

_.extend(Numberwang.prototype, {

    /**
     * Updates a players move
     * @param {Object} move
     * @param {Socket} user
     * @param {Function} callback - node style
     */
    update: function(move, user, callback) {
        Log.info('user ' + user.id + ' moved', move, '-', this.number);

        this.finished = this.number === move.guess;
        this.lastGuess = move.guess;

        callback(null, this.getState());
    },

    setUsers: function(players) {
        this.players = players;
    },

    /**
     * Returns the current state of the game
     */
    getState: function() {
        if (this.finished) return 'You won!';
        if (this.lastGuess > this.number) return 'Too big!';
        return 'Too small!';
    }
});
