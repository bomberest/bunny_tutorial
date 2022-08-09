import {UIButton} from "../Engine/UI";
import * as Skins from "../Skins";
import {RectTransform, Scene} from "../Engine/GameObject";

export function CreateHUD(scene: Scene) {
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

    AddPauseButton();
    AddSoundOnButton();
    AddFullScreenButton();
}