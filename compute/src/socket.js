var server = require('http').createServer(),
    io = require('socket.io')(server),
    Room = require('./room.js');

var users = {},
    rooms = {};

io.on('connection', function(socket) {

    users[user.id] = user;

    user.on('message', function(data) {
        if (handlers[data.type]) {
            handlers[data.type](user);
        } else {
            // send back error
        }
    });
});

server.listen(3000, function() {
    console.log('server listening');
});

var handlers = {
    'host': function(user) {
        var room = new Room(user);
        rooms[room.token] = room;

        user.emit({
            type: 'hosted',
            data: {
                token: room.token
            }
        })
    },

    'join': function(user) {
        var room = rooms[data.token];

        // no such room, send back error
        if (!room) {
            user.emit({
                type: 'error',
                data: {
                    message: 'Could not find that room.'
                }
            })
            return;
        }

        room.add(user);
    },

    'leave': function(user) {
        var room = rooms[data.token];
        if (!room) {
            user.emit({
                type: 'error',
                data: {
                    message: 'Could not find that room.'
                }
            });
        }

        room.remove(user);
    }
}
