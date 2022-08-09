import {Component} from "./Component";
import {Graphics, ObservablePoint, Text} from "pixi.js";
import {GameObject} from "./GameObject";

export class RectTransform extends Component {
    public width: number = 100;
    public height: number = 100;
    public anchor: ObservablePoint = new ObservablePoint(this.OnRecalculate, this, 0.5, 0.5);
    public anchoredPosition: ObservablePoint = new ObservablePoint(this.OnRecalculate, this, 0, 0);

    get AnchorPositionX(): number {
        return -this.parent.width / 2 + this.parent.width * this.anchor.x;
    }

    get AnchorPositionY(): number {
        return -this.parent.height / 2 + this.parent.height * this.anchor.y;
    }

    constructor(width?: number, height?: number, public parent?: RectTransform) {
        super();
        this.width = width;
        this.height = height;
    }

    public OnBind<T extends Component>(component: T) {
        super.OnBind(component);

        this.OnRecalculate.bind(component);
        this.OnPivotChanged.bind(component);
        this.OnPivotChanged.bind(component);
    }

    private OnRecalculate(): void {
        this.RecalculateSize();
    }

    private OnPivotChanged(): void {
        this.RecalculateSize();
    }

    public RecalculateSize(): void {

        if (this.gameObject == null) {
            return;
        }

        if (this.parent != null) {

            this.gameObject.position.set(
                this.AnchorPositionX + this.anchoredPosition.x,
                this.AnchorPositionY + this.anchoredPosition.y
            );
        }

        this.gameObject.children.forEach(displayObject => {
            if (!(displayObject instanceof GameObject)) {
                return;
            }

            let go = displayObject as GameObject;
            if (go == null) {
                return;
            }

            let childRectTransform = go.GetComponent<RectTransform>(RectTransform.name);
            if (childRectTransform == null) {
                return;
            }
            childRectTransform.RecalculateSize.bind(childRectTransform)();
        })

        this.drawDebugView(this.gameObject);
    }

    debugView: Graphics;
    debugText: Text;

    drawDebugRect: boolean = true;
    drawDebugText: boolean = false;

    drawDebugView(go: GameObject): void {

        if (!this.drawDebugRect && !this.drawDebugText) {
            return;
        }

        if (this.debugView == null) {

            if (this.drawDebugRect) {
                this.debugView = new Graphics();
                go.addChild(this.debugView)
                this.debugView.position.set(0, 0)
                this.debugView.zIndex = Number.MAX_VALUE;
            }

            if (this.drawDebugText) {
                this.debugText = new Text();
                this.debugText.text = go.name;
                this.debugText.anchor.set(0.5, 0.5);
                go.addChild(this.debugText);
            }

        }

        if (this.debugView == null) {
            return;
        }

        this.debugView.clear();

        const width = 4;

        if (this.drawDebugRect) {
            this.debugView.lineStyle(width, 0xFF0000);
            this.debugView.drawRect(
                -this.width / 2,
                -this.height / 2,
                this.width, this.height);
            this.debugView.lineStyle(width, 0xFF0000);
            this.debugView.drawCircle(0, 0, 1);
        }

        if (this.drawDebugText) {
            this.debugText.text = go.name;
        }

    }

    OnStart() {
        super.OnStart();
        this.RecalculateSize();
    }

    OnUpdate() {
        super.OnUpdate();
    }

    GetType(): string {
        return RectTransform.name;
    }
}