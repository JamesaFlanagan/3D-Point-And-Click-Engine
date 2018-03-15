﻿var currentObjectCount = 0; //TODO - Fix this won't work when a file is loaded in.
//TODO - need to enforce unique names - so find works properly  

var reloadGame = function () {
    DisplayText.innerText = "";
    startEngine(currentGameFile, "startScene", Canvas, DisplayText);
}

var objectUpdate = function (originalObjectName, newObject)
{
    var scene = _.find(currentGameFile.scenes, function (value) { return value.name = currentScene.name; });
    var object = _.find(scene.objects, function (value) { return value.name = originalObjectName; });
    
    scene.objects = _.filter(scene.objects, function (obj) { return obj.name != originalObjectName; })
    scene.objects.push(newObject);
}

var objectCreate = function(objectType)
{
    var scene = _.find(currentGameFile.scenes, function (value) { return value.name = currentScene.name; });

    var itemName = "item" + currentObjectCount++;

    var objectToCreate = _.find(createableObjects, function (a) { return a.objectType == objectType; });

    var newObject = {};
    newObject.name = itemName;
    newObject.type = objectType;

    _.each(objectToCreate.objectParams, function (value, key, list) {
        newObject[value.name] = getDefaultValue(value.type);
    });

    scene.objects.push(newObject);
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

var getObjectDataFromParamListDiv = function (div) {

    var object = {};

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

    {
        var newDiv = document.createElement('div');

        var title = document.createElement('span');
        title.innerText = "type";

        var input = document.createElement('input');
        input.type = 'text'
        input.disabled = true;
        input.value = object.type;

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

    CurrentObjectSaveButton.setAttribute("commandarg", objectName);    
}

var refreshUIValues = function () {

    var scene = _.find(currentGameFile.scenes, function (value) { return value.name = currentScene.name; });

    while (CurrentObjectList.firstChild) { // TODO Make a standard function
        CurrentObjectList.removeChild(CurrentObjectList.firstChild);
    }

    while (CurrentObjectDiv.firstChild) { // TODO Make a standard function
        CurrentObjectDiv.removeChild(CurrentObjectDiv.firstChild);
    }
    
    _.forEach(scene.objects, function (value, index, list) { //Consider Sorting this Alphabetically

        var newDiv = document.createElement('div');
        newDiv.innerText = value.name; //TODO - will need to give them a default name of object number etc

        newDiv.onclick = function () { showEditObjectList(newDiv); };

        CurrentObjectList.appendChild(newDiv);
    });

    //currentGameFile

    //CurrentObjectList

    //This should populate the list of current objects that exist in the current scene
}