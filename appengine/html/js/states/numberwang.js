(function() {

    window.Numberwang = {
        init: function() {
            var socket = ConnectionManager.getUser();
            console.log('adding numberwang');
            socket.on('update', stateHandler);


            $('.cover').load('/numberwang', function() {

                $('.cover button').on('click', function(evt) {
                    socket.emit('move', {
                        guess: parseInt(jQuery('.cover input').val(), 10)
                    });
                });
            });
        },

        cleanup: function() {
            var socket = ConnectionManager.getUser();

            console.log('removing numberwang');
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
