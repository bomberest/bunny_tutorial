import {DisplayObject, Sprite} from "pixi.js";
import {Component} from "./Component";
import {Scene} from "./Scene";

export interface IUpdatable {
    OnUpdate(): void;
}

export interface IDestroyable {
    OnDestroy(): void;
}

export interface IStartable {
    OnStart(): void;
}

export interface ILifetime extends IStartable, IDestroyable, IUpdatable {
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

    CreateGameObject(name: string = "GameObject"): GameObject {
        let go = this.scene.CreateGameObject(name);
        go.parent = this;
        return go;
    }

    DestroyGameObject(go: GameObject): void {
        this.scene.DestroyGameObject(go);
    }

    Destroy(): void{
        this.DestroyGameObject(this);
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
}

