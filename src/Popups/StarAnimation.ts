import {Component} from "../Engine/Core/Component";

export class StarAnimation extends Component {

    constructor(private rotation: number, private from: number, private to: number, private speed: number) {
        super();
    }

    OnUpdate() {
        
        super.OnUpdate();


        if (this.speed > 0) {
            if (this.rotation > this.to) {
                this.speed = -this.speed;
                this.rotation = this.to;
            }
        }

        if (this.speed < 0) {
            if (this.rotation < this.from) {
                this.speed = -this.speed;
                this.rotation = this.from;
            }
        }

        this.rotation += this.speed * this.gameObject.deltaTime;
        this.gameObject.rotation = this.rotation;
    }
}