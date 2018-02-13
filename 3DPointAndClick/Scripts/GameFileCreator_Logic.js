var DisplayText = null;
var Canvas = null;
var CreateableTypesList = null;
var CurrentObjectList = null;
var CurrentObjectDiv = null;

var currentObjectCount = 0; //TODO - Fix this won't work when a file is loaded in.
//TODO - need to enforce unique names - so find works properly  

var reloadGame = function () {
    DisplayText.innerText = "";
    startEngine(currentGameFile, "startScene", Canvas, DisplayText);
}

var setupCreatorScreen = function () {

    DisplayText = document.getElementById('DisplayText');
    Canvas = document.getElementById("Canvas");
    CreateableTypesList = document.getElementById("CreateableTypes");
    CurrentObjectList = document.getElementById("CurrentObjectList");
    CurrentObjectDiv = document.getElementById("CurrentObject");   


    var createableObjectTypes = CreateableTypesList;

    _.forEach(createableObjects, function (value, key, list) {

        var option = new Option();
        option.value = value.objectType;
        option.text = value.displayName;

        createableObjectTypes.options.add(option);

    });

}




var generateCreateObjectParamList = function (div, objectType) {

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    var objectToCreate = _.find(createableObjects, function (a) { return a.objectType == objectType; });

    {
        var newDiv = document.createElement('div');

        var title = document.createElement('span');
        title.innerText = "name";

        var input = document.createElement('input');
        input.type = 'text'

        newDiv.appendChild(title);
        newDiv.appendChild(input);

        div.appendChild(newDiv);
    }


    _.each(objectToCreate.objectParams, function (value, key, list) {

        var newDiv = document.createElement('div');

        var title = document.createElement('span');
        title.innerText = value.name;

        var input = document.createElement('input');
        input.type = 'text'

        newDiv.appendChild(title);
        newDiv.appendChild(input);

        div.appendChild(newDiv);

    });

}

var getObjectDataFromParamListDiv = function (div, type) {

    var object = {};

    object.type = type;

    _.forEach(div.children, function (value, key, list) {

        object[value.children[0].innerText] = value.children[1].value;

    });

    return object;
}

var showEditObjectList = function (itemDiv) {

    while (CurrentObjectDiv.firstChild) {
        CurrentObjectDiv.removeChild(CurrentObjectDiv.firstChild);
    }

    var objectName = itemDiv.innerText;

    var scene = _.find(currentGameFile.scenes, function (value) { return value.name = currentScene.name; });
    var object = _.find(scene.objects, function (value) { return value.name = objectName; });
    var objectType = _.find(createableObjects, function (value) { return value.objectType = object.type; });
    
    {
        var newDiv = document.createElement('div');

        var title = document.createElement('span');
        title.innerText = "name";

        var input = document.createElement('input');
        input.type = 'text'
        input.value = objectName;

        newDiv.appendChild(title);
        newDiv.appendChild(input);

        CurrentObjectDiv.appendChild(newDiv);
    }


    _.each(objectType.objectParams, function (value, key, list) {

        var newDiv = document.createElement('div');

        var title = document.createElement('span');
        title.innerText = value.name;

        var input = document.createElement('input');
        input.type = 'text'
        input.value = object[value.name];

        newDiv.appendChild(title);
        newDiv.appendChild(input);

        CurrentObjectDiv.appendChild(newDiv);

    });

}

var refreshUIValues = function () {

    var scene = _.find(currentGameFile.scenes, function (value) { return value.name = currentScene.name; });

    while (CurrentObjectList.firstChild) { // TODO Make a standard function
        CurrentObjectList.removeChild(CurrentObjectList.firstChild);
    }
    
    _.forEach(scene.objects, function (value, index, list) {

        var newDiv = document.createElement('div');
        newDiv.innerText = value.name; //TODO - will need to give them a default name of object number etc

        newDiv.onclick = function () { showEditObjectList(newDiv); };

        CurrentObjectList.appendChild(newDiv);
    });

    //currentGameFile

    //CurrentObjectList

    //This should populate the list of current objects that exist in the current scene
}