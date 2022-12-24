
import {useTranslation} from "react-i18next";

class Utils {

    private static _index: number = 0;

    static getNextColor = (colors: Array<string>): string => {
        if(this._index > colors.length - 1) {
            this._index = 0;
        }

        return colors[this._index++];
    }

    static getPatternMatch(pattern: string, text: string) {
        const regExp = new RegExp(pattern)
        return regExp.test(text);
    }

    static getPeriod = (sDate: Date, eDate: Date) => {
        const { t } = useTranslation()
        let result: string = "";

        const y: number = (eDate.getFullYear() - sDate.getFullYear());
        if(y > 0) {
            result += y + " " + t("year")
        }

        const m = (eDate.getMonth() - sDate.getMonth());
        if (m > 0) {
            if (y) {
                result += " "
            }
            result += m + " " + t("months")
        }

        return result
    }
}
export default Utils

