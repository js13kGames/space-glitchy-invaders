var Button = Class.extend({
    init : function(x, y, width, height, text, textSize, correction){
    	this.x 		= x;
    	this.y 		= y;
    	this.width 	= width;
    	this.height = height;
    	this.text 	= new Message(text, textSize, '#ecf0f1');
    	this.hover	= false;
    	this.clicked= false;
    	this.active	= true;
    	this.correction = correction;
    	g.buttons.push(this);
    },
    update : function(){
    	var rect = {x:this.x, y:this.y, w:this.width, h:this.height};
    	if(pointInRect(rect, g.mouse)){
    		this.hover = true;
    	}else{
    		this.hover = false;
    	}
    	
    	if(this.hover == true && g.mouse.down == true){
    		this.clicked = true;
    		aa.play('click');
    	}else{
    		this.clicked = false;
    	}
    },
    draw : function(){
    	g.ctx.save();
    	g.ctx.translate(this.x, this.y);  
    	g.ctx.beginPath();
    	g.ctx.rect(0, 0, this.width, this.height);
        
    	g.ctx.shadowColor     = '#00baff';
    	g.ctx.shadowBlur      = 4;
    	g.ctx.shadowOffsetX   = 0;
    	g.ctx.shadowOffsetY   = 0;
        
        if(this.hover == false){
        	g.ctx.fillStyle = '#01080E';	        
        	g.ctx.fill();
	        
        	g.ctx.lineWidth = 2;
        	g.ctx.strokeStyle = '#0C2032';
        	g.ctx.stroke();
	        
	        this.text.draw(this.width / 2 - this.correction.x, this.height / 2 - this.correction.y);
        }else{
        	g.ctx.fillStyle = '#0C2032';
        	g.ctx.fill();
	        
        	g.ctx.lineWidth = 2;
        	g.ctx.strokeStyle = '#01080E';
        	g.ctx.stroke();
	        
	        this.text.draw(this.width / 2 - this.correction.x, this.height / 2 - this.correction.y + 1);
        }
        
        g.ctx.restore();
    }
});