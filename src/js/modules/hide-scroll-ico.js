var hideScrollIco = {
    hideScrollIcoInit: function() {
        var $scrollDown = $('.scroll-down');

        if (!$scrollDown.length) {
            return;
        }

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $('body').on('touchend', function(e){
                hideScrollImage();
            });
        }

        $('body').on('wheel keyup', function(e){
            hideScrollImage(e);
        });

        function hideScrollImage(e) {
            setTimeout(function(){
                $scrollDown.addClass('hide');
            }, 2000);
        }

    }

};

export default hideScrollIco;