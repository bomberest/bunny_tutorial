import * as PIXI from "pixi.js";
import * as Skins from "../Skins";
import {UIButton} from "../Engine/UI/UIButton";
import {UISprite} from "../Engine/UI/UISprite";
import {Scene} from "../Engine/Core/Scene";
import {CreateScorePopup} from "./ScorePopup";
import {UIFragmentModel} from "../Engine/UI/UIFragmentModel";
import {UIFragment} from "../Engine/UI/UIFragment";
import {CreateLeaderboardPopupUI} from "./LeaderboardPopup";

export function CreateBestScorePopupUI(): BestScorePopup {
    let model = new BestScorePopupModel(402, "Guest_11826");

    return Scene.main
        .CreateGameObject("leaderboard_popup")
        .AddComponent(new BestScorePopup(model));
}

export class BestScorePopupModel extends UIFragmentModel {
    constructor(public score: number, public name: string) {
        super();
    }
}

export class BestScorePopup extends UIFragment<BestScorePopupModel> {
    constructor(model: BestScorePopupModel) {
        super(model);
    }

    OnStart() {
        super.OnStart();

        let root = this.gameObject.scene;
        let popup = root.CreateGameObject("best_score_popup")

        {
            let background = root.CreateGameObject("background");
            popup.addChild(background);
            let sprite = new UISprite('./assets/UI/info_plate_big.png');
            background.AddComponent(sprite);
        }
        {
            let header = root.CreateGameObject("background");
            popup.addChild(header)
            let sprite = new UISprite('./assets/UI/header_info_plate.png');
            header.AddComponent(sprite);
            header.position.y -= 407;

            {
                let text = new PIXI.Text('Your records:', Skins.blueStyle(56));
                header.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(0, -10);
            }

            {
                let text = new PIXI.Text('Best score:', Skins.greenStyle(64));
                popup.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(0, -315);
            }

            {
                let text = new PIXI.Text(this.model.score, Skins.greenStyle(64));
                popup.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(0, -240);
            }

            {
                let go = root.CreateGameObject("mi_button");
                popup.addChild(go);
                let button = new UIButton(Skins.MiButtonSkin);
                button.onClick = () => {
                    window.open("https://mi.com/", '_blank').focus();
                }
                go.AddComponent(button);

                go.y = -60;
            }

            {
                {
                    let go = root.CreateGameObject("user_name_bar");
                    popup.addChild(go);
                    let barSprite = new UISprite(Skins.UserNameBarSkin);
                    go.AddComponent(barSprite);
                    go.position.set(0, 105);

                    {
                        let text = new PIXI.Text(this.model.name, Skins.whiteStyle(50));
                        go.addChild(text);
                        text.zIndex = 1;
                        text.anchor.set(1, 0.5);
                        text.position.set(20, 0);
                    }
                }
            }

            {
                let go = root.CreateGameObject("leaderboard_button");
                popup.addChild(go);
                let button = new UIButton(Skins.LeaderboardButtonSkin);
                button.onClick = () => {
                    popup.Destroy();
                    CreateLeaderboardPopupUI();
                }
                go.AddComponent(button);
                go.position.set(-160, 300);
            }

            {
                let go = root.CreateGameObject("play_button");
                popup.addChild(go);
                let button = new UIButton(Skins.PlayButtonSkin);
                button.onClick = () => {
                    popup.Destroy();
                    CreateScorePopup(root, true);
                }
                go.AddComponent(button);
                go.position.set(160, 300);
            }
        }
    }
}