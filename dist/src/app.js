import * as PIXI from 'pixi.js';
import { InteractableSkinData, UIButton } from "./Engine/UI";
var type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}
PIXI.utils.sayHello(type);
//Aliases
var Application = PIXI.Application, loader = PIXI.Loader.shared, resources = PIXI.Loader.shared.resources, Sprite = PIXI.Sprite;
//Create a Pixi Application
var app = new Application({ width: 256, height: 256 });
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
//app.renderer.autoDensity = true;
app.resizeTo = window;
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
var bunny = "bunny";
var playButton = UIButton.prototype.Copy();
var skin = new InteractableSkinData();
skin.normal = './assets/UI/play_button_active.png';
skin.hover = "./assets/UI/play_button_hover.png";
skin.pressed = "./assets/UI/play_button_press.png";
playButton.skin = skin;
playButton.Load();
app.stage.addChild(playButton);
loader
    .add(bunny, "./assets/mi_bunny_idle_03.png")
    .load(setup);
function setup() {
    var bunnySprite = new Sprite(resources[bunny].texture);
    bunnySprite.position.set(196, 196);
    bunnySprite.scale.set(0.5, 0.5);
    bunnySprite.anchor.set(0.5, 0.5);
    app.stage.addChild(bunnySprite);
}
