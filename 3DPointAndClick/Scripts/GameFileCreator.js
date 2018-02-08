var createableObjects =
    [
        { objectType:"square", objectParams:[{ name:"x", type:"number" }, { name:"y", type:"number" }, { name:"w", type:"number" }, { name:"h", type:"number" }, { name:"color", type:"color" }] }
    ];

var generateCreateObjectParamList = function (div, objectType) {

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    var objectToCreate = _.find(createableObjects, function (a) { return a.objectType == objectType; });


    _.each(objectToCreate.objectParams, function (value, key, list) {

        var newDiv = document.createElement('div');

        var title = document.createElement('span');
        title.innerText = value.name;

        newDiv.appendChild(title);

        div.appendChild(newDiv);
        
    });

}