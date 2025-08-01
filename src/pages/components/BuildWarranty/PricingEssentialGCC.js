import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EssentialA from './PremiumEssentialGCC/EssentialA';
import EssentialB from './PremiumEssentialGCC/EssentialB';
import EssentialC from './PremiumEssentialGCC/EssentialC';
import EssentialD from './PremiumEssentialGCC/EssentialD';
import EssentialE from './PremiumEssentialGCC/EssentialE';
import SuperiorplanA from './PricingPremiumGCC/SuperiorplanA';

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
    "Silver Powertrain $1000 Per Claim",
    "Silver Powertrain $1500 Per Claim",
    "Silver Powertrain $2500 Per Claim",
    "Silver Powertrain Plus $2500 Per Claim",
    "Silver Powertrain Plus $4000 Per Claim",
];
export default function PricingEssantialGCC({ packagesTypes, setPackagesType, productIndex, setProductIndex, setProductName, setProductCost, handleNext }) {
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
                <EssentialA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
                {/* <SuperiorplanA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <EssentialB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <EssentialC productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
                <EssentialD productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
                <EssentialE productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>

        </Box>
    );
}
