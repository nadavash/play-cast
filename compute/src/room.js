var _ = require('lodash'),
    io = require('./io.js'),
    Log = require('./logger.js');

module.exports = Room;

/**
 * Room object
 * @constructor
 * @param {Socket} host
 */
function Room(host, game) {
    this.token = uniqueId('r');
    this.host = host;
    this.spectator = null;
    this.game = game;

    this.users = {};
    this.add(host);

    this.host.emit('state', {
        type: 'hosted',
        data: {
            message: "Hosting room.",
            token: this.token,
            game: this.game.name
        }
    });
}

_.extend(Room.prototype, {

    /**
     * Send a message to everyone in the room
     * @param {Type}
     * @param {Data}
     */
    broadcast: function(type, data) {
        io.sockets.in(this.token).emit(type, data);
    },

    /**
     * Add a user to the room
     * @param {Socket} user
     */
    add: function(user) {
        this.users[user.id] = user;

        var self = this;

        // add user
        user.join(this.token, function() {

            self.game.setUsers(Object.keys(self.users));

            var count = self.game.players.length;

            if (count > self.game.maxPlayers || count < self.game.minPlayers) {
                Log.warn(self.token);
                self.broadcast('state', {
                    type: 'waiting',
                    data: {
                        count: count,
                        room: self.token,
                        max: self.game.maxPlayers,
                        min: self.game.minPlayers
                    }
                })
            } else {
                self.broadcast('state', {
                    type: 'joined',
                    data: {
                        game: self.game.name
                    }
                })
            }
        });
    },

    /**
     * Removes a user from the room
     * @param {Socket} user
     */
    remove: function(user) {
        delete this.users[user.id];

        var self = this;

        // remove user
        user.leave(this.token, function() {

            self.game.setUsers(Object.keys(self.users));
            var count = self.game.players.length;

            user.emit('state', {
                type: 'left'
            });

            if (count > self.game.maxPlayers || count < self.game.minPlayers) {
                self.broadcast('state', {
                    type: 'waiting',
                    data: {
                        count: count,
                        room: self.token,
                        max: self.game.maxPlayers,
                        min: self.game.minPlayers
                    }
                });
            } else {
                // nothing?
            }
        });
    },

    /**
     * Adds a passive spectator
     * @param {Socket} spectator
     * @param {Function} callback
     */
    setSpectator: function(spectator, callback) {
        this.spectator = spectator;

        var self = this;
        spectator.join(this.token, function() {

            var count = self.game.players.length;

            if (count > self.game.maxPlayers || count < self.game.minPlayers) {
                Log.warn(self.token);
                self.broadcast('state', {
                    type: 'waiting',
                    data: {
                        count: count,
                        room: self.token,
                        max: self.game.maxPlayers,
                        min: self.game.minPlayers
                    }
                })
            } else {
                self.broadcast('state', {
                    type: 'joined',
                    data: {
                        game: self.game.name
                    }
                })
            }

        });
    }
});

function uniqueId() {
    return Math.random().toString(16).substr(2, 5);
}
