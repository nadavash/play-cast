var _ = require('lodash'),
    io = require('./io.js');

module.exports = Room;

/**
 * Room object
 * @constructor
 * @param {Socket} host
 */
function Room(host, game) {
    this.token = _.uniqueId('r');
    this.host = host;
    this.game = game;

    this.users = {};
    this.add(host);

    this.host.emit('state', {
        type: 'hosted',
        data: {
            message: "Hosting room.",
            token: this.token
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

            // let user know they are in
            user.emit('state', {
                type: 'joined',
                data: {
                    message: 'Room joined.',
                    token: self.token,
                    game: self.game.name
                }
            });

            // broadcast new room size
            self.broadcast('update', {
                type: 'users',
                data: {
                    count: Object.keys(self.users).length
                }
            });
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

            // let user know they left
            user.emit('state', {
                type: 'left',
                data: {
                    message: 'Room left.',
                    token: self.token
                }
            });

            // broadcast new room size
            self.broadcast('update', {
                type: 'users',
                data: {
                    count: Object.keys(self.users).length
                }
            });
        });
    }
});
