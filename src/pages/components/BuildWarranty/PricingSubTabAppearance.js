import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppearanceA from './PricingAppearance/AppearanceA';
import AppearanceB from './PricingAppearance/AppearanceB';
import AppearanceC from './PricingAppearance/AppearanceC';
import AppearanceD from './PricingAppearance/AppearanceD';
import AppearanceE from './PricingAppearance/AppearanceE';
import AppearanceF from './PricingAppearance/AppearanceF';
import AppearanceG from './PricingAppearance/AppearanceG';
import EssentialA from './PricingPremiumGCC/EssentialA';
import EssentialB from './PricingPremiumGCC/EssentialB';

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
  "Bronze Powertrain $1000 per claim",
  "Bronze Powertrain $1500 per claim",
  "Bronze Powertrain Plus $1000 per claim",
  "Bronze Powertrain Plus $1500 per claim",
  
  // "Rust Shield Extended",
  // "Interior Shield Extended",
  // "Rust and Exterior Shield Extended",
  // "Rust and Interior Shield Extended",
  // "Rust Exterior and Interior Shield Extended",
  // "Rust and Exterior Shield Plus Extended",
  // "Rust Exterior and Interior Shield Plus Extended"
];


export default function PricingSubTabAppearnce({ packagesTypes, setPackagesType, productIndex, setProductIndex, setProductName, setProductCost, handleNext }) {
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
        {/* <EssentialA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
        <AppearanceA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <AppearanceB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
        {/* <EssentialB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <AppearanceC productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <AppearanceD productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={4} dir={theme.direction}>
        <AppearanceE productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={5} dir={theme.direction}>
        <AppearanceF productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={6} dir={theme.direction}>
        <AppearanceG productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
    </Box>
  );
}
