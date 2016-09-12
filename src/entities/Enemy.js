var Enemy = Circle.extend({
    init : function(x, y, radius, type){
    	this._super(x, y, radius);
        var sprites =
        [
	        [
	            11,
	            ,,1,,,,,,1,,,
	            ,,,1,,,,1,,,,
	            ,,1,1,1,1,1,1,1,,,
	            ,1,1,,1,1,1,,1,1,,
	            1,1,1,1,1,1,1,1,1,1,1,
	            1,,1,1,1,1,1,1,1,,1,
	            1,,1,,,,,,1,,1,
	            ,,,1,1,,1,1,,,
	        ],
	        [
	            8,
	            ,,,1,1,,,,
	            ,,1,1,1,1,,,
	            ,1,1,1,1,1,1,,
	            1,1,,1,1,,1,1,
	            1,1,1,1,1,1,1,1,
	            ,1,,1,1,,1,,
	            1,,,,,,,1,
	            ,1,,,,,1,
	        ],
	        [
	            12,
	            ,,,,1,1,1,1,,,,,
	            ,1,1,1,1,1,1,1,1,1,1,,
	            1,1,1,1,1,1,1,1,1,1,1,1,
	            1,1,1,,,1,1,,,1,1,1,
	            1,1,1,1,1,1,1,1,1,1,1,1,
	            ,,1,1,1,,,1,1,1,,,
	            ,1,1,,,1,1,,,1,1,,
	            ,,1,1,,,,,1,1,,
	        ],
	        [
	            16,
	            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	            1,1, , , , , , , , , , , , ,1,1,
	            1,1, , , , , , , , , , , , ,1,1,
	            1,1, , , , , , , , , , , , ,1,1,
	            1,1, , , , , ,1,1, , , , , ,1,1,
	            1,1, , , , ,1,1,1,1, , , , ,1,1,
	            1,1, , , , ,1,1,1,1, , , , ,1,1,
	            1,1, , , , , ,1,1, , , , , ,1,1,
	            1,1, , , , , , , , , , , , ,1,1,
	            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	        ]
        ];
        this.sprite = new Sprite(sprites[type], 3, '#fff');
        this.vel	= 50;
        this.setDirection(rand(-1, 1), rand(-1, 1));
        this.type = type;
        
        this.life = 100 + this.type * 10;
        if(this.type == 3){
        	this.life += 300;
        }
        
        
        this.timer      = new Timer();
        this.timer.start();
        this.tDead      = new Timer();
        
        this.timerDir	= new Timer();
        this.timerDir.start();
        
        this.cadence 	= 800;
        if(this.type == 3){
        	this.cadence = 150;
        }
        /*this.lifeBar		= new Circle(0, 0, 0);
        this.lifeBar.color	= '#2ecc71';*/
        this.lifeBar    = new Rectangle(0, 0, 10, 2, '#27ae60', 0.9);
    },
    update : function(){    	
    	this.x += this.v.x * g.delta;
		this.y += this.v.y * g.delta;
    	
    	// Update life bar
    	/*this.lifeBar.x = this.x;
    	this.lifeBar.y = this.y - 28;
    	this.lifeBar.radius = this.life / 10;*/
		this.lifeBar.w = this.life * 0.5;
		this.lifeBar.x = this.x - this.lifeBar.w / 2;
		this.lifeBar.y = this.y - this.radius * 1.6;
    	
    	// Update colors depending on state
    	if(this.life > 0){
            this.sprite.color = getRandomColor();
        }
        else{
            this.sprite.color = '#fff';
        }
    	
    	// Change position to random where random
    	if(this.timerDir.getElapsedTime() > rand(6000, 12000)){
    		this.timerDir.reset();
    		//this.v.y = -this.v.y;
			//this.v.x = -this.v.x;
    		this.setDirection(rand(-1, 1), rand(-1, 1));
    	}

    },
    draw : function(){
    	//this.lifeBar.draw();
    	this.lifeBar.draw(true);
    	switch(this.type){
    		case 0:
    			this.sprite.draw(this.x - 17, this.y - 16);
    		break;
    		case 1:
    			this.sprite.draw(this.x - 12, this.y - 16);
    		break;
    		case 2:
    			this.sprite.draw(this.x - 18, this.y - 16);
    		break;	
    		case 3:
    			this.sprite.draw(this.x - 24, this.y - 16);
    		break;	
    	}
    	
    },
    setDirection : function(vx, vy){
    	this.v.x = vx * this.vel;
    	this.v.y = vy * this.vel;
    },
    
    addDamage: function(value){
        if(this.life > 0){
            // Add damage
            if(this.life > 0)
                this.life -= value;
            if(this.life < 0)
                this.life = 0;

            if(this.life <= 0){
            	
                //invadersDebuged++;
                //this.tDead.reset();
            }
        }
    }
});