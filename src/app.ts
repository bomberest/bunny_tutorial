import * as PIXI from 'pixi.js';
import {CreateBestScorePopup} from "./Popups/BestScorePopup";
import {CreateHUD} from "./Popups/HUD";
import {Scene} from "./Engine/Core/Scene";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

PIXI.utils.sayHello(type);

const Application = PIXI.Application;

const app = new Application({width: 512, height: 512});
document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.resizeTo = window;
app.stage.position.set(app.view.width / 2, app.view.height / 2);

window.addEventListener("resize", function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.position.set(app.view.width / 2, app.view.height / 2);
});


const scene = new Scene("scene", app, 1, 960);

CreateHUD(scene);
let bestScorePopup = CreateBestScorePopup(scene);