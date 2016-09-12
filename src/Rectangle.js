var Rectangle = Class.extend({
    init : function(x, y, w, h, c, a){
        this.x              = x;
        this.y              = y;
        this.w              = w;
        this.h              = h;
        this.c				= c;
        this.a 				= a;
    },
    
    intersectsAABB : function(rect){
        return (
        this.x < rect.x + rect.w &&
        this.x + this.w > rect.x &&
        this.y < rect.y + rect.h &&
        this.h + this.y > rect.y);
    },
    
    pointIn : function(point){
    	return (
		this.x 			< point.x &&
        this.x + this.w > point.x &&
        this.y 			< point.y &&
        this.h + this.y > point.y);
    },
    
    draw : function(useCam){
    	g.ctx.save();
    	g.ctx.globalAlpha = this.a;
    	if(useCam === undefined)
    		g.ctx.translate(this.x , this.y);
    	else if (useCam == true)
    		g.ctx.translate(this.x - g.cam.x, this.y - g.cam.y);
    	g.ctx.fillStyle = this.c;
    	g.ctx.fillRect(0, 0, this.w, this.h);
    	g.ctx.restore();
    }
});