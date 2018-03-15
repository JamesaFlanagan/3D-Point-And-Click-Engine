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