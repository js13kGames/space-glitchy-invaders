var spaceScene = Scene.extend({
	init : function(){
		this._super();
		
	},
	load : function(){
		this._super();
		g.clearColor	= '#000';
		
		this.linesColorBase 	= '#888';
		this.linesColorDamage 	= '#f00';
		this.linesColor 		= this.linesColorBase;
		
		// Create limits
		this.limW	= 1400;
		this.limH	= 1400;
		this.limits = [];
		this.limits.push(new Rectangle(-400, -400, 	this.limW +400, 	400,		'#00baff', 0.2));
		this.limits.push(new Rectangle(0,	1000, 	this.limW, 	400, 		'#00baff', 0.2));
		this.limits.push(new Rectangle(-400, 0, 	400, 		this.limH, 	'#00baff', 0.2));
		this.limits.push(new Rectangle(1000, 0, 	400, 		this.limH - 400, 	'#00baff', 0.2));
		
		// Load all resources
		this.player = new Player(50, 50, 12);
		this.addEntity(this.player);
		var invaders = 15;
		this.invadersLeft = invaders;
		for(var i = 0; i < invaders; ++i){
			this.enemy = new Enemy(rand(50, this.limW - 50), rand(50, this.limH - 50), 12, rand(0,2));
			this.addEntity(this.enemy);
		}

		this.HUDenergy		= new Message("", 2, '#fff');
		this.HUDcartridges	= new Message("", 2, '#fff');	
		this.HUDinvaders	= new Message("", 2, '#fff');	
		
		this.HUDpowerup		= new Message("", 2, '#fff');	
		
		this.HUDgameover	= new Message("Game Over", 5, '#fff');
		
		//this.energyBar	= new Rectangle(12, 74, 50, 8, '#00baff', 0.3);
		
		this.debug		= new Message("Debug", 5, '#fff');
		/*this.cx	= 250;
		this.code		= new Message("100101001", 3, '#444', 0.3);*/
		
		// Init shots arrays
		this.pShots = [];
		this.eShots = [];
		
		// Add buttons
		this.btnRetry 			= new Button(g.canvas.width / 2 - 40, g.canvas.height / 2 + 24, 80, 32, 'Retry', 3, {x : 26, y : 7});
		this.btnRetry.active 	= false;
		this.addButton(this.btnRetry);
		
		// Place player in a random position
		this.player.x = rand(24, g.canvas.width - 24);
		this.player.y = rand(24, g.canvas.height - 24);
		
		// Create glitches in texts
		this.gameOverTimer	= new Timer();
		this.gameOverTimer.start();
		
		this.shotColor 	= '#fff';
		this.shotDamage = 10;
		
		this.currentPowerup = "AAA";
		this.HUDpowerup.color = '#f0f';
		
		this.powerUpTimer = new Timer();		
		this.powerUpTimer.start();
		
		this.maxPowerUpTime = 1000;
		
		// Boss
		this.boss;   
	},
	update : function(){
		g.audio.play();
		// Draw background
		g.clearColor	= '#000';
		/*
		this.cx += 400 * g.delta;
		if(this.cx > g.canvas.width){
			this.cx = -100;
			this.cy = rand(10, canvas.height - 10);
		}
		this.code.draw(this.cx, this.cy);
		*/
		this.drawBackground(10, 10, 10, 50, 0.7);
		
		
		// Call parent
		this._super();
		
		// Check player collides with limit
		if(this.limits[0].pointIn(this.player)){
			g.clearColor	= '#fff';
			this.player.y	+= 5;
			this.player.v.y = -this.player.v.y;
			aa.play('collide');
		}
		if(this.limits[1].pointIn(this.player)){
			g.clearColor	= '#fff';
			this.player.y	-= 5;
			this.player.v.y = -this.player.v.y;
			aa.play('collide');
		}
		if(this.limits[2].pointIn(this.player)){
			g.clearColor	= '#fff';
			this.player.x	+= 5;
			this.player.v.x = -this.player.v.x;
			aa.play('collide');
		}
		if(this.limits[3].pointIn(this.player)){
			g.clearColor	= '#fff';
			this.player.x	-= 5;
			this.player.v.x = -this.player.v.x;
			aa.play('collide');
		}
		
		// Check enemies collides with limits or player
		for(var i = 0; i < this.entities.length; ++i){
			if(this.entities[i] instanceof Enemy){
				if(this.limits[0].pointIn(this.entities[i])){
					this.entities[i].y	+= 5;
					this.entities[i].v.y = -this.entities[i].v.y;
				}
				if(this.limits[1].pointIn(this.entities[i])){
					this.entities[i].y	-= 5;
					this.entities[i].v.y = -this.entities[i].v.y;
				}
				if(this.limits[2].pointIn(this.entities[i])){
					this.entities[i].x	+= 5;
					this.entities[i].v.x = -this.entities[i].v.x;
				}
				if(this.limits[3].pointIn(this.entities[i])){
					this.entities[i].x	-= 5;
					this.entities[i].v.x = -this.entities[i].v.x;
				}
				
				// Enemy Shot
		    	if(this.entities[i].distanceTo(this.player) < 350 && this.entities[i].timer.getElapsedTime() > this.entities[i].cadence && this.entities[i].life > 0  && this.player.energy > 0){ 
		    		this.entities[i].timer.reset();
		            var s = new Shot(this.entities[i].x, this.entities[i].y, 2, '#fff');
		            s.rotation  = angleToPlayer(s.x, s.y, this.player.x, this.player.y);
		            var spd = 45;
		            if(this.entities[i].type == 3){
		            	spd = 250;
		            }
		            s.speedX     = spd + Math.abs(this.entities[i].v.x);
		            s.speedY     = spd + Math.abs(this.entities[i].v.y);
		            this.eShots.push(s);
		        } 
			}
		}
		
		// Cam follow
		g.cam.follow(this.player);
		
		// Draw limits		
		this.limits[0].draw(true);
		this.limits[1].draw(true);
		this.limits[2].draw(true);
		this.limits[3].draw(true);
		
		// Player Shot
		if((g.pressing[g.keys.space] || g.mouse.down) && this.player.timerShoot.getElapsedTime() > 120 && this.player.energy > 0){ 
			
            this.player.timerShoot.reset();
            var s = new Shot(this.player.x, this.player.y, 2);
            s.rotation  = angleTo(this.player.x, this.player.y, g.mouse.x, g.mouse.y);
            s.speedX     = 320 + Math.abs(this.player.v.x);
            s.speedY     = 320 + Math.abs(this.player.v.y);
            s.damage	= this.shotDamage; // Test
            s.color		= this.shotColor;
            this.pShots.push(s);
            aa.play('laser');
        } 
		
		// Collision Enemy-Player
		for(var i = 0; i < this.entities.length; ++i){
        	if(this.entities[i] instanceof Enemy){        		
	            if(this.entities[i].distanceTo(this.player) < 0 && this.entities[i].life > 0  && this.player.energy > 0){		            	
	            	//this.player.v.y = -this.player.v.y;	  
	            	//this.player.v.x = -this.player.v.x;
	            	
	            	//this.entities[i].v.y = -this.entities[i].v.y;
					//this.entities[i].v.x = -this.entities[i].v.x;
					
	            	g.clearColor	= getRandomColor();
	            } 
        	}
		}
		
		// Collision PowerUp-Player
		for(var i = 0; i < this.entities.length; ++i){
        	if(this.entities[i] instanceof PowerUP){        		
	            if(this.entities[i].distanceTo(this.player) < 0){
	            	// Type of power up... do different things	
	            	this.resetPowerUps();
	            	this.powerUpTimer.reset();
	            	switch(this.entities[i].type){// TODO
	            		case 1:
	            			this.player.energy = 10;
	            			this.currentPowerup = "Energy Full";
	            			this.HUDpowerup.color = '#3498db';
	            		break;
	            		case 2:
	            			this.shotColor 	= '#e67e22';
	            			this.shotDamage = 25;
	            			this.currentPowerup = "Super SHOT";
	            			this.HUDpowerup.color = '#9b59b6';
	            		break;
	            		case 3:
	            			this.player.maxVel = 250;
	            			this.currentPowerup = "Super Vel";
	            			this.HUDpowerup.color = '#e74c3c';
	            		break;
	            		case 4:
	            			this.player.energy = 15;
	            			this.currentPowerup = "Super Energy";
	            			this.HUDpowerup.color = '#e67e22';
	            		break;
	            		case 5:
	            			this.player.energy = 10;
	            			this.currentPowerup = "Energy Full";
	            			this.HUDpowerup.color = '#1abc9c';
	            		break;
	            	}
					this.entities[i].active = false;
					aa.play('power_up');
	            } 
        	}
        }
		// Collision Player-Shot
		for(var i = 0, l = this.eShots.length; i < l; ++i){
			if(this.eShots[i].distanceTo(this.player) < 0 && this.player.damageTimer.getElapsedTime() > this.player.damageTime){
				aa.play('explosion');
				// Add damage
				this.player.addDamage(this.eShots[i].damage);
				
				// Effect
				g.clearColor	= '#fff';
				
				// Remove shot
                this.eShots.splice(j--,1); 
                l--; 
					
				// Game over
				if(this.player.energy <= 0){
					this.player.active 	= false;
					this.btnRetry.active = true;
				}else{
					// Move player to new location
					this.player.x = rand(24, g.canvas.width - 24);
					this.player.y = rand(24, g.canvas.height - 24);

					// Reset timer
					this.player.damageTimer.reset();
                }
			}
		}
		// Collision Enemy-Shot  
        for(var i = 0; i < this.entities.length; ++i){
        	if(this.entities[i] instanceof Enemy && this.entities[i].life > 0){
        		for(var j = 0, l = this.pShots.length; j < l; ++j){
		            if(this.entities[i].distanceTo(this.pShots[j]) < 0){
		            	// Add damage
		            	this.entities[i].addDamage(this.pShots[j].damage);
		            	
		            	// Draw debug message
		            	if(this.entities[i].life > 0){
		            		this.debug.draw(this.pShots[j].x - g.cam.x, this.pShots[j].y - g.cam.y);
		            	}
		            	
		            	// Counter
		            	if(this.entities[i].life <= 0 && this.entities[i].type !== 3){
		            		this.invadersLeft--;
		            		
		            		aa.play('explosion_enemy');
		            		//this.textHUD 	= new Message("Energy                          Cartridges fixed                Invaders " + this.invadersLeft, 2, '#fff');
		            		
		            		// Add power up if required
		            		if(rand(1, 10) > 8){
		            			var powerUP 		= new PowerUP(this.entities[i].x, this.entities[i].y);
		            			powerUP.rotation 	= angleToPlayer(this.entities[i].x, this.entities[i].y, this.player.x, this.player.y);
		            			powerUP.speedX     	= 64;
            					powerUP.speedY     	= 64;
            					powerUP.type 		= rand(1, 5);
		            			this.addEntity(powerUP);
		            		}
		            	}
		            	
		            	// Remove shot
		                this.pShots.splice(j--,1); 
		                l--; 
		                
		                // If last invader, spawn cartridge enemy
		                if(this.invadersLeft <= 0  && this.entities[i].type !== 3){
		                	this.boss 		= new Enemy(rand(50, this.limW - 50), rand(50, this.limH - 50), 12, 3);
							this.boss.active = true;
							this.addEntity(this.boss);	
		                }
		                
		                // Collision with last invader
		                if(this.entities[i].type === 3){
		                	if(this.entities[i].life <= 0){
		                		g.cartridgesLeft--;
		                		if(g.cartridgesLeft > 0){
			                		// Reset level with same values
			                		g.loadScene(spaceScene);
		                		}else{
		                			g.loadScene(endingScene);
		                		}
		                	}
		                }
		                
		            } 
        		}
        	}
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
		
		// Update and draw Enemy shots
		for(var i=0, l=this.eShots.length; i<l; i++){
			// Kill shoot if time or collides
			if(this.eShots[i].timer.getElapsedTime() > 2500){ 
				this.eShots.splice(i--,1); 
				l--; 
				continue; 
			} 
			this.eShots[i].color = getRandomColor();
			this.eShots[i].move(); 
			this.eShots[i].draw();
		}
		
		// Update HUD messages
		this.HUDenergy.update("Energy " + this.player.getEnergy());
		this.HUDcartridges.update("Cartridges to fix " +  g.cartridgesLeft);
		this.HUDinvaders.update("Invaders left " + this.invadersLeft);
		this.HUDpowerup.update(this.currentPowerup);
		
		// Title 1
		if(this.gameOverTimer.getElapsedTime() > 1000 && this.gameOverTimer.getElapsedTime() < 2000){			
			this.HUDgameover.glitchyX = rand(1, 10);
			this.HUDgameover.glitchyY = rand(1, 10);
		}
		if(this.gameOverTimer.getElapsedTime() > 2000){
			this.gameOverTimer.reset();
			this.HUDgameover.glitchyX = 0;
			this.HUDgameover.glitchyY = 0;
		}
		
		// Draw HUD
		this.drawHUD();
		
		if(this.player.energy >= 10)
			this.HUDenergy.color = '#0f0';
		if(this.player.energy > 6 && this.player.energy < 10)
			this.HUDenergy.color = '#e67e22';
		if(this.player.energy > 3 && this.player.energy < 5)
			this.HUDenergy.color = '#e74c3c';
		if(this.player.energy > 1 && this.player.energy < 3)
			this.HUDenergy.color = '#c0392b';
			
		this.HUDenergy.draw(12, 12);
		this.HUDcartridges.draw(250, 12);
		this.HUDinvaders.draw(550, 12);
		
		if(this.powerUpTimer.getElapsedTime() < this.maxPowerUpTime){
			this.HUDpowerup.draw(450, 12);
		}else{
			this.resetPowerUps();
		}
		
		
		if(this.player.energy <= 0){
			this.HUDgameover.draw(g.canvas.width / 2 - 100, g.canvas.height / 2 - 64);
			
		}
		
		// Draw minimap
		this.drawMiniMap();
		
		// Buttons actions
		if(this.btnRetry.clicked == true){
			g.loadScene(mainScene);
		}
	},
	drawBackground : function(velX, velY, lines, mov, a){
		g.ctx.save();
		
		g.ctx.globalAlpha     = a;
		g.ctx.shadowColor     = '#00baff';
	    g.ctx.shadowBlur      = 6;
	    g.ctx.shadowOffsetX   = 0;
	    g.ctx.shadowOffsetY   = 0;
	    g.ctx.strokeStyle     = this.linesColor;
	    g.ctx.lineWidth       = 2;
		/*
		var lines = 10,
		mov = 50;*/
		for(var i = 0; i < lines + 2; ++i){
			g.ctx.beginPath();
			g.ctx.moveTo(i * g.canvas.width / lines - this.player.x / velX, 0);
			g.ctx.lineTo(i * g.canvas.width / lines - this.player.x / velX, g.canvas.height);
			g.ctx.stroke();
		}
		for(var i = 0; i < lines + 2; ++i){
			g.ctx.beginPath();
			g.ctx.moveTo(0, 			 i * g.canvas.height / lines - this.player.y / velY);
			g.ctx.lineTo(g.canvas.width, i * g.canvas.height / lines - this.player.y / velY);
			g.ctx.stroke();
		}
		g.ctx.restore();
	},
	drawMiniMap : function(){
        var w = this.limW / 15, h = this.limH / 15, x = 7, y = g.canvas.height - 100;
        g.ctx.save();
        g.ctx.shadowColor     = '#00baff';
    	g.ctx.shadowBlur      = 4;
    	g.ctx.shadowOffsetX   = 0;
    	g.ctx.shadowOffsetY   = 0;
        g.ctx.fillStyle 	  = '#333';
        g.ctx.globalAlpha 	  = 0.9;
        g.ctx.fillRect(x, y, w, h);
        
        // Draw entities
        for(var i = 0; i < this.entities.length; ++i){
            if(this.entities[i] instanceof Enemy && this.entities[i].active === true){
            	if(this.entities[i].life > 0){
            		g.ctx.fillStyle = getRandomColor();
            	}else{
                	g.ctx.fillStyle = '#fff';
            	}
            }
            if(this.entities[i] instanceof Player){
            	g.ctx.fillStyle = '#666';
            	g.ctx.globalAlpha 	  = 0.3;
            	g.ctx.fillRect(this.entities[i].x / 10 + x - 22, this.entities[i].y / 10 + y - 17, 682 / 15, 512 / 15);
            	g.ctx.globalAlpha 	  = 1;
            	g.ctx.fillStyle = '#f0f';
            }
            
            g.ctx.fillRect(this.entities[i].x / 10 + x, this.entities[i].y / 10 + y, 2, 2);
            
        }
        
        g.ctx.restore();
    },
    drawHUD : function(){
    	g.ctx.save();
    	g.ctx.beginPath();    	
    	g.ctx.moveTo(0, 0);
    	
    	g.ctx.lineTo(0, 50);
    	g.ctx.lineTo(64, 35);
    	g.ctx.lineTo(g.canvas.width - 64, 35);
    	g.ctx.lineTo(g.canvas.width, 50);
    	g.ctx.lineTo(g.canvas.width, 0);
    	
    	g.ctx.fillStyle = '#2980b9';
    	g.ctx.fill();
    	g.ctx.restore();
    },
    resetPowerUps : function(){
    	this.shotColor 		= '#fff';
    	this.shotDamage 	= 10;
    	this.player.maxVel 	= 150;
    }
});