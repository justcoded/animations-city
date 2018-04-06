// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

import Car from './modules/animations-car';
import Sun from './modules/animations-sun';
import cabin from './modules/cabin';
import plane from './modules/plane';
import bodyHeight from './modules/body-height';
import hideScrollIco from './modules/hide-scroll-ico';
import trafficLight from './modules/traffic-light';
import soundControl from './modules/sound-control';

( ($) => {
  'use strict';

  // When DOM is ready
  $(() => {
    var cars = document.querySelectorAll('.car-wrap'),
        screenWidth = document.documentElement.clientWidth;
    for(var i = 1; i < cars.length + 1; i++){
        new Car(document.querySelector('.car' + i), screenWidth);
    }

    new Sun(document.querySelector('.sun'));

    cabin.cabinInit();

    plane.planeInit();
    
    bodyHeight.bodyHeightInit();

    hideScrollIco.hideScrollIcoInit();

    trafficLight.trafficLightInit();
    
    soundControl.soundControlInit();
  });

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $(window).on('load', function(){
          $('.audio')[0].pause();
      });
  }

})(jQuery);