
import baseTheme from "./baseTheme";

import {green, grey} from "@mui/material/colors";

class greenTheme extends baseTheme {

    constructor() {
        super();

        this.bgColor = green[400];
        this.textColor = grey["A200"];
    }
}

export default greenTheme;