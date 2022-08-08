import * as PIXI from 'pixi.js';
import {InteractableSkinData, UIButton, UISprite} from "./Engine/UI";
import {GameObject, RectTransform, Scene} from "./Engine/GameObject";

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

const skin = new InteractableSkinData()

skin.normal = "./assets/UI/play_button_active.png";
skin.hover = "./assets/UI/play_button_hover.png";
skin.pressed = "./assets/UI/play_button_press.png";

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


const scene = new Scene("scene", app);


// let go = scene.CreateGameObject();
// let button = new UIButton(skin);
// go.AddComponent(button);
// go.position.set(0, 100)
//
// button.onClick = toggleFullscreen;
//
// let go2 = scene.CreateGameObject();
// let button2 = new UIButton(skin);
// go2.AddComponent(button2);
// go2.position.set(0, 200)
//
// button2.onClick = () => {
//     scene.Destroy();
// };

let go3 = scene.CreateGameObject();
let button3 = new UIButton(skin);
button3.onClick = toggleFullscreen;
go3.AddComponent(button3);
let rectTransform = new RectTransform(100, 100, scene.rectTransform);
rectTransform.anchor.set(1, 0);
rectTransform.anchoredPosition.x = -200;
rectTransform.anchoredPosition.y = 200;
go3.AddComponent(rectTransform)
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