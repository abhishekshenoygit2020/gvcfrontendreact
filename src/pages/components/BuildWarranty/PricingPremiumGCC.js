import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GoldCoreA from './PricingPremiumGCC/GoldCoreA';
import GoldCoreB from './PricingPremiumGCC/GoldCoreB';
import PremiumGCCA from './PricingPremiumGCC/PremiumGCCA';
import PremiumGCCB from './PricingPremiumGCC/PremiumGCCB';
import PremiumGCCC from './PricingPremiumGCC/PremiumGCCC';
import PremiumGCCD from './PricingPremiumGCC/PremiumGCCD';
import PremiumGCCE from './PricingPremiumGCC/PremiumGCCE';
import PremiumA from "./PricingPremiumGCC/PremiumA";
import PremiumB from './PricingPremiumGCC/PremiumB';
import PremiumC from './PricingPremiumGCC/PremiumC';

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
    "Gold Core $2500 Per Claim",
    "Gold Core No Per Claim Max",
    "Gold Elite $2500 Per Claim",
    "Gold Elite No Per Claim Max",
    "Gold Elite Hi-Tech $2500 Per Claim",
    "Gold Elite Hi-Tech No Per Claim Max",
    
];
export default function PricingPremiumGCC({ packagesTypes, setPackagesType, productIndex, setProductIndex, setProductName, setProductCost, handleNext }) {
    const theme = useTheme();
    const [value, setValue] = React.useState(packagesTypes < packagesLabel.length ? packagesTypes : 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setPackagesType(newValue);
    };


    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}> {/* Full-width */}
            <AppBar position="static" sx={{ width: '100%', bgcolor: 'rgb(139 92 246 /1)', color: 'white' }}> {/* Full-width AppBar */}
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
                {/* <PremiumGCCA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
                <GoldCoreA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                {/* <PremiumB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
                <GoldCoreB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                {/* <PremiumC productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
                <PremiumGCCB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
                <PremiumGCCC productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
                <PremiumGCCD productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
                <PremiumGCCE productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
        </Box>
    );
}
