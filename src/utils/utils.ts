

class Utils {

    private static _index: number = 0;

    static getNextColor = (colors: Array<string>): string => {
        if(this._index > colors.length - 1) {
            this._index = 0;
        }

        return colors[this._index++];
    }
}
export default Utils

