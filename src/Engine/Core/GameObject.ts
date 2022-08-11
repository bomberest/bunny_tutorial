import {DisplayObject, Sprite, Ticker} from "pixi.js";
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

    get ticker(): Ticker {
        return this.scene.application.ticker;
    }

    get deltaTime(): number {
        return this.scene.application.ticker.deltaTime;
    }

    get scaleXY(): number {
        return this.scale.x;
    }

    set scaleXY(value: number) {
        this.scale.set(value, value);
    }

    get gameObjectChildren(): GameObject[] {
        let array: GameObject[] = [];

        this.children.forEach(child => {
            if (child instanceof GameObject) {
                array.push(child as GameObject);
            }
        })

        return array;
    }

    OnStart(): void {
    }

    OnDestroy(): void {
        this.RemoveChildrenComponentsRecursively()
    }

    AddChild(child: DisplayObject): void {
        this.addChild(child)
        child.zIndex = this.zIndex + 1;
    }

    RemoveChildrenComponentsRecursively(): void {
        let children = this.GetChildrenRecursively();

        children.forEach(child => {
            child.RemoveComponents();
        })
    }

    ///Includes itself
    GetChildrenRecursively(): GameObject[] {
        let input: GameObject[] = [];
        let output: GameObject[] = [];
        input.push(this);

        while (input.length > 0) {
            let item: GameObject = input.pop();
            output.push(item)
            let children = item.gameObjectChildren;
            if (children == null) {
                continue;
            }
            input.push(...children);
        }

        return output;
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

    AddComponent(component: Component): void {
        component.gameObject = this;
        component.OnBind(component);
        component.OnStart.bind(component);
        component.OnUpdate.bind(component);
        component.OnDestroy.bind(component);

        this.components.push(component);

        component.OnStart();
    }

    RemoveComponent(component: Component): void {
        this.components.filter(component => {
            return component == component;
        });
    }

    RemoveComponents(): void {
        this.components.forEach(value => {
            value.OnDestroy();
        });
        this.components = [];
    }

    CreateGameObject(name: string = "GameObject"): GameObject {
        let go = this.scene.CreateGameObject(name, this);
        this.AddChild(go);
        return go;
    }

    DestroyGameObject(go: GameObject): void {
        this.scene.DestroyGameObject(go);
    }

    Destroy(): void {
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

