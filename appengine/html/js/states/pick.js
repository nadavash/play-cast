(function() {

    window.Pick = {

        init: function() {
            $('.cover').load('/host', function() {
                $('.row').click(function() {
                    var game = $(this).attr('data-game');

                    ConnectionManager.hostRoom(game);
                });
            });
        },

        cleanup: function() {
            $('.cover').html('');
        }
    }



})();
