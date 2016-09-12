// Game Start

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
  		g.audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
  		g.audio.play();
    }
});

g.init(mainScene, 682, 512);