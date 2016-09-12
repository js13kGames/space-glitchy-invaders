var Shot = Class.extend({
    init : function(x, y, radius){    	
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rotation = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.timer      = new Timer();
        this.timer.start();
        this.damage	= 1;
        this.color = '#fff';
    },
    move : function(){
    	var angle = this.rotation * Math.PI/180;
    	this.x+=Math.cos(angle)*this.speedX * g.delta; 
    	this.y+=Math.sin(angle)*this.speedY * g.delta;
    },
    draw: function(){
        g.ctx.save();
        g.ctx.beginPath();
        g.ctx.arc(this.x - g.cam.x, this.y - g.cam.y, this.radius, 0, 2 * Math.PI, false);
        g.ctx.fillStyle =  this.color;
        g.ctx.fill();
        g.ctx.restore();    	
    },
    distanceTo: function(circle){ 
        var dx = this.x - circle.x; 
        var dy = this.y - circle.y; 
        return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius)); 
    }
});
    