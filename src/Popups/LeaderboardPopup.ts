import * as PIXI from "pixi.js";
import {Text} from "pixi.js";
import * as Skins from "../Skins";
import {GameObject} from "../Engine/Core/GameObject";
import {UIButton} from "../Engine/UI/UIButton";
import {UISprite} from "../Engine/UI/UISprite";
import {Scene} from "../Engine/Core/Scene";
import {CreateBestScorePopup} from "./BestScorePopup";
import {UIFragment} from "../Engine/UI/UIFragment";
import {UIFragmentModel} from "../Engine/UI/UIFragmentModel";

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

export function CreateLeaderboardPopupUI(): LeaderboardPopup {

    let leaderboards: Leaderboard[] = [
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

    let model = new LeaderboardModel(leaderboards);

    return Scene.main
        .CreateGameObject("leaderboard_popup")
        .AddComponent(new LeaderboardPopup(model));
}

export class LeaderboardModel extends UIFragmentModel {
    constructor(public leaderboards: Leaderboard[]) {
        super();
    }
}

export class LeaderboardPopup extends UIFragment<LeaderboardModel> {
    constructor(model: LeaderboardModel) {
        super(model);
    }

    OnStart() {
        super.OnStart();
        this.Fill();
    }

    GetBackgroundByPlace(place: number) {
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

    GetFontStyleByPlace(place: number, fontSize: number) {
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

    leaderboardTitleText: Text;
    list: LeaderboardItem[] = [];
    timeouts: NodeJS.Timeout[] = [];

    RedrawList(leaderboard?: Leaderboard) {
        for (let i = 0; i < this.list.length; i++) {
            clearTimeout(this.timeouts[i]);
        }

        this.timeouts.length = 0;

        if (leaderboard == null) {
            leaderboard = this.model.leaderboards[this.currentLeaderboardIndex];
        }
        this.leaderboardTitleText.text = leaderboard.name;
        let data = leaderboard.data;
        for (let i = 0; i < this.list.length; i++) {
            let name: string = data == null || data.length <= i ? "-" : data[i].name;
            let count: string = data == null || data.length <= i ? "-" : data[i].count.toString();
            let item = this.list[i];
            item.nameText.text = name;
            item.countText.text = count;

            item.container.visible = false;
            this.timeouts[i] = setTimeout(() => {
                item.container.visible = true;
            }, 200 + i * 80);
        }
    }


    CreateList(root: GameObject) {

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
                    go.AddComponent(new UISprite(this.GetBackgroundByPlace(i + 1)));
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
                        nameText = new PIXI.Text("", this.GetFontStyleByPlace(i + 1, (i < 3 ? 42 : 37)));
                        go.addChild(nameText);
                        nameText.zIndex = 1;
                        nameText.anchor.set(0, 0.5);
                        nameText.position.set((i < 3 ? -170 : -195), -2);
                    }
                }

                {
                    let go = item.CreateGameObject("count_bar");
                    go.AddComponent(new UISprite(i < 3 ?
                        Skins.HighLeaderCountBarSkin :
                        Skins.MiddleLeaderCountBarSkin));
                    go.position.set(255, 0);

                    {
                        countText = new PIXI.Text("", this.GetFontStyleByPlace(i + 1, (i < 3 ? 42 : 37)));
                        go.addChild(countText);
                        countText.zIndex = 1;
                        countText.anchor.set(0.5, 0.5);
                        countText.position.set(0, -2);
                    }
                }

                let row = new LeaderboardItem(item, nameText, countText);
                this.list.push(row);
            }
        }
    }

    currentLeaderboardIndex = 0;


    Fill(): void {
        let root = this.gameObject;
        {
            this.currentLeaderboardIndex = 0;

            {
                let background = root.CreateGameObject("background");
                background.AddComponent(new UISprite('./assets/UI/info_plate_big.png'));
            }
            {
                {
                    let header = root.CreateGameObject("background");
                    header.AddComponent(new UISprite('./assets/UI/header_info_plate.png'));
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
                    this.leaderboardTitleText = new PIXI.Text("All time", Skins.orangeStyle(64));
                    root.AddChild(this.leaderboardTitleText); //bug
                    this.leaderboardTitleText.anchor.set(0.5, 0.5);
                    this.leaderboardTitleText.position.set(0, -310);
                }

                {
                    let go = root.CreateGameObject("previous");
                    go.AddComponent(new UIButton(Skins.NextButtonSkin), button => {
                        button.onClick = (() => {
                            this.currentLeaderboardIndex--;
                            if (this.currentLeaderboardIndex < 0) {
                                this.currentLeaderboardIndex = this.model.leaderboards.length - 1;
                            }

                            this.RedrawList();
                        });
                    })
                    go.position.set(-270, -310);
                    go.scale.set(-1, 1)
                }

                {
                    let go = root.CreateGameObject("next");
                    go.AddComponent(new UIButton(Skins.NextButtonSkin), button => {
                        button.onClick = () => {
                            this.currentLeaderboardIndex++;
                            if (this.currentLeaderboardIndex == this.model.leaderboards.length) {
                                this.currentLeaderboardIndex = 0;
                            }

                            this.RedrawList();
                        }
                    });
                    go.position.set(270, -310);
                }

                this.CreateList(root);
                this.RedrawList();

                {
                    let go = root.CreateGameObject("ok_button");
                    go.AddComponent(new UIButton(Skins.OkButtonSkin), button => {
                        button.onClick = () => {
                            root.Destroy();
                            CreateBestScorePopup(root.scene);
                        }
                    });
                    go.position.set(0, 370);
                }
            }
        }
    }
}

