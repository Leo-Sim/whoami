
import React from "react";

import WorkInfo from "../../component/common/WorkInfo";
import {FileReader, WorkHistory, Project} from "../../utils/file";


export default () => {

    const workHistory: Array<WorkHistory> = new FileReader().getWorkHistory();


    return(
        <div>
                {
                    workHistory.map((work, i) => {
                        return(
                            <WorkInfo key={i}
                                      name={work.name}
                                      startDate={work.startDate}
                                      endDate={work.endDate}
                                      role={work.role}
                            />
                        )
                    })
                }

        </div>
    )
}