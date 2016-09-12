var Circle = Class.extend({
    init : function(x, y, radius){
        this.x 		= x;
        this.y 		= y;
        this.radius = radius;
        this.speed		= 0;
        this.rotation   = 0; 
        this.maxVel     = 0;
        this.debug		= false;
        this.v			= {
    		x : 0,
    		y : 0,
        };
        this.active = true;
        this.color	= '#fff';
    },
    
    update : function(){  			
		
    },
    
    draw: function(){ 
        g.ctx.save();
        g.ctx.beginPath();
        g.ctx.arc(this.x - g.cam.x, this.y - g.cam.y, this.radius, 0, 2 * Math.PI, false);
        g.ctx.fillStyle = this.color;
        g.ctx.fill();
        g.ctx.restore();
        
        if(this.debug == true){
	        // Draw vx
	        g.ctx.save();
	        g.ctx.strokeStyle     = '#f00';
		    g.ctx.lineWidth       = 1;
	        g.ctx.beginPath();
			g.ctx.moveTo(this.x - g.cam.x, this.y	- g.cam.y);
			g.ctx.lineTo(this.x - g.cam.x, this.y + this.v.y	- g.cam.y);
			g.ctx.stroke();
			
			// Draw vy
	        g.ctx.strokeStyle     = '#00f';
	        g.ctx.beginPath();
			g.ctx.moveTo(this.x	- g.cam.x,  				this.y - g.cam.y);
			g.ctx.lineTo(this.x + this.v.x	- g.cam.x, 	this.y - g.cam.y);
			g.ctx.stroke();
			g.ctx.restore();
        }
    },
    
    move: function(angle){
        if(this.speed != null){ 
            this.x += Math.cos(angle) * this.speed * g.delta; 
            this.y += Math.sin(angle) * this.speed * g.delta; 
        }
    },
    
    distanceTo: function(circle){ 
        var dx = this.x - circle.x; 
        var dy = this.y - circle.y; 
        return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius)); 
    },
    angleTo: function(cx, cy, ex, ey) {
        var dy = ey - cy + g.cam.y;
        var dx = ex - cx + g.cam.x;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta + 90;
    }
    /*
    collidesWith: function(circle){
        if(this.distanceTo(circle) <= 0){
            return true;
        }
        return false;
    },
    
    , 

    angleTo: function(cx, cy, ex, ey) {
        var dy = ey - cy + cam.y;
        var dx = ex - cx + cam.x;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta + 90;
    },
    
    angleTo2: function(circle){
        return Math.atan2(circle.y - this.y, circle.x - this.x);
    }*/
});