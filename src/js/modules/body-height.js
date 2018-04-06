var bodyHeight = {
    bodyHeightInit: function() {
        var $body = $('body');

        if (!$body.length) {
            return;
        }

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $body.css('height', $(window).height());
            $(window).resize(function(){
                $body.css('height', $(window).height());
            });
        }

        // disable default behavior on iOS
        document.ontouchmove = function(event){
		    event.preventDefault();
		};
    }

};

export default bodyHeight;