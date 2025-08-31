import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import Chart from 'chart.js/auto';
import axios from '../../../../api/axios';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts';
import { useMediaQuery } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { mobileAndDesktopOS, valueFormatter } from './webUsageStats';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ApplicationStore from '../../../../utils/localStorageUtil';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { CSVLink } from 'react-csv';
import DataList from './DataList';
import SmallCard from './Card';
import { Line } from 'react-chartjs-2';   // Chart.js line chart
import { LineChart } from '@mui/x-charts'; // MUI X chart
const URL = "./dealership/getDataCount";


const Dashboard = () => {
    // Initialize dataList as an empty array to avoid map errors
    const [dataList, setDataList] = useState([]);
    const [Amount, setAmount] = useState([]);

    const [productAPrice, setProductAPrice] = useState(0);
    const [productBPrice, setProductBPrice] = useState(0);
    const [productCPrice, setProductCPrice] = useState(0);
    const [productAName, setProductAName] = useState('Essential Warranty');
    const [productBName, setProductBName] = useState('Premium Warranty');
    const [productCName, setProductCName] = useState('GAP Protection');
    const [salesLabel,setSalesLabel] = useState([]);
    const [soldData, setSoldData] = useState([]);

    const [seriesData, setSeriesData] = useState([
        { label: "Essential", value: 0 },
        { label: "Premium", value: 0 },
        { label: "GAP", value: 0 }
    ]);

    const total = seriesData.reduce((sum, item) => sum + item.value, 0);

    const valueFormatter = (item) => {
        const percent = ((item.value / total) * 100).toFixed(1);
        return `${percent}%`;
    };  

    const user = ApplicationStore().getStorage('user_email');
    const dealership = ApplicationStore().getStorage('dealership');
    const userType = ApplicationStore().getStorage('user_type');

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:1200px)');

    const state = {

        series: [{
            name: "Session Duration",
            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
            borderColor: "red"
        },
        {
            name: "Page Views",
            data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
            name: 'Total Visits',
            data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [5, 7, 5],
                curve: 'straight',
                dashArray: [0, 8, 5]
            },
            title: {
                text: 'Sales Info',
                align: 'left'
            },
            legend: {
                tooltipHoverFormatter: function (val, opts) {
                    return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                    '10 Jan', '11 Jan', '12 Jan'
                ],
            },
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val) {
                                return val + " (mins)"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val + " per session"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val;
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        },


    };




    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];
    // Sample data for the chart
    const data = {
        labels: salesLabel,
        datasets: [
            {
                label: 'Sales',
                data: Amount,
                borderColor: '#3f51b5',
                backgroundColor: 'rgba(63, 81, 181, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Over Time',
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Start from 0 on the y-axis
                ticks: {
                    stepSize: 100000, // Set interval of 100000
                    callback: function (value) {
                        return value.toLocaleString(); // Format the tick labels with commas (e.g., 100,000)
                    },
                },
                suggestedMax: 300000, // Set a suggested maximum value to fit your data
            },
        },
    };
    const dataN = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
            {
                label: 'Data',
                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                borderColor: '#FF5733', // Line color
                borderWidth: 2,
                pointBackgroundColor: '#FF5733', // Color of points
                pointBorderWidth: 2,
                showLine: true,
                pointRadius: (ctx) => (ctx.dataIndex % 2 === 0 ? 5 : 0), // Show marks on even indices
            },
        ],
    };

    const optionsN = {
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            line: {
                borderWidth: 2,
                tension: 0.4,
            },
            point: {
                radius: 5,
            },
        },
    };

    const data3 = [
        { label: 'Group A', value: 400 },
        { label: 'Group B', value: 300 },
        { label: 'Group C', value: 300 },
        { label: 'Group D', value: 200 },
    ];

    const data4 = [
        { label: 'A1', value: 100 },
        { label: 'A2', value: 300 },
        { label: 'B1', value: 100 },
        { label: 'B2', value: 80 },
        { label: 'B3', value: 40 },
        // { label: 'B4', value: 30 },
        // { label: 'B5', value: 50 },
        // { label: 'C1', value: 100 },
        // { label: 'C2', value: 200 },
        // { label: 'D1', value: 150 },
        // { label: 'D2', value: 50 },
    ];

    const data5 = [
        { value: 5, label: 'A' },
        { value: 10, label: 'B' },
        { value: 15, label: 'C' },
        { value: 20, label: 'D' },
    ];

    const size = {
        width: 400,
        height: 200,
    };

    const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));

    // const monthlyData = [
    //     { month: "2025-01", cost: 120000, profit: 80000 },
    //     { month: "2025-02", cost: 150000, profit: 110000 },
    //     { month: "2025-03", cost: 170000, profit: 130000 },
    //     { month: "2025-04", cost: 160000, profit: 125000 },
    //     { month: "2025-05", cost: 200000, profit: 155000 },
    //     { month: "2025-06", cost: 140000, profit: 95000 },
    //     { month: "2025-07", cost: 180000, profit: 145000 },
    //     { month: "2025-08", cost: 130000, profit: 85000 },
    // ];

    const COLORS = ["#0088FE", "#00C49F"];
    const [monthlyData, setMonthlyData] = useState([]);
    const [monthIndex, setMonthIndex] = useState(monthlyData.length - 1);

    const handlePrev = () => {
    if (monthIndex > 0) setMonthIndex(monthIndex - 1);
    };


    const handleNext = () => {
    if (monthIndex < monthlyData.length - 1) setMonthIndex(monthIndex + 1);
    };

