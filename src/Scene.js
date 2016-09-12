var Scene = Class.extend({
	init : function(){
		this.id = g.scenes.length;
		this.isLoaded = false;
		g.scenes.push(this);
		this.cleft		= 0;
		this.buttons 	= [];
		this.entities 	= [];
		
	},
	load : function(){
	},	
	update : function() {
		// Update and draw all buttons
		for(var i = 0; i < this.buttons.length; ++i){
			if(this.buttons[i].active == true){
				this.buttons[i].update();
				this.buttons[i].draw();
			}
		}
		
		// Update and draw all entities
		for(var i = 0; i < this.entities.length; ++i){
			if(this.entities[i].active == true){
				this.entities[i].update();
				this.entities[i].draw();
			}
		}
	},
	addButton : function(btn){
		this.buttons.push(btn);
	},
	addEntity : function(entity){
		this.entities.push(entity);        
    },
});