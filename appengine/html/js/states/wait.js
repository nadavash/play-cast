(function() {

    window.Wait = {

        init: function(data) {
            $('.cover').load('/wait', function() {
                $('.cover .code').text(data.room);
            });
        },

        cleanup: function() {
            $('.cover').html('');
        }
    }

})();
