var g 				= {};
	g.currentScene 	= 0, 
	g.scenes 		= [],
	g.canvas 		,
	g.clearColor 	= '#aaa',
	g.ctx 			,
	g.lastPress		,
	g.pressing		= [],
	g.mouse			= {
        x   : 0,
        y   : 0,
        down: false,
    },
    g.delta,
    g.time			= 0,
    g.buttons		= [],
    g.cam,
	g.keys              = {
	    enter   : 13,
	    up      : 38,
	    down    : 40,
	    left    : 37,
	    right   : 39,
	    a       : 65,
	    w       : 87,
	    s       : 83,
	    d       : 68,
	    space   : 32
	};
	g.cartridgesLeft = 10;
	g.audio;
	var aa = new SFX();

g.init				= function(scene, width, height){
	g.canvas 		= document.getElementById('canvas');
	g.ctx			= g.canvas.getContext('2d');
	g.canvas.width	= width;
	g.canvas.height = height;
	g.cam 			= new Cam();
	
	g.mainLoop();
	g.loadScene(scene);
};

g.loadScene			= function(scene){
	var s = new scene();
	g.currentScene = s.id;
	g.scenes[g.currentScene].load();
	g.scenes[g.currentScene].isLoaded = true;
};

g.mainLoop 			= function(){
	if(g.scenes.length){
		g.ctx.fillStyle = g.clearColor; 
		g.ctx.fillRect(0, 0, canvas.width, canvas.height);
		if(g.scenes[g.currentScene].isLoaded == true)
			g.scenes[g.currentScene].update();
	}
	
	var now 	= Date.now();
	g.delta 	= now - g.time;
	if (g.delta > 999) {
		g.delta = 1 / 60;
	} else {
		g.delta /= 1000;
	}
	g.time = now;
	
	window.requestAnimationFrame(g.mainLoop);
};

window.requestAnimationFrame=(function(){
	return window.requestAnimationFrame 	|| 
		window.webkitRequestAnimationFrame 	|| 
		window.mozRequestAnimationFrame 	|| 
		function(callback){window.setTimeout(callback,17);};
})();

document.addEventListener('keydown',function(e){ 
    g.lastPress 			= e.keyCode; 
    g.pressing[e.keyCode] 	= true; 
},false);


document.addEventListener('keyup',function(e){ 
	g.pressing[e.keyCode] = false; 
},false);

document.addEventListener('mousemove',function(e){ 
	g.mouse.x = e.pageX - canvas.offsetLeft; 
	g.mouse.y = e.pageY - canvas.offsetTop; 
},false); 

document.addEventListener('mousedown',function(e){ 
	g.mouse.down = true;
},false);

document.addEventListener('mouseup',function(e){ 
	g.mouse.down = false;
},false);