var sceneList = [];
var currentScene = null;


var startEngine = new function (gameData, startScene) {
    
    for (var i = 0; i < gameData.scenes.length; i++) {

        var newScene = loadScene(gameData.scenes[i]);
        if (newScene.name == startScene) {
            currentScene = newScene;
        }
    }   


    var camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000);
    camera.position.z = 4;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#000000");
    renderer.setSize(window.innerHeight, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    render();
}

var loadScene = new function (sceneData) {

    var scene = new Three.Scene();
    scene.objectList = [];
    scene.name = sceneData.name;

    for (var i = 0; i < sceneData.objects.length; i++)
    {
        var objData = sceneData.objects[i]

        scene.objectList.push(createObject(objData));
    }

    return scene;
}

var createObject = new function (objectData) {

    if (objectData.type == "square") {
        return createCube(objectData.x, objectData.y, 1, objectData.w, objectData.h, 1, objectData.color);
    }

    return null;
}

var createCube = function (x, y, z, w, h, d, color, parentColor) {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshBasicMaterial({ color: color });
    var cube = new THREE.Mesh(geometry, material);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
     
    return cube;
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    
    // Render the scene    
    renderer.render(currentScene, camera);
};