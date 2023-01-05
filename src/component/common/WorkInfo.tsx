
import React, {useState} from "react";

import "../../css/component/workInfo.css"

import {Box, Collapse, Grid, List, ListItemText, ThemeProvider} from "@mui/material";
import {styled} from "@mui/material/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {getCommonCss, getCssByPlatform, getThemeByPlatform} from "../../utils/platform";
import {curTheme} from "../../context/context";
import {Project, WorkHistory} from "../../utils/file";
import Utils from "../../utils/utils";
import {MiddleText, SmallText, TinyText} from "./Style";


// Valid pattern for date
const datePattern: string = "^\\d{4}\\-(0[1-9]|1[012])$";
const theme = getThemeByPlatform();

// interface for props.
interface WorkHistoryProperty extends WorkHistory{
    children: React.ReactElement | React.ReactElement[]
}

const WorkInfo = (props: WorkHistoryProperty) => {

    const curColorTheme = curTheme();


    const [isSummary] = useState(true);


    // #TODO get start date, end date and calcuate period, if end date is not specified, it's current job.
    let period: string = "N/A";
    let isCurJob: boolean = false;

    const isStartDateValid = Utils.getPatternMatch(datePattern, props.startDate);

    const sDate: Date = isStartDateValid? new Date(adjustDate(props.startDate) + "-01") : null;
    let eDate: Date;
    if(props.endDate) {
        const isEndDateValid = Utils.getPatternMatch(datePattern, props.endDate);
        eDate = isEndDateValid? new Date(adjustDate(props.endDate) + "-01") : null;
    } else {
        isCurJob = true;
        eDate = new Date();
    }

    // Caculate periods between two dates
    if(sDate && eDate) {

        period = "" + Utils.getPeriod(sDate, eDate);
    }

    let Summary = styled(Grid)(() => (
        getCommonCss(theme, {
            border: "1px solid black",
            borderRadius: "5px",
            // marginLeft: "5px",
            // marginRight: "5px",
            paddingLeft: "7px",
            paddingRight: "7px",
        })
    ));

    Summary = styled(Summary)(() => (
        getCssByPlatform(theme, {
            height: "110px"
        }, {
            height: "130px"
        }, {
            height: "130px"
        })
    ))


    const ArrowBox = styled(Box)(() => (
        getCommonCss(theme, {
            float: "right"
        })
    ));
    const Arrow = styled(FontAwesomeIcon)(() => (

        getCommonCss(theme, {
            cursor: "pointer",
            color: curColorTheme.textColor,
            "&:hover": {
                color: "red"
            },
        })
    ));

    // #TODO 현재직장인것 표시 어떻게 할지 정하기


    // Detail info
    const [isDetail, showDetail] = useState(false);

    return(
        <Box style={{ marginTop:"20px", marginBottom: "30px", color: curColorTheme.textColor}}>
            <ThemeProvider theme={theme}>
                {
                    // show summary info
                    isSummary &&
                    <Summary container spacing={2}>
                        <Grid item mobile={5} tablet={5} desktop={5}>
                            <MiddleText>{ props.name }</MiddleText>
                            <TinyText>{ props.role }</TinyText>
                            <TinyText>{ period }</TinyText>
                        </Grid>
                        {/* work period and list of projects. */}
                        <Grid item mobile={7} tablet={7} desktop={7}>
                            <ArrowBox>
                                <Arrow icon={faAngleDown}
                                       size={"xl"}
                                       style={{display: isDetail? "none" : ""}}
                                       onClick={() => showDetail(true)}
                                />
                                <Arrow icon={faAngleUp}
                                       size={"xl"}
                                       style={{display: !isDetail? "none" : ""}}
                                       onClick={() => showDetail(false)}
                                />
                            </ArrowBox>
                        </Grid>

                    </Summary>

                }

                {/* Show detailed info when button on right is clicked */}
                <Collapse timeout={500} in={isDetail}>
                    <Box style={{marginTop: "20px"}}>

                        <Box>
                            {/* #TODO format date type by locale.*/}

                            {Utils.formatDate(props.startDate)} ~ {Utils.formatDate(props.endDate)} / { props.location }
                        </Box>
                        {
                            React.Children.map(props.children, (child, i) => {
                                if(child) {
                                    return(
                                        <Box key={i}>
                                            <ProjectInfo name={child.props.name}
                                                         startDate={child.props.startDate}
                                                         endDate={child.props.endDate}
                                                         skills={child.props.skills}
                                                         desc={child.props.desc}
                                                         role={child.props.role}
                                            />
                                        </Box>
                                    )
                                }
                            })
                        }
                    </Box>
                </Collapse>
            </ThemeProvider>
        </Box>
    )
}



const ProjectInfo = (props: Project) => {

    return (
        <Box style={{marginTop:"20px", marginBottom: "20px"}}>
            <ThemeProvider theme={theme}>
                <Grid container spacing={2}>

                    <Grid item mobile={3} tablet={3} desktop={3}>
                        <SmallText>{props.name}</SmallText>

                        <TinyText>
                            {Utils.formatDate(props.startDate)} ~ {Utils.formatDate(props.endDate)}
                        </TinyText>

                    </Grid>
                    <Grid item mobile={9} tablet={9} desktop={9}>
                        <SmallText>
                            <Box>{props.desc}</Box>
                            <List disablePadding>
                                <ListItemText> {props.skills.join(",  ")} </ListItemText>
                                {
                                    props.role.map((p, i) => {
                                        return (
                                            <Box style={{paddingLeft: "15px"}}>
                                                <ListItemText key={i}> - {p}</ListItemText>
                                            </Box>
                                        )
                                    })
                                }

                            </List>
                        </SmallText>

                    </Grid>


                </Grid>
            </ThemeProvider>
        </Box>
    )
}


// Add 1 to month and return it
const adjustDate = (date: string) => {
    const sMonth = date.substring(date.indexOf("-") + 1);
    let month: number = +sMonth;
    month++;
    const newMonth = month < 10? "0" + month : "" + month;

    return date.substring(0, date.indexOf("-")) + "-" + newMonth;
}

export { WorkInfo, ProjectInfo }