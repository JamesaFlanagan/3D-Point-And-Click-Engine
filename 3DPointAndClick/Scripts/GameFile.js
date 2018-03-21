var chapter =
    {
        scenes:
        [
            {
                name: "gameScene",
                objects:
                [
                    { name: "1parent", type:"square", x: -5, y: 0, w: 4, h: 8, color: "#433F81" },
                    { name: "1child1", type:"square", x: 6, y: 3, w: 2, h: 3, color: "#433F81" },
                    { name: "1child2", type:"square", x: 6, y: -1, w: 2, h: 3, color: "#F5FBEF" },
                    { name: "1child3", type:"square", x: 6, y: -5, w: 2, h: 3, color: "#E85D75" }
                ]
            },
            {
                name: "winGameScene",
                objects:[]
            },
            {
                name: "loseGameScene",
                objects:[]
            },
            {
                name: "gameScene2",
                objects:
                [
                    { name: "2parent", type: "square", x: -5, y: 0, w: 4, h: 8, color: "#F5FBEF" },
                    { name: "2child1", type: "square", x: 6, y: 3, w: 2, h: 3, color: "#433F81" },
                    { name: "2child2", type: "square", x: 6, y: -1, w: 2, h: 3, color: "#F5FBEF" },
                    { name: "2child3", type: "square", x: 6, y: -5, w: 2, h: 3, color: "#E85D75" }
                ]
            }
        ]
        , actions: 
            [
                { source: "gameScene", sourceaction: "SwapTo", targetaction: "displayText", targetParams: ["Rectanguloids are a species that look like rectangles.\nThere genetics are very simple and their children are always the same colour as the parent.\Unfortunately, Rectanguloids are colour blind and find it hard to tell their children apart from other children.\nHelp the Rectanguloids be reunited correctly by clicking on their child."] },
                { source: "1parent", sourceaction: "choose", targetaction: "displayText", targetParams: ["That is the parent. Click on the child that matches the colour of this Rectanguloid."] },
                { source: "1child1", sourceaction: "choose", targetaction: "changeScene", targetParams: ["gameScene2"] },
                { source: "1child2", sourceaction: "choose", targetaction: "changeScene", targetParams: ["loseGameScene"] },
                { source: "1child3", sourceaction: "choose", targetaction: "changeScene", targetParams: ["loseGameScene"] },
                { source: "winGameScene", sourceaction: "SwapTo", targetaction: "displayText", targetParams: ["That is the correct child.\nYou have made the families whole again, and they will surely go on to have a happy life."] },
                { source: "loseGameScene", sourceaction: "SwapTo", targetaction: "displayText", targetParams: ["That is the wrong child.\nYou have doomed this poor family to raise the wrong child - which will eventually grow to resent it."] },
                { source: "gameScene2", sourceaction: "SwapTo", targetaction: "displayText", targetParams: ["Here is another parent for you to help. Click on their child to reunite them."] },
                { source: "2parent", sourceaction: "choose", targetaction: "displayText", targetParams: ["That is the parent. Click on the child that matches the colour of this Rectanguloid."] },
                { source: "2child1", sourceaction: "choose", targetaction: "changeScene", targetParams: ["loseGameScene"] },
                { source: "2child2", sourceaction: "choose", targetaction: "changeScene", targetParams: ["winGameScene"] },
                { source: "2child3", sourceaction: "choose", targetaction: "changeScene", targetParams: ["loseGameScene"] }
        ]
    };