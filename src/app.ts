import * as PIXI from 'pixi.js';
import * as Skins from './Skins';
import {InteractableSkinData, UIButton, UISprite} from "./Engine/UI";
import {GameObject, RectTransform, Scene} from "./Engine/GameObject";
import {TextStyle} from "pixi.js";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

PIXI.utils.sayHello(type);

//Aliases
const Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite;

//Create a Pixi Applic  ation
const app = new Application({width: 512, height: 512});
document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
//app.renderer.autoDensity = true;
app.resizeTo = window;
app.stage.position.set(app.view.width / 2, app.view.height / 2);

//Add the canvas that Pixi automatically created for you to the HTML document


console.log("app width: " + app.view.width + ", height: " + app.view.height);

window.addEventListener("resize", function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.position.set(app.view.width / 2, app.view.height / 2);
});

let fullScreen = false;

function toggleFullscreen() {
    const element = app.view;

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


const scene = new Scene("scene", app, 1, 960);

AddPlayButton();
AddSoundOnButton();
//AddSoundOffButton();
AddPauseButton();
AddFullScreenButton();

{
    let popup = scene.CreateGameObject()

    {
        let background = scene.CreateGameObject("background");
        popup.addChild(background);
        let sprite = new UISprite('./assets/UI/info_plate_big.png');
        background.AddComponent(sprite);
    }
    {
        let blueStyle = {
            fontFamily: 'ZubiloBlackW01-Regular',
            fontSize: 56,
            fill: "#003E71",
            align: 'center'
        } as TextStyle;

        let greenStyle = {
            fontFamily: 'ZubiloBlackW01-Regular', fontSize: 64, fill: "#03FD16", align: 'center',
            dropShadow: true,
            dropShadowDistance: 5,
            dropShadowAlpha: 0.5,
            dropShadowAngle: 90
        } as TextStyle;

        let header = scene.CreateGameObject("background");
        popup.addChild(header)
        let sprite = new UISprite('./assets/UI/header_info_plate.png');
        header.AddComponent(sprite);
        header.position.y -= 410;
        //header.zIndex = 2;

        {
            let text = new PIXI.Text('Your records:', blueStyle);
            header.addChild(text);
            text.zIndex = 1;
            text.anchor.set(0.5, 0.5);
            text.position.set(0, -10);
        }


        {
            let text = new PIXI.Text('Best score:', greenStyle);
            popup.addChild(text);
            text.zIndex = 1;
            text.anchor.set(0.5, 0.5);
            text.position.set(0, -300);
        }
    }
}

function AddPlayButton() {
    let go = scene.CreateGameObject("play_button");
    let button = new UIButton(Skins.PlayButtonSkin);
    button.onClick = toggleFullscreen;

    go.AddComponent(button);

    let rectTransform = new RectTransform(300, 200, scene.rectTransform);
    rectTransform.anchor.set(1, 0);
    rectTransform.anchoredPosition.x = -200;
    rectTransform.anchoredPosition.y = 400;
    go.AddComponent(rectTransform);
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


//go3.zIndex = 9000;

// let popup = scene.CreateGameObject("hud");
// let tiledSprite = new UISprite('./assets/UI/info_plate_big.png');
// popup.AddComponent(tiledSprite);
//
// popup.AddChild(go);
// popup.AddChild(go2);


// popup.logSize();

// let b = go.GetComponent<UIButton>(UIButton.name);
// b.onClick = ()=>{
//     console.log("test get component");
// }