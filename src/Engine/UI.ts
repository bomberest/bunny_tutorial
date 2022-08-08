import {Loader, Sprite, Texture} from "pixi.js";
import {Component, GameObject} from "./GameObject";

abstract class UIElement extends Component {
}

export class InteractableSkinData {
    normal: string;
    pressed: string;
    hover: string;
}

class InteractableSkinTextures {
    normal: Texture;
    pressed: Texture;
    hover: Texture;
}

class InteractableCallbacksData {
    onButtonDown: Function;
    onButtonUp: Function;
    onButtonOver: Function;
    onButtonOut: Function;
    onClick: Function;

    CallButtonDown(): void {
        if (this.onButtonDown == null) {
            return;
        }
        this.onButtonDown();
    }

    CallButtonUp(): void {
        if (this.onButtonUp == null) {
            return;
        }
        this.onButtonUp();
    }

    CallButtonOver(): void {
        if (this.onButtonOver == null) {
            return;
        }
        this.onButtonOver();
    }

    CallButtonOut(): void {
        if (this.onButtonOut == null) {
            return;
        }
        this.onButtonOut();
    }

    CallButtonClick(): void {
        if (this.onClick == null) {
            return;
        }
        this.onClick();
    }
}

abstract class InteractableUIElement extends UIElement {
    skin: InteractableSkinData = new InteractableSkinData();
    callbacks: InteractableCallbacksData = new InteractableCallbacksData();
    skinTextures: InteractableSkinTextures = new InteractableSkinTextures();

    public set onClick(onClick: Function) {
        this.callbacks.onClick = onClick;
    }

    public get onClick() {
        return this.callbacks.onClick;
    }

    protected constructor(skin?: InteractableSkinData) {
        super();

        if (skin != null) {
            this.SetSkin(skin);
        }
    }

    OnStart() {
        super.OnStart();

        this.gameObject.buttonMode = true;
        this.SetInteractable(true);

        this.gameObject
            .on("pointerdown", this.onButtonDown.bind(this))
            .on("pointerup", this.onButtonUp.bind(this))
            .on("pointerupoutside", this.onButtonUp.bind(this))
            .on("pointerover", this.onButtonOver.bind(this))
            .on("pointerout", this.onButtonOut.bind(this))
            .on("click", this.onButtonClick.bind(this))
            .on("tap", this.onButtonClick.bind(this));
    }

    SetSkin(skin: InteractableSkinData): void {
        this.skin = skin;
        this.Load();
    }

    private Load(): void {

        if (this.skin === null) {
            return;
        }

        const loader = new Loader();
        loader.add(this.skin.normal);
        loader.add(this.skin.hover);
        loader.add(this.skin.pressed);
        loader.load(() => {
            this.onSkinLoaded(this, loader);
        });
    }


    onSkinLoaded(element: this, loader: Loader): void {
        if (element.skinTextures == null) {
            element.skinTextures = new InteractableSkinTextures();
        }

        if (element.skin.normal)
            element.skinTextures.normal = loader.resources[element.skin.normal].texture;
        if (element.skin.hover)
            element.skinTextures.hover = loader.resources[element.skin.hover].texture;
        if (element.skin.pressed)
            element.skinTextures.pressed = loader.resources[element.skin.pressed].texture;

        this.setStateNormal();
    }

    setStateTexture(texture: Texture): void {
        this.gameObject.texture = texture;
    }

    setStateNormal(): void {
        this.setStateTexture(this.skinTextures.normal);
    }

    setStateHover(): void {
        this.setStateTexture(this.skinTextures.hover);
    }

    setStatePressed(): void {
        this.setStateTexture(this.skinTextures.pressed);
    }

    onButtonDown() {
        this.callbacks.CallButtonDown();

        this.setStatePressed();
    }

    onButtonUp() {
        this.callbacks.CallButtonUp();

        this.setStateHover();
    }

    onButtonOver() {
        this.callbacks.CallButtonOver();

        this.setStateHover();
    }

    onButtonOut() {

        this.callbacks.CallButtonOut();

        this.setStateNormal();
    }

    onButtonClick() {
        this.callbacks.CallButtonClick();
    }

    SetInteractable(state: boolean): void {
        this.gameObject.interactive = state;
    }
}

export class UIButton extends InteractableUIElement {
    Copy(): UIButton {
        let copy = new UIButton();
        copy.skin = this.skin;
        return copy;
    }

    constructor(skin?: InteractableSkinData) {
        super(skin);
    }

    GetType(): string {
        return UIButton.name;
    }
}

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