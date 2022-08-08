import {Application, Container, DisplayObject, Sprite} from "pixi.js";

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
    name: string;
    targets: Component[] = [];

    constructor(name: string) {
        super();
        this.name = name;
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

    AddComponent(target: Component): void {
        this.targets.push(target);
        target.gameObject = this;
        target.OnStart.bind(target);
        target.OnStart();
        target.OnUpdate.bind(target);
    }

    RemoveComponent(target: Component): void {
        target.OnDestroy.bind(target);
        target.OnDestroy();
        const index = this.targets.indexOf(target, 0); //??
        if (index > -1) {
            this.targets.splice(index, 1);
        }
    }

    OnUpdate(): void {
        this.targets.forEach((target: Component) => {
            if (target == null) {
                return;
            }

            target.OnUpdate();
        });
    }

    toString(): string {
        return this.name;
    }
}

export class Scene extends GameObject {
    system: GameObjectSystem = new GameObjectSystem();
    stage: Container;

    constructor(name: string = "", private application: Application) {
        super(name);
        this.stage = application.stage;
        application.ticker.add(this.Update);
        this.system.OnUpdate.bind(this.system);
        this.sortableChildren = true;
    }

    CreateGameObject(name?: string): GameObject {
        let go = new GameObject(name);

        go.sortableChildren = true;

        go.pivot.set(0.5, 0.5);
        go.position.set(0, 0);

        this.AddChild(go);
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
        if (this.system != null && this.system.OnUpdate != null) {
            this.system.OnUpdate();
        }
    }

    Destroy(): void {
        console.log("destroy scene, objects count: " + this.system.targets.length);

        while (this.system.targets.length > 0) {
            let go = this.system.targets.pop();
            this.DestroyGameObject(go);
        }

        this.application.ticker.remove(this.Update);
    }
}

export abstract class Component implements ILifetime {
    gameObject: GameObject;

    OnStart(): void {
        console.log("Component: start")
    }

    OnDestroy(): void {
        console.log("Component: destroy")
    }

    OnUpdate(): void {
        console.log("Component: update")
    }

    toString(): string {
        return this.gameObject.name;
    }
}

class RectTransform extends Component {
    children: GameObject[];
    parent: GameObject;

    OnUpdate() {
        super.OnUpdate();

        this.gameObject._bounds;
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
