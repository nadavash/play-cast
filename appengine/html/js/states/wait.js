(function() {

    window.Wait = {

        init: function() {
            $('.cover').load('/wait', function() {

            });
        },

        cleanup: function() {
            $('.cover').html('');
        }
    }

})();
