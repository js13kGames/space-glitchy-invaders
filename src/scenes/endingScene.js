var endingScene = Scene.extend({
	init : function(){
		this._super();
	},
	load : function(){
		this._super();
		
		// Load text
		this.lines = [];
		this.lines.push(new Message("Congratulations debugger!", 4, '#fff'));
		this.lines.push(new Message("You have saved the future of the company!", 4, '#fff'));
		this.lines.push(new Message("All cartridges are fixed and ", 4, '#fff'));
		this.lines.push(new Message("tons of fun are guaranteed", 4, '#fff'));
		this.lines.push(new Message("to the end users...", 4, '#fff'));
		this.lines.push(new Message("", 4, '#fff'));
		this.lines.push(new Message("May the debug force be with you", 4, '#fff'));
		
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
			g.loadScene(mainScene);
		}
	}
});