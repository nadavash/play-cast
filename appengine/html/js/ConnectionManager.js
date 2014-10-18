(function() {

    var url = 'http://localhost:3000';

    var socket = null,
        isLoggedIn = false,
        isHost = false,
        room = null;

    window.ConnectionManager = {

        hostRoom: function(game, callback) {
            socket = io.connect(url);
            StateManager.init(socket);
            socket.emit('message', {
                type: 'host',
                data: {
                    game: game
                }
            });
            socket.on('state', function handler(evt) {
                if (evt.type === 'hosted') {
                    socket.off('state', handler);
                    isLoggedIn = true;
                    isHost = true;
                    room = evt.data.token;
                    callback && callback(evt.data);
                }
            });
        },

        joinRoom: function(r, callback) {
            socket = io.connect(url);
            StateManager.init(socket);
            socket.emit('message', {
                type: 'join',
                data: {
                    token: r
                }
            });
            socket.on('state', function handler(evt) {
                if (evt.type === 'joined') {
                    socket.off('state', handler);
                    isLoggedIn = true;
                    isHost = false;
                    room = r;
                    callback && callback(evt.data);
                }
            });
        },

        leave: function() {
            if (!isLoggedIn) return;

            socket.emit('message', {
                type: 'leave',
                data: {
                    token: room
                }
            });
            isLoggedIn = false;
            isHost = false;
        },

        getUser: function() {
            return socket;
        }
    }

})();
