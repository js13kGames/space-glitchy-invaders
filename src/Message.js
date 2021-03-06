var Message = Class.extend({
    init : function(text, size, color, a, glow){
    	this.needed = [];
    	this.text = text;
    	this.size	= size;
    	this.color	= color;
    	this.glitchyX = 0;
    	this.glitchyY = 0;
    	this.a = a || 1;
    	this.glow = glow;
    	this.initText();
    	
    },
    
    initText : function(){
    	this.needed = [];
    	string = this.text.toUpperCase();
    	for (var i = 0; i < string.length; i++) {
    	    var letter = letters[string.charAt(i)];
    	    if (letter) {
    	    	this.needed.push(letter);
    	    }
    	}
    },
    
    update : function(text){
    	this.text = text;
    	this.initText();
    },
    
    draw : function(x, y){
    	g.ctx.save();
    	g.ctx.globalAlpha = this.a;
    	if(this.glow !== undefined){
    		g.ctx.shadowColor     = this.glow;
        	g.ctx.shadowBlur      = 4;
        	g.ctx.shadowOffsetX   = 0;
        	g.ctx.shadowOffsetY   = 0;
    	}
    	g.ctx.fillStyle = this.color;
    	var currX = x + this.glitchyX;
    	for (i = 0; i < this.needed.length; i++) {
    	    letter = this.needed[i];
    	    var currY = y + this.glitchyY;
    	    var addX = 0;
    	    for (var j = 0; j < letter.length; j++) {
    	        var row = letter[j];
    	        for (var x = 0; x < row.length; x++) {
    	            if (row[x]) {
    	                g.ctx.fillRect(currX + x * this.size, currY, this.size, this.size);
    	            }
    	        }
    	        addX = Math.max(addX, row.length * this.size);
    	        currY += this.size;
    	    }
    	    currX += this.size + addX;
    	}
    	g.ctx.restore();
    }
});

