import React from "react";
import ReactDOM from "react-dom/client";

import {Button} from "@mui/material";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Button variant="contained">Hello World</Button>
    </React.StrictMode>
);

// class Root extends React.Component {
//     render() {
//         return (
//             <div>
//
//               ewweffwe
//             </div>
//         )
//     }
// }
// ReactDOM.render(<Root/>, document.getElementById('root'));