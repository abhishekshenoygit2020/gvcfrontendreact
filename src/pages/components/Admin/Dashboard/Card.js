import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import axios from '../../../../api/axios';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddchartIcon from '@mui/icons-material/Addchart';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import BC1 from "../../../../../src/Images/BC1.jpg"
import BC3 from "../../../../../src/Images/BC3.jpg";
import { styled } from '@mui/material/styles';

import ApexChart from './ApexChart';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Tooltip,
//   );

const SmallCard = ({ tablename, count, index, dealership }) => {
    const [expanded, setExpanded] = React.useState(false);
    const colorHighLight = ["red", "green", "purple", "blue"];
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [gridLabels, setGridLabels] = useState([]);

    const lightColors = [
        "rgba(255, 128, 128, 0.4)",   // Light Red
        "rgba(144, 238, 144, 0.4)",   // Light Green
        "rgba(173, 216, 230, 0.4)",  // Light Purple
        "#20B7991A",   // Light Blue
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




        // setRandomNumbers(Array.from({ length: 13 }, () => Math.floor(Math.random() * 1000)));
        // console.log("num:"+randomNumbers);
        console.log("dealership:" + dealership);
        loadpendingData(tablename);
    }, [dealership]);

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


    const loadpendingData = async (tablename) => {
        if (tablename == "Closed Won") {
            try {
                const data = { dealership }
                const response = await axios.post('./dealership/getClosedWonGraph', data);

                if (response.data.status === 401) {
                    // setDataList([]); // Keep as empty array in case of unauthorized response
                    setRandomNumbers(Array.from({ length: 13 }, () => 0));
                } else {
                    // const Amount = new Array();
                    let responseData = response.data.data;
                    if (responseData) {
                        // warrantyData.map(item => item.warrantySoldFor);
                        const warrantySoldForArray = response.data.data.map(item => item.warrantySoldFor);
                        const monthnameLabel = response.data.data.map(item => item.monthName);

                        setGridLabels(monthnameLabel);
                        setRandomNumbers(warrantySoldForArray);
                    }

                }
            } catch (err) {
                // console.log("Error fetching data:", err);
                // setDataList([]); // Use empty array if request fails
            }
        }
        else if (tablename == "Pending") {
            const data = { dealership }
            const response = await axios.post('./dealership/getPendingWarrantyGraph', data);

            if (response.data.status === 401) {
                // setDataList([]); // Keep as empty array in case of unauthorized response
                setRandomNumbers(Array.from({ length: 13 }, () => 0));
            } else {
                // const Amount = new Array();
                let responseData = response.data.data;
                if (responseData) {
                    // warrantyData.map(item => item.warrantySoldFor);
                    const warrantySoldForArray = response.data.data.map(item => item.warrantySoldFor);
                    const monthnameLabel = response.data.data.map(item => item.monthName);

                    setGridLabels(monthnameLabel);
                    setRandomNumbers(warrantySoldForArray);
                }

            }
        }
        // console.log("table name:" + tablename);
        // try {
        //     const data = {dealership,userType}
        //     const response = await axios.post('./dealership/getPendingWarrantyGraph',data);

        //     if (response.data.status === 401) {
        //         setDataList([]); // Keep as empty array in case of unauthorized response
        //     } else {
        //         // const Amount = new Array();
        //         const responseData = response.data.data;
        //         if(responseData){
        //             setProductAName(responseData[0].warrantyClassText);
        //             setProductAPrice(responseData[0].totalSalePrice);

        //             setProductBName(responseData[1].warrantyClassText);
        //             setProductBPrice(responseData[1].totalSalePrice);

        //             setProductCName(responseData[2].warrantyClassText);
        //             setProductCPrice(responseData[2].totalSalePrice);

        //         }
        //         // console.log("data", response.data);
        //     }
        // } catch (err) {
        //     // console.log("Error fetching data:", err);
        //     // setDataList([]); // Use empty array if request fails
        // }
    };

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
        // <Paper elevation={3}
        //     onMouseEnter={(e) => {
        //         e.currentTarget.style.transform = 'scale(1.05)'; // Zoom in
        //     }}
        //     onMouseLeave={(e) => {
        //         e.currentTarget.style.transform = 'scale(1)'; // Zoom out
        //     }}

        //     style={{ padding: '16px', transition: 'transform 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '280px', width: '100%', borderRadius: '12px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Card
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'; // Zoom in
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; // Zoom out
            }}
            sx={{
                display: 'flex',
                flexDirection: 'column', transition: 'transform 0.3s ease'

            }}>
            <CardHeader
                action={
                    <Avatar sx={{ bgcolor: lightColors[index], color: colorHighLight[index] }}>
                        {Icons[index]}
                    </Avatar>
                }
                subheader={
                    <Typography variant="h4" style={{ color: "grey", fontWeight: 'bold' }}>
                        {count}
                    </Typography>
                }
                title={
                    <Typography
                        variant="h6"
                        style={{
                            color: "grey",
                            fontWeight: '', // Keep this as is, or set to 'bold' if needed
                            fontSize: '0.875rem' // Adjust the font size here (this is an example value)
                        }}
                    >
                        {tablename}
                    </Typography>
                }

                sx={{ display: 'flex', justifyContent: 'flex-end' }} // Aligns the avatar to the right
            />
            <CardContent sx={{ flexGrow: 1, padding: '8px' }}> {/* Adjust padding to reduce space */}
                <ApexChart color={colorHighLight[index]} randomNumbers={randomNumbers} tablename={tablename} gridLabels={gridLabels} />
            </CardContent>
        </Card>
        // </Paper>
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
