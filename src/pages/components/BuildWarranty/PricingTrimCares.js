import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TrimCaresA from './PricingTim/TimCaresA';
import TrimCaresB from './PricingTim/TimCaresB';
import TrimCaresC from './PricingTim/TimCaresC';
import GoldA from './PricingPremiumGCC/GoldA';
import GoldB from './PricingPremiumGCC/GoldB';
import GoldC from './PricingPremiumGCC/GoldC';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const packagesLabel = [
    "Gold Core Plan",
    "Gold Elite Plan",
    "Gold Elite Hi-Tech Plan"
];

export default function PricingTrimCares({ packagesTypes, setPackagesType, productIndex, setProductIndex, setProductName, setProductCost, handleNext }) {
    const theme = useTheme();
    const [value, setValue] = React.useState(packagesTypes < packagesLabel.length ? packagesTypes : 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setPackagesType(newValue);
    };

    

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}> {/* Full-width */}
            <AppBar position="static" sx={{ width: '100%' }}> {/* Full-width AppBar */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    // indicatorColor="secondary"
                    textColor="white"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {/* Customized Tab styling for dark blue background when selected */}
                    {packagesLabel.map((label, index) => (
                        <Tab label={label} {...a11yProps(index)} key={index} sx={{
                            bgcolor: value === index ? '#b21b1f' : '#313031',  // Dark blue when active
                            color: value === index ? 'white' : 'white'        // White text when active
                        }} />
                    ))}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>

                {/* <TrimCaresA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
                <GoldA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                {/* <TrimCaresB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
                <GoldB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                {/* <TrimCaresC productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
                <GoldC productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
        </Box>
    );
}
