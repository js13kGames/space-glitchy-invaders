function  srand(){
    var x   = Math.sin(pg.seed++) * 10000;
    return x - Math.floor(x);
}

function  rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function  message(x, y, msg){
    var _msg = msg.toUpperCase();
    ctx.fillText(x, y, _msg);
}

function  getRandomColor(){
    return '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
}

function lerp(a, b, t){
    if(t > 1)
        return b;
    if(t < 0)
        return a;
    return a + t * (b - a);
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function pointInRect(rect, point){
	return (
    point.x < rect.x + rect.w 	&&
    point.x > rect.x 			&&
    point.y < rect.y + rect.h 	&&
    point.y > rect.y);
}

function  angleTo(cx, cy, ex, ey) {
    var dy = ey - cy + g.cam.y;
    var dx = ex - cx + g.cam.x;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

function  angleToPlayer(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

function distanceTo(a, b){// distance between two circles 
    var dx = a.x - b.x; 
    var dy = b.y - b.y; 
    return (Math.sqrt(dx*dx+dy*dy)-(a.radius + b.radius)); 
}