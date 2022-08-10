import * as PIXI from "pixi.js";
import * as Skins from "../Skins";
import {GameObject} from "../Engine/Core/GameObject";
import {UIButton} from "../Engine/UI/UIButton";
import {UISprite} from "../Engine/UI/UISprite";
import {Scene} from "../Engine/Core/Scene";
import {CreateBestScorePopup} from "./BestScorePopup";
import {MiddleLeaderCountBarSkin} from "../Skins";
import {RectTransform} from "../Engine/Core/RectTransform";
import {Container, Text} from "pixi.js";

export class LeaderboardDataItem {

    constructor(public name: string, public count: number) {
    }
}

export class LeaderboardItem {

    constructor(public container: GameObject, public nameText: Text, public countText: Text) {
    }
}

export class Leaderboard {
    constructor(public name: string, public data: LeaderboardDataItem[]) {
    }
}

const leaderboards: Leaderboard[] = [
    new Leaderboard("All time", [
        new LeaderboardDataItem("PavelNikolaevich", 49444),
        new LeaderboardDataItem("Alex", 46822),
        new LeaderboardDataItem("Alexandr Velikiy", 27203),
        new LeaderboardDataItem("Aleksey", 20545),
        new LeaderboardDataItem("Kevin Arbianto", 16801),
        new LeaderboardDataItem("42145262262", 100),
        new LeaderboardDataItem("willvase", 15981),
        new LeaderboardDataItem("Djoko Pramono", 15816),
        new LeaderboardDataItem("34835252582352", 15533),
        new LeaderboardDataItem("Fahmi Aditya", 15179),
    ]),
    new Leaderboard("Week", [new LeaderboardDataItem("Single", 1000)]),
    new Leaderboard("Month", [])
]

function GetBackgroundByPlace(place: number) {
    switch (place) {
        case 1:
            return Skins.Place1Skin;
        case 2:
            return Skins.Place2Skin;
        case 3:
            return Skins.Place3Skin;
        default:
            return Skins.PlaceAnySkin;
    }
}

function GetFontStyleByPlace(place: number, fontSize: number) {
    switch (place) {
        case 1:
            return Skins.place1Style(fontSize);
        case 2:
            return Skins.place2Style(fontSize);
        case 3:
            return Skins.place3Style(fontSize);
        default:
            return Skins.placeAnyStyle(fontSize);
    }
}

let leaderboardTitleText: Text;
let list: LeaderboardItem[] = [];
let timeouts: NodeJS.Timeout[] = [];

function RedrawList(leaderboard?: Leaderboard) {
    if (leaderboard == null) {
        leaderboard = leaderboards[currentLeaderboardIndex];
    }
    leaderboardTitleText.text = leaderboard.name;
    let data = leaderboard.data;
    for (let i = 0; i < list.length; i++) {
        let name: string = data == null || data.length <= i ? "-" : data[i].name;
        let count: string = data == null || data.length <= i ? "-" : data[i].count.toString();
        let item = list[i];
        item.nameText.text = name;
        item.countText.text = count;

        clearTimeout(timeouts[i]);
        item.container.scale.set(0, 0);
        let timeout = setTimeout(() => {
            item.container.scale.set(1, 1);
        }, 200 + i * 80);
        timeouts[i] = timeout;
    }
}

function CreateList(root: GameObject) {

    let nameText: Text;
    let countText: Text;

    let yOffset = -235 - 80;

    for (let i = 0; i < 10; i++) {
        {
            if (i < 3) {
                yOffset += 80;
            } else if (i == 3) {
                yOffset += 67;
            } else {
                yOffset += 47;
            }

            let item = root.CreateGameObject("item_" + i);
            item.x = 0;
            item.y = yOffset;
            item.scale.set(0, 0);
            setTimeout(() => {
                item.scale.set(1, 1);
            }, 500 + i * 80);

            {
                let go = item.CreateGameObject("bar");
                let barSprite = new UISprite(GetBackgroundByPlace(i + 1));
                go.AddComponent(barSprite);
                go.position.set((i < 3 ? -98 : -62), 0);

                if (i >= 3) {
                    {
                        let text = new PIXI.Text((i + 1), Skins.whiteStyle(38));
                        go.addChild(text);
                        text.zIndex = 1;
                        text.anchor.set(0, 0.5);
                        text.position.set(-260, 0);
                    }
                }

                {
                    nameText = new PIXI.Text("", GetFontStyleByPlace(i + 1, (i < 3 ? 42 : 37)));
                    go.addChild(nameText);
                    nameText.zIndex = 1;
                    nameText.anchor.set(0, 0.5);
                    nameText.position.set((i < 3 ? -170 : -195), -2);
                }
            }

            {
                let go = item.CreateGameObject("count_bar");
                let barSprite = new UISprite(i < 3 ? Skins.HighLeaderCountBarSkin : MiddleLeaderCountBarSkin);
                go.AddComponent(barSprite);
                go.position.set(255, 0);

                {
                    countText = new PIXI.Text("", GetFontStyleByPlace(i + 1, (i < 3 ? 42 : 37)));
                    go.addChild(countText);
                    countText.zIndex = 1;
                    countText.anchor.set(0.5, 0.5);
                    countText.position.set(0, -2);
                }
            }

            let row = new LeaderboardItem(item, nameText, countText);
            list.push(row);
        }
    }
}

let currentLeaderboardIndex = 0;

export function CreateLeaderboardPopup(scene: Scene): GameObject {
    {
        currentLeaderboardIndex = 0;
        let popup = scene.CreateGameObject("leaderboard_popup")

        {
            let background = popup.CreateGameObject("background");
            let sprite = new UISprite('./assets/UI/info_plate_big.png');
            background.AddComponent(sprite);
        }
        {
            {
                let header = popup.CreateGameObject("background");
                let sprite = new UISprite('./assets/UI/header_info_plate.png');
                header.AddComponent(sprite);
                header.position.y -= 407;

                {
                    let text = new PIXI.Text('Leaderboard:', Skins.blueStyle(56));
                    header.addChild(text);
                    text.zIndex = 1;
                    text.anchor.set(0.5, 0.5);
                    text.position.set(0, -10);
                }
            }

            {
                leaderboardTitleText = new PIXI.Text("All time", Skins.orangeStyle(64));
                scene.addChild(leaderboardTitleText); //bug
                leaderboardTitleText.anchor.set(0.5, 0.5);
                leaderboardTitleText.position.set(0, -310);
            }

            {
                let go = popup.CreateGameObject("previous");
                let button = new UIButton(Skins.NextButtonSkin);
                button.onClick = (() => {
                    console.log("previous click")
                    currentLeaderboardIndex--;
                    if (currentLeaderboardIndex < 0) {
                        currentLeaderboardIndex = leaderboards.length - 1;
                    }

                    RedrawList();
                });
                go.AddComponent(button);
                go.position.set(-270, -310);
                go.scale.set(-1, 1)
            }

            {
                let go = popup.CreateGameObject("next");
                let button = new UIButton(Skins.NextButtonSkin);
                button.onClick = () => {
                    console.log("next click")
                    currentLeaderboardIndex++;
                    if (currentLeaderboardIndex == leaderboards.length) {
                        currentLeaderboardIndex = 0;
                    }

                    RedrawList();
                }
                go.AddComponent(button);
                go.position.set(270, -310);
            }

            CreateList(popup);
            RedrawList();

            {
                let go = popup.CreateGameObject("ok_button");
                let button = new UIButton(Skins.OkButtonSkin);
                go.AddComponent(button);
                go.position.set(0, 370);
            }
        }

        return popup;
    }
}