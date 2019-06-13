//完美运动框架-- json的使用
//多个属性同时动

function getStyle(obj, name) {
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }
    else{
        return getComputedStyle(obj, false)[name];
    }
}

function startMove (obj, json, fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var beStop = true;
        for(var attr in json){
            var cur = 0;
                if(attr=='opacity'){
                    cur = Math.round(parseFloat(getStyle(obj, attr))*100);
                }
                else{
                    cur = parseInt(getStyle(obj, attr));
                }
                var speed = (json[attr]-cur)/6;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);

                 if(cur!=json[attr]){//如果不是所有值都到了目标点就不停止定时器
                     beStop=false;
                 }

                if(attr=='opacity'){
                   obj.style.filter = 'alpha(opacity:' + (cur+speed) + ')';
                   obj.style.opacity = (cur + speed)/100;
                }
                else{
                   obj.style[attr] = cur + speed + 'px';
                }
           }
            if(beStop){
                clearInterval(obj.timer);//当beStop=true 即所有值都到达目标点， 就关闭定时器
                if(fnEnd) fnEnd();
            }
    }, 30);
}
