import React, {useEffect, useState} from "react";

import {Grid, Paper, Box, LinearProgress, CircularProgress, ThemeProvider, Theme} from "@mui/material";
import {styled} from "@mui/material/styles";

import {curTheme} from "../../context/context";
import {FileReader, FileContent, Skill} from '../../utils/file'
import {getThemeByPlatform, getCurBreakPoint, getCssByPlatform} from "../../utils/platform";
import Utils from "../../utils/utils";

import {grey} from "@mui/material/colors";

const OUT_BOX_HEIGHT_MOBILE = 120;
const OUT_BOX_HEIGHT_TABLET = 180;
const OUT_BOX_HEIGHT_DESKTOP = 200;


const FONT_SIZE_MOBILE = 15;
const FONT_SIZE_TABLET = 20;
const FONT_SIZE_DESKTOP = 30;

const getSkillTemplate = (name: string, score: number, theme: Theme, isMobile: boolean) => {

    const curColorTheme = curTheme();
    const colors: Array<string> = curColorTheme.skillColors;

    const c = Utils.getNextColor(colors);

    // Colored div  for each skill.
    let OutBox = styled(Box)(() => ({
        paddingTop: "5px",
        backgroundColor: c,
        borderRadius: 5,
        whiteSpace: "normal",
        position: "relative",
        color: curColorTheme.skillTextColor
    }));

    // Add css for colored div by platform
    OutBox = styled(OutBox)(() => (
        getCssByPlatform(theme, {
            height: OUT_BOX_HEIGHT_MOBILE
        }, {
            height: OUT_BOX_HEIGHT_TABLET
        }, {
            height: OUT_BOX_HEIGHT_DESKTOP
        })
    ));

    // Add common css for each text
    let TextBox = styled(Box)(() => ({
        textAlign: "center"
    }));


    TextBox = styled(TextBox)(() => (
        getCssByPlatform(theme, {
            fontSize: FONT_SIZE_MOBILE + "px"
        }, {
            fontSize: FONT_SIZE_TABLET + "px"
        }, {
            fontSize: FONT_SIZE_DESKTOP + "px"
        })
    ));

    let ProgressBox = styled(Box)(() => ({
        paddingLeft: "10px",
        paddingRight: "10px",
        textAlign: "center",
        }));

    ProgressBox = styled(ProgressBox)(() => (
        getCssByPlatform(theme, {
            fontSize: FONT_SIZE_MOBILE + 10 + "px",
            paddingTop: "10px"

        }, {
            fontSize: FONT_SIZE_TABLET + 10 + "px",
            paddingTop: "15px"
        }, {
            fontSize: FONT_SIZE_DESKTOP + 10 + "px",
            paddingTop: "20px"
        })
    ));

    // determine size of circular progress
    const platform = getCurBreakPoint();
    let circleSize = 0;
    switch (platform) {
        case "mobile":
            circleSize = 50;
            break;
        case "tablet":
            circleSize = 100;
            break;
        case "desktop":
        default:
            circleSize = 120;

    }

    return (
        <ThemeProvider theme={theme}>
            <OutBox>
                <TextBox >
                    {name}
                </TextBox>
                <ProgressBox>
                    <span>{ score }</span>
                    <LinearProgress variant={"determinate"} style={{ height:'10px', color: grey[500]}} value={score}/>
                </ProgressBox>
            </OutBox>
        </ThemeProvider>
    )
}

export default () => {

    const file = new FileReader();
    const skills: Array<Skill> = file.getSkills();

    const theme = getThemeByPlatform();

    const isMobile = getCurBreakPoint() === 'mobile';

    let stateArry: Array<any> = [];

    const grids = skills.map((skill, i) => {

        const [s, setScore] = useState<number>(0)

        const obj = {
            score: skill.score,
            setScore: setScore
        }

        stateArry.push(obj);

       return (
           <Grid item key={i} mobile={6} tablet={4} desktop={4}>

               { getSkillTemplate(skill.name, s, theme, isMobile) }
           </Grid>


       )
    });


    useEffect(() => {
        // animation for progress bar. if it reaches to max value, cancel timer.
        stateArry.forEach(obj => {
            if(obj.score && obj.setScore) {
                const timer = setInterval(() => {

                    obj.setScore((old: number) => {
                        if(old === obj.score) {
                            clearInterval(timer);

                            return old;
                        }
                        return old + 1;
                    })
                }, 15);
            }
        });
    }, [])

    return(
        <div>
            {/*<Box sx={{ flexGrow: 1 }}>*/}
                <ThemeProvider theme={theme} >
                    <Grid container spacing={2}>

                        {grids}

                    </Grid>
                </ThemeProvider>
            {/*</Box>*/}
        </div>
    )
}