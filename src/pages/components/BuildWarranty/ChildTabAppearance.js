import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import GAPPDF from './PDF/DIGITAL-Financial-GAP-Warranties-2020-ENGLISH.pdf';


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

export default function ChildTabAppearance({productIndex, setProductIndex, setProductName, setProductCost,handleNext}) {
    const [value, setValue] = React.useState(productIndex);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setProductIndex(newValue);
    };

    // Array of tab labels
    const tabLabels = [
        "96 Months",
        "84 Months",
        "78 Months",
        "72 Months",
        "60 Months",
        "48 Months",
        "36 Months",
        "24 Months",
    ];

    const Prices = [
        "519",
        "519",
        "519",
        "519",
        "519",
        "509",
        "499",
        "475",
    ];

    const ProductData = (e) => {
        setProductCost(Prices[value]);
        setProductName(`GAP Financial Protection Bundle - Max Liability: $75,000 - Financed Amt: $0 - $75,000 (${tabLabels[value]}/unlimted)`);
        handleNext();
    }
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
                                    <b>GAP Financial Protection Bundle - Max Liability: $25000 - Financed Amt: $0 - $75,000 ({tabLabels[index]})</b>
                                </Typography>

                                <Typography sx={{ fontSize: '0.875rem', padding: '8px 0' }}>
                                    The GVC Financial GAP Bundle Protects You Against The Unexpected. FINANCIAL GAP BUNDLE Protects You in the case of a TOTAL LOSS Due To:
                                </Typography>

                                <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold', }}>
                                    Components Covered
                                </Typography>
                                <ul>
                                    <li style={{ fontSize: '0.875rem' }}>ACCIDENT</li>
                                    <li style={{ fontSize: '0.875rem' }}>THEFT</li>
                                    <li style={{ fontSize: '0.875rem' }}>FIRE</li>
                                    <li style={{ fontSize: '0.875rem' }}>VANDALISM</li>
                                    <li style={{ fontSize: '0.875rem' }}>FLOOD OR WEATHER DAMAGE</li>
                                </ul>

                                <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
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
                                </ul>
                                <Grid container spacing={2} justifyContent="flex-start">
                                    <Grid item xs={12}>
                                        <a href={GAPPDF} target="_blank"
                                            rel="noreferrer"><Button variant="outlined" color="primary" sx={{ whiteSpace: 'normal', textAlign: 'center' }} fullWidth>
                                                View PDF Brochure
                                            </Button></a>
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
                                        <Button variant="outlined" color="error" sx={{ whiteSpace: 'normal', textAlign: 'center' }} fullWidth>
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
