var sceneList = [];
var currentScene = null;
var renderer = null;
var camera = null;
var displayTextContainer = null;

var startEngine = function (gameData, startScene, newDisplayTextContainer) {

    displayTextContainer = newDisplayTextContainer;

    for (var i = 0; i < gameData.scenes.length; i++) {

        var newScene = loadScene(gameData.scenes[i]);

        initialiseScene(newScene);

        if (newScene.name == startScene) {
            currentScene = newScene;
        }
    }

    camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000);
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#000000");
    renderer.setSize(window.innerHeight, window.innerHeight);    
    displayTextContainer.style.width = renderer.getSize().width;

    document.body.appendChild(renderer.domElement);

    //camera.position.set(300, 300, 300);
    //camera.lookAt(currentScene.currentText.position);

    swapToScene(currentScene);

    render();
}

var swapToScene = function (scene) {
    currentScene = scene;

    for (var i = 0; i < scene.actionList.length; i++) {

        var action = scene.actionList[i]

        if (action.source == "scene" && action.sourceaction == "SwapTo") {
            processAction(action, scene);
        }
    }

}

var loadScene = function (sceneData) {

    var scene = new THREE.Scene();
    scene.objectList = [];
    scene.actionList = sceneData.actions.slice();
    scene.name = sceneData.name;

    for (var i = 0; i < sceneData.objects.length; i++)
    {
        var objData = sceneData.objects[i]

        var obj = createObject(objData);

        scene.add(obj);
        scene.objectList.push(obj);
    }
    
    return scene;
}

var createObject = function (objectData) {

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

var initialiseScene = function(scene)
{
    for (var i = 0; i < scene.actionList.length; i++) {

        var action = scene.actionList[i]

        if (action.source == "scene" && action.sourceaction == "initialise")
        {
            processAction(action, scene);
        }
    }
}

var processAction = function (action, scene) {

    //Make this use command pattern later
    switch (action.targetaction) {
        case "displayText":
            {
                displayTextContainer.innerText = action.targetParams[0];
                break;
            }
        default:
            {
                break;
            }
    }
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    
    // Render the scene    
    renderer.render(currentScene, camera);
};