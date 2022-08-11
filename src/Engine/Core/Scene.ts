import {Application, Container} from "pixi.js";
import {RectTransform} from "./RectTransform";
import {GameObject} from "./GameObject";
import {GameObjectSystem} from "../Systems/GameObjectSystem";
import {ComponentSystem} from "../Systems/ComponentSystem";

export class Scene extends GameObject {
    static main: Scene;
    gameObjectSystem: GameObjectSystem = new GameObjectSystem();
    componentSystem: ComponentSystem = new ComponentSystem();
    stage: Container;
    rectTransform: RectTransform;

    constructor(name: string, public application: Application, private heightOrWidth: number = 1, private heightReference: number = 1024) {
        super(name);

        this.scene = this;
        this.stage = application.stage;

        this.pivot.set(this.width / 2, this.height / 2);
        this.position.set(this.width / 2, this.height / 2);

        application.ticker.add(this.Update.bind(this));
        this.gameObjectSystem.OnUpdate.bind(this.gameObjectSystem);
        this.componentSystem.OnUpdate.bind(this.componentSystem);
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

    CreateGameObject(name: string = "GameObject", parent?: GameObject): GameObject {
        let go = new GameObject(name);
        go.scene = this;
        go.sortableChildren = true;

        (parent != null ? parent : this).addChild(go);

        this.gameObjectSystem.Add(go);

        go.OnStart.bind(go);
        go.OnStart();

        return go;
    }

    DestroyGameObject(go: GameObject): void {
        this.gameObjectSystem.Remove(go);
        go.OnDestroy();
        go.destroy();
    }


    Update(): void {
        if (this.gameObjectSystem != null) {
            this.gameObjectSystem.OnUpdate();
        }
    }

    Destroy(): void {
        console.log("destroy scene, objects count: " + this.gameObjectSystem.targets.length);

        while (this.gameObjectSystem.targets.length > 0) {
            let go = this.gameObjectSystem.targets.pop();
            this.DestroyGameObject(go);
        }

        this.application.stage.removeChild(this);

        this.application.ticker.remove(this.Update);
    }
}