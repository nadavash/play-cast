(function() {

    window.Start = {

        init: function() {
            $('.cover').load('/start', function() {

                $('.btn-join').click(function() {
                    window.StateManager.goto({
                        type: 'join'
                    });
                });

                $('.btn-host').click(function() {
                    window.StateManager.goto({
                        type: 'picking'
                    });
                });

                $('.home-return').click(function() {
                    window.StateManager.goto({
                        type: 'left'
                    });
                });
            });
        },

        cleanup: function() {
            $('.cover').html('');
        }
    }

})();
