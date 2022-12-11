import React from "react";

import Menus from "../../component/Menus";

import {Box, useMediaQuery} from "@mui/material";

export default () => {


    return(
        <div>
            <Box sx={{
                width: '20%'
            }}>

                <Menus></Menus>
            </Box>
        </div>
    )
}