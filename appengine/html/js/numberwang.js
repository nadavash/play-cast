(function() {

    window.Numberwang = {
        init: function() {
            $('.cover').load('numberwang.html');
            socket.on('update', stateHandler);

            $('.cover form').on('submit', function() {

                socket.emit('move', {
                    guess: parseInt(jQuery('#number').text(), 10)
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
            $('.cover .text').text(evt.data);
        }
    }

})();
