var soundControl = {
    soundControlInit: function() {
        var $soundBtn = $('.sound-ico'),
            $soundImg = $soundBtn.find('img'),
            $soundWrap = $soundBtn.closest('.sound'),
            $audio = $soundWrap.find('.audio')[0];

        if (!$soundBtn.length) {
            return;
        }

        $soundBtn.on('click', soundOnOffHandler);

        function soundOnOffHandler() {
            soundOnOff();
            if(!$soundWrap.hasClass('sound-off')){
                $soundImg.attr('src', 'assets/images/sound-off.svg');
            } else {
                $soundImg.attr('src', 'assets/images/sound.svg');
            }
            $soundWrap.toggleClass('sound-off');
        }

        function soundOnOff(){
            if($audio.paused){
                $audio.play();
            } else {
                $audio.pause();
            }
        }

    }

};

export default soundControl;