import {Loader, Texture} from "pixi.js";
import {InteractableSkinData} from "./InteractableSkinData";
import {InteractableSkinTextures} from "./InteractableSkinTextures";
import {InteractableCallbacksData} from "./InteractableCallbacksData";
import {UIElement} from "./UIElement";

export abstract class InteractableUIElement extends UIElement {
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