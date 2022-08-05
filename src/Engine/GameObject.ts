// import { Sprite } from "pixi.js";

// export interface IUpdatable {
//   OnUpdate(): void;
// }

// interface IDestroyable {
//   OnDestroy(): void;
// }

// interface IStartable {
//   OnStart(): void;
// }

// interface ILifetime extends IStartable, IDestroyable, IUpdatable {}

// interface IComponent extends ILifetime {}

// interface IGameObject extends ILifetime {}

// export class GameObject extends Sprite implements IGameObject, ILifetime {
//   name: string;

//   constructor(name: string) {
//     super();
//     this.name = name;
//   }

//   OnStart(): void {}
//   OnDestroy(): void {}

//   targets: IComponent[];

//   Add(target: IComponent): void {
//     this.targets.push(target);
//   }

//   Remove(target: IComponent): void {
//     const index = this.targets.indexOf(target, 0); //??
//     if (index > -1) {
//       this.targets.splice(index, 1);
//     }
//   }

//   OnUpdate(): void {
//     this.targets.forEach((target: IComponent) => {
//       if (target == null) {
//         return;
//       }

//       target.OnUpdate();
//     });
//   }
// }

// export class Scene extends GameObject {
//   system: GameObjectSystem;

//   constructor(name: string) {
//     super(name);
//   }

//   CreateGameObject(name: string): GameObject {
//     var go = new GameObject(name);

//     this.system.Add(go);

//     go.OnStart();

//     return go;
//   }

//   DestroyGameObject(go: GameObject): void {
//     this.system.Remove(go);
//     go.OnDestroy();
//   }
// }

// abstract class Component implements ILifetime {
//   gameObject: GameObject;

//   OnStart(): void {}
//   OnDestroy(): void {}
//   OnUpdate(): void {}
// }

// class Transform extends Component {
//   children: GameObject[];
//   parent: GameObject;
// }

// class UIFragment extends Component {}

// class UIElement extends Component {}

// class UIButton extends UIElement {}

// abstract class System<T extends IUpdatable> implements IUpdatable {
//   targets: T[];

//   Add(target: T): void {
//     this.targets.push(target);
//   }

//   Remove(target: T): void {
//     const index = this.targets.indexOf(target, 0); //??
//     if (index > -1) {
//       this.targets.splice(index, 1);
//     }
//   }

//   OnUpdate(): void {
//     this.targets.forEach((target: T) => {
//       if (target == null) {
//         return;
//       }

//       target.OnUpdate();
//     });
//   }
// }

// class GameObjectSystem extends System<GameObject> {}
