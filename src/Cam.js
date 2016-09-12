var Cam = Class.extend({
    init : function(x, y){
        this.x          = x||0;
        this.y          = y||this.x;
        this.smoothing  = 5.0;
        this.offset     = 0;
        this.shakeTimer	= new Timer();
    },
    
    follow : function(target){
        // Create a postion the camera is aiming for based on the offset from the target.
        var targetCamPosX = (target.x + this.offset) - g.canvas.width / 2;
        var targetCamPosY = (target.y + this.offset) - g.canvas.height / 2;

        // Smoothly interpolate between the camera's current position and it's target position.
        //this.x = targetCamPosX;//lerp(this.x, targetCamPosX, this.smoothing * 0.01);
        //this.y = targetCamPosY;//lerp(this.y, targetCamPosY, this.smoothing * 0.01);
        this.x = lerp(this.x, targetCamPosX, this.smoothing * 0.01);
        this.y = lerp(this.y, targetCamPosY, this.smoothing * 0.01);
    },
    
    shake : function(){
    	//this.x = rand
    }
});