/////////////////////// Mouse Object //////////////////
var Mouse = {};

Mouse.X = 0;
Mouse.Y = 0;

Mouse.listenForEvents = function() {
    var canvas = document.getElementById('world');
	canvas.addEventListener("mousedown", this._updatePosition.bind(this), false);
};

Mouse._updatePosition = function(event) {
	var canvas = document.getElementById('world');
	
	var x = event.clientX + document.body.scrollLeft +
		document.documentElement.scrollLeft;
	var y = event.clientY + document.body.scrollTop +
		document.documentElement.scrollTop;
	
	this.X = x - canvas.offsetLeft;
	this.Y = y - canvas.offsetTop;
			  
};
//////////////////////////////////////////////////

var World = {};

World.load = function() {
	return [];
};

World.run = function (context) {
    this.ctx = context;
    this._previousElapsed = 0;

    var p = this.load();
    Promise.all(p).then(function (loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
    }.bind(this));
};

World.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // clear previous frame
    this.ctx.clearRect(0, 0, 512, 512);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
}.bind(World);

World.init = function() {};
World.update = function (delta) {};
World.render = function () {};

window.onload = function () {
    var context = document.getElementById('world').getContext('2d');
    World.run(context);
};