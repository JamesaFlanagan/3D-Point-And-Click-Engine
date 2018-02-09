var createableObjects =
    [
        { objectType:"square", objectParams:[{ name:"x", type:"number" }, { name:"y", type:"number" }, { name:"w", type:"number" }, { name:"h", type:"number" }, { name:"color", type:"color" }] }
    ];

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