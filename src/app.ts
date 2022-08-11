const PIXI = require('pixi.js');
import {Scene} from "./Engine/Core/Scene";
import {CreateHUD} from "./Popups/HUD";
import {CreateLeaderboardPopupUI} from "./Popups/LeaderboardPopup";
import {CreateBestScorePopup} from "./Popups/BestScorePopup";
import {CreateScorePopup} from "./Popups/ScorePopup";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

PIXI.utils.sayHello(type);

const Application = PIXI.Application;

const app = new Application({width: 512, height: 512, backgroundColor: 99999});
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
Scene.main = scene;

let leaderboardPopup = CreateLeaderboardPopupUI();
// let scorePopup = CreateScorePopup(Scene.main, false);
// let bestScorePopup = CreateScorePopup(Scene.main, true);
CreateHUD(scene);