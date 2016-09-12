var Sprite = Class.extend({
    init : function(data, tileSize, color){
        this.data       = clone(data);
        this.tileSize   = tileSize;
        this.color      = color;
        this.cols       = this.data[0];
        this.rows       = this.data.length / this.cols;
        this.data.splice(0, 1);
    },
    
    draw: function(x, y){
    	g.ctx.save();
        var row = 0, col = 0;
        for(var i = 0; i < this.data.length; ++i){
            if(i % this.cols == 0){
                ++row;
                col = 0;
            }
            
            if(this.data[i] == 1){
                //ctx.translate((x * i)/*- cam.x*/, (y * row) /*- cam.y*/);
                g.ctx.fillStyle = this.color;
                g.ctx.fillRect(x + col * this.tileSize - g.cam.x, y + row * this.tileSize - g.cam.y, this.tileSize, this.tileSize);
            }
            ++col;
        }
        g.ctx.restore();
    }
});
