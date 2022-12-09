import React, {useContext} from "react";
import Themes from "../theme/themes";
// context managed globally
interface GlobalContext {
    theme: Themes
}

const defaultContext: GlobalContext = {
    theme: Themes.WHITE
}

const globalContext = React.createContext<GlobalContext>(defaultContext);
const ContextProvider = globalContext.Provider;

const curTheme = () => {
    const context = useContext(globalContext);
    const theme: Themes = context.theme;


    let curTheme: string;
    switch (theme) {
        case Themes.GREEN:
            curTheme ='GREEN';
            break;

        case Themes.CUSTOM:
            curTheme = 'CUSTOM';
            break;

        case Themes.WHITE:
        default:
            curTheme = 'WHITE';
    }

    return curTheme;
}

export { GlobalContext, ContextProvider, curTheme };