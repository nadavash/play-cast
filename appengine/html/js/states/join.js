(function() {

    window.Join = {

        init: function() {

            $('.cover').load('/join', function() {

                $('.cover button').click(function() {
                    var code = $('.cover input').val();

                    socket = io.connect('http://localhost:3000');
                    socket.emit('message', {
                        type: 'join',
                        data: {
                            token: code
                        }
                    });

                    socket.on('state', function(evt) {
                        if (evt.type === 'joined') {
                            gameSelect(evt.data.game, false)
                        }
                    });
                });

            });
        },

        cleanup: function() {
            $('.cover').html('');
        }
    }

})();
