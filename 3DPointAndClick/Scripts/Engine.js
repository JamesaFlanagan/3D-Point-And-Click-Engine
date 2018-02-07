//TODO - Make this an Engine object where these things can be set and adjusted etc.

var sceneList = [];
var currentScene = null;
var renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setClearColor("#000000");
var camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000); camera.position.z = 4;
var displayTextContainer = null;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var startEngine = function (gameData, startScene, newDisplayTextContainer) {

    displayTextContainer = newDisplayTextContainer;

    for (var i = 0; i < gameData.scenes.length; i++) {

        var newScene = loadScene(gameData.scenes[i]);

        initialiseScene(newScene);

        if (newScene.name == startScene) {
            currentScene = newScene;
        }
    }    
    
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
        case "changeScene":
            {
                var targetSceneName = action.targetParams[0];
                for (var i = 0; i < sceneList.length; ++i) {
                    var targetScene = sceneList[i];

                    if (targetScene.name == targetSceneName) {
                        swapToScene(targetScene);
                    }
                }
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

    for (var i = 0; i < intersects.length; i++) {

        var item = intersects[i].object;
        
        for(var i = 0; i < currentScene.actionList.length; i++) {

            var action = currentScene.actionList[i];

            if (action.source == item.name && action.sourceaction == "choose") {
                processAction(action, currentScene);
            }
        }



        //document.getElementById("IntroText").hidden = true;
        //document.getElementById("ThatIsTheParent").hidden = true;
        //document.getElementById("ThatIsTheWrongChild").hidden = true;
        //document.getElementById("ThatIsTheCorrectChild").hidden = true;


        //if (intersects[i].object == parent) {
        //    document.getElementById("ThatIsTheParent").hidden = false;
        //    //intersects[i].object.material.color.set(0xffffff);
        //}
        //else if (intersects[i].object == correctChild) {
        //    document.getElementById("ThatIsTheCorrectChild").hidden = false;
        //    //intersects[i].object.material.color.set(0x0000ff);
        //    gameplaying = false;
        //}
        //else {
        //    //intersects[i].object.material.color.set(0xff0000);
        //    document.getElementById("ThatIsTheWrongChild").hidden = false;
        //    gameplaying = false;
        //}


    }
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    
    // Render the scene    
    renderer.render(currentScene, camera);
};