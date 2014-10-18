var server = require('http').createServer(),
    io = require('socket.io')(server),
    Room = require('./room.js');

var users = {},
    rooms = {};

io.on('connection', function(user) {
    debug('user connected:', user.id);

    users[user.id] = user;

    user.emit('new message', {
        test: 'hello'
    });

    user.on('message', function(data) {
        debug('user sent message:', data);

        if (handlers[data.type]) {
            handlers[data.type](user, data.data);
        } else {
            // send back error
        }
    });
});

server.listen(3000, function() {
    debug('server listening');
});

var handlers = {
    'host': function(user) {
        debug('user wants host:', user.id);

        var room = new Room(user);
        rooms[room.token] = room;

        user.send({
            type: 'hosted',
            data: {
                token: room.token
            }
        })
    },

    'join': function(user, data) {
        debug('user wants to join:', user.id);

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
    },

    'leave': function(user, data) {
        debug('user wants to leave:', user.id);

        var room = rooms[data.token];

        if (!room) {
            user.send({
                type: 'error',
                data: {
                    message: 'Could not find that room.'
                }
            });
        }

        room.remove(user);
    }
}

function debug() {
    console.log.apply(console,
        ['[INFO]'].concat([].slice.call(arguments, 0))
    );
}
