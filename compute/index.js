var io = require('./src/io.js'),
    Log = require('./src/logger.js'),
    Room = require('./src/room.js'),
    games = require('./src/games.js');

var users = {},
    rooms = {},
    userRoomMap = {};

io.on('connection', function(user) {
    Log.info('user connected:', user.id);

    users[user.id] = user;

    // user messages
    user.on('message', function(data) {

        // handle user
        Log.info('user ' + user.id + ' sent ' + data.type + ':', data.data);

        if (userProtocol[data.type]) {
            userProtocol[data.type](user, data.data);
        } else {
            Log.error('unknown type:', data.type);
        }
        return;

        Log.error('unknown role:', data.role);
    });

    // user moves
    user.on('move', function(data) {
        // get game
        var room = userRoomMap[user.id];

        if (!room) {
            user.send({
                type: 'error',
                data: {
                    message: 'Could not find that room.'
                }
            });
        }

        Log.info('user ' + user.id + ' does move:', data);

        room.game.update(data, user, function(err, state) {
            // not your turn!
            if (err) {
                user.send({
                    type: 'error',
                    data: {
                        message: err
                    }
                })
                return;
            }

            // game over
            if (this.finished) {
                room.broadcast('state', {
                    type: 'gameover',
                    data: state
                })
                return
            }

            room.broadcast('update', {
                type: 'gamestate',
                data: state
            })
        });
    });
});

var userProtocol = {

    /**
     * Start hosting a game
     */
    'host': function(user, data) {
        data = data || {};
        Log.info('user ' + user.id + ' wants host:', data.game);

        var Game = games[data.game];

        if (!Game) {
            user.send({
                type: 'error',
                data: {
                    message: "Game not found"
                }
            })
        }

        var room = new Room(user, new Game());
        rooms[room.token] = room;
        userRoomMap[user.id] = room;
    },

    /**
     * Join a game
     */
    'join': function(user, data) {
        Log.info('user wants to join:', user.id);

        // already in room, DENIED!
        if (userRoomMap[user.id]) {
            user.send({
                type: 'error',
                data: {
                    'message': 'Already in a room.'
                }
            });
            return;
        }

        var room = rooms[data.token];

        // no such room, send back error
        if (!room) {
            user.send({
                type: 'error',
                data: {
                    message: 'Could not find that room.'
                }
            })
            return;
        }

        room.add(user);
        userRoomMap[user.id] = room;
    },

    /**
     * Leave a game
     */
    'leave': function(user, data) {
        Log.info('user wants to leave:', user.id);

        // not in a room
        if (!userRoomMap[user.id]) {
            user.send({
                type: 'error',
                data: {
                    message: 'Not in any room.'
                }
            });
        }

        var room = rooms[data.token];

        // not in that room
        if (!room) {
            user.send({
                type: 'error',
                data: {
                    message: 'Could not find that room.'
                }
            });
        }

        room.remove(user);
        delete userRoomMap[user.id];
    }
}
