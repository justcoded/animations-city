var trafficLight = {
    trafficLightInit: function() {
        var $trafficLight = $('.traffic-light'),
            timer;

        if (!$trafficLight.length) {
            return;
        }

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $('body').on('touchstart', function(){
                switchTL();
            });
        }

        $('body').on('wheel keyup', switchTL);

        function switchTL() {
            $trafficLight.removeClass('off');
            $trafficLight.addClass('active');
            clearTimeout(timer);
            timer = setTimeout(function(){
                $trafficLight.removeClass('active');
                $trafficLight.addClass('off');
            }, 1000);
        }

    }

};

export default trafficLight;