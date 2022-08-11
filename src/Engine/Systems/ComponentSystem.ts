import {System} from "./System";
import {Component} from "../Core/Component";
import {GameObject} from "../Core/GameObject";

export class ComponentSystem extends System<Component> {
    public RemoveComponents(gameObject: GameObject) {
        this.targets.filter(component => {
            return component.gameObject == gameObject;
        });
    }
}