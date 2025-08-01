import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import GAPPDF from '../PDF/DIGITAL-Financial-GAP-Warranties-2020-ENGLISH.pdf';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, width: '100%', overflow: 'auto' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const tabContents = [
    <Box
        component="main"
        sx={{
            width: '100%',
            flexGrow: 1,
            p: 3,
            border: '2px solid red',
            borderRadius: '8px',
            boxSizing: 'border-box',
        }}
    >
        <h1>96 months</h1>
    </Box>,

    <Grid item xs={12} lg={12}>
        <Box sx={{ padding: 2, border: '2px solid red', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ fontSize: '0.875rem' }} style={{ overflowWrap: 'break-word' }}>
                GAP Financial Protection Bundle - Max Liability: $25000 - Financed Amt: $50,001 - $100,000 (96 Months)
            </Typography>

            <Typography sx={{ fontSize: '0.875rem', padding: '8px 0' }}>
                The GVC Financial GAP Bundle Protects You Against The Unexpected. FINANCIAL GAP BUNDLE Protects You in the case of a TOTAL LOSS Due To:
            </Typography>

            <Typography variant="h6" sx={{ fontSize: '0.875rem' }}>
                Components Covered
            </Typography>
            <ul>
                <li style={{ fontSize: '0.875rem' }}>ACCIDENT</li>
                <li style={{ fontSize: '0.875rem' }}>THEFT</li>
                <li style={{ fontSize: '0.875rem' }}>FIRE</li>
                <li style={{ fontSize: '0.875rem' }}>VANDALISM</li>
                <li style={{ fontSize: '0.875rem' }}>FLOOD OR WEATHER DAMAGE</li>
            </ul>

            <Typography variant="h6" sx={{ fontSize: '0.875rem' }}>
                Collision Deductible:
            </Typography>
            <ul>
                <li style={{ fontSize: '0.875rem' }}>Reimburses Your Deductible Payment For At-Fault Auto Collision Claim</li>
                <li style={{ fontSize: '0.875rem' }}>Max of $1000*</li>
            </ul>

            <Typography variant="h6" sx={{ fontSize: '0.875rem' }}>
                $500 Loyalty Credit:
            </Typography>
            <ul>
                <li style={{ fontSize: '0.875rem' }}>Buy Your Replacement Vehicle from the Same Dealer and Receive $500 Towards the Purchase</li>
            </ul>

            <Typography variant="h6" sx={{ fontSize: '0.875rem' }}>
                Mechanical Breakdown Protection:
            </Typography>
            <ul>
                <li style={{ fontSize: '0.875rem' }}>One Month Powertrain Coverage</li>
            </ul>
        </Box>
    </Grid>,
    <h1>78 Months Content</h1>, // Content for 78 Months tab
    <h1>72 Months Content</h1>, // Content for 72 Months tab
    <h1>60 Months Content</h1>, // Content for 60 Months tab
    <h1>48 Months Content</h1>, // Content for 48 Months tab
    <h1>36 Months Content</h1>, // Content for 36 Months tab
];

