var mainScene = Scene.extend({
	init : function(){
		this._super();
		
		// Song data
		var song={songData:[{i:[2,255,128,0,1,154,116,9,0,0,15,4,49,0,0,0,84,4,1,2,53,25,7,32,39,3,45,4],p:[1,11,2,3,4,10,5,6,12],c:[{n:[142,,145,149,,142,145,,149,142,,149,142,,145,149,,142,145,,149,142,,149,130,,,,,118,,,,,,,130,,,,,130],f:[13,,,,,,,,,,,,,,,,,,,,,,,,40]},{n:[137,,140,144,,137,140,,144,137,,144,137,,140,144,,137,140,,144,137,,144,125,,,,,113,,,,,,,125,,,,,125],f:[]},{n:[144,,147,151,,144,147,,151,144,,151,144,,147,151,,144,147,,151,144,,151,132,,,,,120,,,,,,,132,,,,,132],f:[]},{n:[142,,145,149,,142,145,,149,142,,149,142,,145,149,,142,145,,149,142,,149,130,,,118,,118,130,,,118,,118,130,,,118,,118,130,,,118,,118],f:[13,,,,,,,,,,,,,,,,,,,,,,,,49]},{n:[137,,140,144,,137,140,,144,137,,144,137,,140,144,,137,140,,144,137,,144,125,,,113,,113,125,,,113,,113,125,,,113,,113,125,,,113,,113],f:[]},{n:[144,,147,151,,144,147,,151,144,,151,144,,147,151,,144,147,,151,144,,151,132,,,120,,120,132,,,120,,120,132,,,120,,120,132,,,120,,120],f:[]},{n:[],f:[]},{n:[],f:[]},{n:[],f:[]},{n:[142,,144,149,,142,144,,149,142,,149,142,,144,149,,142,144,,149,142,,149,130,,,118,,118,130,,,118,,118,130,,,118,,118,130,,,118,,118],f:[]},{n:[142,,144,149,,142,144,,149,142,,149,142,,144,149,,142,144,,149,142,,149,130,,,,,118,,,,,,,130,,,,,130],f:[]},{n:[130],f:[]}]},{i:[0,255,123,1,3,156,118,7,1,7,4,6,37,0,0,0,0,0,0,2,26,66,1,39,0,0,0,0],p:[1,1,1,1,1,1,1,1,2,3],c:[{n:[135,,,,,,135,,,,,,135,,,,,,135],f:[]},{n:[135],f:[]},{n:[],f:[]}]},{i:[0,221,128,1,3,210,128,0,1,127,0,0,105,0,0,3,77,3,1,3,57,174,1,71,20,0,75,2],p:[,,,,1,1,1,2,3],c:[{n:[,,,135,,,,,135,,,135,,,,135,,,,,135,,,135],f:[13,,,,,,,,,,,,,,,,,,,,,,,,53]},{n:[,,,135,,,,,135,,,135,,,,135,,,,135,,,135,135],f:[]},{n:[139],f:[13,,,,,,,,,,,,,,,,,,,,,,,,105]}]},{i:[2,146,140,0,2,224,128,3,0,0,112,17,134,0,3,3,179,4,1,3,41,218,11,45,150,3,111,4],p:[1,4,2,3,1,4,2,3,5],c:[{n:[130,,,118],f:[14]},{n:[125,,,113],f:[]},{n:[132,,139],f:[]},{n:[130,,137],f:[]},{n:[130],f:[14,,,,,,,,,,,,,,,,,,,,,,,,55]}]},{i:[2,40,140,1,0,0,140,0,0,255,5,0,20,0,0,0,0,0,0,3,161,192,0,16,67,4,7,1],p:[,,,2,1,1,1,1],c:[{n:[123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123],f:[]},{n:[,,,,,,,,,,,,123,,,123,,,123,,,123,123,123],f:[]}]},{i:[3,146,140,0,3,224,128,3,0,0,4,0,56,124,4,0,80,4,1,1,49,146,11,37,119,4,72,2],p:[1,2,3,4,1,2,3,4,5],c:[{n:[,,,142,,,,,142,,,142,,,,142,,,,,142,,,142],f:[14,,,,,,,,,,,,,,,,,,,,,,,,55]},{n:[,,,142,,,,,142,,,142,,,,142,,,,,142,,,142],f:[14,,,,,,,,,,,,,,,,,,,,,,,,39]},{n:[,,,137,,,,,137,,,137,,,,137,,,,,137,,,137],f:[14,,,,,,,,,,,,,,,,,,,,,,,,55]},{n:[,,,132,,,,,132,,,132,,,,132,,,,,132,,,132],f:[14,,,,,,,,,,,,,,,,,,,,,,,,124]},{n:[142,130,118,106],f:[14,,,,,,,,,,,,,,,,,,,,,,,,55]}]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]}],rowLen:5703,patternLen:24,endPattern:11};

		  //----------------------------------------------------------------------------
		  // Demo program section
		  //----------------------------------------------------------------------------

		  // Initialize music generation (player).
		  var t0 = new Date();
		  var player = new CPlayer();
		  player.init(song);

		  // Generate music...
		  var done = false;
		  setInterval(function () {
		    if (done) {
		      return;
		    }

		    done = player.generate() >= 1;

		    if (done) {
		      var t1 = new Date();
		      

		      // Put the generated song in an Audio element.
		      var wave = player.createWave();
		      g.audio = document.createElement("audio");
		      g.audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
		      g.audio.play();
		    }
		  });
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