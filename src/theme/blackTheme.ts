
import baseTheme from "./baseTheme";
import {grey} from "@mui/material/colors";

class blackTheme extends baseTheme {

    constructor() {
        super();

        this.bgColor = "#222";
        this.textColor = "#e6e6e6";
        this.skillColors = [grey[900]];
        this.skillTextColor = grey["A100"];

    }
}

export default blackTheme;