export default function GoldCoreB({ productIndex, setProductIndex, setProductName, setProductCost, handleNext }) {
    const [value, setValue] = React.useState(productIndex);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setProductIndex(newValue);
    };

    // Array of tab labels
    const tabLabels = [
        "60 Months/105000 KM",
        "48 Months/85000 KM",
        "36 Months/65000 KM",
        "24 Months/50000 KM",
        "12 Months/25000 KM"
    ];

    const Prices = [
        "1319",
        "1319",
        "949",
        "739",
        "569"
    ];

    const ProductData = (e) => {
        setProductCost(Prices[value]);
        setProductName(`Gold Core No Per Claim Max(${tabLabels[value]})`);
        handleNext();
    }

    useEffect(() => {
            if(productIndex) {
                setValue(productIndex);
            }else{
                setValue(0);
            }        
        }, [productIndex]);

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', width: '200px' }} // Set a fixed width for tabs
            >
                {tabLabels.map((label, index) => (
                    <Tab label={label} {...a11yProps(index)} key={index} />
                ))}
            </Tabs>
            {tabLabels.map((content, index) => (
                <TabPanel value={value} index={index} key={index}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={12}>
                            <Box sx={{ padding: 2, border: '2px solid red', borderRadius: '8px' }}>
                                <Typography variant="h6" sx={{ fontSize: '1.3rem', fontWeight: 'bold', overflowWrap: 'break-word' }}>
                                    <b>Gold Core No Per Claim Max ({tabLabels[index]})</b>
                                </Typography>

                                <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold', }}>
                                Components Covered
                            </Typography>
                            <ul>
                                <li style={{ fontSize: '0.875rem' }}>Powertrain Components Including Sensors, Seals & Gaskets*</li>
                                <li style={{ fontSize: '0.875rem' }}>Air Conditioning</li>
                                <li style={{ fontSize: '0.875rem' }}>Turbo Charger</li>
                                <li style={{ fontSize: '0.875rem' }}>Electronic Ignition</li>
                                <li style={{ fontSize: '0.875rem' }}>Electric System</li>
                                <li style={{ fontSize: '0.875rem' }}>Fuel Injection System</li>
                                <li style={{ fontSize: '0.875rem' }}>Brakes & ABS Brakes</li>
                                <li style={{ fontSize: '0.875rem' }}>Power Steering</li>

                            </ul>
                            <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold', }}>
                                Seals & Gaskets on Covered Parts Only
                            </Typography>
                            <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                                Features
                            </Typography>
                            <ul>
                                <li style={{ fontSize: '0.875rem' }}><b>Select “No Limits Per Claim” </b>With a liability cap of $20,000, our Gold
                                Plans offer exceptional coverage. </li>
                                <li style={{ fontSize: '0.875rem' }}><b>Quick & Stress-Free Claims Process:</b>Get Covered Canada is committed to a
fast and seamless claims process,
allowing you to select your preferred
repair shop.</li>
                            </ul>

                            <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                            Coverage for Vehicles Less than 7
Years Old
                            </Typography>
                            <ul>
                                <li style={{ fontSize: '0.875rem' }}>We provide tailored plans for new or
used vehicles of any age. Speak with
one of our Customer Service Associates
to find the right coverage for your
vehicle.</li>
                            </ul>

                                {/* <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                                    Collision Deductible:
                                </Typography>
                                <ul>
                                    <li style={{ fontSize: '0.875rem' }}>Reimburses Your Deductible Payment For At-Fault Auto Collision Claim</li>
                                    <li style={{ fontSize: '0.875rem' }}>Max of $1000*</li>
                                </ul>

                                <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                                    $500 Loyalty Credit:
                                </Typography>
                                <ul>
                                    <li style={{ fontSize: '0.875rem' }}>Buy Your Replacement Vehicle from the Same Dealer and Receive $500 Towards the Purchase</li>
                                </ul>

                                <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                                    Mechanical Breakdown Protection:
                                </Typography>
                                <ul>
                                    <li style={{ fontSize: '0.875rem' }}>One Month Powertrain Coverage</li>
                                </ul> */}
                                <Grid container spacing={2} justifyContent="flex-start">
                                    <Grid item xs={12}>
                                        <a href={GAPPDF} target="_blank"
                                            rel="noreferrer"><Button variant="outlined" color="primary" sx={{ whiteSpace: 'normal', textAlign: 'center' }} fullWidth>
                                                View PDF Brochure
                                            </Button></a>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                color: 'black', // Text color
                                                backgroundColor: '#ffcc99', // Light orange background
                                                borderColor: '#ffcc99', // Border color
                                                '&:hover': {
                                                    backgroundColor: '#ffcc99', // Darker shade of orange on hover
                                                    borderColor: '#ffcc99',
                                                },
                                            }}
                                        >
                                            <b>Max Protection:</b> No Per Claim Max (Maximum Contract Liability $20,000)
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" color="success" fullWidth>
                                            Great Support: CALL TOLL FREE (800) 268-3284
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" color="success" sx={{ whiteSpace: 'normal', textAlign: 'center' }} fullWidth>
                                            Please note: Information and covered components may change. <br></br>This is not a contract; kindly refer to the warranty policy for complete coverage details.
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button variant="outlined" color="error" sx={{
                                                whiteSpace: 'normal',
                                                textAlign: 'center',
                                                color: 'red', // Ensure the text color is red
                                                borderColor: 'red', // Set the border color to red
                                                backgroundColor: 'transparent', // Ensure the background remains transparent or as needed
                                                '&.Mui-disabled': {
                                                    color: 'red', // Keep the text red when disabled
                                                    borderColor: 'red', // Maintain the red border when disabled
                                                }
                                            }}
                                            disabled fullWidth>
                                            <b>${Prices[index]}</b>
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Box>
                        </Grid>

                        <Grid item xs={12} lg={12}>
                            <Grid container spacing={2} justifyContent="flex-start">
                                <Grid item>
                                    <Button variant="contained" color="success" onClick={(e) => ProductData(e)}>
                                        Continue with Product
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </TabPanel>
            ))}
        </Box>
    );
}
