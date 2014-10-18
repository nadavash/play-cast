(function() {

    window.Join = {

        init: function() {

            $('.cover').load('/join', function() {

                $('.cover button').click(function() {
                    var code = $('.cover input').val();

                    ConnectionManager.joinRoom(code);
                });

            });
        },

        cleanup: function() {
            $('.cover').html('');
        }
    }

})();
