
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

    static formatDate = (d: string) => {
        const _m = d.substring(d.indexOf("-") + 1);
        const y = d.substring(0, d.indexOf("-"));

        let m;


        switch(_m) {
            case "01":
                m = "Jan.";
                break;
            case "02":
                m = "Feb.";
                break;
            case "03":
                m = "Mar.";
                break;
            case "04":
                m = "Apr.";
                break;
            case "05":
                m = "May";
                break;
            case "06":
                m = "Jun.";
                break;
            case "07":
                m = "Jul.";
                break;
            case "08":
                m = "Aug.";
                break;
            case "09":
                m = "Sep.";
                break;
            case "10":
                m = "Oct.";
                break;
            case "11":
                m = "Nov.";
                break;
            case "12":
                m = "Dec.";
                break;
            default :
                m = "N/A"
                break;
        }

        return m + " " + y;

    }

}
export default Utils

