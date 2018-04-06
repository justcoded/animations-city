var plane = {
    planeInit: function() {
        var $planeBtn = $('.plane-btn');

        if (!$planeBtn.length) {
            return;
        }

        $planeBtn.on('dblclick', function() {
            $(this).addClass('active');
            $('.plane').addClass('fly');
            setTimeout(function(){
                $('.plane').addClass('hide');
            }, 12000);
        });

    }

};

export default plane;