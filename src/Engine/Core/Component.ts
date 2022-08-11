import {GameObject, ILifetime} from "./GameObject";

export abstract class Component implements ILifetime {

    type: string;
    gameObject: GameObject;

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