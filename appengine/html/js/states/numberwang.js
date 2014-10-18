(function() {

    window.Numberwang = {
        init: function() {
            var socket = ConnectionManager.getUser();

            $('.cover').load('/numberwang', function() {
                socket.on('update', stateHandler);

                $('.cover button').on('click', function(evt) {
                    socket.emit('move', {
                        guess: parseInt(jQuery('.cover input').val(), 10)
                    });
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
            $('.cover .text').text(evt.data);
        }
    }

})();
