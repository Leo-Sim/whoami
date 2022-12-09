import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App"
import "./tailwind.css"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App></App>
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