var currentGameFile = {
    scenes:
    [
        {
            name: "startScene",
            objects: [],
            actions: []
        }
    ]
};

var createableObjects =
    [
        { objectType:"square", displayName:"Square", objectParams:[{ name:"x", type:"number" }, { name:"y", type:"number" }, { name:"w", type:"number" }, { name:"h", type:"number" }, { name:"color", type:"color" }] }
    ];

var getDefaultValue = function (type) {
    switch (type) {
        case "number": return 0;
        case "color": return '#FFFFFF';
        default: return null;
    }
}
