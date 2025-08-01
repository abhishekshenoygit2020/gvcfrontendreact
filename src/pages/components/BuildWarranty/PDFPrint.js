import React from "react";

const PDFPrint = ({ data }) => {
    return (
        <div>
            <div style={{ backgroundColor: "#f5f5f5" }}>
                {/* <h1>Hello, this is a PDF document</h1>
                <p>This content will be rendered as a PDF.</p>
                <ul>
                    <li>Item 4{data.packagesText}</li>
                    <li>Item </li>
                    <li>Item 6</li>
                </ul> */}
                <table sx={{width: "100%", borderCollapse:"collapse"}}>
                    <tr>
                        <td rowspan="6" style={{border: "1px solid black",width: "50%"}}>First Column Spanning Rows</td>
                        <td style={{border: "1px solid black"}}>Application ID: 2409136013</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black",width: "100%"}}>Application ID: 2409136013</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black",width: "50%"}}>Application ID: 2409136013</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black",width: "50%"}}>Application ID: 2409136013</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black",width: "50%"}}>Application ID: 2409136013</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black",width: "50%"}}>Application ID: 2409136013</td>
                    </tr>
                </table>
            </div>

        </div>
    )
}

export default PDFPrint;