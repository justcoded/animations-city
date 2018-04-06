function Sun(selector){
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

Sun.prototype.moveHandler = function(e){
    var self = this,
        delta = e.deltaY || e.originalEvent.wheelDelta || e.wheelDelta,
        speed = 50,
        shadowXPlus = 1,
        shadowXMinus = -1;

    if(delta > 0){
        self.moveSun(-speed, shadowXPlus);
    } else {
        self.moveSun(speed, shadowXMinus);
    }
};

Sun.prototype.keySunHandler = function(e){
    var self = this,
        speed = 50,
        shadowXPlus = 1,
        shadowXMinus = -1;

    if(e.keyCode == 38){
        self.moveSun(-speed, shadowXPlus);
    } else if(e.keyCode == 40) {
        self.moveSun(speed, shadowXMinus);
    }
};

Sun.prototype.moveHandlerMobile = function(){
    var self = this,
        touchstartY = 0,
        touchendY = 0,
        speed = 30,
        shadowXPlus = 1,
        shadowXMinus = -1;

    document.body.addEventListener('touchstart', function(e){
        touchstartY = e.changedTouches[0].screenY;
    });

    document.body.addEventListener('touchend', function(e){
        touchendY = e.changedTouches[0].screenY;
        if (touchendY < touchstartY) {
            self.moveSun(-speed, shadowXPlus);
        } else if (touchendY > touchstartY) {
            self.moveSun(speed, shadowXMinus);
        }
    });
};

Sun.prototype.moveSun = function(speed, shadowX){
    var self = this,
        curLeftPosSun = self.elem.getBoundingClientRect().left,
        curLeftPosMoon = self.moon.getBoundingClientRect().left;

        self.curPosSun = self.curPosSun + speed;
        self.elem.style.transform = 'translateX(' + self.curPosSun + 'px)';
        self.curPosMoon = self.curPosMoon + speed;
        self.moon.style.transform = 'translateX(' + self.curPosMoon + 'px)';

        if(curLeftPosSun >= self.screenWidth * 5 / 8){
            self.body.className = 'day';
        } else if(curLeftPosSun < self.screenWidth * 5 / 8 && curLeftPosSun >= self.screenWidth / 2){
            self.body.className = 'day night1';
        } else if(curLeftPosSun < self.screenWidth / 2 && curLeftPosSun >= self.screenWidth * 3 / 8){
            self.body.className = 'day night1 night2';
        } else if(curLeftPosSun < self.screenWidth * 3 / 8 && curLeftPosSun >= self.screenWidth / 4) {
            self.body.className = 'day night1 night2 night3';
        } else if(curLeftPosSun < self.screenWidth / 4 && curLeftPosSun >= self.screenWidth / 8) {
            self.body.className = 'day night1 night2 night3 night4';
        } else if(curLeftPosSun < self.screenWidth / 8 && curLeftPosSun >= 0){
            self.body.className = 'day night1 night2 night3 night4 night5';
        } else if(curLeftPosSun < 0 && curLeftPosSun >= -self.elemWidth * 2){
            self.body.className = 'day night1 night2 night3 night4 night5 night6';
        } else if(curLeftPosSun < -self.elemWidth * 2 && curLeftPosSun >= -self.elemWidth * 3){
            self.body.className = 'day night1 night2 night3 night4 night5 night6 night7';
        } else if(curLeftPosSun < -self.elemWidth * 3){
            self.body.className = 'day night1 night2 night3 night4 night5 night6 night7 night8';
        }

    for(var i = 0; i < self.shadow.length; i++){
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

Sun.prototype.sunInit = function(){
    var self = this;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        self.moveHandlerMobile.call(self);
    }
    document.body.addEventListener('wheel', $.throttle(250, true, self.moveHandler.bind(self)));
    document.body.addEventListener('keyup', $.throttle(250, true, self.keySunHandler.bind(self)));
    window.addEventListener('resize', function(){
        self.elemWidth = self.elem.clientWidth;
        self.screenWidth = document.documentElement.clientWidth;
    });
};

export default Sun;