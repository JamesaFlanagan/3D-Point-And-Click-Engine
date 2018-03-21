var currentGameFile = {
    scenes:
    [
        {
            name: "startScene",
            objects: []
        }
        ]
    , actions: []
};

var createableObjects =
    [
        { objectType:"square", displayName:"Square", objectParams:[{ name:"x", type:"number" }, { name:"y", type:"number" }, { name:"w", type:"number" }, { name:"h", type:"number" }, { name:"color", type:"color" }] }
    ];

var createableSourceActions =
    [
        { sourceActionType: "choose", displayName: "Choose" },
        { sourceActionType: "SwapTo", displayName: "Swap To Scene" }
    ];

var createableTargetActions =
    [
        { targetActionType: "displayText", displayName: "Display Text", actionParams: [{name:"Text", type:"Text"}] },
        { targetActionType: "changeScene", displayName: "Change Scene", actionParams: [{ name: "Target Scene", type: "Scene" }] }
    ];

var getDefaultValue = function (type) {
    switch (type) {
        case "number": return 0;
        case "color": return '#FFFFFF';
        case "text": return ''; 
        case "scene": return 'startScene'; //TODO - consider changing
        default: return null;
    }
}
