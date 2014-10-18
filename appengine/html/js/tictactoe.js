(function() {

    window.Tictactoe = {
        init: function() {
            $('.cover').load('/tictactoe', function() {
                socket.on('update', stateHandler);

                $('#play-button').on('click', function(evt) {
                    socket.emit('move', JSON.encode($('[name="board-pos"]').val()));
                });
            });
        },

        cleanup: function() {
            socket.off('update', stateHandler);
            $('.cover').html('');
        }
    }

    function stateHandler(evt) {
        if (evt.type === 'gamestate') {
            $('.cover pre').text(evt.data);
        }
    }

})();
