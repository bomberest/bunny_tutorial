import * as PIXI from "pixi.js";
import * as Skins from "../Skins";
import {GameObject} from "../Engine/Core/GameObject";
import {UIButton} from "../Engine/UI/UIButton";
import {UISprite} from "../Engine/UI/UISprite";
import {Scene} from "../Engine/Core/Scene";
import {CreateScorePopup} from "./ScorePopup";
import {LeaderboardPopup} from "./LeaderboardPopup";

export function CreateBestScorePopup(scene: Scene): GameObject {
    {
        let popup = scene.CreateGameObject("best_score_popup")

        {
            let background = scene.CreateGameObject("background");
            popup.addChild(background);
            let sprite = new UISprite('./assets/UI/info_plate_big.png');
            background.AddComponent(sprite);
        }
        {
            let header = scene.CreateGameObject("background");
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
                let text = new PIXI.Text("402", Skins.greenStyle(64));
                popup.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(0, -240);
            }

            {
                let go = scene.CreateGameObject("mi_button");
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
                    let go = scene.CreateGameObject("user_name_bar");
                    popup.addChild(go);
                    let barSprite = new UISprite(Skins.UserNameBarSkin);
                    go.AddComponent(barSprite);
                    go.position.set(0, 105);

                    {
                        let text = new PIXI.Text("Guest_11826", Skins.whiteStyle(50));
                        go.addChild(text);
                        text.zIndex = 1;
                        text.anchor.set(1, 0.5);
                        text.position.set(20, 0);
                    }
                }
            }

            {
                let go = scene.CreateGameObject("leaderboard_button");
                popup.addChild(go);
                let button = new UIButton(Skins.LeaderboardButtonSkin);
                button.onClick = () => {
                    popup.Destroy();
                    //CreateBestScorePopup(scene);
                }
                go.AddComponent(button);
                go.position.set(-160, 300);
            }

            {
                let go = scene.CreateGameObject("play_button");
                popup.addChild(go);
                let button = new UIButton(Skins.PlayButtonSkin);
                button.onClick = () => {
                    popup.Destroy();
                    CreateScorePopup(scene, true);
                }
                go.AddComponent(button);
                go.position.set(160, 300);
            }
        }

        return popup;
    }
}