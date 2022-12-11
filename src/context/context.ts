import React, {useContext} from "react";
import ColorThemes from "../theme/colorThemes";

import baseTheme from "../theme/baseTheme";
import GreenTheme from "../theme/greenTheme";
import WhiteTheme from "../theme/whiteTheme";


// context managed globally
interface GlobalContext {
    theme: ColorThemes

}

const defaultContext: GlobalContext = {
    theme: ColorThemes.WHITE
}

const globalContext = React.createContext<GlobalContext>(defaultContext);
const ContextProvider = globalContext.Provider;

const curTheme = (): baseTheme => {
    const context = useContext(globalContext);
    const theme: ColorThemes = context.theme;


    let curTheme: baseTheme;
    switch (theme) {
        case ColorThemes.GREEN:
            curTheme = new GreenTheme();
            break;

        case ColorThemes.WHITE:
        default:
            curTheme = new WhiteTheme();
    }

    return curTheme;
}

export { GlobalContext, ContextProvider, curTheme };