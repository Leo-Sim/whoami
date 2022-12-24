
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {Box, Grid, ThemeProvider} from "@mui/material";
import {styled} from "@mui/material/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {getCommonCss, getCssByPlatform, getThemeByPlatform} from "../../utils/platform";
import {curTheme} from "../../context/context";
import {WorkHistory} from "../../utils/file";
import Utils from "../../utils/utils";


// Valid pattern for date
const datePattern: string = "^\\d{4}\\-(0[1-9]|1[012])$";

interface workInfoProps {
    workHistory: WorkHistory
}

export default (props: WorkHistory) => {

    const curColorTheme = curTheme();
    const theme = getThemeByPlatform();

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
            // height: "100px",
            // lineHeight:"100px",
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
            color: "black",
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
            fontSize: "25px"
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

    return(
        <Box style={{ marginBottom: "30px"}}>
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
                        <Grid item mobile={9} tablet={9} desktop={9}  style={{backgroundColor:"yellow"}}>

                            <ArrowBox>
                                <Arrow icon={faAngleDown} size={"lg"} onClick={e =>{}}/>
                            </ArrowBox>
                        </Grid>
                        <Grid item mobile={1} tablet={1} desktop={1}>

                        </Grid>
                    </Summary>
                }
            </ThemeProvider>
        </Box>
    )
}

const Project = () => {



    return (
        <Box>

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