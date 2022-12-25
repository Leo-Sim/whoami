
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import "../../css/component/workInfo.css"

import {Box, Collapse, Grid, List, ListItemText, ThemeProvider} from "@mui/material";
import {styled} from "@mui/material/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {getCommonCss, getCssByPlatform, getThemeByPlatform} from "../../utils/platform";
import {curTheme} from "../../context/context";
import {Project, WorkHistory} from "../../utils/file";
import Utils from "../../utils/utils";


// Valid pattern for date
const datePattern: string = "^\\d{4}\\-(0[1-9]|1[012])$";
const theme = getThemeByPlatform();

// interface for props.
interface WorkHistoryProperty extends WorkHistory{
    children: React.ReactElement | React.ReactElement[]
}

const WorkInfo = (props: WorkHistoryProperty) => {

    const curColorTheme = curTheme();


    const [isSummary, setSummary] = useState(true);


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

    const { t, i18n } = useTranslation();


    const Summary = styled(Grid)(() => (
        getCommonCss(theme, {
            border: "1px solid black",
            borderRadius: "5px",

            paddingLeft: "7px",
            paddingRight: "7px",
        })
    ));

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

    const NameGrid = styled(Grid)(() => (
        getCssByPlatform(theme, {
            fontSize: "15px"
        }, {
            fontSize: "25px"
        }, {
            fontSize: "25px",
        })
    ));
    const SubInfo = styled(Box)(() => (
        getCssByPlatform(theme, {
            fontSize: "8px"
        }, {
            fontSize: "14px"
        }, {
            fontSize: "14px"
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
                        <NameGrid item mobile={3} tablet={3} desktop={3}>
                            <Box>{ props.name }</Box>
                            <SubInfo>{ props.role }</SubInfo>
                            <SubInfo>{ period }</SubInfo>
                        </NameGrid>
                        {/* work period and list of projects. */}
                        <Grid item mobile={9} tablet={9} desktop={9}  style={{}}>

                            <SubInfo>
                                {/*{ props.role }*/}
                            </SubInfo>
                            <SubInfo>
                                {/*dd*/}
                            </SubInfo>
                            <ArrowBox>
                                <Arrow icon={faAngleDown}
                                       size={"lg"}
                                       style={{display: isDetail? "none" : ""}}
                                       onClick={e => showDetail(true)}
                                />
                                <Arrow icon={faAngleUp}
                                       size={"lg"}
                                       style={{display: !isDetail? "none" : ""}}
                                       onClick={e => showDetail(false)}
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
                                        <ProjectInfo name={child.props.name}
                                                     startDate={child.props.startDate}
                                                     endDate={child.props.endDate}
                                                     skills={child.props.skills}
                                                     desc={child.props.desc}
                                                     role={child.props.role}
                                        />
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

    const DetailInfo = styled(Box)(() => (
        getCssByPlatform(theme, {
            fontSize: "8px"
        }, {
            fontSize: "14px"
        }, {
            fontSize: "14px"
        })
    ))

    const ProjectName = styled(Grid)(() => (
        getCssByPlatform(theme, {
            fontSize: "12px"
        }, {
            fontSize: "20px"
        }, {
            fontSize: "20px",
        })
    ));


    return (
        <Box style={{marginTop:"20px", marginBottom: "20px"}}>
            <ThemeProvider theme={theme}>
                <Grid container spacing={2}>

                    <ProjectName item mobile={3} tablet={3} desktop={3}>
                        {props.name}
                        <DetailInfo>
                            {Utils.formatDate(props.startDate)} ~ {Utils.formatDate(props.endDate)}
                        </DetailInfo>

                    </ProjectName>
                    <Grid item mobile={9} tablet={9} desktop={9}>
                        <List disablePadding>
                            <ListItemText> {props.skills.join(",  ")} </ListItemText>
                            {
                                props.role.map((p, i) => {
                                    return (<ListItemText key={i}> - {p}</ListItemText>)
                                })
                            }
                        </List>

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