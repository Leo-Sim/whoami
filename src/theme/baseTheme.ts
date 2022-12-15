
class baseTheme {

    private _bgColor: string;
    private _textColor: string;
    private _skillColors: Array<string>;
    private _skillTextColor: string;

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
    get skillTextColor(): string {
        return this._skillTextColor;
    }

    set skillTextColor(value: string) {
        this._skillTextColor = value;
    }
}

export default baseTheme;
