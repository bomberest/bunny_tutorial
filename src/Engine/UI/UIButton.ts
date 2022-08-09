import {InteractableUIElement} from "./InteractableUIElement";
import {InteractableSkinData} from "./InteractableSkinData";

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