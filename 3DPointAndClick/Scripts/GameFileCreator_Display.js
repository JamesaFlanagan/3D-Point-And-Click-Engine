var DisplayText = null;
var Canvas = null;
var CreateableTypesList = null;
var CurrentObjectList = null;
var CurrentObjectDiv = null;
var CurrentObjectSaveButton = null;


var setupCreatorScreen = function () {

    DisplayText = document.getElementById('DisplayText');
    Canvas = document.getElementById("Canvas");
    CreateableTypesList = document.getElementById("CreateableTypes");
    CurrentObjectList = document.getElementById("CurrentObjectList");
    CurrentObjectDiv = document.getElementById("CurrentObject");
    CurrentObjectSaveButton = document.getElementById("CurrentObjectSaveButton");


    var createableObjectTypes = CreateableTypesList;

    _.forEach(createableObjects, function (value, key, list) {

        var option = new Option();
        option.value = value.objectType;
        option.text = value.displayName;

        createableObjectTypes.options.add(option);

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
        newDiv.innerText = value[nameProperty];

        newDiv.onclick = function () { itemFunction(newDiv); };

        div.appendChild(newDiv);
    });
}

var refreshUIValues = function () {

    var scene = _.find(currentGameFile.scenes, function (value) { return value.name == currentScene.name; });

    refreshList(SceneList, currentGameFile.scenes, "name", null);
    refreshList(CurrentObjectList, scene.objects, "name", showEditObjectList);
    
    while (CurrentObjectDiv.firstChild) { // TODO Make a standard function
        CurrentObjectDiv.removeChild(CurrentObjectDiv.firstChild);
    }
    
    //currentGameFile

    //CurrentObjectList
}