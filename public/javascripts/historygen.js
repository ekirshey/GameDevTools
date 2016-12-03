function Tile(food, protection) {
	this.food = food;
	this.protection = protection;
	this.inhabited = false;
	this.population = {};
};

function Population(name) {
	this.name = name;
}

var map = {
	cols: 33,
	rows: 33,
	tilesize: 16,
	tilemap: [],
	getCol: function (x) {
        return Math.floor(x / this.tilesize);
    },
    getRow: function (y) {
        return Math.floor(y / this.tilesize);
    },
    getX: function (col) {
        return col * this.tilesize;
    },
    getY: function (row) {
        return row * this.tilesize;
	}
};

World.init = function() {
	Mouse.listenForEvents();
	
	// Build world map
	for (var r = 0; r < map.rows; r++) {
		map.tilemap[r] = [];
		for (var c = 0; c < map.cols; c++) {
			map.tilemap[r][c] = new Tile(0,0);
		}
	}
	this.ctx.lineWidth = 2;
};

World.drawGrid = function () {
/*
	var width = map.cols * map.tilesize;
    var height = map.rows * map.tilesize;
    var x, y;
    for (var r = 0; r <= map.rows; r++) {
        x = 0;
        y = r * map.tilesize;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
		this.ctx.stroke();
    }
    for (var c = 0; c <= map.cols; c++) {
        x = c * map.tilesize;
        y = 0;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
	}
*/

	// Draw "world"
	this.ctx.fillStyle = "#00FF00";
	this.ctx.fillRect(0, 0, map.rows*map.tilesize, map.cols*map.tilesize);
};

World.update = function (delta) {
	var tileid = document.getElementById('_tileid');
	tileid.value = Mouse.X;
};

World.render = function () {
	this.drawGrid();
};