const currentMonth = monthlyData[monthIndex] || {};



    useEffect(() => {
        fetchTotalCost();
        fetchLastMonthSales();
        loadData();
        loadSoldData();
        loadProductData();
        
    }, []);

    //  Function to fetch last month sales
    const dealership_id = ApplicationStore().getStorage('dealership');
    const user_type = ApplicationStore().getStorage('user_type');
    const fetchLastMonthSales = async () => {
        try {
            // console.log("dealership id: ",dealership);
            
        const response = await axios.get(`http://localhost:3006/api/dashboard/lastMonthSales/${dealership_id}/${user_type}`); 
        // const data = response.data;
        const data = response.data?.data || []; // safe access
         // Build map for easy lookup
        const salesMap = {};
        data.forEach(item => {
          salesMap[item.categoryName] = {
            sales: item.last_month_sales || 0,
            count: item.category_count || 0
          };
        });
        
        // Update states
        setProductAPrice(salesMap["Essential Warranty"]?.sales || 0);
        setProductBPrice(salesMap["Premium Warranty"]?.sales || 0);
        setProductCPrice(salesMap["GAP Protection"]?.sales || 0);

        setSeriesData([
            { label: "Essential", value: salesMap["Essential Warranty"].sales || 0 },
            { label: "Premium", value: salesMap["Premium Warranty"].sales || 0 },
            { label: "GAP", value: salesMap["GAP Protection"].sales || 0 }
        ]);
       

        } catch (error) {
            console.error("Error fetching last month sales:", error);
        }
    };

    
 const fetchTotalCost = async () => {
    try {
      const response = await axios.get(`http://localhost:3006/api/dashboard/totalCost/${dealership}`);
      const data = response.data.data || [];

      const formatted = data.map(item => ({
        month: item.YearMonth,
        cost: item.TotalProductCost,
        profit: item.TotalProfit,
      }));

      setMonthlyData(formatted);
      setMonthIndex(formatted.length - 1); // default to last month
    } catch (error) {
      console.error("Error fetching total cost:", error);
    }
  };




    const loadData = async () => {
        try {
            const data = { dealership, userType }
            const response = await axios.post(URL, data);

            if (response.data.status === 401) {
                setDataList([]); // Keep as empty array in case of unauthorized response
            } else {
                const responseData = response.data.data;
                setDataList(responseData);
                console.log("dataList", responseData);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            setDataList([]); // Use empty array if request fails
        }
    };

    const loadSoldData = async () => {
        try {
            const data = { dealership, userType }
            const response = await axios.post('./dealership/getSoldDataCount', data);

            if (response.data.status === 401) {
                setDataList([]); // Keep as empty array in case of unauthorized response
            } else {
                const Amount = new Array();
                const responseData = response.data.data;
                setSoldData(responseData);
                for (let i = 0; i < responseData.length; i++) {
                    Amount.push(responseData[i].total_sale_price);
                }
                const monthnameLabel = response.data.data.map(item => item.monthYear);
                setSalesLabel(monthnameLabel);
                setAmount(Amount);
                console.log("Amount", Amount);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            setDataList([]); // Use empty array if request fails
        }
    };

    const loadProductData = async () => {
        try {
            const data = { dealership, userType }
            const response = await axios.post('./dealership/getProductData', data);

            if (response.data.status === 401) {
                setDataList([]); // Keep as empty array in case of unauthorized response
            } else {
                // const Amount = new Array();
                const responseData = response.data.data;
                if (responseData) {
                    setProductAName(responseData.totalArray[0].label);
                    setProductAPrice(responseData.totalArray[0].value);

                    setProductBName(responseData.totalArray[1].label);
                    setProductBPrice(responseData.totalArray[1].value);

                    setProductCName(responseData.totalArray[2].label);
                    setProductCPrice(responseData.totalArray[2].value);

                    setSeriesData(responseData.percentageArray);
                }
                // console.log("data", response.data);
            }
           

        } catch (err) {
            // console.log("Error fetching data:", err);
            // setDataList([]); // Use empty array if request fails
        }
    };

    const myColorArray = [
        "#3fb1e3",   // Light Blue
        "#626c91",   // Gray
        "#6be6c1",   // Light Blue
        "#626c91",   // Gray (duplicated)
    ];

    const myOtherColorArray = [

        "rgb(78, 202, 194)",   // Gray (fixed typo)
        "rgb(78, 202, 194)",   // Light Blue
        "red",   // Light Blue
        "rgb(239, 181, 64)",   // Gray
        "rgb(34, 197, 94)",   // Light Blue
    ];

    const StyledTextNEW = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));

    function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
            <StyledTextNEW x={left + width / 2} y={top + height / 2}>
                {children}
            </StyledTextNEW>
        );
    }
    const csvdata = [
        { month: 'January', value: 123 },
        { month: 'February', value: 234 },
        { month: 'March', value: 345 },
        { month: 'April', value: 456 },
        { month: 'May', value: 567 },
        { month: 'June', value: 678 },
        { month: 'July', value: 789 },
        { month: 'August', value: 890 },
        { month: 'September', value: 901 },
        { month: 'October', value: 1023 },
        { month: 'November', value: 1134 },
        { month: 'December', value: 1245 },
    ];

    const series = [
        {
            innerRadius: 40,
            outerRadius: 60,
            id: 'platform-series',
            data: seriesData.map((item, index) => ({
                ...item,
                color: index === 0 ? 'green' : index === 1 ? 'red' : 'orange', // Set the colors as red, green, and yellow
            })),
            valueFormatter,
        },
        {
            innerRadius: 80,
            outerRadius: 40,
            id: 'OS-series',
            data: seriesData.map((item, index) => ({
                ...item,
                color: index === 0 ? 'green' : index === 1 ? 'red' : 'orange', // Similarly for mobile and desktop OS
            })),
            valueFormatter,
        },
    ];

    return (
        <Box p={2}>
            <br></br>
            <br></br>

            {/* Debugging: check the content of dataList */}
            {/* {JSON.stringify(dataList)} */}
{/* //!  Pending, Closed Won , Dealership.... */}
            <Grid container spacing={2}>
                {dataList.length > 0 ? (
                    dataList.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <SmallCard tablename={item.table_name} count={item.row_count} index={index} dealership={dealership} />
                        </Grid>
                    ))
                ) : ""}
            </Grid>

            <br></br>

            {/* Chart */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>

                    <Paper elevation={3} style={{ padding: '0px', height: '350px', display: 'flex', flexDirection: 'column' }}>
                        {/* Title Section */}
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                padding: '20px',
                                borderBottom: '0.5px solid rgba(0, 0, 0, 0.5)',
                                justifyContent: 'space-between', // Space between the items
                                alignItems: 'center'  // Vertically center the items
                            }}
                        >
                            {/* Left - Typography */}
                            <Typography variant="h6" gutterBottom sx={{
                                flexGrow: 1, fontWeight: 'bold',  // Makes the text bold (thick)
                                color: 'grey',
                            }}>
                                Recent Sales
                            </Typography>

                            {/* Right - Button */}

                            {/* <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    whiteSpace: 'normal',
                                    textAlign: 'right',
                                    borderRadius: '8px', // Customize the border radius here
                                    borderColor: 'grey', // Set the border color to grey
                                    color: 'grey', // Set the text color to grey
                                    '&:hover': {
                                        borderColor: 'darkgrey', // Optional: Change border color on hover
                                        color: 'darkgrey', // Optional: Change text color on hover
                                    },
                                }}
                            >
                               
                                <CSVLink
                                    data={csvdata}
                                    filename="1.csv"
                                    style={{
                                        textDecoration: 'none',  // Removes the underline
                                        color: 'inherit',        // Inherits the color from the parent (button)
                                    }}
                                >
                                    Export
                                </CSVLink>
                            </Button> */}
                        </Stack>

                        {/* Pie Chart Section */}
                        <div style={{ width: '100%', height: '70%' }}>
                            {/* <Chart options={state.options} series={state.series} type="line" height="100%" /> */}
                            <Line data={data} options={options} />
                            {/* <LineChart
                              
                                series={[
                                    { data: pData, label: 'pv' },
                                    { data: uData, label: 'uv' },
                                ]}
                                options={options}
                                xAxis={[{ scaleType: 'point', data: xLabels }]}
                            /> */}
                        </div>

                        {/* Typography Section with Left, Center, Right alignment */}

                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Paper elevation={3} style={{ padding: '0px', height: '350px', display: 'flex', flexDirection: 'column' }}>
                        {/* Title Section */}
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                padding: '20px',
                                borderBottom: '0.5px solid rgba(0, 0, 0, 0.5)',
                                justifyContent: 'space-between', // Space between the items
                                alignItems: 'center'  // Vertically center the items
                            }}
                        >
                            {/* Left - Typography */}
                            <Typography variant="h6" gutterBottom sx={{
                                flexGrow: 1, fontWeight: 'bold',  // Makes the text bold (thick)
                                color: 'grey',
                            }}>
                                Last Month Sales
                            </Typography>

                            {/* Right - Button */}
                            {/* <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    whiteSpace: 'normal',
                                    textAlign: 'right',
                                    borderRadius: '8px', // Customize the border radius here
                                    borderColor: 'grey', // Set the border color to grey
                                    color: 'grey', // Set the text color to grey
                                    '&:hover': {
                                        borderColor: 'darkgrey', // Optional: Change border color on hover
                                        color: 'darkgrey', // Optional: Change text color on hover
                                    },
                                }}
                            > */}
                                {/* CSVLink wrapped inside the button with removed hyperlink styles */}
                                {/* <CSVLink
                                    data={soldData}
                                    filename="1.csv"
                                    style={{
                                        textDecoration: 'none',  // Removes the underline
                                        color: 'inherit',        // Inherits the color from the parent (button)
                                    }}
                                >
                                    Export
                                </CSVLink>
                            </Button> */}
                        </Stack>

                        {/* Pie Chart Section */}
                        {/* <PieChart
                            series={[
                                {
                                    data: data4.map((entry, index) => ({
                                        ...entry,
                                        color: myOtherColorArray[index],  // Customize color for each slice
                                    })),
                                    cx: isMediumScreen ? 50 : 300,  // Adjust cx for proper centering
                                    cy: isMediumScreen ? 90 : 100,  // Adjust cy for vertical centering
                                    innerRadius: isSmallScreen ? 30 : isMediumScreen ? 20 : 80,
                                    outerRadius: isSmallScreen ? 50 : isMediumScreen ? 50 : 60,
                                },
                            ]}
                            slotProps={{ legend: { hidden: true } }}
                        >
                            <PieCenterLabel
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',  // Ensures label is centered
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >

                            </PieCenterLabel>
                        </PieChart> */}
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center', // Centers horizontally
                                alignItems: 'center'      // Centers vertically
                            }}
                        >
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <PieChart
                                    series={series}
                                    width={100}
                                    height={170}
                                    slotProps={{
                                        legend: { hidden: true },
                                    }}
                                />{' '}
                            </Box>
                        </Box>

                        {/* Typography Section with Left, Center, Right alignment */}
                        <Grid container sx={{ alignItems: 'center', marginTop: '5px', padding: '30px' }}>
                            {/* Left */}
                            <Grid item xs={4} sx={{ textAlign: 'left' }}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        color: 'gray', // Text color set to gray
                                        position: 'relative',
                                        fontSize: '1vw', // Responsive font size
                                        textAlign: 'center',
                                        display: 'inline-flex', // Ensures the icon and text stay on the same line
                                        alignItems: 'center'    // Vertically aligns the text and icon
                                    }}
                                >
                                    <FiberManualRecordIcon sx={{ fontSize: '1vw', marginRight: '8px', color: 'green' }} /> {productAName}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        color: 'gray', // Text color set to gray
                                        fontWeight: 'bold',
                                        fontSize: '1vw', // Responsive font size
                                    }}
                                >
                                    ${productAPrice.toLocaleString()}
                                </Typography>
                            </Grid>

                            {/* Center - Product B with yellow dot */}
                            <Grid item xs={4} sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        color: 'gray', // Text color set to gray
                                        position: 'relative',
                                        fontSize: '1vw', // Responsive font size
                                        textAlign: 'center',
                                        display: 'inline-flex', // Ensures the icon and text stay on the same line
                                        alignItems: 'center'    // Vertically aligns the text and icon
                                    }}
                                >
                                    <FiberManualRecordIcon sx={{ fontSize: '1vw', marginRight: '8px', color: 'red' }} /> {productBName}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        color: 'gray', // Text color set to gray
                                        fontWeight: 'bold',
                                        fontSize: '1vw', // Responsive font size
                                    }}
                                >
                                    ${productBPrice.toLocaleString()}
                                </Typography>
                            </Grid>

                            {/* Right - Product C with red dot */}
                            <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        color: 'gray', // Text color set to gray
                                        position: 'relative',
                                        fontSize: '1vw', // Responsive font size
                                        textAlign: 'center',
                                        display: 'inline-flex', // Ensures the icon and text stay on the same line
                                        alignItems: 'center'    // Vertically aligns the text and icon
                                    }}
                                >
                                    <FiberManualRecordIcon sx={{ fontSize: '1vw', marginRight: '8px', color: 'orange' }} /> {productCName}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        color: 'gray', // Text color set to gray
                                        fontWeight: 'bold',
                                        fontSize: '1vw', // Responsive font size
                                    }}
                                >
                                    ${productCPrice.toLocaleString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            
                {/* Total Cost Card */}
                <Grid item xs={12} sm={6} md={6}>
                    <Paper
                    elevation={3}
                    style={{
                        padding: "0px",
                        height: "350px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    >
                    {/* Title */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                        padding: "20px",
                        borderBottom: "0.5px solid rgba(0, 0, 0, 0.5)",
                        justifyContent: "space-between",
                        alignItems: "center",
                        }}
                    >
                        <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, fontWeight: "bold", color: "grey" }}
                        >
                        Total Cost
                        </Typography>
                        {/* <Box>
                        <Button onClick={handlePrev} size="small" sx={{ mr: 1 }}>
                            Prev
                        </Button>
                        <Button onClick={handleNext} size="small">
                            Next
                        </Button>
                        </Box> */}
                    </Stack>

                    {/* Line Chart (MUI) */}
                    <Box sx={{ flexGrow: 1, p: 2 , width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center",}}>
                        <LineChart
                            xAxis={[{ data: monthlyData.map((d) => d.month), scaleType: "band" }]}
                            series={[{ data: monthlyData.map((d) => d.cost), label: "Cost", color: "#1976d2" }]}
                            width={500}
                            height={250}
                            margin={{ left: 60, right: 40, top: 20, bottom: 30 }} 
                        />
                    </Box>
                    </Paper>
                </Grid>

                {/* Total Profit Card */}
                <Grid item xs={12} sm={6} md={6}>
                    <Paper
                    elevation={3}
                    style={{
                        padding: "0px",
                        height: "350px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    >
                    {/* Title */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                        padding: "20px",
                        borderBottom: "0.5px solid rgba(0, 0, 0, 0.5)",
                        justifyContent: "space-between",
                        alignItems: "center",
                        }}
                    >
                        <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, fontWeight: "bold", color: "grey" }}
                        >
                        Total Profit
                        </Typography>
                        <Box>
                        <Button onClick={handlePrev} size="small" sx={{ mr: 1 }}>
                            Prev
                        </Button>
                        <Button onClick={handleNext} size="small">
                            Next
                        </Button>
                        </Box>
                    </Stack>

                    {/* Pie Chart (MUI) */}
                    <Box
                        sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        }}
                    >
                        <PieChart
                        series={[
                            {
                            data: [
                                { id: 0, value: currentMonth?.cost || 0, label: "Cost", color: "blue" },
                                { id: 1, value: currentMonth?.profit || 0, label: "Profit", color: "green" },
                            ],
                            innerRadius: 40,
                            outerRadius: 80,
                            },
                        ]}
                        width={250}
                        height={200}
                        slotProps={{ legend: { hidden: true } }}
                        />
                        {/* <LineChart
                            xAxis={[
                                { 
                                data: monthlyData.map((d) => d.month), 
                                scaleType: "band" 
                                }
                            ]}
                            series={[
                                { 
                                data: monthlyData.map((d) => d.cost), 
                                label: "Cost", 
                                color: "blue" 
                                },
                                { 
                                data: monthlyData.map((d) => d.profit), 
                                label: "Profit", 
                                color: "green" 
                                }
                            ]}
                            width={500}
                            height={250}
                            margin={{ left: 60, right: 20, top: 20, bottom: 30 }} 
                        /> */}

                    </Box>

                    {/* Labels Below */}

                        { 1?<Grid 
                        container 
                        sx={{ padding: "20px", alignItems: "center" }}
                        >
                        {/* Cost */}
                        <Grid item xs={4} sx={{ textAlign: "left" }}>
                            <Typography
                            sx={{ display: "flex", alignItems: "center", fontSize: "1vw", color: "gray" }}
                            >
                            <FiberManualRecordIcon sx={{ fontSize: "1vw", color: "blue", mr: 1 }} />
                            Cost
                            </Typography>
                            <Typography sx={{ fontWeight: "bold", fontSize: "1.1vw", color: "gray" }}>
                            ${currentMonth?.cost?.toLocaleString() || 0}
                            </Typography>
                        </Grid>

                        {/* Profit */}
                        <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                            sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1vw", color: "gray" }}
                            >
                            <FiberManualRecordIcon sx={{ fontSize: "1vw", color: "green", mr: 1 }} />
                            Profit
                            </Typography>
                            <Typography sx={{ fontWeight: "bold", fontSize: "1.1vw", color: "gray" }}>
                            ${currentMonth?.profit?.toLocaleString() || 0}
                            </Typography>
                        </Grid>

                        {/* Month & Year */}
                        <Grid item xs={4} sx={{ textAlign: "right" }}>
                            <Typography
                            sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", fontSize: "1vw", color: "gray" }}
                            >
                            <FiberManualRecordIcon sx={{ fontSize: "1vw", color: "orange", mr: 1 }} />
                            Month & Year
                            </Typography>
                            <Typography sx={{ fontWeight: "bold", fontSize: "1.1vw", color: "gray" }}>
                            {currentMonth?.month || "N/A"}
                            </Typography>
                        </Grid>
                        </Grid>: ''}

                    </Paper>
                </Grid>
            </Grid>

            <Box mt={4} mb={4} md={6} xs={12}></Box>

            {/* Table */}
            <Box></Box>
        </Box>
    );
};

export default Dashboard;