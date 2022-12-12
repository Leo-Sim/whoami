
class baseTheme {

    private _bgColor: string;
    private _textColor: string;
    private _skillColors: Array<string>

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

    get skillColors(): Array<string> {
        return this._skillColors;
    }

    set skillColors(value: Array<string>) {
        this._skillColors = value;
    }
}

export default baseTheme;
