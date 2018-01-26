// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

var currentScene = scene;

// Create a basic perspective camera
//var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//var camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000);
var camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000);
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(window.innerHeight, window.innerHeight);

// Append Renderer to DOM
document.body.appendChild(renderer.domElement);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------


var targetList = [];

var createCube = function (x,y, w,h, color) {
    var geometry = new THREE.BoxGeometry(w,h, 1);
    var material = new THREE.MeshBasicMaterial({ color: color });
    var cube = new THREE.Mesh(geometry, material);

    cube.position.x = x;
    cube.position.y = y;

    targetList.push(cube);

    return cube;
}

var createLevel = function (parentColor)
{
    scene.add(createCube(-5, 0, 4, 8, parentColor));

    scene.add(createCube(6, 3, 2, 3, "#433F81"));
    scene.add(createCube(6, -1, 2, 3, "#F5FBEF"));
    scene.add(createCube(6, -5, 2, 3, "#E85D75"));
    //scene.add(createCube(6, 0, 2, 3, "#40F99B"));
}

createLevel("#433F81");

//// Create a Cube Mesh with basic material
//var geometry = new THREE.BoxGeometry(4, 8, 1);
//var material = new THREE.MeshBasicMaterial({ color: "#433F81" });
//var cube = new THREE.Mesh(geometry, material);

//cube.position.x = -5;

// Add cube to Scene
//scene.add(cube);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// when the mouse moves, call the given function
document.addEventListener('mousedown', onDocumentMouseDown, false);

function onDocumentMouseDown(event) {
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    // event.preventDefault();

    console.log("Click.");

    // update the mouse variable
    //mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - ((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;


    console.log(mouse.x + ',' + mouse.y);

    raycaster.setFromCamera(mouse, camera);

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    for (var i = 0; i < intersects.length; i++) {

        intersects[i].object.material.color.set(0xff0000);

    }







    //// find intersections

    //// create a Ray with origin at the mouse position
    ////   and direction into the scene (camera direction)
    //var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
    //vector.unproject(camera);
    //projector.unprojectVector(vector, camera);
    //var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    //// create an array containing all objects in the scene with which the ray intersects
    //var intersects = ray.intersectObjects(targetList);

    //// if there is one (or more) intersections
    //if (intersects.length > 0) {
    //    console.log("Hit @ " + toString(intersects[0].point));
    //    // change the color of the closest face.    
    //    intersects[0].face.color.setRGB(0.8 * Math.random() + 0.2, 0, 0);
    //    intersects[0].object.geometry.colorsNeedUpdate = true;
    //}

}

// Render Loop
var render = function () {
    requestAnimationFrame(render);

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(currentScene, camera);
};



render();

