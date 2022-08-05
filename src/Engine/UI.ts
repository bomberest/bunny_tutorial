import * as PIXI from "pixi.js";
import { Sprite, Texture } from "pixi.js";

const loader: PIXI.Loader = PIXI.Loader.shared;
const resources = PIXI.Loader.shared.resources;

abstract class UIElement extends Sprite {
  SetVisible(state: boolean): void {
    this.visible = state;
  }
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
}

abstract class InteractableUIElement extends UIElement {
  skin: InteractableSkinData;
  callbacks: InteractableCallbacksData;
  skinTextures: InteractableSkinTextures;

  constructor() {
    super();

    this.buttonMode = true;

    button
      // Mouse & touch events are normalized into
      // the pointer* events for handling different
      // button events.
      .on("pointerdown", this.onButtonDown)
      .on("pointerup", this.onButtonUp)
      .on("pointerupoutside", this.onButtonUp)
      .on("pointerover", this.onButtonOver)
      .on("pointerout", this.onButtonOut);
  }

  Load(): void {
    loader
      .add("normal", this.skin.normal)
      .add("hover", this.skin.hover)
      .add("pressed", this.skin.pressed)
      .load(this.onSkinLoaded);
  }

  SetInteractable(state: boolean): void {
    this.interactive = state;
  }

  onSkinLoaded(): void {
    this.skinTextures.normal = resources[this.skin.normal].texture;
    this.skinTextures.hover = resources[this.skin.hover].texture;
    this.skinTextures.pressed = resources[this.skin.pressed].texture;
  }

  onButtonDown(): void {
    this.callbacks.CallButtonDown();
  }

  onButtonUp(): void {
    this.callbacks.CallButtonUp();
  }

  onButtonOver(): void {
    this.callbacks.CallButtonOver();
  }

  onButtonOut(): void {
    this.callbacks.CallButtonOut();
  }
}

export class UIButton extends InteractableUIElement {
  Copy(): UIButton {
    return Object.create(this);
  }
  constructor() {
    super();
  }
}

var skin = new InteractableSkinData();
skin.normal = "./assets/UI/play_button_active.png";
skin.hover = "./assets/UI/play_button_hover.png";
skin.pressed = "./assets/UI/play_button_press.png";

var button = new UIButton();
button.skin;
button.SetVisible(false);

UIButton.prototype = button;
