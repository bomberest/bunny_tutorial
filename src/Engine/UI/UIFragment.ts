import {Component} from "../Core/Component";
import {UIFragmentModel} from "./UIFragmentModel";

export abstract class UIFragment<T extends UIFragmentModel> extends Component {

    constructor(public model: T) {
        super();
    }
}

