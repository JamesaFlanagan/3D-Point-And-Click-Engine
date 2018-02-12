//TODO - Make this an Engine object where these things can be set and adjusted etc.

var sceneList = [];
var currentScene = null;
var renderer = null;
var camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000); camera.position.z = 4;
var displayTextContainer = null;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var startEngine = function (gameData, startScene, canvasObject, newDisplayTextContainer) {

    displayTextContainer = newDisplayTextContainer;
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasObject }); renderer.setClearColor("#000000");

    _.forEach(gameData.scenes, function (value, key, list) {

        var newScene = loadScene(value);

        initialiseScene(newScene);

        if (newScene.name == startScene) {
            currentScene = newScene;
        }
    });
    
    renderer.setSize(window.innerHeight, window.innerHeight);    
    displayTextContainer.style.width = renderer.getSize().width;

    document.body.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);

    //camera.position.set(300, 300, 300);
    //camera.lookAt(currentScene.currentText.position);

    swapToScene(currentScene);
    
    render();
}

var swapToScene = function (scene) {
    currentScene = scene;

    _.forEach(scene.actionList, function (action, key, list) {
        if (action.source == "scene" && action.sourceaction == "SwapTo") {
            processAction(action, scene);
        }
    });
}

var loadScene = function (sceneData) {

    var scene = new THREE.Scene();
    scene.objectList = [];
    scene.actionList = sceneData.actions.slice();
    scene.name = sceneData.name;

    _.forEach(sceneData.objects, function (value, key, list) {
        var obj = createObject(value);

        scene.add(obj);
        scene.objectList.push(obj);
    });

    sceneList.push(scene);
    return scene;
}

var createObject = function (objectData) {

    var item = null;

    if (objectData.type == "square") {
        item = createCube(objectData.x, objectData.y, 1, objectData.w, objectData.h, 1, objectData.color);
    }

    item.name = objectData.name;

    return item;
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
    _.forEach(scene.actionList, function (action, key, list) {
        if (action.source == "scene" && action.sourceaction == "initialise") {
            processAction(action, scene);
        }
    });
}

var processAction = function (action, scene) {

    //Make this use command pattern later
    switch (action.targetaction) {
        case "displayText":
            {
                displayTextContainer.innerText = action.targetParams[0];
                break;
            }
        case "changeScene":
            {
                var targetSceneName = action.targetParams[0];
                _.forEach(sceneList, function (targetScene, key, list) {
                    if (targetScene.name == targetSceneName) {
                        swapToScene(targetScene);
                    }
                });
                break;
            }
        default:
            {
                break;
            }
    }
}

function onDocumentMouseDown(event) {
    mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - ((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(currentScene.children);

    _.forEach(intersects, function (value, key, list) {
        var item = value.object;

        _.forEach(currentScene.actionList, function (action, key, list) {
            if (action.source == item.name && action.sourceaction == "choose") {
                processAction(action, currentScene);
            }
        });        
    });    
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    
    // Render the scene    
    renderer.render(currentScene, camera);
};