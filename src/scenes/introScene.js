var introScene = Scene.extend({
	init : function(){
		this._super();
	},
	load : function(){
		this._super();
		
		// Load text
		this.lines = [];
		this.lines.push(new Message("May 1978.", 4, '#fff'));
		this.lines.push(new Message("In a few days Space Invaders will", 4, '#fff'));
		this.lines.push(new Message("be released and lots of glitches", 4, '#fff'));
		this.lines.push(new Message("have been spotted in the final cartridges.", 4, '#fff'));
		this.lines.push(new Message("", 4, '#fff'));
		this.lines.push(new Message("Hurry up! There is no time!", 4, '#fff'));
		this.lines.push(new Message("", 4, '#fff'));
		this.lines.push(new Message("Get in the grid ", 4, '#fff'));
		this.lines.push(new Message("and debug as many", 4, '#fff'));
		this.lines.push(new Message("cartridges as you can!", 4, '#fff'));
		
		this.linesY = 0;
		
		// Create buttons		
		this.btnSkip = new Button(g.canvas.width - 92, g.canvas.height - 42, 80, 32, 'Skip', 3, {x : 24, y : 7});
		this.addButton(this.btnSkip);
		
		this.timer = new Timer();
		this.timer.start();
	},
	update : function(){
		this._super();
		
		this.linesY -= 10 * g.delta;
		
		for(var i = 0; i < this.lines.length; ++i){
			this.lines[i].draw(12, i * 28 + this.linesY + 250);
		}
		
		// Actions & draws
		if(this.btnSkip.clicked == true || this.timer.getElapsedTime() > 30000){
			g.loadScene(spaceScene);
		}
	}
});