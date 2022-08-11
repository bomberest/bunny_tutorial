import * as PIXI from "pixi.js";
import * as Skins from "../Skins";
import {GameObject} from "../Engine/Core/GameObject";
import {UIButton} from "../Engine/UI/UIButton";
import {UISprite} from "../Engine/UI/UISprite";
import {Scene} from "../Engine/Core/Scene";
import {StarAnimation} from "./StarAnimation";
import {RotateAnimation} from "./RotateAnimation";
import {CreateBestScorePopupUI} from "./BestScorePopup";
import {UIFragmentModel} from "../Engine/UI/UIFragmentModel";
import {UIFragment} from "../Engine/UI/UIFragment";

export function CreateScorePopupUI(): ScorePopup {
    let model = new ScorePopupModel(402, 6, 138, true);

    return Scene.main
        .CreateGameObject("leaderboard_popup")
        .AddComponent(new ScorePopup(model));
}

export class ScorePopupModel extends UIFragmentModel {
    constructor(public score: number, public coins: number, public flags: number, public record: boolean) {
        super();
    }
}

export class ScorePopup extends UIFragment<ScorePopupModel> {
    constructor(model: ScorePopupModel) {
        super(model);
    }

    CreateStar(root: GameObject): GameObject {

        let star = root.CreateGameObject("star");
        let sprite = new UISprite('./assets/UI/star.png');
        star.AddComponent(sprite);
        let random = Math.random();
        let s = 0.005;
        let speed = random > 0.5 ? s : -s;
        star.AddComponent(new StarAnimation(1.3, 1.2, 1.4, speed));

        return star;
    }

    OnStart() {
        super.OnStart();

        let scene = this.gameObject.scene;
        let popup = scene.CreateGameObject("score_popup")

        if (this.model.record) {
            popup.scale.set(0.75, 0.75);
        }

        {
            let background = scene.CreateGameObject("rays");
            popup.addChild(background);
            let sprite = new UISprite('./assets/UI/rays.png');
            background.AddComponent(sprite);
            background.AddComponent(new RotateAnimation(0.005));
        }
        {
            {
                let star = this.CreateStar(popup);
                star.position.set(500, 400)
                star.scaleXY = 1;
            }

            {
                let star = this.CreateStar(popup);
                star.position.set(500, 150)
                star.scaleXY = 1;
            }

            {
                let star = this.CreateStar(popup);
                star.position.set(550, -100)
                star.scaleXY = 1.5;
            }

            {
                let star = this.CreateStar(popup);
                star.position.set(500, -350)
                star.scaleXY = 1;
            }

            {
                let star = this.CreateStar(popup);
                star.position.set(-500, 400)
                star.scaleXY = 1;
            }

            {
                let star = this.CreateStar(popup);
                star.position.set(-500, 150)
                star.scaleXY = 1.5;
            }

            {
                let star = this.CreateStar(popup);
                star.position.set(-500, -100)
                star.scaleXY = 1;
            }

            {
                let star = this.CreateStar(popup);
                star.position.set(-500, -350)
                star.scaleXY = 1;
            }
        }

        {
            let background = scene.CreateGameObject("background");
            popup.addChild(background);
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
                    let text = new PIXI.Text(this.model.record ? "New record:" : "Your records:", Skins.blueStyle(56));
                    header.addChild(text);
                    text.zIndex = 1;
                    text.anchor.set(0.5, 0.5);
                    text.position.set(0, -10);
                }
            }

            {
                let text = new PIXI.Text(this.model.score, Skins.greenStyle(190));
                popup.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(0, -250);
            }

            {
                let coin = popup.CreateGameObject("coin");
                let sprite = new UISprite(Skins.CollectCoinIconSkin);
                coin.AddComponent(sprite);
                coin.position.set(-225, -70)
                coin.zIndex = 1;
            }

            {
                let text = new PIXI.Text(this.model.coins, Skins.goldStyle(100));
                popup.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(40, -55);
            }

            {
                let coin = popup.CreateGameObject("flag");
                let sprite = new UISprite(Skins.CollectDistanceIconSkin);
                coin.AddComponent(sprite);
                coin.position.set(-235, 110)
                coin.zIndex = 1;
            }

            {
                let text = new PIXI.Text(this.model.flags + " m", Skins.lightBlueStyle(100));
                popup.addChild(text);
                text.zIndex = 1;
                text.anchor.set(0.5, 0.5);
                text.position.set(70, 120);
            }

            {
                let go = popup.CreateGameObject("play_button");
                let button = new UIButton(Skins.OkButtonSkin);
                button.onClick = () => {
                    popup.Destroy();
                    CreateBestScorePopupUI();

                    let children = popup.GetChildrenRecursively();
                    children.forEach(value => console.log(value.name));

                }
                go.AddComponent(button);
                go.position.set(0, 365);
            }
        }
    }
}

