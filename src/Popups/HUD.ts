import * as Skins from "../Skins";
import * as PIXI from "pixi.js";
import {UIButton} from "../Engine/UI/UIButton";
import {UISprite} from "../Engine/UI/UISprite";
import {RectTransform} from "../Engine/Core/RectTransform";
import {Scene} from "../Engine/Core/Scene";

export function CreateHUD(scene: Scene) {

    function AddGoldWidget() {

        let go = scene.CreateGameObject("gold_widget");
        let rectTransform = new RectTransform(120, 120, scene.rectTransform);
        rectTransform.anchor.set(0, 0);
        rectTransform.anchoredPosition.x = 65;
        rectTransform.anchoredPosition.y = 60;
        go.AddComponent(rectTransform);

        {
            let background = go.CreateGameObject("background");
            let sprite = new UISprite(Skins.CoinScorePlateSkin);
            background.AddComponent(sprite);
            background.position.x = 110;

            let text = new PIXI.Text('42', Skins.whiteStyle(56));
            background.addChild(text);
            text.zIndex = 1;
            text.anchor.set(0.5, 0.5);
            text.position.set(10, 0);
        }

        {
            let background = go.CreateGameObject("icon");
            let sprite = new UISprite(Skins.CollectCoinIconSkin);
            background.AddComponent(sprite);
        }
    }

    function AddSoundOnButton() {
        let go = scene.CreateGameObject("sound_on_button");
        let button = new UIButton(Skins.SoundOnButtonSkin);

        go.AddComponent(button);

        let rectTransform = new RectTransform(120, 120, scene.rectTransform);
        rectTransform.anchor.set(1, 0);
        rectTransform.anchoredPosition.x = -80 - 140 * 1;
        rectTransform.anchoredPosition.y = 70;
        go.AddComponent(rectTransform);
    }

    function AddSoundOffButton() {
        let go = scene.CreateGameObject("sound_off_button");
        let button = new UIButton(Skins.SoundOnButtonSkin);

        go.AddComponent(button);

        let rectTransform = new RectTransform(120, 120, scene.rectTransform);
        rectTransform.anchor.set(1, 0);
        rectTransform.anchoredPosition.x = -80 - 140 * 1;
        rectTransform.anchoredPosition.y = 70;
        go.AddComponent(rectTransform);
    }

    function AddPauseButton() {
        let go = scene.CreateGameObject("pause_button");
        let button = new UIButton(Skins.PauseButtonSkin);

        go.AddComponent(button);

        let rectTransform = new RectTransform(120, 120, scene.rectTransform);
        rectTransform.anchor.set(1, 0);
        rectTransform.anchoredPosition.x = -80 - 140 * 0;
        rectTransform.anchoredPosition.y = 70;
        go.AddComponent(rectTransform);
    }

    function AddFullScreenButton() {
        let go = scene.CreateGameObject("pause_button");
        let button = new UIButton(Skins.FullscreenButtonSkin);
        button.onClick = toggleFullscreen;

        go.AddComponent(button);

        let rectTransform = new RectTransform(120, 120, scene.rectTransform);
        rectTransform.anchor.set(1, 0);
        rectTransform.anchoredPosition.x = -80 - 140 * 2;
        rectTransform.anchoredPosition.y = 70;
        go.AddComponent(rectTransform);
    }

    let fullScreen = false;

    function toggleFullscreen() {
        const element = document.body;

        if (fullScreen) {
            document.exitFullscreen().then(function () {
                // element has entered fullscreen mode successfully
                fullScreen = false;

            })
                .catch(function (error) {

                });
        } else {
            element.requestFullscreen({})
                .then(function () {
                    // element has entered fullscreen mode successfully
                    fullScreen = true;

                })
                .catch(function (error) {

                });
        }
    }

    AddGoldWidget();
    AddPauseButton();
    AddSoundOnButton();
    AddFullScreenButton();
}