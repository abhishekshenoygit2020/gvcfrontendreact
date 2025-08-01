import React, { useRef, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddchartIcon from '@mui/icons-material/Addchart';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import BC1 from "../../../../../src/Images/BC1.jpg"
import BC3 from "../../../../../src/Images/BC3.jpg";
import { styled } from '@mui/material/styles';

import ApexChart from './ApexChart';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Tooltip,
//   );

const SmallCard = ({ tablename, count, index }) => {

    const colorHighLight = ["red", "green", "purple", "blue"];
    const lightColors = [
        "#3fb1e3",   // Light Red
        "#626c91",   // Light Green
        "#626c91",  // Light Purple
        "#a0a7e6",   // Light Blue
    ];
    const Icons = [<AccountBalanceIcon style={{ marginTop: "2px" }} />, <AddchartIcon style={{ marginTop: "2px" }} />, <AltRouteIcon style={{ marginTop: "2px" }} />, <TrendingUpIcon style={{ marginTop: "2px" }} />];

    const iconStyle = {
        fontSize: 20,
        color: '#3f51b5',
        borderRadius: '50%', // Make the icon container round
        backgroundColor: '#f0f0f0', // Initial background color
        padding: '10px', // Space between icon and border
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Shadow effect
        transition: 'background-color 0.3s ease', // Smooth transition on hover
    };

    const hoverStyle = {
        backgroundColor: '#e0e0e0', // Background color on hover
    };

    const [hover, setHover] = React.useState(false);
    const chartRef = useRef(null);

    // Custom gradient background for the line chart
    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            const ctx = chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 150);
            gradient.addColorStop(0, 'rgba(63, 81, 181, 0.5)'); // Start with blue
            gradient.addColorStop(1, 'rgba(63, 81, 181, 0)');   // Fade to transparent
            chart.data.datasets[0].backgroundColor = gradient;
            chart.update();
        }
    }, []);

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    // Chart data and options
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Visitors',
                data: [12, 19, 10, 15, 22, 30, 25],
                fill: true, // Enables the area fill below the line
                borderColor: '#3f51b5', // Line color
                backgroundColor: 'rgba(63, 81, 181, 0.5)', // Default fallback color
                tension: 0.4,
                pointBackgroundColor: '#3f51b5', // Color of the points
                pointBorderColor: '#fff', // Border color of the points
                pointRadius: 5, // Size of the point
                pointHoverRadius: 7, // Size of the point when hovered
                pointStyle: 'circle', // Style of the points
            },
        ],
    };

    const options = {
        scales: {
            x: { display: false },
            y: { display: false },
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        elements: {
            point: {
                radius: 5, // Display points at data locations
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <Paper elevation={3}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'; // Zoom in
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; // Zoom out
            }}

            style={{ padding: '16px', transition: 'transform 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '280px', width: '100%', borderRadius: '12px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" style={{ color: "#0d2365" }}><b>{tablename}</b></Typography>
                {/* <Typography variant="h6" style={{ color: "#0315718a" }}><b>{tablename}</b></Typography> */}
                <div style={{
                    border: "0px solid black",
                    borderRadius: "45%", // Makes the border round
                    padding: "10px 10px 10px 10px",
                    color: lightColors[index],
                    backgroundColor: "white",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Light shadow
                    display: "inline-block" // Ensures proper padding around the icon
                }}>
                    {/* <TrendingUpIcon style={{ fontSize: 40, color: '#3f51b5' }} />  */}
                    {Icons[index]}
                </div>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography
                    variant="h5"
                    style={{
                        fontSize: 'bold',
                        // backgroundColor: '#f0f0f0',  // Light background color
                        // padding: '1px 2px',        // Padding to make it look like a sticker
                        // borderRadius: '20px',        // Rounded edges for sticker effect
                        // boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Subtle shadow to lift it off the surface
                        // border: '0px solid #ccc',    // Optional: border for a more defined look
                        display: 'inline-block',     // Keeps the typography within a defined sticker shape
                    }}
                >
                    {count}
                </Typography>
                <Typography variant="h6"></Typography>
            </Box>
            <Box flexGrow={1}>
                {/* <LineChart
                    // width={450}
                    height={150}
                    series={[
                        {
                            data: uData,
                            label: 'uv',
                            area: true,
                            showMark: false,
                            color: lightColors[index]  // Set line color to red
                        }
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels , display:false}]}
                    sx={{
                        [`& .${lineElementClasses.root}`]: {
                            display: 'none',
                        },
                    }}
                /> */}
                <ApexChart color={colorHighLight[index]} />
            </Box>
        </Paper>
        // <Paper
        //     elevation={3}
        //     style={{
        //         padding: '16px',
        //         display: 'flex',
        //         flexDirection: 'column',
        //         height: '250px',
        //         width: '100%',
        //         borderRadius: '12px'
        //     }}
        // >
        //     <Box display="flex" alignItems="center" justifyContent="space-between">
        //         <TrendingUpIcon style={{ fontSize: 40, color: '#3f51b5' }} />
        //         <Typography variant="h6">{tablename}</Typography>
        //     </Box>
        //     <Box
        //         flexGrow={1}
        //         display="flex"
        //         alignItems="center"
        //         justifyContent="center"
        //     >
        //         {/* Display a big number or clock */}
        //         <Typography
        //             variant="h2"
        //             component="div"
        //             style={{
        //                 fontSize: '4rem',
        //                 fontWeight: 'bold',
        //                 color: '#3f51b5'
        //             }}
        //         >
        //             {count} {/* Replace this with the big number/clock value */}
        //         </Typography>
        //     </Box>
        // </Paper>
    );
};

export default SmallCard;
