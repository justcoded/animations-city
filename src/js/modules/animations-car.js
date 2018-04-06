function Car(selector, screenWidth){
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

Car.prototype.drive = function(e){
    var self = this,
        delta = e.deltaY || e.originalEvent.wheelDelta || e.wheelDelta,
        deltaMouseWheelPlus = 1,
        deltaMouseWheelMinus = -1;

    if(self.flag){
        return;
    }

    if(delta > 0){
        self.wheelDeg += 75;
        self.wheelFunc(deltaMouseWheelMinus);
    } else{
        self.wheelDeg -= 75;
        self.wheelFunc(deltaMouseWheelPlus);
    }
};

Car.prototype.keyHandler = function(e){
    var self = this,
        deltaMouseWheelPlus = 1,
        deltaMouseWheelMinus = -1;

    if(self.flag){
        return;
    }

    if(e.keyCode == 38){
        self.wheelDeg += 75;
        self.wheelFunc(deltaMouseWheelMinus);
    } else if(e.keyCode == 40){
        self.wheelDeg -= 75;
        self.wheelFunc(deltaMouseWheelPlus);
    }
};

Car.prototype.driveMobile = function(){
    var self = this,
        touchstartY = 0,
        touchendY = 0,
        deltaMouseWheelPlus = 1,
        deltaMouseWheelMinus = -1;

    if(self.flag){
        return;
    }

    document.body.addEventListener('touchstart', function(e){
        touchstartY = e.changedTouches[0].screenY;
    });

    document.body.addEventListener('touchend', function(e){
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

Car.prototype.touchHandler = function(e){
    var self = this;

    var touchStartY = e.changedTouches[0].pageY;
    if(touchStartY < touchStartY){
        self.wheelFunc(deltaMouseWheelMinus);
    } else {
        self.wheelFunc(deltaMouseWheelPlus);
    }
};

Car.prototype.wheelFunc = function(delta){
    var self = this,
        counter,
        curLeft = self.elem.getBoundingClientRect().left,
        left100 = '110%',
        leftClientWidth = '-' + parseInt(self.carWidth) + 'px',
        leftClientWidth2 = '-' + parseInt(self.carWidth) * 2 + 'px';

    self.curPos = self.curPos + self.speed * delta;
    self.elem.style.transform = 'translateX(' + self.curPos + 'px)';

    if((self.direction == self.DIRECT_LEFT && curLeft + parseInt(self.carWidth) < 0) || (self.direction == self.DIRECT_RIGHT && curLeft - parseInt(self.carWidth) > self.screenWidth)){

        self.wheelHelper(left100, leftClientWidth2);

    } else if((self.direction == self.DIRECT_LEFT && curLeft - parseInt(self.carWidth) > self.screenWidth) || (self.direction == self.DIRECT_RIGHT && curLeft + parseInt(self.carWidth) * 2 < 0)){

        self.wheelHelper(leftClientWidth, left100);

    }

    for(counter = 0; counter < self.wheels.length; counter++){
        if(self.direction === 'right'){
            self.wheels[counter].style.transform = 'rotate(' + self.wheelDeg + 'deg)';
        } else if(self.direction === 'left') {
            self.wheels[counter].style.transform = 'rotate(' + -self.wheelDeg + 'deg)';
        }
    }

};

Car.prototype.wheelHelper = function(leftDirect, rightDirect){
    var self = this;
    self.flag = true;
    self.elem.style.transitionDuration = '0s';
    if(self.direction == self.DIRECT_LEFT){
        self.elem.style.left = leftDirect;
    } else if(self.direction == self.DIRECT_RIGHT){
        self.elem.style.left = rightDirect;
    }
    self.elem.style.transform = 'translateX(0)';
    self.curPos = 0;
    setTimeout(function(){
        self.elem.style.transitionDuration = '0.3s';
        self.flag = false;
    }, 0);
};

Car.prototype.carInit = function(){
    var self = this;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        self.driveMobile.call(self);
    }
    document.body.addEventListener('wheel', $.throttle(250, true, self.drive.bind(self)));
    document.body.addEventListener('keyup', $.throttle(250, true, self.keyHandler.bind(self)));
    window.addEventListener('resize', function(){
        self.carWidth = self.elem.clientWidth;
        self.screenWidth = document.documentElement.clientWidth;
    });
};

export default Car;