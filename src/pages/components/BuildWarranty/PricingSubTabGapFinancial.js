import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GAPA from './PricingGAP/GAPA';
import GAPB from './PricingGAP/GAPB';
import GAPC from './PricingGAP/GAPC';
import GAPD from './PricingGAP/GAPD';
import SilverA from './PricingPremiumGCC/SilverA';
import SilverB from './PricingPremiumGCC/SilverB';


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

export default function PricingSubTabGapFinancial({ packagesTypes, setPackagesType, productIndex, setProductIndex, setProductName, setProductCost, handleNext }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(packagesTypes < 2 ? packagesTypes : 0);

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
          indicatorColor="secondary"
          textColor="white"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {/* Customized Tab styling for dark blue background when selected */}
          <Tab
            label="Silver Powertrain Plans"
            {...a11yProps(0)}
            sx={{
              bgcolor: value === 0 ? '#b21b1f' : '#313031',  // Dark blue when active
              color: value === 0 ? 'white' : 'white'        // White text when active
            }}
          />
          <Tab
            label="Silver Powertrain PLUS Plans"
            {...a11yProps(1)}
            sx={{
              bgcolor: value === 1 ? '#b21b1f' : '#313031',  // Dark blue when active
              color: value === 1 ? 'white' : 'white'        // White text when active
            }}
          />
          {/* <Tab
            label="Max Liability: $25000 - Financed Amt: $25,001 - $50,000"
            {...a11yProps(2)}
            sx={{
              bgcolor: value === 2 ? '#b21b1f' : '#313031',  // Dark blue when active
              color: value === 2 ? 'white' : 'white'        // White text when active
            }}
          />
          <Tab
            label="Max Liability: $25000 - Financed Amt: $0 - $25,000"
            {...a11yProps(2)}
            sx={{
              bgcolor: value === 3 ? '#b21b1f' : '#313031',  // Dark blue when active
              color: value === 3 ? 'white' : 'white'        // White text when active
            }}
          /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
     
        <SilverA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
        {/* <GAPA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <SilverB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
        {/* <GAPB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} /> */}
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <GAPC productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <GAPD productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
    </Box>
  );
}
