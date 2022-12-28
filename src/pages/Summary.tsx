import React, {useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faFilePdf} from "@fortawesome/free-solid-svg-icons";

import {Box, Modal} from "@mui/material";
import {styled} from "@mui/material/styles";
import {getCommonCss, getCssByPlatform, getThemeByPlatform} from "../utils/platform";
import {curTheme} from "../context/context";

export default () => {

    const colorTheme = curTheme();
    const theme = getThemeByPlatform();

    let IconBox = styled(Box)(() => (
        getCommonCss(theme, {
            position: "absolute",
            backgroundColor: colorTheme.textColor,
            border: "1px solid " + colorTheme.textColor,
            borderRadius: "50%",
        })
    ));
    IconBox = styled(IconBox)(() => (
        getCssByPlatform(theme, {

        }, {
            top: 0,
            right: 0
        }, {
            top: 20,
            right: 20
        })
    ));

    let Download = styled(Box)(() => (

        getCommonCss(theme, {
            width: "50px",
            height: "50px",

            textAlign: "center",
            verticalAlign: "middle",
            position: "relative",
            display: "table-cell",
            cursor: "pointer",
            // color: colorTheme.textColor,
            "&:hover": {
                "& .disk": {
                    opacity: "0",
                    transform:"rotate(-180deg) scale(1)"
                },

                "& .arrow": {
                    opacity: "1",
                    transform:"rotate(0deg) scale(1)",
                }
            },
        })
    ));

    const Disk = styled(FontAwesomeIcon)(() =>({
        position: "absolute",
        transition: "opacity .3s, transform .3s",
    }))


    const Arrow = styled(FontAwesomeIcon)(() =>({
            transition: "opacity .3s, transform .3s",
            opacity: "0",
            transform: "rotate(-180deg) scale(1)",
        }));




    const downloadPdf = () => {
        alert('dd')
    }

    return(
        <div>
            <Box>

            </Box>

            <IconBox onClick={downloadPdf}>
                <Download>
                    <Disk className={"disk"} icon={faFilePdf} size={"2xl"}/>
                    <Arrow className={"arrow"} icon={faDownload} size={"2xl"}/>
                </Download>
            </IconBox>

        </div>
    )
}