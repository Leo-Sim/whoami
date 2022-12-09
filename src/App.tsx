import React from "react";

import Menus from "./component/Menus";


import { ContextProvider } from './context/context';
import Themes from "./theme/themes";

export default () => {


    // set theme
    const globalContext = {
        theme: Themes.WHITE
    }

    return (
        <div>
            <ContextProvider value={globalContext}>       <Menus></Menus>
            </ContextProvider>

        </div>
    )
}