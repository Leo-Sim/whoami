import React, {useEffect, useState} from "react";

import {Grid, Box, LinearProgress, ThemeProvider, Theme} from "@mui/material";
import {styled} from "@mui/material/styles";

import {curTheme} from "../../context/context";
import {FileReader, Skill} from '../../utils/file'
import {getThemeByPlatform, getCurBreakPoint} from "../../utils/platform";
import Utils from "../../utils/utils";

import {grey} from "@mui/material/colors";


const getSkillTemplate = (name: string, score: number, theme: Theme) => {

    const curColorTheme = curTheme();
    const colors: Array<string> = curColorTheme.skillColors;

    const c = Utils.getNextColor(colors);

    const OutBox = styled(Box)(() => ({
        backgroundColor: c,
        height: 150,
        borderRadius: 5,
    }));

    const TextBox = styled(Box)(() => ({
        // fontSize: 20,
        textAlign: 'center'
    }));

    return (
        <ThemeProvider theme={theme}>
            <OutBox>

                <TextBox >
                    {name}
                </TextBox>
                <Box style={{paddingLeft:'10px', paddingRight: '10px', position: 'relative'}}>
                    {/*<Box style={{position: "absolute", bottom: 10}}>*/}
                    <LinearProgress variant={"determinate"} style={{ height:'6px', color: grey[500]}} value={score}/>
                    {/*</Box>*/}
                </Box>


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

                        {/*<Grid item mobile={6} desktop={4}>*/}
                        {/*    <div style={{backgroundColor: 'red'}}>xs=6 md=8</div>*/}
                        {/*</Grid>*/}
                        {/*<Grid item mobile={6} desktop={4}>*/}
                        {/*    <div style={{backgroundColor: 'red'}}>xs=6 md=8</div>*/}
                        {/*</Grid>*/}
                        {/*<Grid item mobile={6} desktop={4}>*/}
                        {/*    <div style={{backgroundColor: 'red'}}>xs=6 md=8</div>*/}
                        {/*</Grid>*/}
                        {/*<Grid item mobile={6} desktop={8}>*/}
                        {/*    <div style={{backgroundColor: 'red'}}>xs=6 md=8</div>*/}
                        {/*</Grid>*/}
                    </Grid>
                </ThemeProvider>
            {/*</Box>*/}
        </div>
    )
}