import {Application, Container} from "pixi.js";
import {RectTransform} from "./RectTransform";
import {GameObject} from "./GameObject";
import {GameObjectSystem} from "../Systems/GameObjectSystem";

export class Scene extends GameObject {
    system: GameObjectSystem = new GameObjectSystem();
    stage: Container;
    rectTransform: RectTransform;

    constructor(name: string, public application: Application, private heightOrWidth: number = 1, private heightReference: number = 1024) {
        super(name);
        this.stage = application.stage;

        this.pivot.set(this.width / 2, this.height / 2);
        this.position.set(this.width / 2, this.height / 2);

        application.ticker.add(this.Update.bind(this));
        this.system.OnUpdate.bind(this.system);
        application.stage.addChild(this);

        console.log("scene width: " + application.view.width + ", height: " + application.view.height);

        this.rectTransform = new RectTransform();
        this.AddComponent(this.rectTransform);
        this.UpdateRectSize(this.rectTransform);

        window.addEventListener("resize", ev => {
            this.UpdateRectSize(this.rectTransform);
        });
    }

    UpdateRectSize(rectTransform: RectTransform): void {
        let factor = this.application.view.height / this.heightReference;
        this.scale.set(factor, factor);

        let widthPercent = this.heightOrWidth;
        let heightPercent = this.heightOrWidth;
        rectTransform.width = this.application.view.width / factor;
        rectTransform.height = this.application.view.height / factor;

        rectTransform.RecalculateSize();
    }

    CreateGameObject(name: string = "GameObject"): GameObject {
        let go = new GameObject(name);
        go.scene = this;
        go.sortableChildren = true;

        this.addChild(go);

        this.system.Add(go);

        go.OnStart.bind(go);
        go.OnStart();

        return go;
    }

    DestroyGameObject(go: GameObject): void {
        this.system.Remove(go);
        go.OnDestroy.bind(go);
        go.OnDestroy();
        go.destroy();
    }

    Update(): void {
        if (this.system != null) {
            this.system.OnUpdate();
        }
    }

    Destroy(): void {
        console.log("destroy scene, objects count: " + this.system.targets.length);

        while (this.system.targets.length > 0) {
            let go = this.system.targets.pop();
            this.DestroyGameObject(go);
        }

        this.application.stage.removeChild(this);

        this.application.ticker.remove(this.Update);
    }
}