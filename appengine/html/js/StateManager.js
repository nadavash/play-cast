(function() {

    var socket = null,
        oldState = null;

    window.StateManager = {

        init: function(socket) {
            socket = socket;
            socket.on('state', function(evt) {
                window.StateManager.goto(evt);
            });
        },

        goto: function(evt) {
            var type = evt.type;

            var state;

            switch (type) {
                case 'picking': // fake state
                    state = 'pick';
                    break;

                case 'join': // fake state
                    state = 'join';
                    break;

                case 'waiting': // waiting for right amount of players
                    state = 'wait';
                    break;

                case 'hosted': // hosting a game
                case 'joined': // joined a game
                    state = evt.data.game;
                    break;

                case 'gameover': // ended a game
                case 'left': // left a room
                    window.ConnectionManager.leave();

                case 'start':
                    state = 'start';
                    break;

                default:
                    throw "oh";
            }

            state = states[state];

            if (!state) throw "uhoh";
            if (oldState) oldState.cleanup();
            state.init();
            oldState = state;
        }
    }

    var states = {
        'start': window.Start,
        'pick': window.Pick,
        'join': window.Join,
        'wait': window.Wait,
        'tictactoe': window.Tictactoe,
        'numberwang': window.Numberwang
    }

})();
