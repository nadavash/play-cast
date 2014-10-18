var _ = require('lodash');

module.exports = Room;

/**
 * Room object
 * @constructor
 * @param {Socket} host
 */
function Room(host) {
    this.token = _.uniqueId('r');
    this.host = host;

    this.users = {};
    this.add(host);
}

_.extend(Room.prototype, {

    /**
     * Send a message to everyone in the room
     * @param {Data}
     */
    broadcast: function(data) {
        io.sockets.in(room.token).emit(data);
    },

    notifyRest: function(data, user) {
        user.broadcast.to(this.token).emit(data);
    },

    /**
     * Add a user to the room
     * @param {Socket} user
     */
    add: function(user) {
        this.user[user.id] = user;

        user.join(this.token, function() {
            user.emit({
                type: 'joined',
                data: {
                    message: 'Room joined.',
                    token: room.token
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

        user.leave(this.token, function() {
            user.emit({
                type: 'left',
                data: {
                    message: 'Room left.',
                    token: room.token
                }
            });
        });
    }
});
