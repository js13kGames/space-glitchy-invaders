var tutorialScene = Scene.extend({
	init : function(){
		this._super();
	},
	load : function(){
		this._super();
		
		// Load all resources
		this.player = new Player(canvas.width / 2, canvas.height / 2, 12);
		this.addEntity(this.player);
		
		// Create buttons
		this.btnBack = new Button(12, canvas.height - 42, 80, 32, 'Back', 3, {x : 24, y : 7});
		this.addButton(this.btnBack);
		
		this.btnA = new Button(64, 256, 32, 32, 'A', 3, {x : 5, y : 7});
		this.addButton(this.btnA);
		this.btnS = new Button(106, 256, 32, 32, 'S', 3, {x : 5, y : 7});
		this.addButton(this.btnS);
		this.btnD = new Button(148, 256, 32, 32, 'D', 3, {x : 5, y : 7});
		this.addButton(this.btnD);
		this.btnW = new Button(106, 214, 32, 32, 'W', 3, {x : 8, y : 7});
		this.addButton(this.btnW);
		
		this.btnM = new Button(480, 214, 32, 32, 'F', 3, {x : 5, y : 7});
		this.addButton(this.btnM);
		this.btnM2 = new Button(520, 214, 32, 32, '', 3, {x : 5, y : 7});
		this.addButton(this.btnM2);
		this.btnM3 = new Button(480, 250, 72, 64, '', 3, {x : 5, y : 7});
		this.addButton(this.btnM3);
		
		// Create glitches in texts
		this.title1timer	= new Timer();
		this.title1timer.start();
		
		// Texts in screen
		this.title1 	= new Message("Tutorial", 8, '#fff');
		this.text1 		= new Message("Move the ship                        Fire with mouse", 3, '#fff');
		
		// Settings
		g.clearColor	= '#000';
		
		// Create limits.
		this.limits = [];
		this.limits.push(new Rectangle(0, -64, canvas.width, 64));
		this.limits.push(new Rectangle(0,canvas.height, canvas.width, 64));
		this.limits.push(new Rectangle(-64, 0, 64,   canvas.height));
		this.limits.push(new Rectangle(canvas.width, 0, 64, canvas.height));
		
		// Init shots arrays
		this.pShots = [];
		
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
		
		// Actions & draws
		if(this.btnBack.clicked == true){
			g.loadScene(mainScene);
		}
		
		this.title1.draw(g.canvas.width / 2 - 124, 32);
		this.text1.draw(50, 170);
		
		// Check player collides with limit
		if(this.limits[0].pointIn(this.player)){
			this.player.v.y = -this.player.v.y;
		}
		if(this.limits[1].pointIn(this.player)){
			this.player.v.y = -this.player.v.y;
		}
		if(this.limits[2].pointIn(this.player)){
			this.player.v.x = -this.player.v.x;
		}
		if(this.limits[3].pointIn(this.player)){
			this.player.v.x = -this.player.v.x;
		}
		
		// Player Shot
		if((g.pressing[g.keys.space] || g.mouse.down) && this.player.timerShoot.getElapsedTime() > 120 && this.player.energy > 0){ 
            this.player.timerShoot.reset();
            var s = new Shot(this.player.x, this.player.y, 2);
            s.rotation  = angleTo(this.player.x, this.player.y, g.mouse.x, g.mouse.y);
            s.speedX     = 320 + Math.abs(this.player.v.x);
            s.speedY     = 320 + Math.abs(this.player.v.y);
            s.damage	= 10; // Test
            this.pShots.push(s);
            aa.play('laser');
        } 
		
		// Update and draw Player shots
		for(var i=0, l=this.pShots.length; i<l; i++){
			// Kill shoot if time or collides
			if(this.pShots[i].timer.getElapsedTime() > 1000){ 
				this.pShots.splice(i--,1); 
				l--; 
				continue; 
			} 
			
			this.pShots[i].move(); 
			this.pShots[i].draw();
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