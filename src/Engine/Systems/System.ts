import {IUpdatable} from "../Core/GameObject";

export abstract class System<T extends IUpdatable> implements IUpdatable {
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