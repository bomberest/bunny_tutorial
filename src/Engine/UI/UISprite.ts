import {Loader, Sprite} from "pixi.js";
import {Component} from "../Core/Component";

export class UISprite extends Component {

    _sprite: Sprite;

    constructor(public texture?: string) {
        super();
    }

    GetType(): string {
        return UISprite.name;
    }

    OnStart() {
        super.OnStart();
        this.Load();
    }

    OnDestroy() {
        super.OnDestroy();

        this.gameObject.RemoveChild(this._sprite);
    }

    private Load(): void {
        const loader = new Loader();
        loader.add(this.texture);
        loader.load(() => {
            this.onLoaded(this, loader);
        });
    }

    onLoaded(element: this, loader: Loader): void {
        let texture = loader.resources[this.texture].texture;
        this._sprite = new Sprite(texture);
        this._sprite.anchor.set(0.5, 0.5);
        this._sprite.position.set(0, 0)
        this._sprite.texture = texture;
        this.gameObject.addChild(this._sprite);
    }
}