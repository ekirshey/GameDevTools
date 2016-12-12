function Tile(food, protection) {
	this.food = food;
	this.protection = protection;
    this.inhabitant = {};
};

function FactionMember(x, y, name, color) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.color = color; // Border Color
}; 

function Faction(name, color) {
	this.members = [];
    this.name = name;
    this.color = color; // Fill color
};

var factions = {
    factionlist: [],
    getFaction: function(name) {
        for(x in this.factionlist) {
            if(x.name == name)
                return x;
        }
        return undefined;
    },
    addFaction: function(faction) {
        this.factionlist.push(faction);
    },
    lastFaction: function() {
        if (this.factionlist.length > 0) {
            return this.factionlist[this.factionlist.length-1];
        }
    },
    updateFactions: function() {
        for( var i = 0; i < this.factionlist.length; i++) {
            if (this.factionlist[i].members.length == 0)
               this.factionlist.splice(i,1); 
        }
    }
};

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
    this.selectedX = 0;
    this.selectedY = 0;
	
	// Build world map
	for (var r = 0; r < map.rows; r++) {
		map.tilemap[r] = [];
		for (var c = 0; c < map.cols; c++) {
			map.tilemap[r][c] = new Tile(Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1) );
		}
	}
	this.ctx.lineWidth = 2;

    this.selectedTile = map.tilemap[this.selectedX][this.selectedY]; 

    var f = new Faction("Test", "#FF0000");
    var m = new FactionMember(Math.floor(map.rows/2)+1, Math.floor(map.cols/2)+1, "Test city", "#0000FF");
    map.tilemap[m.x][m.y].inhabitant = m;
    f.members.push(m);
    factions.addFaction(f);
};

World.drawGrid = function () {
	// Draw "world"
	this.ctx.fillStyle = "#00FF00";
	this.ctx.fillRect(0, 0, map.rows*map.tilesize, map.cols*map.tilesize);
    this.ctx.stroke();
};

World.updateFactionInfoHTML = function(faction, memberidx) {
    var factioninfo = document.getElementById('_factioninfo');
    
    if ( faction.members[memberidx].x == this.selectedX && faction.members[memberidx].y == this.selectedY) {
        factioninfo.innerHTML = "<br>Faction Name: " + faction.name + "<br>Population Name: " + faction.members[memberidx].name;
    }
    else {
        factioninfo.innerHTML = "";
    }
};

World.drawFactions = function() {
    for(var i = 0; i < factions.factionlist.length; i++) {
        var faction = factions.factionlist[i];
        for (var j = 0; j < faction.members.length; j++) {
            this.updateFactionInfoHTML(faction, j);

            var centerX = map.getX(faction.members[j].x) + map.tilesize/2; 
            var centerY = map.getY(faction.members[j].y) + map.tilesize/2;
            var radius = map.tilesize/2;

            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = faction.color;
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = faction.members[j].color;
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
};

World.drawSelectionBox = function() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'black'; 
    this.ctx.strokeRect(this.selectedX*map.tilesize, this.selectedY*map.tilesize, map.tilesize, map.tilesize)
    this.ctx.stroke();
    this.ctx.closePath();
};

World.updateHTML = function() {
    if (map.getRow(Mouse.X) != this.selectedX || map.getCol(Mouse.Y) != this.selectedY) {
        this.selectedX = map.getRow(Mouse.X);
        this.selectedY = map.getCol(Mouse.Y);
        this.selectedTile = map.tilemap[this.selectedX][this.selectedY];

        var tilecoords = document.getElementById('_tilecoords');
        tilecoords.innerHTML = "X: " + this.selectedX + " Y: " + this.selectedY;

        var tilefood = document.getElementById('_tilefood');
        tilefood.innerHTML = "Food: " + this.selectedTile.food;

        var tileprot = document.getElementById('_tileprot');
        tileprot.innerHTML = "Protection: " + this.selectedTile.protection;
    }

};

World.update = function (delta) {
    this.updateHTML();    
};

World.render = function () {
	this.drawGrid();
    this.drawFactions();
    this.drawSelectionBox(); 
};
