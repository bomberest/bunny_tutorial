import * as PIXI from 'pixi.js';
import {InteractableSkinData, UIButton, UISprite} from "./Engine/UI";
import {GameObject, Scene} from "./Engine/GameObject";
import {TilingSprite} from "pixi.js";

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
const app = new Application({width: 256, height: 256});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
//app.renderer.autoDensity = true;
app.resizeTo = window;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

window.addEventListener("resize", function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

const bunny = "bunny";


const skin = new InteractableSkinData()

skin.normal = "./assets/UI/play_button_active.png";
skin.hover = "./assets/UI/play_button_hover.png";
skin.pressed = "./assets/UI/play_button_press.png";

// let playButton = UIButton.prototype.Copy();
// playButton.skin = skin;
// playButton.Load();
// playButton.callbacks.onClick = () => {
//     console.log("Play Button Click")
// };
//
// playButton.x = 100;
// playButton.y = 100;
//

//
// var button2 = playButton.Copy();
// button2.callbacks.onClick = () => {
//     console.log("button 2")
//
//     toggleFullscreen();
// };


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

//
//
// button2.y = 200;
//
// button2.Load();

const scene = new Scene("scene", app);

let go = scene.CreateGameObject();
let button = new UIButton(skin);
go.AddComponent(button);

button.onClick = toggleFullscreen;

let go2 = scene.CreateGameObject();
let button2 = new UIButton(skin);
go2.AddComponent(button2);

button2.onClick = () => {
    scene.Destroy();
};

let popup = scene.CreateGameObject("window");
let tiledSprite = new UISprite('./assets/UI/info_plate_big.png');
popup.AddComponent(tiledSprite);
popup.position.set(0, 0);

popup.AddChild(go);
popup.AddChild(go2);
go.position.set(50, 100);
go2.position.set(300, 100);

popup.scale.set(0.5, 0.5);

// loader
//     .add(bunny, "./assets/mi_bunny_idle_03.png")
//     .load(setup);

function setup() {
    const bunnySprite = new Sprite(
        resources[bunny].texture
    );

    bunnySprite.position.set(196, 196);
    bunnySprite.scale.set(0.5, 0.5);
    bunnySprite.anchor.set(0.5, 0.5);

    app.stage.addChild(bunnySprite);
}