var SelectedSceneName = 'startScene';
var SelectedObjectName = null;

var currentObjectCount = 0; //TODO - Fix this won't work when a file is loaded in.
//TODO - need to enforce unique names - so find works properly  

var reloadGame = function () {
    DisplayText.innerText = "";
    startEngine(currentGameFile, "startScene", Canvas, DisplayText);
}

var objectUpdate = function (originalObjectName, newObject)
{
    var scene = _.find(currentGameFile.scenes, function (value) { return value.name == SelectedSceneName; });
    var object = _.find(scene.objects, function (value) { return value.name == originalObjectName; });

    var listWithoutOldValue = _.filter(scene.objects, function (obj) { return obj.name != originalObjectName; })

    scene.objects = listWithoutOldValue;
    scene.objects.push(newObject);

}

var objectCreate = function(objectType)
{
    var scene = _.find(currentGameFile.scenes, function (value) { return value.name == SelectedSceneName; });

    var itemName = "item" + currentObjectCount++;

    var objectToCreate = _.find(createableObjects, function (a) { return a.objectType == objectType; });

    var newObject = {};
    newObject.name = itemName;
    newObject.type = objectType;

    _.each(objectToCreate.objectParams, function (value, key, list) {
        newObject[value.name] = getDefaultValue(value.type);
    });

    scene.objects.push(newObject);

    return itemName;
}

//TODO - Object Delete

var actionCreate = function () {

}