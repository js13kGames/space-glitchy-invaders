var Player = Circle.extend({
    init : function(x, y, radius){
        this._super(x, y, radius);
        
        this.maxVel 	= 150;
        this.acc		= 250;
        this.debug 		= false;
        
        this.timerShoot	= new Timer();
        this.timerShoot.start();
        
        this.damageTimer = new Timer();
        this.damageTimer.start();
        
        this.energy		= 10;
        
        this.sColorOriginal = '#00baff';
        this.sColor 		= this.sColorOriginal;
        
        this.shipColorOriginal = '#ecf0f1';
        this.shipColor 		= this.shipColorOriginal;
        
        this.damageTime		= 2500;

    },
    update : function(){
    	if(this.damageTimer.getElapsedTime() < this.damageTime){
    		this.sColor 	= getRandomColor();
    		this.shipColor 	= this.sColor;
    	}else{
    		this.sColor 		= this.sColorOriginal;
    		this.shipColor 		= this.shipColorOriginal;
    	}
    	
    	//this._super();
    	// Apply vectors
		this.x += this.v.x * g.delta;
		this.y += this.v.y * g.delta;
    	
    	// Move
    	if(g.pressing[g.keys.w]){
			this.v.y -= this.acc * g.delta;
			if(this.v.y < -this.maxVel) {
				this.v.y = -this.maxVel;
			}
		}else if(g.pressing[g.keys.s]){
			this.v.y += this.acc * g.delta;
			if(this.v.y > this.maxVel) {
				this.v.y = this.maxVel;
			}
		}else{
			// Deaccelerate
	    	this.v.y *= 0.97;
		}
    	
		if(g.pressing[g.keys.a]) {
			this.v.x -= this.acc * g.delta;
			if(this.v.x < -this.maxVel) {
				this.v.x = -this.maxVel;
			}
		}else if(g.pressing[g.keys.d]) {
			this.v.x += this.acc * g.delta;
			if(this.v.x > this.maxVel) {
				this.v.x = this.maxVel;
			}
		}else{
			// Deaccelerate
			this.v.x *= 0.97;
		}
    },
    draw : function(){
    	// Exterior halo
    	g.ctx.save();
    	g.ctx.globalAlpha = 1;
    	g.ctx.shadowColor     = this.sColor;
    	g.ctx.shadowBlur      = 6;
    	g.ctx.shadowOffsetX   = 0;
    	g.ctx.shadowOffsetY   = 0;
    	g.ctx.beginPath();
    	g.ctx.arc(this.x - g.cam.x, this.y - g.cam.y, this.radius, 0, 2 * Math.PI, false);
    	g.ctx.fillStyle = '#061012';
    	g.ctx.fill();
    	g.ctx.restore();
    	
    	// Ship
    	var cX = this.x - g.cam.x,
    		cY = this.y - g.cam.y;
    	
    	
    	var rotation = (angleTo(this.x, this.y, g.mouse.x, g.mouse.y) * Math.PI / 180) + 90;

    	g.ctx.save();
    	g.ctx.beginPath();    
    	g.ctx.translate(cX, cY);
    	g.ctx.rotate(rotation);
    	g.ctx.moveTo(0, 8);
    	g.ctx.lineTo(8 , 4);
    	g.ctx.lineTo(-3 , -8);
    	g.ctx.lineWith = 6;
    	g.ctx.fillStyle = this.shipColor;
    	g.ctx.fill();
    	g.ctx.restore();
    	
    	g.ctx.save();
    	g.ctx.beginPath();    
    	g.ctx.translate(cX, cY);
    	g.ctx.rotate(rotation);
    	g.ctx.moveTo(0, 4);
    	g.ctx.lineTo(4 , 2);
    	g.ctx.lineTo(-1.5 , -4);
    	g.ctx.lineWith = 1;
    	g.ctx.fillStyle = '#000';
    	g.ctx.fill();
    	g.ctx.restore();
    	
    },
    getEnergy : function(){
    	var result = "";
    	for(var i = 0; i < this.energy; ++i){
    		result += "1";
    	}
    	return result;
    },
    addDamage: function(value){
        if(this.energy > 0){
            // Add damage
            if(this.energy > 0)
                this.energy -= value;
            if(this.energy < 0)
                this.energy = 0;

            if(this.energy <= 0){
            }
        }
    }
});