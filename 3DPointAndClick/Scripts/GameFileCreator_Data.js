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

var createableSourceActions =
    [
        { sourceActionType: "choose", displayName: "Choose" },
        { sourceActionType: "SwapTo", displayName: "Swap To Scene" }
    ]; //?? this is an issue as this is a scene and a object actions together

var createableTargetActions =
    [
        { targetActionType: "choose", displayName: "Choose" }
    ];

var getDefaultValue = function (type) {
    switch (type) {
        case "number": return 0;
        case "color": return '#FFFFFF';
        default: return null;
    }
}
