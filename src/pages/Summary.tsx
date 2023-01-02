import React, {useEffect, useRef, useState} from "react";
import {renderToStaticMarkup} from "react-dom/server"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faFilePdf} from "@fortawesome/free-solid-svg-icons";

import {Box, Modal, ButtonGroup, Button, Grid, ThemeProvider, List, ListItemText} from "@mui/material";
import {styled} from "@mui/material/styles";
import {getCommonCss, getCssByPlatform, getThemeByPlatform} from "../utils/platform";
import {FileReader, PersonalInfo, WorkHistory} from "../utils/file";
import {curTheme} from "../context/context";

import {BigText, MiddleText, SmallText, TinyText} from "../component/common/Style";

import {useTranslation} from "react-i18next";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";



export default () => {


    const { t, i18n } = useTranslation();
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

    const InfoBox = styled(Box)(() => ({
        marginTop:"30px"
    }));

    const TitleBox = styled(Box)(() => ({
        textAlign: "center",
        borderBottom: "1px solid " + colorTheme.textColor,
        marginBottom:"10px",
        paddingBottom: "8px"
    }));

    const fileReader: FileReader = new FileReader();
    const personal: PersonalInfo = fileReader.getPersonalInfo();
    const workList: Array<WorkHistory> = fileReader.getWorkHistory();

    const ref = useRef<HTMLElement>();
    const [imgSize, setImgSize] = useState<string>();

    // Resize image
    useEffect(() => {
        setImgSize(ref.current.clientHeight + "px");
    })


    const summary = (
        <div id="summary"  style={{color: colorTheme.textColor, marginTop: "20px"}} >
            <ThemeProvider theme={theme}>

                {/* Name, phone, email*/}
                <Box>
                    <BigText style={{fontSize:"40px"}}>
                        {personal.name}
                    </BigText>
                    <TinyText>

                        {
                            personal.phone &&
                            <div> {personal.phone}</div>
                        }
                        <div>{personal.email}</div>
                    </TinyText>
                </Box>

                {/* About */}
                <InfoBox>
                    <TitleBox>
                        <MiddleText component="span">{t("about")}</MiddleText>
                    </TitleBox>

                    <SmallText>
                        <Grid container>
                            <Grid item mobile={3} tablet={3} desktop={3}>
                                {
                                    personal.imagePath &&

                                    <Box style={{textAlign: "center", marginRight: "5px"}}>
                                        <img  style={{

                                            borderRadius:"50%",
                                            display: "inline-block",
                                            width: imgSize,
                                            height: imgSize}} src={"/info/" + personal.imagePath} />
                                    </Box>

                                }
                            </Grid>
                            <Grid item mobile={9} tablet={9} desktop={9}>

                                <Box ref={ref} style={{display: "inline-block"}}>
                                    { personal.descriptions.map((desc, j) => <Box key={j}>{desc}</Box>)}
                                </Box>
                            </Grid>
                        </Grid>


                    </SmallText>
                </InfoBox>

                {/* Work experience */}
                <InfoBox>
                    <TitleBox>
                        <MiddleText>{t("work")}</MiddleText>
                    </TitleBox>
                    <Box>

                        {
                            workList.map((work, i) => {

                                return (
                                    <Box key={i}>
                                        <Grid container style={{marginTop: "10px", marginBottom: "20px"}}>
                                            <Grid item mobile={3} tablet={3} desktop={3}>
                                                <MiddleText>{work.name}</MiddleText>
                                            </Grid>
                                            <Grid item mobile={9} tablet={9} desktop={9}>
                                                {
                                                    work.projects.map((project, j) => {
                                                        return (
                                                            <Box key={j}>
                                                                <SmallText>
                                                                    {project.name}
                                                                </SmallText>
                                                                <Box>
                                                                    {
                                                                        project.role.map((r, k) => {
                                                                            return <TinyText key={k}>- {r}</TinyText>
                                                                        })
                                                                    }
                                                                </Box>
                                                            </Box>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </Grid>
                                        {
                                            i != workList.length -1 &&
                                            <Box style={{border: "0.5px dashed white"}}> </Box>

                                        }
                                    </Box>
                                )
                            })
                        }

                    </Box>
                </InfoBox>

            </ThemeProvider>
        </div>
    )

    // download this page as pdf
    const [isOpened, setOpen] = useState(false);

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