var PowerUP = Circle.extend({
    init : function(x, y){
        this.x = x;
        this.y = y;
        this.radius = 16;
        this.rotation = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.timer      = new Timer();
        this.timer.start();
        this.color = '#f0f';
        this.active = true;
        this.type	= 1;
        this.message	= new Message("P", 3, '#fff');
    },
    update : function(){
    	this.move();
    	if(this.timer.getElapsedTime() > 4000){
    		this.active = false;
    	}
    	
    	// Change color depending on power up
    	switch(this.type){
    		case 1:
    			this.color = '#3498db';
    		break;
    		case 2:
    			this.color = '#9b59b6';
    		break;
    		case 3:
    			this.color = '#e74c3c';
    		break;
    		case 4:
    			this.color = '#e67e22';
    		break;
    		case 5:
    			this.color = '#1abc9c';
    		break;
    	}
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
        this.message.draw(this.x - g.cam.x - 4, this.y - g.cam.y - 6);  	
    }
});
    