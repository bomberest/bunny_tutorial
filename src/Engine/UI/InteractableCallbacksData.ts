export class InteractableCallbacksData {
    onButtonDown: Function;
    onButtonUp: Function;
    onButtonOver: Function;
    onButtonOut: Function;
    onClick: Function;

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

    CallButtonClick(): void {
        if (this.onClick == null) {
            return;
        }
        this.onClick();
    }
}