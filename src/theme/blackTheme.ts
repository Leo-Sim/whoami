
import baseTheme from "./baseTheme";
import {grey} from "@mui/material/colors";

class blackTheme extends baseTheme {

    constructor() {
        super();

        this.bgColor = grey[900];
        this.textColor = grey["A100"];
        this.skillColors = [grey[900]];
        this.skillTextColor = grey["A100"];

    }
}

export default blackTheme;