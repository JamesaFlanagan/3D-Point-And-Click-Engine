var chapter =
{
    scenes =
    [
        {
            name = "startScreenScene",
            objects=[],
            actions=[
                { source="scene", sourceaction="initialise", targetaction="displayText", targetParams=["Rectanguloids are a species that look like rectangles.\nThere genetics are very simple and their children are always the same colour as the parent.\nUnfortunetly, Rectanguloids are colour blind and find it hard to tell their children apart from other children.\n Help the Rectanguloids be reunited correctly my clicking on their child."] }
            ]
        },
        {
            name = "gameScene",
            objects =
            [
                { name = "parent", type="square", x = -5, y = 0, w = 4, h = 8, color = "#433F81" },
                { name = "child1", type="square", x = 6, y = 3, w = 2, h = 3, color = "#433F81" },
                { name = "child2", type="square", x = 6, y = -1, w = 2, h = 3, color = "#F5FBEF" },
                { name = "child3", type="square", x = 6, y = -5, w = 2, h = 3, color = "#E85D75" }
            ]
            ,
            actions =
            [
                { source="parent", sourceaction="choose", targetaction="displayText", targetParams=["That is the parent. Click on the child that matches the colour of this Rectanguloid."] },
                { source="child1", sourceaction="choose", targetaction="changeScene", targetParams=["winGameScene"] },                
                { source="child2", sourceaction="choose", targetaction="changeScene", targetParams=["loseGameScene"] },                
                { source="child3", sourceaction="choose", targetaction="changeScene", targetParams=["loseGameScene"] }                
            ]
        },
        {
            name = "winGameScene",
            objects=[],
            actions=[
                { source="scene", sourceaction="initialise", targetaction="displayText", targetParams=["That is the correct child.\nYou have made the family whole again, and they will surely go on to have a happy life."] }
            ]
        },
        {
            name = "loseGameScene",
            objects=[],
            actions=[
                { source="scene", sourceaction="initialise", targetaction="displayText", targetParams=["That is the wrong child.\nYou have doomed this poor family to raise the wrong child - which will eventually grow to resent it."] }
            ]
        }
    ]
}