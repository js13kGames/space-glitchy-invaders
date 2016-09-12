var mainScene = Scene.extend({
	init : function(){
		this._super();
		
		
	},
	load : function(){
		this._super();
		
		// Create buttons
		this.btnStart = new Button(g.canvas.width / 2 - 80, 260, 160, 32, 'Start', 3, {x : 28, y : 7});
		this.addButton(this.btnStart);
		/*this.btnMulti = new Button(g.canvas.width / 2 - 80, 310, 160, 32, 'Multiplayer', 3, {x : 68, y : 7});
		this.addButton(this.btnMulti);
		this.btnTutorial = new Button(g.canvas.width / 2 - 80, 360, 160, 32, 'Tutorial', 3, {x : 45, y : 7});
		this.addButton(this.btnTutorial);
		*/
		this.btnTutorial = new Button(g.canvas.width / 2 - 80, 310, 160, 32, 'Tutorial', 3, {x : 45, y : 7});
		this.addButton(this.btnTutorial);
		
		// Create glitches in texts
		this.title1timer	= new Timer();
		this.title1timer.start();
		this.title3timer	= new Timer();
		this.title3timer.start();
		
		// Texts in screen
		this.title1 	= new Message("Space", 		8, 	'#fff');
		this.title2 	= new Message("Glitchy", 	12, '#fff');
		this.title3 	= new Message("Invaders", 	8, 	'#fff');
		this.credits 	= new Message("Created by Marc Guinea for js13kgames 2016", 2, '#eee');
		
		// Settings
		//this.creditsX	= 0;
		//this.creditsVel	= 10
		g.clearColor	= '#000';
		
		
	},
	update : function(){
		
		this.drawBackground();
		

		this._super();
		
		// Title 1
		if(this.title1timer.getElapsedTime() > 1000 && this.title1timer.getElapsedTime() < 2000){			
			this.title1.glitchyX = rand(1, 10);
			this.title1.glitchyY = rand(1, 10);
		}
		if(this.title1timer.getElapsedTime() > 2000){
			this.title1timer.reset();
			this.title1.glitchyX = 0;
			this.title1.glitchyY = 0;
		}
		
		// Title 2
		this.title2.color = getRandomColor();
		
		// Title 3
		if(this.title3timer.getElapsedTime() > 1500 && this.title3timer.getElapsedTime() < 1550){			
			this.title3.text = "1NV4D3R2";
			this.title3.initText();
		}
		if(this.title3timer.getElapsedTime() > 1600){
			this.title3timer.reset();
			this.title3.text = "Invaders";
			this.title3.initText();
		}
		
		// Move credits
		//this.creditsX += this.creditsVel * g.delta;
		//if(this.creditsX > 32 || this.creditsX < 0) 	this.creditsVel = -this.creditsVel;
		
		this.title1.draw(canvas.width / 2 - 76, 32);
		this.title2.draw(canvas.width / 2 - 168, 96);
		this.title3.draw(canvas.width / 2 - 136, 180);
		this.credits.draw(/*this.creditsX*/6, canvas.height - 16);
		
		// Actions & draws
		if(/*g.pressing[87] || */this.btnStart.clicked == true){
			
			g.loadScene(introScene);
		}
		if(this.btnTutorial.clicked == true){
			g.loadScene(tutorialScene);
		}
	},
	drawBackground : function(){
		g.ctx.save();
		
		g.ctx.globalAlpha     = 0.7;
		g.ctx.shadowColor     = '#00baff';
	    g.ctx.shadowBlur      = 6;
	    g.ctx.shadowOffsetX   = 0;
	    g.ctx.shadowOffsetY   = 0;
	    g.ctx.strokeStyle     = '#888';
	    g.ctx.lineWidth       = 2;
		
		var lines = 10,
		mov = 50;
		for(var i = 0; i < lines+1; ++i){
			g.ctx.beginPath();
			g.ctx.moveTo(i * g.canvas.width / lines + g.mouse.x / mov, 0);
			g.ctx.lineTo(i * g.canvas.width / lines + g.mouse.x / mov, g.canvas.height);
			g.ctx.stroke();
		}
		for(var i = 0; i < lines+1; ++i){
			g.ctx.beginPath();
			g.ctx.moveTo(0, 			 i * g.canvas.height / lines + g.mouse.y / mov);
			g.ctx.lineTo(g.canvas.width, i * g.canvas.height / lines + g.mouse.y / mov);
			g.ctx.stroke();
		}
		g.ctx.restore();
	}
});