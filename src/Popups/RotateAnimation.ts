import {Component} from "../Engine/Core/Component";

export class RotateAnimation extends Component {

    constructor(private speed: number) {
        super();
    }

    OnUpdate() {

        super.OnUpdate();

        this.gameObject.rotation += this.speed;
    }
}