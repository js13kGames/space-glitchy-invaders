var Timer = Class.extend({
    init : function(){
        this.ini = this.now();
    },
    
    now            : function(){
        return Date.now();
    },
    
    start          : function(){
        this.ini = this.now();
    },
    
    getElapsedTime : function(){
        return this.now() - this.ini;
    },
    
    reset          : function(){
    	this.ini = this.now();
    },
    
    clean           : function(){
        this.ini = null;
    }
});