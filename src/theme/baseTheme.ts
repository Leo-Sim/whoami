
class baseTheme {

    private _bgColor: string;
    private _textColor: string;

    constructor() {
    }

    get bgColor(): string {
        return this._bgColor;
    }

    set bgColor(value: string) {
        this._bgColor = value;
    }

    get textColor(): string {
        return this._textColor;
    }

    set textColor(value: string) {
        this._textColor = value;
    }

}

export default baseTheme;
