import React, {useState} from "react";
import {renderToStaticMarkup} from "react-dom/server"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faFilePdf} from "@fortawesome/free-solid-svg-icons";

import {Box, Modal, ButtonGroup, Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import {getCommonCss, getCssByPlatform, getThemeByPlatform} from "../utils/platform";
import {curTheme} from "../context/context";
import {useTranslation} from "react-i18next";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";


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


    // download pdf

    const [isOpened, setOpen] = useState(false);


    const summary = (
        <div id="summary">



        </div>
    )

    const { t, i18n } = useTranslation();

    // download this page as pdf
    const save = (summary: JSX.Element) => {

        const s: string = renderToStaticMarkup(summary);
        // const a = new DOMParser().parseFromString(s, "text/html")

        html2canvas(document.querySelector("#summary")).then(canvas => {
            document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.addImage(imgData, 'PNG', 10, 10 ,0, 0);
            pdf.save("download.pdf");
        });

    }

    return(
        <Box>
            <IconBox onClick={() => setOpen(true)}>
                <Download>
                    <Disk className={"disk"} icon={faFilePdf} size={"2xl"}/>
                    <Arrow className={"arrow"} icon={faDownload} size={"2xl"}/>
                </Download>
            </IconBox>

            { summary }

            <Modal open={isOpened}
                   // onClose={!isOpened}
                   style={{ }}>

                <Box style={{backgroundColor: "white"}}>
                    {summary}
                    <Box>
                        <ButtonGroup>
                            <Button onClick={() => save(summary)}> { t("save")} </Button>
                            <Button  onClick={() => setOpen(false)}> { t("cancel")} </Button>
                        </ButtonGroup>
                    </Box>
                </Box>

            </Modal>

        </Box>
    )
}