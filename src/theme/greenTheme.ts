
import baseTheme from "./baseTheme";

import {green, grey, indigo, lime, orange, purple} from "@mui/material/colors";

import {lightBlue, teal, } from "@mui/material/colors";

class greenTheme extends baseTheme {

    constructor() {
        super();

        this.bgColor = green[400];
        this.textColor = grey["A200"];
        this.skillColors = [lightBlue[500], teal[400], purple[500], lime[600],  orange[700], indigo[400]];
        this.skillTextColor = grey["A100"];

    }
}

export default greenTheme;