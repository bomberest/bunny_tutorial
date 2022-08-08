var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Loader, Sprite } from "pixi.js";
var UIElement = /** @class */ (function (_super) {
    __extends(UIElement, _super);
    function UIElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIElement.prototype.SetVisible = function (state) {
        this.visible = state;
    };
    return UIElement;
}(Sprite));
var InteractableSkinData = /** @class */ (function () {
    function InteractableSkinData() {
    }
    return InteractableSkinData;
}());
export { InteractableSkinData };
var InteractableSkinTextures = /** @class */ (function () {
    function InteractableSkinTextures() {
    }
    return InteractableSkinTextures;
}());
var InteractableCallbacksData = /** @class */ (function () {
    function InteractableCallbacksData() {
    }
    InteractableCallbacksData.prototype.CallButtonDown = function () {
        if (this.onButtonDown == null) {
            return;
        }
        this.onButtonDown();
    };
    InteractableCallbacksData.prototype.CallButtonUp = function () {
        if (this.onButtonUp == null) {
            return;
        }
        this.onButtonUp();
    };
    InteractableCallbacksData.prototype.CallButtonOver = function () {
        if (this.onButtonOver == null) {
            return;
        }
        this.onButtonOver();
    };
    InteractableCallbacksData.prototype.CallButtonOut = function () {
        if (this.onButtonOut == null) {
            return;
        }
        this.onButtonOut();
    };
    return InteractableCallbacksData;
}());
var InteractableUIElement = /** @class */ (function (_super) {
    __extends(InteractableUIElement, _super);
    function InteractableUIElement() {
        var _this = _super.call(this) || this;
        _this.buttonMode = true;
        _this
            // Mouse & touch events are normalized into
            // the pointer* events for handling different
            // button events.
            .on("pointerdown", _this.onButtonDown)
            .on("pointerup", _this.onButtonUp)
            .on("pointerupoutside", _this.onButtonUp)
            .on("pointerover", _this.onButtonOver)
            .on("pointerout", _this.onButtonOut);
        return _this;
    }
    InteractableUIElement.prototype.Load = function () {
        if (this.skin == null) {
            return;
        }
        new Loader()
            .add("normal", this.skin.normal)
            .add("hover", this.skin.hover)
            .add("pressed", this.skin.pressed)
            .load(this.onSkinLoaded);
    };
    InteractableUIElement.prototype.onSkinLoaded = function () {
        if (this == null) {
            return;
        }
        if (this.skin == null) {
            return;
        }
        if (this.skinTextures === null) {
            this.skinTextures = new InteractableSkinTextures();
        }
        if (this.skin.normal)
            this.skinTextures.normal = resources[this.skin.normal].texture;
        if (this.skin.hover)
            this.skinTextures.hover = resources[this.skin.hover].texture;
        if (this.skin.pressed)
            this.skinTextures.pressed = resources[this.skin.pressed].texture;
    };
    InteractableUIElement.prototype.onButtonDown = function () {
        this.callbacks.CallButtonDown();
    };
    InteractableUIElement.prototype.onButtonUp = function () {
        this.callbacks.CallButtonUp();
    };
    InteractableUIElement.prototype.onButtonOver = function () {
        this.callbacks.CallButtonOver();
    };
    InteractableUIElement.prototype.onButtonOut = function () {
        this.callbacks.CallButtonOut();
    };
    InteractableUIElement.prototype.SetInteractable = function (state) {
        this.interactive = state;
    };
    return InteractableUIElement;
}(UIElement));
var UIButton = /** @class */ (function (_super) {
    __extends(UIButton, _super);
    function UIButton() {
        return _super.call(this) || this;
    }
    UIButton.prototype.Copy = function () {
        return Object.create(this);
    };
    return UIButton;
}(InteractableUIElement));
export { UIButton };
var skin = new InteractableSkinData();
skin.normal = "./assets/UI/play_button_active.png";
skin.hover = "./assets/UI/play_button_hover.png";
skin.pressed = "./assets/UI/play_button_press.png";
var button = new UIButton();
button.skin = skin;
UIButton.prototype = button;
