var scene, camera, renderer, controls;
var geometry, material, mesh;
var data;

init();
	
var fileInput = document.getElementById("csv"),

    readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
			var object = scene.getObjectByName( "plane" );
			if (typeof object != 'undefined' && object) {
				scene.remove(plane);
			}
            data = reader.result.split(',');
			var width = Math.sqrt(data.length);
			
			geometry = new THREE.PlaneGeometry( width, width, width-1, width-1);
			material = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true, side: THREE.DoubleSide} );
			plane = new THREE.Mesh( geometry, material );
			plane.name = "plane";
	
			//set height of vertices
			for ( var i = 0; i<plane.geometry.vertices.length; i++ ) {
				plane.geometry.vertices[i].z = data[i];
			}

			scene.add( plane );
		 
			document.body.appendChild( renderer.domElement );
			controls = new THREE.OrbitControls( camera, renderer.domElement );
			
			
			animate();
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
    };

fileInput.addEventListener('change', readFile);

function init() {
    console.log("load");
    scene = new THREE.Scene();
 
    camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 100;
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
 
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}