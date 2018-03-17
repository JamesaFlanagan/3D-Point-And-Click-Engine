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

}


var refreshUIValues = function () {

    var scene = _.find(currentGameFile.scenes, function (value) { return value.name == currentScene.name; });

    while (CurrentObjectList.firstChild) { // TODO Make a standard function
        CurrentObjectList.removeChild(CurrentObjectList.firstChild);
    }

    while (CurrentObjectDiv.firstChild) { // TODO Make a standard function
        CurrentObjectDiv.removeChild(CurrentObjectDiv.firstChild);
    }

    _.forEach(scene.objects, function (value, index, list) { //Consider Sorting this Alphabetically

        var newDiv = document.createElement('div');
        newDiv.innerText = value.name;

        newDiv.onclick = function () { showEditObjectList(newDiv); };

        CurrentObjectList.appendChild(newDiv);

        console.log(value);
    });

    //currentGameFile

    //CurrentObjectList

    //This should populate the list of current objects that exist in the current scene
}