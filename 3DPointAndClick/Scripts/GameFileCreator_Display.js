﻿var DisplayText = null;
var Canvas = null;
var CreateableTypesList = null;
var CreateableActionTypesList = null;

var CurrentObjectList = null;
var CurrentObjectDiv = null;
var CurrentObjectSaveButton = null;
var SceneList = null;


var setupCreatorScreen = function () {

    DisplayText = document.getElementById('DisplayText');
    Canvas = document.getElementById("Canvas");
    CreateableTypesList = document.getElementById("CreateableTypes");
    CreateableActionTypesList = document.getElementById("CreateableActionTypes");

    CurrentObjectList = document.getElementById("CurrentObjectList");
    CurrentObjectDiv = document.getElementById("CurrentObject");
    CurrentObjectSaveButton = document.getElementById("CurrentObjectSaveButton");
    SceneList = document.getElementById("SceneList");

    var createableObjectTypes = CreateableTypesList;

    _.forEach(createableObjects, function (value, key, list) {

        var option = new Option();
        option.value = value.objectType;
        option.text = value.displayName;

        createableObjectTypes.options.add(option);

    });

    _.forEach(createableTargetActions, function (value, key, list) {

        var option = new Option();
        option.value = value.targetActionType;
        option.text = value.displayName;

        CreateableActionTypesList.options.add(option);

    });

    reloadGame();

    refreshUIValues();
}

var refreshList = function (div, list, nameProperty, itemFunction) {

    while (div.firstChild) { // TODO Make a standard function
        div.removeChild(div.firstChild);
    }

    _.forEach(list, function (value, index, list) { //Consider Sorting this Alphabetically

        var newDiv = document.createElement('div');
        var name = "";

        _.forEach(nameProperty, function (v, i, l) {
            name += ":" + value[v];
        });

        newDiv.innerText = name.substring(1);

        newDiv.onclick = function () { itemFunction(newDiv); };

        div.appendChild(newDiv);
    });
}

var refreshUIValues = function () {

    var scene = _.find(currentGameFile.scenes, function (value) { return value.name == SelectedSceneName; });

    refreshList(SceneList, currentGameFile.scenes, ["name"], function () { });
    refreshList(CurrentObjectList, scene.objects, ["name"], showEditObjectList);
    refreshList(CurrentActionsList, currentGameFile.actions, ["source", "sourceaction", "targetaction"], function () { });

    while (CurrentObjectDiv.firstChild) { // TODO Make a standard function
        CurrentObjectDiv.removeChild(CurrentObjectDiv.firstChild);
    }
    
    //currentGameFile

    //CurrentObjectList
}


var showEditObjectList = function (itemDiv) {

    while (CurrentObjectDiv.firstChild) {
        CurrentObjectDiv.removeChild(CurrentObjectDiv.firstChild);
    }

    var objectName = itemDiv.innerText;

    var scene = _.find(currentGameFile.scenes, function (value) { return value.name == SelectedSceneName; });
    var object = _.find(scene.objects, function (value) { return value.name == objectName; });
    var objectType = _.find(createableObjects, function (value) { return value.objectType == object.type; });

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

var getObjectDataFromParamListDiv = function (div) {

    var object = {};

    _.forEach(div.children, function (value, key, list) {

        object[value.children[0].innerText] = value.children[1].value;

    });

    return object;
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

