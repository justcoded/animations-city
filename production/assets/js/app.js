(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _animationsCar = require('./modules/animations-car');

var _animationsCar2 = _interopRequireDefault(_animationsCar);

var _animationsSun = require('./modules/animations-sun');

var _animationsSun2 = _interopRequireDefault(_animationsSun);

var _cabin = require('./modules/cabin');

var _cabin2 = _interopRequireDefault(_cabin);

var _plane = require('./modules/plane');

var _plane2 = _interopRequireDefault(_plane);

var _bodyHeight = require('./modules/body-height');

var _bodyHeight2 = _interopRequireDefault(_bodyHeight);

var _hideScrollIco = require('./modules/hide-scroll-ico');

var _hideScrollIco2 = _interopRequireDefault(_hideScrollIco);

var _trafficLight = require('./modules/traffic-light');

var _trafficLight2 = _interopRequireDefault(_trafficLight);

var _soundControl = require('./modules/sound-control');

var _soundControl2 = _interopRequireDefault(_soundControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

(function ($) {
    'use strict';

    // When DOM is ready

    $(function () {
        var cars = document.querySelectorAll('.car-wrap'),
            screenWidth = document.documentElement.clientWidth;
        for (var i = 1; i < cars.length + 1; i++) {
            new _animationsCar2.default(document.querySelector('.car' + i), screenWidth);
        }

        new _animationsSun2.default(document.querySelector('.sun'));

        _cabin2.default.cabinInit();

        _plane2.default.planeInit();

        _bodyHeight2.default.bodyHeightInit();

        _hideScrollIco2.default.hideScrollIcoInit();

        _trafficLight2.default.trafficLightInit();

        _soundControl2.default.soundControlInit();
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(window).on('load', function () {
            $('.audio')[0].pause();
        });
    }
})(jQuery);

},{"./modules/animations-car":2,"./modules/animations-sun":3,"./modules/body-height":4,"./modules/cabin":5,"./modules/hide-scroll-ico":6,"./modules/plane":7,"./modules/sound-control":8,"./modules/traffic-light":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Car(selector, screenWidth) {
    this.elem = selector;
    this.speed = this.elem.getAttribute('data-speed');
    this.direction = this.elem.getAttribute('data-direction');
    this.wheels = this.elem.querySelectorAll('.img-wheel');
    this.wheelDeg = 0;
    this.flag = false;
    this.DIRECT_LEFT = 'left';
    this.DIRECT_RIGHT = 'right';
    this.curPos = 0;
    this.carWidth = this.elem.clientWidth;
    this.screenWidth = screenWidth;

    this.carInit();
}

Car.prototype.drive = function (e) {
    var self = this,
        delta = e.deltaY || e.originalEvent.wheelDelta || e.wheelDelta,
        deltaMouseWheelPlus = 1,
        deltaMouseWheelMinus = -1;

    if (self.flag) {
        return;
    }

    if (delta > 0) {
        self.wheelDeg += 75;
        self.wheelFunc(deltaMouseWheelMinus);
    } else {
        self.wheelDeg -= 75;
        self.wheelFunc(deltaMouseWheelPlus);
    }
};

Car.prototype.keyHandler = function (e) {
    var self = this,
        deltaMouseWheelPlus = 1,
        deltaMouseWheelMinus = -1;

    if (self.flag) {
        return;
    }

    if (e.keyCode == 38) {
        self.wheelDeg += 75;
        self.wheelFunc(deltaMouseWheelMinus);
    } else if (e.keyCode == 40) {
        self.wheelDeg -= 75;
        self.wheelFunc(deltaMouseWheelPlus);
    }
};

Car.prototype.driveMobile = function () {
    var self = this,
        touchstartY = 0,
        touchendY = 0,
        deltaMouseWheelPlus = 1,
        deltaMouseWheelMinus = -1;

    if (self.flag) {
        return;
    }

    document.body.addEventListener('touchstart', function (e) {
        touchstartY = e.changedTouches[0].screenY;
    });

    document.body.addEventListener('touchend', function (e) {
        touchendY = e.changedTouches[0].screenY;

        if (touchendY < touchstartY) {
            self.wheelDeg += 75;
            self.wheelFunc(deltaMouseWheelMinus);
        } else if (touchendY > touchstartY) {
            self.wheelDeg -= 75;
            self.wheelFunc(deltaMouseWheelPlus);
        }
    });
};

Car.prototype.touchHandler = function (e) {
    var self = this;

    var touchStartY = e.changedTouches[0].pageY;
    if (touchStartY < touchStartY) {
        self.wheelFunc(deltaMouseWheelMinus);
    } else {
        self.wheelFunc(deltaMouseWheelPlus);
    }
};

Car.prototype.wheelFunc = function (delta) {
    var self = this,
        counter,
        curLeft = self.elem.getBoundingClientRect().left,
        left100 = '110%',
        leftClientWidth = '-' + parseInt(self.carWidth) + 'px',
        leftClientWidth2 = '-' + parseInt(self.carWidth) * 2 + 'px';

    self.curPos = self.curPos + self.speed * delta;
    self.elem.style.transform = 'translateX(' + self.curPos + 'px)';

    if (self.direction == self.DIRECT_LEFT && curLeft + parseInt(self.carWidth) < 0 || self.direction == self.DIRECT_RIGHT && curLeft - parseInt(self.carWidth) > self.screenWidth) {

        self.wheelHelper(left100, leftClientWidth2);
    } else if (self.direction == self.DIRECT_LEFT && curLeft - parseInt(self.carWidth) > self.screenWidth || self.direction == self.DIRECT_RIGHT && curLeft + parseInt(self.carWidth) * 2 < 0) {

        self.wheelHelper(leftClientWidth, left100);
    }

    for (counter = 0; counter < self.wheels.length; counter++) {
        if (self.direction === 'right') {
            self.wheels[counter].style.transform = 'rotate(' + self.wheelDeg + 'deg)';
        } else if (self.direction === 'left') {
            self.wheels[counter].style.transform = 'rotate(' + -self.wheelDeg + 'deg)';
        }
    }
};

Car.prototype.wheelHelper = function (leftDirect, rightDirect) {
    var self = this;
    self.flag = true;
    self.elem.style.transitionDuration = '0s';
    if (self.direction == self.DIRECT_LEFT) {
        self.elem.style.left = leftDirect;
    } else if (self.direction == self.DIRECT_RIGHT) {
        self.elem.style.left = rightDirect;
    }
    self.elem.style.transform = 'translateX(0)';
    self.curPos = 0;
    setTimeout(function () {
        self.elem.style.transitionDuration = '0.3s';
        self.flag = false;
    }, 0);
};

Car.prototype.carInit = function () {
    var self = this;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        self.driveMobile.call(self);
    }
    document.body.addEventListener('wheel', $.throttle(250, true, self.drive.bind(self)));
    document.body.addEventListener('keyup', $.throttle(250, true, self.keyHandler.bind(self)));
    window.addEventListener('resize', function () {
        self.carWidth = self.elem.clientWidth;
        self.screenWidth = document.documentElement.clientWidth;
    });
};

exports.default = Car;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Sun(selector) {
    this.elem = selector;
    this.moon = document.querySelector('.moon');
    this.shadow = document.querySelectorAll('.building .shadow');
    this.body = document.body;
    this.curPosSun = 0;
    this.curPosMoon = 0;
    this.screenWidth = document.documentElement.clientWidth;
    this.elemWidth = this.elem.clientWidth;

    this.sunInit();
}

Sun.prototype.moveHandler = function (e) {
    var self = this,
        delta = e.deltaY || e.originalEvent.wheelDelta || e.wheelDelta,
        speed = 50,
        shadowXPlus = 1,
        shadowXMinus = -1;

    if (delta > 0) {
        self.moveSun(-speed, shadowXPlus);
    } else {
        self.moveSun(speed, shadowXMinus);
    }
};

Sun.prototype.keySunHandler = function (e) {
    var self = this,
        speed = 50,
        shadowXPlus = 1,
        shadowXMinus = -1;

    if (e.keyCode == 38) {
        self.moveSun(-speed, shadowXPlus);
    } else if (e.keyCode == 40) {
        self.moveSun(speed, shadowXMinus);
    }
};

Sun.prototype.moveHandlerMobile = function () {
    var self = this,
        touchstartY = 0,
        touchendY = 0,
        speed = 30,
        shadowXPlus = 1,
        shadowXMinus = -1;

    document.body.addEventListener('touchstart', function (e) {
        touchstartY = e.changedTouches[0].screenY;
    });

    document.body.addEventListener('touchend', function (e) {
        touchendY = e.changedTouches[0].screenY;
        if (touchendY < touchstartY) {
            self.moveSun(-speed, shadowXPlus);
        } else if (touchendY > touchstartY) {
            self.moveSun(speed, shadowXMinus);
        }
    });
};

Sun.prototype.moveSun = function (speed, shadowX) {
    var self = this,
        curLeftPosSun = self.elem.getBoundingClientRect().left,
        curLeftPosMoon = self.moon.getBoundingClientRect().left;

    self.curPosSun = self.curPosSun + speed;
    self.elem.style.transform = 'translateX(' + self.curPosSun + 'px)';
    self.curPosMoon = self.curPosMoon + speed;
    self.moon.style.transform = 'translateX(' + self.curPosMoon + 'px)';

    if (curLeftPosSun >= self.screenWidth * 5 / 8) {
        self.body.className = 'day';
    } else if (curLeftPosSun < self.screenWidth * 5 / 8 && curLeftPosSun >= self.screenWidth / 2) {
        self.body.className = 'day night1';
    } else if (curLeftPosSun < self.screenWidth / 2 && curLeftPosSun >= self.screenWidth * 3 / 8) {
        self.body.className = 'day night1 night2';
    } else if (curLeftPosSun < self.screenWidth * 3 / 8 && curLeftPosSun >= self.screenWidth / 4) {
        self.body.className = 'day night1 night2 night3';
    } else if (curLeftPosSun < self.screenWidth / 4 && curLeftPosSun >= self.screenWidth / 8) {
        self.body.className = 'day night1 night2 night3 night4';
    } else if (curLeftPosSun < self.screenWidth / 8 && curLeftPosSun >= 0) {
        self.body.className = 'day night1 night2 night3 night4 night5';
    } else if (curLeftPosSun < 0 && curLeftPosSun >= -self.elemWidth * 2) {
        self.body.className = 'day night1 night2 night3 night4 night5 night6';
    } else if (curLeftPosSun < -self.elemWidth * 2 && curLeftPosSun >= -self.elemWidth * 3) {
        self.body.className = 'day night1 night2 night3 night4 night5 night6 night7';
    } else if (curLeftPosSun < -self.elemWidth * 3) {
        self.body.className = 'day night1 night2 night3 night4 night5 night6 night7 night8';
    }

    for (var i = 0; i < self.shadow.length; i++) {
        var pointsShadow = self.shadow[i].getAttribute('points'),
            arrPointsShadow = pointsShadow.split(' '),
            shadowNumX = parseInt(arrPointsShadow[2].split(',')[0]),
            shadowNumY = arrPointsShadow[2].split(',')[1],
            strPointsShadow;

        shadowNumX += 1 * shadowX;
        arrPointsShadow.splice(2, 1, shadowNumX + ',' + shadowNumY);
        strPointsShadow = arrPointsShadow.join(' ');
        self.shadow[i].setAttribute('points', strPointsShadow);
    }
};

Sun.prototype.sunInit = function () {
    var self = this;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        self.moveHandlerMobile.call(self);
    }
    document.body.addEventListener('wheel', $.throttle(250, true, self.moveHandler.bind(self)));
    document.body.addEventListener('keyup', $.throttle(250, true, self.keySunHandler.bind(self)));
    window.addEventListener('resize', function () {
        self.elemWidth = self.elem.clientWidth;
        self.screenWidth = document.documentElement.clientWidth;
    });
};

exports.default = Sun;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bodyHeight = {
    bodyHeightInit: function bodyHeightInit() {
        var $body = $('body');

        if (!$body.length) {
            return;
        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $body.css('height', $(window).height());
            $(window).resize(function () {
                $body.css('height', $(window).height());
            });
        }

        // disable default behavior on iOS
        document.ontouchmove = function (event) {
            event.preventDefault();
        };
    }

};

exports.default = bodyHeight;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cabin = {
    cabinInit: function cabinInit() {
        var $cabinWrap = $('.ferris-cabin');

        if (!$cabinWrap.length) {
            return;
        }

        $cabinWrap.on('dblclick', function () {
            cabinHandler.call(this);
        });

        $(document).keyup(function (eventObject) {
            if (eventObject.which == 32) {
                $(".ferris-cabin").each(function (indx) {
                    cabinHandler.call(this);
                });
            }
        });

        $(window).on('resize', function () {
            $('.clouds .ferris-cabin').addClass('hide');
        });

        function cabinHandler() {
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

exports.default = cabin;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var hideScrollIco = {
    hideScrollIcoInit: function hideScrollIcoInit() {
        var $scrollDown = $('.scroll-down');

        if (!$scrollDown.length) {
            return;
        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('body').on('touchend', function (e) {
                hideScrollImage();
            });
        }

        $('body').on('wheel keyup', function (e) {
            hideScrollImage(e);
        });

        function hideScrollImage(e) {
            setTimeout(function () {
                $scrollDown.addClass('hide');
            }, 2000);
        }
    }

};

exports.default = hideScrollIco;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var plane = {
    planeInit: function planeInit() {
        var $planeBtn = $('.plane-btn');

        if (!$planeBtn.length) {
            return;
        }

        $planeBtn.on('dblclick', function () {
            $(this).addClass('active');
            $('.plane').addClass('fly');
            setTimeout(function () {
                $('.plane').addClass('hide');
            }, 12000);
        });
    }

};

exports.default = plane;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var soundControl = {
    soundControlInit: function soundControlInit() {
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
            if (!$soundWrap.hasClass('sound-off')) {
                $soundImg.attr('src', 'assets/images/sound-off.svg');
            } else {
                $soundImg.attr('src', 'assets/images/sound.svg');
            }
            $soundWrap.toggleClass('sound-off');
        }

        function soundOnOff() {
            if ($audio.paused) {
                $audio.play();
            } else {
                $audio.pause();
            }
        }
    }

};

exports.default = soundControl;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var trafficLight = {
    trafficLightInit: function trafficLightInit() {
        var $trafficLight = $('.traffic-light'),
            timer;

        if (!$trafficLight.length) {
            return;
        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('body').on('touchstart', function () {
                switchTL();
            });
        }

        $('body').on('wheel keyup', switchTL);

        function switchTL() {
            $trafficLight.removeClass('off');
            $trafficLight.addClass('active');
            clearTimeout(timer);
            timer = setTimeout(function () {
                $trafficLight.removeClass('active');
                $trafficLight.addClass('off');
            }, 1000);
        }
    }

};

exports.default = trafficLight;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL21vZHVsZXMvYW5pbWF0aW9ucy1jYXIuanMiLCJzcmMvanMvbW9kdWxlcy9hbmltYXRpb25zLXN1bi5qcyIsInNyYy9qcy9tb2R1bGVzL2JvZHktaGVpZ2h0LmpzIiwic3JjL2pzL21vZHVsZXMvY2FiaW4uanMiLCJzcmMvanMvbW9kdWxlcy9oaWRlLXNjcm9sbC1pY28uanMiLCJzcmMvanMvbW9kdWxlcy9wbGFuZS5qcyIsInNyYy9qcy9tb2R1bGVzL3NvdW5kLWNvbnRyb2wuanMiLCJzcmMvanMvbW9kdWxlcy90cmFmZmljLWxpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFaQTtBQUNBO0FBQ0E7QUFDQTs7QUFXQSxDQUFFLFVBQUMsQ0FBRCxFQUFPO0FBQ1A7O0FBRUE7O0FBQ0EsTUFBRSxZQUFNO0FBQ04sWUFBSSxPQUFPLFNBQVMsZ0JBQVQsQ0FBMEIsV0FBMUIsQ0FBWDtBQUFBLFlBQ0ksY0FBYyxTQUFTLGVBQVQsQ0FBeUIsV0FEM0M7QUFFQSxhQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxLQUFLLE1BQUwsR0FBYyxDQUFqQyxFQUFvQyxHQUFwQyxFQUF3QztBQUNwQyx3Q0FBUSxTQUFTLGFBQVQsQ0FBdUIsU0FBUyxDQUFoQyxDQUFSLEVBQTRDLFdBQTVDO0FBQ0g7O0FBRUQsb0NBQVEsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVI7O0FBRUEsd0JBQU0sU0FBTjs7QUFFQSx3QkFBTSxTQUFOOztBQUVBLDZCQUFXLGNBQVg7O0FBRUEsZ0NBQWMsaUJBQWQ7O0FBRUEsK0JBQWEsZ0JBQWI7O0FBRUEsK0JBQWEsZ0JBQWI7QUFDRCxLQXBCRDs7QUFzQkEsUUFBSSxpRUFBaUUsSUFB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Ozs7O0FDbkNmLElBQUksZUFBZTtBQUNmLHNCQUFrQiw0QkFBVztBQUN6QixZQUFJLGdCQUFnQixFQUFFLGdCQUFGLENBQXBCO0FBQUEsWUFDSSxLQURKOztBQUdBLFlBQUksQ0FBQyxjQUFjLE1BQW5CLEVBQTJCO0FBQ3ZCO0FBQ0g7O0FBRUQsWUFBSSxpRUFBaUUsSUFBakUsQ0FBc0UsVUFBVSxTQUFoRixDQUFKLEVBQWlHO0FBQzdGLGNBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxZQUFiLEVBQTJCLFlBQVU7QUFDakM7QUFDSCxhQUZEO0FBR0g7O0FBRUQsVUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLGFBQWIsRUFBNEIsUUFBNUI7O0FBRUEsaUJBQVMsUUFBVCxHQUFvQjtBQUNoQiwwQkFBYyxXQUFkLENBQTBCLEtBQTFCO0FBQ0EsMEJBQWMsUUFBZCxDQUF1QixRQUF2QjtBQUNBLHlCQUFhLEtBQWI7QUFDQSxvQkFBUSxXQUFXLFlBQVU7QUFDekIsOEJBQWMsV0FBZCxDQUEwQixRQUExQjtBQUNBLDhCQUFjLFFBQWQsQ0FBdUIsS0FBdkI7QUFDSCxhQUhPLEVBR0wsSUFISyxDQUFSO0FBSUg7QUFFSjs7QUEzQmMsQ0FBbkI7O2tCQStCZSxZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gWW91IGNhbiB3cml0ZSBhIGNhbGwgYW5kIGltcG9ydCB5b3VyIGZ1bmN0aW9ucyBpbiB0aGlzIGZpbGUuXG4vL1xuLy8gVGhpcyBmaWxlIHdpbGwgYmUgY29tcGlsZWQgaW50byBhcHAuanMgYW5kIHdpbGwgbm90IGJlIG1pbmlmaWVkLlxuLy8gRmVlbCBmcmVlIHdpdGggdXNpbmcgRVM2IGhlcmUuXG5cbmltcG9ydCBDYXIgZnJvbSAnLi9tb2R1bGVzL2FuaW1hdGlvbnMtY2FyJztcbmltcG9ydCBTdW4gZnJvbSAnLi9tb2R1bGVzL2FuaW1hdGlvbnMtc3VuJztcbmltcG9ydCBjYWJpbiBmcm9tICcuL21vZHVsZXMvY2FiaW4nO1xuaW1wb3J0IHBsYW5lIGZyb20gJy4vbW9kdWxlcy9wbGFuZSc7XG5pbXBvcnQgYm9keUhlaWdodCBmcm9tICcuL21vZHVsZXMvYm9keS1oZWlnaHQnO1xuaW1wb3J0IGhpZGVTY3JvbGxJY28gZnJvbSAnLi9tb2R1bGVzL2hpZGUtc2Nyb2xsLWljbyc7XG5pbXBvcnQgdHJhZmZpY0xpZ2h0IGZyb20gJy4vbW9kdWxlcy90cmFmZmljLWxpZ2h0JztcbmltcG9ydCBzb3VuZENvbnRyb2wgZnJvbSAnLi9tb2R1bGVzL3NvdW5kLWNvbnRyb2wnO1xuXG4oICgkKSA9PiB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBXaGVuIERPTSBpcyByZWFkeVxuICAkKCgpID0+IHtcbiAgICB2YXIgY2FycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXItd3JhcCcpLFxuICAgICAgICBzY3JlZW5XaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBmb3IodmFyIGkgPSAxOyBpIDwgY2Fycy5sZW5ndGggKyAxOyBpKyspe1xuICAgICAgICBuZXcgQ2FyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXInICsgaSksIHNjcmVlbldpZHRoKTtcbiAgICB9XG5cbiAgICBuZXcgU3VuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW4nKSk7XG5cbiAgICBjYWJpbi5jYWJpbkluaXQoKTtcblxuICAgIHBsYW5lLnBsYW5lSW5pdCgpO1xuICAgIFxuICAgIGJvZHlIZWlnaHQuYm9keUhlaWdodEluaXQoKTtcblxuICAgIGhpZGVTY3JvbGxJY28uaGlkZVNjcm9sbEljb0luaXQoKTtcblxuICAgIHRyYWZmaWNMaWdodC50cmFmZmljTGlnaHRJbml0KCk7XG4gICAgXG4gICAgc291bmRDb250cm9sLnNvdW5kQ29udHJvbEluaXQoKTtcbiAgfSk7XG5cbiAgaWYoIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSApIHtcbiAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLmF1ZGlvJylbMF0ucGF1c2UoKTtcbiAgICAgIH0pO1xuICB9XG5cbn0pKGpRdWVyeSk7IiwiZnVuY3Rpb24gQ2FyKHNlbGVjdG9yLCBzY3JlZW5XaWR0aCl7XG4gICAgdGhpcy5lbGVtID0gc2VsZWN0b3I7XG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3BlZWQnKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlyZWN0aW9uJyk7XG4gICAgdGhpcy53aGVlbHMgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvckFsbCgnLmltZy13aGVlbCcpO1xuICAgIHRoaXMud2hlZWxEZWcgPSAwO1xuICAgIHRoaXMuZmxhZyA9IGZhbHNlO1xuICAgIHRoaXMuRElSRUNUX0xFRlQgPSAnbGVmdCc7XG4gICAgdGhpcy5ESVJFQ1RfUklHSFQgPSAncmlnaHQnO1xuICAgIHRoaXMuY3VyUG9zID0gMDtcbiAgICB0aGlzLmNhcldpZHRoID0gdGhpcy5lbGVtLmNsaWVudFdpZHRoO1xuICAgIHRoaXMuc2NyZWVuV2lkdGggPSBzY3JlZW5XaWR0aDtcblxuICAgIHRoaXMuY2FySW5pdCgpO1xufVxuXG5DYXIucHJvdG90eXBlLmRyaXZlID0gZnVuY3Rpb24oZSl7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBkZWx0YSA9IGUuZGVsdGFZIHx8IGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhIHx8IGUud2hlZWxEZWx0YSxcbiAgICAgICAgZGVsdGFNb3VzZVdoZWVsUGx1cyA9IDEsXG4gICAgICAgIGRlbHRhTW91c2VXaGVlbE1pbnVzID0gLTE7XG5cbiAgICBpZihzZWxmLmZsYWcpe1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoZGVsdGEgPiAwKXtcbiAgICAgICAgc2VsZi53aGVlbERlZyArPSA3NTtcbiAgICAgICAgc2VsZi53aGVlbEZ1bmMoZGVsdGFNb3VzZVdoZWVsTWludXMpO1xuICAgIH0gZWxzZXtcbiAgICAgICAgc2VsZi53aGVlbERlZyAtPSA3NTtcbiAgICAgICAgc2VsZi53aGVlbEZ1bmMoZGVsdGFNb3VzZVdoZWVsUGx1cyk7XG4gICAgfVxufTtcblxuQ2FyLnByb3RvdHlwZS5rZXlIYW5kbGVyID0gZnVuY3Rpb24oZSl7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBkZWx0YU1vdXNlV2hlZWxQbHVzID0gMSxcbiAgICAgICAgZGVsdGFNb3VzZVdoZWVsTWludXMgPSAtMTtcblxuICAgIGlmKHNlbGYuZmxhZyl7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZihlLmtleUNvZGUgPT0gMzgpe1xuICAgICAgICBzZWxmLndoZWVsRGVnICs9IDc1O1xuICAgICAgICBzZWxmLndoZWVsRnVuYyhkZWx0YU1vdXNlV2hlZWxNaW51cyk7XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSA0MCl7XG4gICAgICAgIHNlbGYud2hlZWxEZWcgLT0gNzU7XG4gICAgICAgIHNlbGYud2hlZWxGdW5jKGRlbHRhTW91c2VXaGVlbFBsdXMpO1xuICAgIH1cbn07XG5cbkNhci5wcm90b3R5cGUuZHJpdmVNb2JpbGUgPSBmdW5jdGlvbigpe1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdG91Y2hzdGFydFkgPSAwLFxuICAgICAgICB0b3VjaGVuZFkgPSAwLFxuICAgICAgICBkZWx0YU1vdXNlV2hlZWxQbHVzID0gMSxcbiAgICAgICAgZGVsdGFNb3VzZVdoZWVsTWludXMgPSAtMTtcblxuICAgIGlmKHNlbGYuZmxhZyl7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdG91Y2hzdGFydFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHRvdWNoZW5kWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcblxuICAgICAgICBpZiAodG91Y2hlbmRZIDwgdG91Y2hzdGFydFkpIHtcbiAgICAgICAgICAgIHNlbGYud2hlZWxEZWcgKz0gNzU7XG4gICAgICAgICAgICBzZWxmLndoZWVsRnVuYyhkZWx0YU1vdXNlV2hlZWxNaW51cyk7XG4gICAgICAgIH0gZWxzZSBpZiAodG91Y2hlbmRZID4gdG91Y2hzdGFydFkpIHtcbiAgICAgICAgICAgIHNlbGYud2hlZWxEZWcgLT0gNzU7XG4gICAgICAgICAgICBzZWxmLndoZWVsRnVuYyhkZWx0YU1vdXNlV2hlZWxQbHVzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuQ2FyLnByb3RvdHlwZS50b3VjaEhhbmRsZXIgPSBmdW5jdGlvbihlKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgdG91Y2hTdGFydFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgIGlmKHRvdWNoU3RhcnRZIDwgdG91Y2hTdGFydFkpe1xuICAgICAgICBzZWxmLndoZWVsRnVuYyhkZWx0YU1vdXNlV2hlZWxNaW51cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi53aGVlbEZ1bmMoZGVsdGFNb3VzZVdoZWVsUGx1cyk7XG4gICAgfVxufTtcblxuQ2FyLnByb3RvdHlwZS53aGVlbEZ1bmMgPSBmdW5jdGlvbihkZWx0YSl7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBjb3VudGVyLFxuICAgICAgICBjdXJMZWZ0ID0gc2VsZi5lbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgIGxlZnQxMDAgPSAnMTEwJScsXG4gICAgICAgIGxlZnRDbGllbnRXaWR0aCA9ICctJyArIHBhcnNlSW50KHNlbGYuY2FyV2lkdGgpICsgJ3B4JyxcbiAgICAgICAgbGVmdENsaWVudFdpZHRoMiA9ICctJyArIHBhcnNlSW50KHNlbGYuY2FyV2lkdGgpICogMiArICdweCc7XG5cbiAgICBzZWxmLmN1clBvcyA9IHNlbGYuY3VyUG9zICsgc2VsZi5zcGVlZCAqIGRlbHRhO1xuICAgIHNlbGYuZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgc2VsZi5jdXJQb3MgKyAncHgpJztcblxuICAgIGlmKChzZWxmLmRpcmVjdGlvbiA9PSBzZWxmLkRJUkVDVF9MRUZUICYmIGN1ckxlZnQgKyBwYXJzZUludChzZWxmLmNhcldpZHRoKSA8IDApIHx8IChzZWxmLmRpcmVjdGlvbiA9PSBzZWxmLkRJUkVDVF9SSUdIVCAmJiBjdXJMZWZ0IC0gcGFyc2VJbnQoc2VsZi5jYXJXaWR0aCkgPiBzZWxmLnNjcmVlbldpZHRoKSl7XG5cbiAgICAgICAgc2VsZi53aGVlbEhlbHBlcihsZWZ0MTAwLCBsZWZ0Q2xpZW50V2lkdGgyKTtcblxuICAgIH0gZWxzZSBpZigoc2VsZi5kaXJlY3Rpb24gPT0gc2VsZi5ESVJFQ1RfTEVGVCAmJiBjdXJMZWZ0IC0gcGFyc2VJbnQoc2VsZi5jYXJXaWR0aCkgPiBzZWxmLnNjcmVlbldpZHRoKSB8fCAoc2VsZi5kaXJlY3Rpb24gPT0gc2VsZi5ESVJFQ1RfUklHSFQgJiYgY3VyTGVmdCArIHBhcnNlSW50KHNlbGYuY2FyV2lkdGgpICogMiA8IDApKXtcblxuICAgICAgICBzZWxmLndoZWVsSGVscGVyKGxlZnRDbGllbnRXaWR0aCwgbGVmdDEwMCk7XG5cbiAgICB9XG5cbiAgICBmb3IoY291bnRlciA9IDA7IGNvdW50ZXIgPCBzZWxmLndoZWVscy5sZW5ndGg7IGNvdW50ZXIrKyl7XG4gICAgICAgIGlmKHNlbGYuZGlyZWN0aW9uID09PSAncmlnaHQnKXtcbiAgICAgICAgICAgIHNlbGYud2hlZWxzW2NvdW50ZXJdLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUoJyArIHNlbGYud2hlZWxEZWcgKyAnZGVnKSc7XG4gICAgICAgIH0gZWxzZSBpZihzZWxmLmRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICBzZWxmLndoZWVsc1tjb3VudGVyXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlKCcgKyAtc2VsZi53aGVlbERlZyArICdkZWcpJztcbiAgICAgICAgfVxuICAgIH1cblxufTtcblxuQ2FyLnByb3RvdHlwZS53aGVlbEhlbHBlciA9IGZ1bmN0aW9uKGxlZnREaXJlY3QsIHJpZ2h0RGlyZWN0KXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5mbGFnID0gdHJ1ZTtcbiAgICBzZWxmLmVsZW0uc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBzJztcbiAgICBpZihzZWxmLmRpcmVjdGlvbiA9PSBzZWxmLkRJUkVDVF9MRUZUKXtcbiAgICAgICAgc2VsZi5lbGVtLnN0eWxlLmxlZnQgPSBsZWZ0RGlyZWN0O1xuICAgIH0gZWxzZSBpZihzZWxmLmRpcmVjdGlvbiA9PSBzZWxmLkRJUkVDVF9SSUdIVCl7XG4gICAgICAgIHNlbGYuZWxlbS5zdHlsZS5sZWZ0ID0gcmlnaHREaXJlY3Q7XG4gICAgfVxuICAgIHNlbGYuZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgwKSc7XG4gICAgc2VsZi5jdXJQb3MgPSAwO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5lbGVtLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwLjNzJztcbiAgICAgICAgc2VsZi5mbGFnID0gZmFsc2U7XG4gICAgfSwgMCk7XG59O1xuXG5DYXIucHJvdG90eXBlLmNhckluaXQgPSBmdW5jdGlvbigpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiggL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICkge1xuICAgICAgICBzZWxmLmRyaXZlTW9iaWxlLmNhbGwoc2VsZik7XG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAkLnRocm90dGxlKDI1MCwgdHJ1ZSwgc2VsZi5kcml2ZS5iaW5kKHNlbGYpKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICQudGhyb3R0bGUoMjUwLCB0cnVlLCBzZWxmLmtleUhhbmRsZXIuYmluZChzZWxmKSkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLmNhcldpZHRoID0gc2VsZi5lbGVtLmNsaWVudFdpZHRoO1xuICAgICAgICBzZWxmLnNjcmVlbldpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FyOyIsImZ1bmN0aW9uIFN1bihzZWxlY3Rvcil7XG4gICAgdGhpcy5lbGVtID0gc2VsZWN0b3I7XG4gICAgdGhpcy5tb29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vb24nKTtcbiAgICB0aGlzLnNoYWRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idWlsZGluZyAuc2hhZG93Jyk7XG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICB0aGlzLmN1clBvc1N1biA9IDA7XG4gICAgdGhpcy5jdXJQb3NNb29uID0gMDtcbiAgICB0aGlzLnNjcmVlbldpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIHRoaXMuZWxlbVdpZHRoID0gdGhpcy5lbGVtLmNsaWVudFdpZHRoO1xuXG4gICAgdGhpcy5zdW5Jbml0KCk7XG59XG5cblN1bi5wcm90b3R5cGUubW92ZUhhbmRsZXIgPSBmdW5jdGlvbihlKXtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGRlbHRhID0gZS5kZWx0YVkgfHwgZS5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEgfHwgZS53aGVlbERlbHRhLFxuICAgICAgICBzcGVlZCA9IDUwLFxuICAgICAgICBzaGFkb3dYUGx1cyA9IDEsXG4gICAgICAgIHNoYWRvd1hNaW51cyA9IC0xO1xuXG4gICAgaWYoZGVsdGEgPiAwKXtcbiAgICAgICAgc2VsZi5tb3ZlU3VuKC1zcGVlZCwgc2hhZG93WFBsdXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubW92ZVN1bihzcGVlZCwgc2hhZG93WE1pbnVzKTtcbiAgICB9XG59O1xuXG5TdW4ucHJvdG90eXBlLmtleVN1bkhhbmRsZXIgPSBmdW5jdGlvbihlKXtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHNwZWVkID0gNTAsXG4gICAgICAgIHNoYWRvd1hQbHVzID0gMSxcbiAgICAgICAgc2hhZG93WE1pbnVzID0gLTE7XG5cbiAgICBpZihlLmtleUNvZGUgPT0gMzgpe1xuICAgICAgICBzZWxmLm1vdmVTdW4oLXNwZWVkLCBzaGFkb3dYUGx1cyk7XG4gICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PSA0MCkge1xuICAgICAgICBzZWxmLm1vdmVTdW4oc3BlZWQsIHNoYWRvd1hNaW51cyk7XG4gICAgfVxufTtcblxuU3VuLnByb3RvdHlwZS5tb3ZlSGFuZGxlck1vYmlsZSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICB0b3VjaHN0YXJ0WSA9IDAsXG4gICAgICAgIHRvdWNoZW5kWSA9IDAsXG4gICAgICAgIHNwZWVkID0gMzAsXG4gICAgICAgIHNoYWRvd1hQbHVzID0gMSxcbiAgICAgICAgc2hhZG93WE1pbnVzID0gLTE7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdG91Y2hzdGFydFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHRvdWNoZW5kWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcbiAgICAgICAgaWYgKHRvdWNoZW5kWSA8IHRvdWNoc3RhcnRZKSB7XG4gICAgICAgICAgICBzZWxmLm1vdmVTdW4oLXNwZWVkLCBzaGFkb3dYUGx1cyk7XG4gICAgICAgIH0gZWxzZSBpZiAodG91Y2hlbmRZID4gdG91Y2hzdGFydFkpIHtcbiAgICAgICAgICAgIHNlbGYubW92ZVN1bihzcGVlZCwgc2hhZG93WE1pbnVzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuU3VuLnByb3RvdHlwZS5tb3ZlU3VuID0gZnVuY3Rpb24oc3BlZWQsIHNoYWRvd1gpe1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY3VyTGVmdFBvc1N1biA9IHNlbGYuZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LFxuICAgICAgICBjdXJMZWZ0UG9zTW9vbiA9IHNlbGYubW9vbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuXG4gICAgICAgIHNlbGYuY3VyUG9zU3VuID0gc2VsZi5jdXJQb3NTdW4gKyBzcGVlZDtcbiAgICAgICAgc2VsZi5lbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBzZWxmLmN1clBvc1N1biArICdweCknO1xuICAgICAgICBzZWxmLmN1clBvc01vb24gPSBzZWxmLmN1clBvc01vb24gKyBzcGVlZDtcbiAgICAgICAgc2VsZi5tb29uLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBzZWxmLmN1clBvc01vb24gKyAncHgpJztcblxuICAgICAgICBpZihjdXJMZWZ0UG9zU3VuID49IHNlbGYuc2NyZWVuV2lkdGggKiA1IC8gOCl7XG4gICAgICAgICAgICBzZWxmLmJvZHkuY2xhc3NOYW1lID0gJ2RheSc7XG4gICAgICAgIH0gZWxzZSBpZihjdXJMZWZ0UG9zU3VuIDwgc2VsZi5zY3JlZW5XaWR0aCAqIDUgLyA4ICYmIGN1ckxlZnRQb3NTdW4gPj0gc2VsZi5zY3JlZW5XaWR0aCAvIDIpe1xuICAgICAgICAgICAgc2VsZi5ib2R5LmNsYXNzTmFtZSA9ICdkYXkgbmlnaHQxJztcbiAgICAgICAgfSBlbHNlIGlmKGN1ckxlZnRQb3NTdW4gPCBzZWxmLnNjcmVlbldpZHRoIC8gMiAmJiBjdXJMZWZ0UG9zU3VuID49IHNlbGYuc2NyZWVuV2lkdGggKiAzIC8gOCl7XG4gICAgICAgICAgICBzZWxmLmJvZHkuY2xhc3NOYW1lID0gJ2RheSBuaWdodDEgbmlnaHQyJztcbiAgICAgICAgfSBlbHNlIGlmKGN1ckxlZnRQb3NTdW4gPCBzZWxmLnNjcmVlbldpZHRoICogMyAvIDggJiYgY3VyTGVmdFBvc1N1biA+PSBzZWxmLnNjcmVlbldpZHRoIC8gNCkge1xuICAgICAgICAgICAgc2VsZi5ib2R5LmNsYXNzTmFtZSA9ICdkYXkgbmlnaHQxIG5pZ2h0MiBuaWdodDMnO1xuICAgICAgICB9IGVsc2UgaWYoY3VyTGVmdFBvc1N1biA8IHNlbGYuc2NyZWVuV2lkdGggLyA0ICYmIGN1ckxlZnRQb3NTdW4gPj0gc2VsZi5zY3JlZW5XaWR0aCAvIDgpIHtcbiAgICAgICAgICAgIHNlbGYuYm9keS5jbGFzc05hbWUgPSAnZGF5IG5pZ2h0MSBuaWdodDIgbmlnaHQzIG5pZ2h0NCc7XG4gICAgICAgIH0gZWxzZSBpZihjdXJMZWZ0UG9zU3VuIDwgc2VsZi5zY3JlZW5XaWR0aCAvIDggJiYgY3VyTGVmdFBvc1N1biA+PSAwKXtcbiAgICAgICAgICAgIHNlbGYuYm9keS5jbGFzc05hbWUgPSAnZGF5IG5pZ2h0MSBuaWdodDIgbmlnaHQzIG5pZ2h0NCBuaWdodDUnO1xuICAgICAgICB9IGVsc2UgaWYoY3VyTGVmdFBvc1N1biA8IDAgJiYgY3VyTGVmdFBvc1N1biA+PSAtc2VsZi5lbGVtV2lkdGggKiAyKXtcbiAgICAgICAgICAgIHNlbGYuYm9keS5jbGFzc05hbWUgPSAnZGF5IG5pZ2h0MSBuaWdodDIgbmlnaHQzIG5pZ2h0NCBuaWdodDUgbmlnaHQ2JztcbiAgICAgICAgfSBlbHNlIGlmKGN1ckxlZnRQb3NTdW4gPCAtc2VsZi5lbGVtV2lkdGggKiAyICYmIGN1ckxlZnRQb3NTdW4gPj0gLXNlbGYuZWxlbVdpZHRoICogMyl7XG4gICAgICAgICAgICBzZWxmLmJvZHkuY2xhc3NOYW1lID0gJ2RheSBuaWdodDEgbmlnaHQyIG5pZ2h0MyBuaWdodDQgbmlnaHQ1IG5pZ2h0NiBuaWdodDcnO1xuICAgICAgICB9IGVsc2UgaWYoY3VyTGVmdFBvc1N1biA8IC1zZWxmLmVsZW1XaWR0aCAqIDMpe1xuICAgICAgICAgICAgc2VsZi5ib2R5LmNsYXNzTmFtZSA9ICdkYXkgbmlnaHQxIG5pZ2h0MiBuaWdodDMgbmlnaHQ0IG5pZ2h0NSBuaWdodDYgbmlnaHQ3IG5pZ2h0OCc7XG4gICAgICAgIH1cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWxmLnNoYWRvdy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHZhciBwb2ludHNTaGFkb3cgPSBzZWxmLnNoYWRvd1tpXS5nZXRBdHRyaWJ1dGUoJ3BvaW50cycpLFxuICAgICAgICAgICAgYXJyUG9pbnRzU2hhZG93ID0gcG9pbnRzU2hhZG93LnNwbGl0KCcgJyksXG4gICAgICAgICAgICBzaGFkb3dOdW1YID0gcGFyc2VJbnQoYXJyUG9pbnRzU2hhZG93WzJdLnNwbGl0KCcsJylbMF0pLFxuICAgICAgICAgICAgc2hhZG93TnVtWSA9IGFyclBvaW50c1NoYWRvd1syXS5zcGxpdCgnLCcpWzFdLFxuICAgICAgICAgICAgc3RyUG9pbnRzU2hhZG93O1xuXG4gICAgICAgIHNoYWRvd051bVggKz0gMSAqIHNoYWRvd1g7XG4gICAgICAgIGFyclBvaW50c1NoYWRvdy5zcGxpY2UoMiwgMSwgc2hhZG93TnVtWCArICcsJyArIHNoYWRvd051bVkpO1xuICAgICAgICBzdHJQb2ludHNTaGFkb3cgPSBhcnJQb2ludHNTaGFkb3cuam9pbignICcpO1xuICAgICAgICBzZWxmLnNoYWRvd1tpXS5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIHN0clBvaW50c1NoYWRvdyk7XG4gICAgfVxuXG59O1xuXG5TdW4ucHJvdG90eXBlLnN1bkluaXQgPSBmdW5jdGlvbigpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiggL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICkge1xuICAgICAgICBzZWxmLm1vdmVIYW5kbGVyTW9iaWxlLmNhbGwoc2VsZik7XG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAkLnRocm90dGxlKDI1MCwgdHJ1ZSwgc2VsZi5tb3ZlSGFuZGxlci5iaW5kKHNlbGYpKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICQudGhyb3R0bGUoMjUwLCB0cnVlLCBzZWxmLmtleVN1bkhhbmRsZXIuYmluZChzZWxmKSkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLmVsZW1XaWR0aCA9IHNlbGYuZWxlbS5jbGllbnRXaWR0aDtcbiAgICAgICAgc2VsZi5zY3JlZW5XaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN1bjsiLCJ2YXIgYm9keUhlaWdodCA9IHtcbiAgICBib2R5SGVpZ2h0SW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkYm9keSA9ICQoJ2JvZHknKTtcblxuICAgICAgICBpZiAoISRib2R5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSApIHtcbiAgICAgICAgICAgICRib2R5LmNzcygnaGVpZ2h0JywgJCh3aW5kb3cpLmhlaWdodCgpKTtcbiAgICAgICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkYm9keS5jc3MoJ2hlaWdodCcsICQod2luZG93KS5oZWlnaHQoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRpc2FibGUgZGVmYXVsdCBiZWhhdmlvciBvbiBpT1NcbiAgICAgICAgZG9jdW1lbnQub250b3VjaG1vdmUgPSBmdW5jdGlvbihldmVudCl7XG5cdFx0ICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJvZHlIZWlnaHQ7IiwidmFyIGNhYmluID0ge1xuICAgIGNhYmluSW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkY2FiaW5XcmFwID0gJCgnLmZlcnJpcy1jYWJpbicpO1xuXG4gICAgICAgIGlmICghJGNhYmluV3JhcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRjYWJpbldyYXAub24oJ2RibGNsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYWJpbkhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZXZlbnRPYmplY3Qpe1xuICAgICAgICAgICAgaWYoZXZlbnRPYmplY3Qud2hpY2ggPT0gMzIpe1xuICAgICAgICAgICAgICAgICQoXCIuZmVycmlzLWNhYmluXCIpLmVhY2goZnVuY3Rpb24oaW5keCl7XG4gICAgICAgICAgICAgICAgICBjYWJpbkhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmNsb3VkcyAuZmVycmlzLWNhYmluJykuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2FiaW5IYW5kbGVyKCl7XG4gICAgICAgICAgICB2YXIgY2FiaW5Ub3AgPSAkKHRoaXMpLm9mZnNldCgpLnRvcCxcbiAgICAgICAgICAgICAgICBjYWJpbkxlZnQgPSAkKHRoaXMpLm9mZnNldCgpLmxlZnQsXG4gICAgICAgICAgICAgICAgcm9hZFRvcCA9ICQoJy5yb2FkLWhvbGRlcicpLm9mZnNldCgpLnRvcCxcbiAgICAgICAgICAgICAgICBjYWJpbkNsb25lID0gJCh0aGlzKS5jbG9uZSgpLFxuICAgICAgICAgICAgICAgIGNsb3Vkc1dyYXAgPSAkKCcuY2xvdWRzJyk7XG5cbiAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIGNsb3Vkc1dyYXAuYXBwZW5kKGNhYmluQ2xvbmUpO1xuICAgICAgICAgICAgY2FiaW5DbG9uZS5jc3Moe1xuICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgJ3RvcCc6IGNhYmluVG9wLFxuICAgICAgICAgICAgICAgICdsZWZ0JzogY2FiaW5MZWZ0LFxuICAgICAgICAgICAgICAgICdtYXgtd2lkdGgnOiAnMy4xNXZ3JyxcbiAgICAgICAgICAgICAgICAnbWF4LWhlaWdodCc6ICc2M3B4JyxcbiAgICAgICAgICAgICAgICAnei1pbmRleCc6ICcyJ1xuICAgICAgICAgICAgfSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgdG9wOiByb2FkVG9wIC0gcGFyc2VJbnQoJCh0aGlzKS5oZWlnaHQoKSkgKyAncHgnXG4gICAgICAgICAgICB9LCAxMDAwLCAnZWFzZU91dEJvdW5jZScpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNhYmluOyIsInZhciBoaWRlU2Nyb2xsSWNvID0ge1xuICAgIGhpZGVTY3JvbGxJY29Jbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRzY3JvbGxEb3duID0gJCgnLnNjcm9sbC1kb3duJyk7XG5cbiAgICAgICAgaWYgKCEkc2Nyb2xsRG93bi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgKSB7XG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgaGlkZVNjcm9sbEltYWdlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2JvZHknKS5vbignd2hlZWwga2V5dXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGhpZGVTY3JvbGxJbWFnZShlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGlkZVNjcm9sbEltYWdlKGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkc2Nyb2xsRG93bi5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGlkZVNjcm9sbEljbzsiLCJ2YXIgcGxhbmUgPSB7XG4gICAgcGxhbmVJbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRwbGFuZUJ0biA9ICQoJy5wbGFuZS1idG4nKTtcblxuICAgICAgICBpZiAoISRwbGFuZUJ0bi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRwbGFuZUJ0bi5vbignZGJsY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgJCgnLnBsYW5lJykuYWRkQ2xhc3MoJ2ZseScpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoJy5wbGFuZScpLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICB9LCAxMjAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFuZTsiLCJ2YXIgc291bmRDb250cm9sID0ge1xuICAgIHNvdW5kQ29udHJvbEluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHNvdW5kQnRuID0gJCgnLnNvdW5kLWljbycpLFxuICAgICAgICAgICAgJHNvdW5kSW1nID0gJHNvdW5kQnRuLmZpbmQoJ2ltZycpLFxuICAgICAgICAgICAgJHNvdW5kV3JhcCA9ICRzb3VuZEJ0bi5jbG9zZXN0KCcuc291bmQnKSxcbiAgICAgICAgICAgICRhdWRpbyA9ICRzb3VuZFdyYXAuZmluZCgnLmF1ZGlvJylbMF07XG5cbiAgICAgICAgaWYgKCEkc291bmRCdG4ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkc291bmRCdG4ub24oJ2NsaWNrJywgc291bmRPbk9mZkhhbmRsZXIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNvdW5kT25PZmZIYW5kbGVyKCkge1xuICAgICAgICAgICAgc291bmRPbk9mZigpO1xuICAgICAgICAgICAgaWYoISRzb3VuZFdyYXAuaGFzQ2xhc3MoJ3NvdW5kLW9mZicpKXtcbiAgICAgICAgICAgICAgICAkc291bmRJbWcuYXR0cignc3JjJywgJ2Fzc2V0cy9pbWFnZXMvc291bmQtb2ZmLnN2ZycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc291bmRJbWcuYXR0cignc3JjJywgJ2Fzc2V0cy9pbWFnZXMvc291bmQuc3ZnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc291bmRXcmFwLnRvZ2dsZUNsYXNzKCdzb3VuZC1vZmYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNvdW5kT25PZmYoKXtcbiAgICAgICAgICAgIGlmKCRhdWRpby5wYXVzZWQpe1xuICAgICAgICAgICAgICAgICRhdWRpby5wbGF5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhdWRpby5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNvdW5kQ29udHJvbDsiLCJ2YXIgdHJhZmZpY0xpZ2h0ID0ge1xuICAgIHRyYWZmaWNMaWdodEluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHRyYWZmaWNMaWdodCA9ICQoJy50cmFmZmljLWxpZ2h0JyksXG4gICAgICAgICAgICB0aW1lcjtcblxuICAgICAgICBpZiAoISR0cmFmZmljTGlnaHQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiggL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICkge1xuICAgICAgICAgICAgJCgnYm9keScpLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzd2l0Y2hUTCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdib2R5Jykub24oJ3doZWVsIGtleXVwJywgc3dpdGNoVEwpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHN3aXRjaFRMKCkge1xuICAgICAgICAgICAgJHRyYWZmaWNMaWdodC5yZW1vdmVDbGFzcygnb2ZmJyk7XG4gICAgICAgICAgICAkdHJhZmZpY0xpZ2h0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkdHJhZmZpY0xpZ2h0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkdHJhZmZpY0xpZ2h0LmFkZENsYXNzKCdvZmYnKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRyYWZmaWNMaWdodDsiXX0=