var letters = {
		',': [
			    [, ],
			    [, ],
			    [, ],
			    [, ],
			    [, 1],
			    [1,]
			],
		'.': [
			    [, ],
			    [, ],
			    [, ],
			    [, ],
			    [1, ]
			],
		'A': [
		    [, 1],
		    [1, , 1],
		    [1, , 1],
		    [1, 1, 1],
		    [1, , 1]
		],
		'B': [
		    [1, 1],
		    [1, , 1],
		    [1, 1, 1],
		    [1, , 1],
		    [1, 1]
		],
		'C': [
		    [1, 1, 1],
		    [1],
		    [1],
		    [1],
		    [1, 1, 1]
		],
		'D': [
		    [1, 1],
		    [1, , 1],
		    [1, , 1],
		    [1, , 1],
		    [1, 1]
		],
		'E': [
		    [1, 1, 1],
		    [1],
		    [1, 1, 1],
		    [1],
		    [1, 1, 1]
		],
		'F': [
		    [1, 1, 1],
		    [1],
		    [1, 1],
		    [1],
		    [1]
		],
		'G': [
		    [, 1, 1],
		    [1],
		    [1, , 1, 1],
		    [1, , , 1],
		    [, 1, 1]
		],
		'H': [
		    [1, , 1],
		    [1, , 1],
		    [1, 1, 1],
		    [1, , 1],
		    [1, , 1]
		],
		'I': [
		    [1, 1, 1],
		    [, 1],
		    [, 1],
		    [, 1],
		    [1, 1, 1]
		],
		'J': [
		    [1, 1, 1],
		    [, , 1],
		    [, , 1],
		    [1, , 1],
		    [1, 1, 1]
		],
		'K': [
		    [1, , , 1],
		    [1, , 1],
		    [1, 1],
		    [1, , 1],
		    [1, , , 1]
		],
		'L': [
		    [1],
		    [1],
		    [1],
		    [1],
		    [1, 1, 1]
		],
		'M': [
		    [1, 1, 1, 1, 1],
		    [1, , 1, , 1],
		    [1, , 1, , 1],
		    [1, , , , 1],
		    [1, , , , 1]
		],
		'N': [
		    [1, , , 1],
		    [1, 1, , 1],
		    [1, , 1, 1],
		    [1, , , 1],
		    [1, , , 1]
		],
		'O': [
		    [1, 1, 1],
		    [1, , 1],
		    [1, , 1],
		    [1, , 1],
		    [1, 1, 1]
		],
		'P': [
		    [1, 1, 1],
		    [1, , 1],
		    [1, 1, 1],
		    [1],
		    [1]
		],
		'Q': [
		    [0, 1, 1],
		    [1, , , 1],
		    [1, , , 1],
		    [1, , 1, 1],
		    [1, 1, 1, 1]
		],
		'R': [
		    [1, 1],
		    [1, , 1],
		    [1, , 1],
		    [1, 1],
		    [1, , 1]
		],
		'S': [
		    [1, 1, 1],
		    [1],
		    [1, 1, 1],
		    [, , 1],
		    [1, 1, 1]
		],
		'T': [
		    [1, 1, 1],
		    [, 1],
		    [, 1],
		    [, 1],
		    [, 1]
		],
		'U': [
		    [1, , 1],
		    [1, , 1],
		    [1, , 1],
		    [1, , 1],
		    [1, 1, 1]
		],
		'V': [
		    [1, , , , 1],
		    [1, , , , 1],
		    [, 1, , 1],
		    [, 1, , 1],
		    [, , 1]
		],
		'W': [
		    [1, , , , 1],
		    [1, , , , 1],
		    [1, , , , 1],
		    [1, , 1, , 1],
		    [1, 1, 1, 1, 1]
		],
		'X': [
		    [1, , , , 1],
		    [, 1, , 1],
		    [, , 1],
		    [, 1, , 1],
		    [1, , , , 1]
		],
		'Y': [
		    [1, , 1],
		    [1, , 1],
		    [, 1],
		    [, 1],
		    [, 1]
		],
		'Z': [
		    [1, 1, 1, 1, 1],
		    [, , , 1],
		    [, , 1],
		    [, 1],
		    [1, 1, 1, 1, 1]
		],
		'0': [
		    [1, 1, 1],
		    [1, , 1],
		    [1, , 1],
		    [1, , 1],
		    [1, 1, 1]
		],
		'1': [
		    [, 1],
		    [, 1],
		    [, 1],
		    [, 1],
		    [, 1]
		],
		'2': [
		    [1, 1, 1],
		    [ , ,  1],
		    [1, 1, 1],
		    [1, ,   ],
		    [1, 1, 1]
		],
		'3': [
		    [1, 1, 1],
		    [ , ,  1],
		    [1, 1, 1],
		    [ , ,  1],
		    [1, 1, 1]
		],
		'4': [
			    [1,  , 1,],
			    [1,  , 1,],
			    [1, 1, 1,],
			    [ , ,  1,],
			    [ ,  , 1,]
		],
		'5': [
			    [1, 1, 1,],
			    [1,  ,  ,  ],
			    [1, 1, 1,],
			    [ ,  , 1,],
			    [1, 1, 1,]
		],
		'6': [
		    [1, 1, 1],
		    [1, ,   ],
		    [1, 1, 1],
		    [1, ,  1],
		    [1, 1, 1]
		],
		'7': [
			    [1, 1, 1],
			    [ , ,  1],
			    [ , 1,  ],
			    [1,  ,  ],
			    [1,  ,  ]
			],
		'8': [
			    [1, 1, 1],
			    [1, ,  1],
			    [1, 1, 1],
			    [1, ,  1],
			    [1, 1, 1]
			],
		'9': [
			    [1, 1, 1],
			    [1, ,  1],
			    [1, 1, 1],
			    [ , ,  1],
			    [1, 1, 1]
			],
		' ': [
		        [, ,],
		        [, ,],
		        [, ,],
		        [, ,],
		        [, ,]
		    ]
		,
		'!': [
		    [,1,],
		    [,1,],
		    [,1,],
		    [, ,],
		    [,1,]
		]
	};