import {Application, Container, DisplayObject, Graphics, ObservablePoint, Sprite, Text} from "pixi.js";

export interface IUpdatable {
    OnUpdate(): void;
}

interface IDestroyable {
    OnDestroy(): void;
}

interface IStartable {
    OnStart(): void;
}

interface ILifetime extends IStartable, IDestroyable, IUpdatable {
}

export class GameObject extends Sprite implements ILifetime {
    name: string = "GameObject";
    scene: Scene;
    components: Component[] = [];

    constructor(name: string) {
        super();
        this.name = name;
        this.anchor.set(0.5, 0.5);
    }

    OnStart(): void {
    }

    OnDestroy(): void {
    }

    AddChild(child: DisplayObject): void {
        this.addChild(child)
        child.zIndex = this.zIndex + 1;
    }

    RemoveChild(child: DisplayObject): void {
        this.removeChild(child)
    }

    GetComponent<T extends Component>(type: string): T {
        for (let i = this.components.length - 1; i >= 0; i--) {
            let component = this.components[i];
            let componentType = component.GetType();
            if (componentType == type) {
                return component as T;
            }
        }
    }

    AddComponent(target: Component): void {
        this.components.push(target);
        target.gameObject = this;
        target.OnBind(target);
        target.OnStart.bind(target);
        target.OnStart();
        target.OnUpdate.bind(target);
    }

    RemoveComponent(target: Component): void {
        target.OnDestroy.bind(target);
        target.OnDestroy();
        const index = this.components.indexOf(target, 0); //??
        if (index > -1) {
            this.components.splice(index, 1);
        }
    }

    OnUpdate(): void {
        this.components.forEach((target: Component) => {
            if (target == null) {
                return;
            }

            target.OnUpdate();
        });
    }

    toString(): string {
        return this.name;
    }

    logSize(): void {
        console.log(this.name + " width: " + this.getBounds());
    }
}

export class Scene extends GameObject {
    system: GameObjectSystem = new GameObjectSystem();
    stage: Container;
    rectTransform: RectTransform;

    constructor(name: string, private application: Application, private heightOrWidth: number = 1, private heightReference: number = 1024) {
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

export abstract class Component implements ILifetime {

    type: string;
    gameObject: GameObject;

    GetType(): string {
        throw new Error("Undefined type");
    }

    OnBind<T extends Component>(component: T): void {

    }

    OnStart(): void {
    }

    OnDestroy(): void {
    }

    OnUpdate(): void {
    }

    toString(): string {
        return this.gameObject.name;
    }
}

export class RectTransform extends Component {
    public width: number = 100;
    public height: number = 100;
    public anchor: ObservablePoint = new ObservablePoint(this.OnRecalculate, this, 0.5, 0.5);
    public anchoredPosition: ObservablePoint = new ObservablePoint(this.OnRecalculate, this, 0, 0);

    get AnchorPositionX(): number {
        return -this.parent.width / 2 + this.parent.width * this.anchor.x;
    }

    get AnchorPositionY(): number {
        return -this.parent.height / 2 + this.parent.height * this.anchor.y;
    }

    constructor(width?: number, height?: number, public parent?: RectTransform) {
        super();
        this.width = width;
        this.height = height;
    }

    public OnBind<T extends Component>(component: T) {
        super.OnBind(component);

        this.OnRecalculate.bind(component);
        this.OnPivotChanged.bind(component);
        this.OnPivotChanged.bind(component);
    }

    private OnRecalculate(): void {
        this.RecalculateSize();
    }

    private OnPivotChanged(): void {
        this.RecalculateSize();
    }

    public RecalculateSize(): void {

        if (this.gameObject == null) {
            return;
        }

        if (this.parent != null) {

            this.gameObject.position.set(
                this.AnchorPositionX + this.anchoredPosition.x,
                this.AnchorPositionY + this.anchoredPosition.y
            );
        }

        this.gameObject.children.forEach(displayObject => {
            if (!(displayObject instanceof GameObject)) {
                return;
            }

            let go = displayObject as GameObject;
            if (go == null) {
                return;
            }

            let childRectTransform = go.GetComponent<RectTransform>(RectTransform.name);
            if (childRectTransform == null) {
                return;
            }
            childRectTransform.RecalculateSize.bind(childRectTransform)();
        })

        this.drawDebugView(this.gameObject);
    }

    debugView: Graphics;
    debugText: Text;

    drawDebugRect: boolean = true;
    drawDebugText: boolean = false;

    drawDebugView(go: GameObject): void {

        if (!this.drawDebugRect && !this.drawDebugText) {
            return;
        }

        if (this.debugView == null) {

            if (this.drawDebugRect) {
                this.debugView = new Graphics();
                go.addChild(this.debugView)
                this.debugView.position.set(0, 0)
                this.debugView.zIndex = Number.MAX_VALUE;
            }

            if (this.drawDebugText) {
                this.debugText = new Text();
                this.debugText.text = go.name;
                this.debugText.anchor.set(0.5, 0.5);
                go.addChild(this.debugText);
            }

        }

        if (this.debugView == null) {
            return;
        }

        this.debugView.clear();

        const width = 4;

        if (this.drawDebugRect) {
            this.debugView.lineStyle(width, 0xFF0000);
            this.debugView.drawRect(
                -this.width / 2,
                -this.height / 2,
                this.width, this.height);
            this.debugView.lineStyle(width, 0xFF0000);
            this.debugView.drawCircle(0, 0, 1);
        }

        if (this.drawDebugText) {
            this.debugText.text = go.name;
        }

    }

    OnStart() {
        super.OnStart();
        this.RecalculateSize();
    }

    OnUpdate() {
        super.OnUpdate();
    }

    GetType(): string {
        return RectTransform.name;
    }
}

class UIFragment extends Component {
}

class UIElement extends Component {
}

class UIButton extends UIElement {
}

abstract class System<T extends IUpdatable> implements IUpdatable {
    targets: T[] = [];

    Add(target: T): void {
        this.targets.push(target);
        target.OnUpdate.bind(target);
    }

    Remove(target: T): void {
        const index = this.targets.indexOf(target, 0); //??
        if (index > -1) {
            this.targets.splice(index, 1);
        }
    }

    OnUpdate(): void {
        this.targets.forEach((target: T) => {
            if (target == null) {
                return;
            }

            target.OnUpdate();
        });
    }
}

class GameObjectSystem extends System<GameObject> {
}
