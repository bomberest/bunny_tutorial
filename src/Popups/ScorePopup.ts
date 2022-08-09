import * as PIXI from "pixi.js";
import * as Skins from "../Skins";
import {GameObject} from "../Engine/Core/GameObject";
import {UIButton} from "../Engine/UI/UIButton";
import {UISprite} from "../Engine/UI/UISprite";
import {Scene} from "../Engine/Core/Scene";
import {CreateBestScorePopup} from "./BestScorePopup";

export function CreateScorePopup(scene: Scene): GameObject {
    {
        let popup = scene.CreateGameObject("score_popup")

        {
            let background = scene.CreateGameObject("background");
            popup.addChild(background);
            let sprite = new UISprite('./assets/UI/info_plate_big.png');
            background.AddComponent(sprite);
        }
        {
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
            }

            {
                let text = new PIXI.Text("158", Skins.greenStyle(190));
                popup.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(0, -250);
            }

            {
                let coin = scene.CreateGameObject("coin");
                popup.addChild(coin)
                let sprite = new UISprite(Skins.CollectCoinIconSkin);
                coin.AddComponent(sprite);
                coin.position.set(-225, -70)
                coin.zIndex = 1;
            }

            {
                let text = new PIXI.Text("6", Skins.goldStyle(100));
                popup.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(40, -55);
            }

            {
                let coin = scene.CreateGameObject("flag");
                popup.addChild(coin)
                let sprite = new UISprite(Skins.CollectDistanceIconSkin);
                coin.AddComponent(sprite);
                coin.position.set(-235, 110)
                coin.zIndex = 1;
            }

            {
                let text = new PIXI.Text("138 m", Skins.lightBlueStyle(100));
                popup.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(70, 120);
            }

            {
                let go = scene.CreateGameObject("play_button");
                popup.addChild(go);
                let button = new UIButton(Skins.OkButtonSkin);
                button.onClick = ()=>{

                    CreateBestScorePopup(go.scene);
                    popup.Destroy();
                }
                go.AddComponent(button);
                go.position.set(0, 365);
            }
        }

        return popup;
    }
}