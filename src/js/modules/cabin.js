var cabin = {
    cabinInit: function() {
        var $cabinWrap = $('.ferris-cabin');

        if (!$cabinWrap.length) {
            return;
        }

        $cabinWrap.on('dblclick', function() {
            cabinHandler.call(this);
        });

        $(document).keyup(function(eventObject){
            if(eventObject.which == 32){
                $(".ferris-cabin").each(function(indx){
                  cabinHandler.call(this);
                });
            }
        });

        $(window).on('resize', function(){
            $('.clouds .ferris-cabin').addClass('hide');
        });

        function cabinHandler(){
            var cabinTop = $(this).offset().top,
                cabinLeft = $(this).offset().left,
                roadTop = $('.road-holder').offset().top,
                cabinClone = $(this).clone(),
                cloudsWrap = $('.clouds');

            $(this).css('display', 'none');
            cloudsWrap.append(cabinClone);
            cabinClone.css({
                'position': 'fixed',
                'top': cabinTop,
                'left': cabinLeft,
                'max-width': '3.15vw',
                'max-height': '63px',
                'z-index': '2'
            }).animate({
                top: roadTop - parseInt($(this).height()) + 'px'
            }, 1000, 'easeOutBounce');
        }

    }

};

export default cabin;