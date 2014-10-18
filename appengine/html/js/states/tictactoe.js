(function() {

    window.Tictactoe = {
        init: function() {
            var socket = ConnectionManager.getUser();

            $('.cover').load('/tictactoe', function() {
                socket.on('update', stateHandler);

                $('.cover .square')
                    .on('click', function(evt) {
                        socket.emit('move', {
                            y: parseInt($(this).data('x'), 10),
                            x: parseInt($(this).data('y'), 10)
                        })
                    });
            });
        },

        cleanup: function() {
            var socket = ConnectionManager.getUser();

            socket.off('update', stateHandler);
            $('.cover').html('');
        }
    }

    function stateHandler(evt) {
        if (evt.type === 'gamestate') {

            var board = evt.data.board;
            board = [].concat(board[0], board[1], board[2]);
            console.log(board);

            $('.cover .square')
                .removeClass('x')
                .removeClass('o')
                .each(function(index, element) {
                    if (board[index] === null) return;

                    $(element).addClass(board[index] === 1 ? 'x' : 'o');

                });
        }
    }

})();
