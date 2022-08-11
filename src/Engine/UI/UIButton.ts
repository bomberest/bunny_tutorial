import {InteractableUIElement} from "./InteractableUIElement";
import {InteractableSkinData} from "./InteractableSkinData";

export class UIButton extends InteractableUIElement {

    constructor(skin?: InteractableSkinData) {
        super(skin);
    }
}