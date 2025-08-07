import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from '../../../api/axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PricingSubTabAppearnce from './PricingSubTabAppearance';
import PricingSubTabGapFinancial from './PricingSubTabGapFinancial';
import PricingPremiumGCC from './PricingPremiumGCC';
import PricingSubCategoryTab from './PricingSubCategoryTab';
import PricingTrimCares from './PricingTrimCares';
import PricingEssantialGCC from './PricingEssentialGCC';
import BronzeTab from './BronzeTab';
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

export default function PricingTab({ packages, setPackages, packagesTypes, setPackagesType, productIndex, setProductIndex, setProductName, setProductCost, handleNext, setPackagesText, setGiftCardCredit, setOriginalCost, productRef}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(packages);

  const [packagesTypesLabel, setPackagesTypesLabel] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPackages(newValue);
    setPackagesText(packagesTypesLabel[newValue].categoryName);
    // console.log('packages label' + packagesTypesLabel[newValue].categoryName);
    // console.log('packages new value' + newValue);
  };

  const packagesTypesLabelOLD = [
    "Gold Warranties",
    "Bronze Warranties",
    "Silver Warranty Plans",
    // "Gold Warranty Plans",
    // "Bronze  Warranty Plans",
    // "Silver  Warranty Plans",
    // "Trim Care Tires",
    // "Gap Financial Protection bundle"
  ];

  useEffect(() => {
    loadCategory();
  }, []);


  const loadCategory = async (e) => {
    try {
      const URL = "./category";
      const response = await axios.get(URL);

      if (response.data.status === 401) {
        setPackagesTypesLabel([]); // Keep dummy data in case of unauthorized response
      } else {
        const responseData = response.data.data;
        // const dataWithIndex = response.data.data.map((item, index) => ({
        //     ...item,
        //     slNo: index + 1, // Assign sequential SL No starting from 1
        // })) || "";
        setPackagesTypesLabel(responseData);
        // console.log("category data" + JSON.parse(response.data.data));
      }
    } catch (err) {
      console.log("Error fetching data:", err);
      // Use dummy data if request fails
      setPackagesTypesLabel('');
    }
  };


  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}> {/* Full-width */}
      <AppBar position="static" sx={{ width: '100%', bgcolor: '#626c91', color: 'white' }}> {/* Full-width AppBar */}
        <Tabs
          value={value}
          onChange={handleChange}
          // indicatorColor="secondary"
          textColor="white"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {/* Customized Tab styling for dark blue background when selected */}
          {packagesTypesLabel.map((label, index) => (
            <Tab label={label.categoryName} {...a11yProps(index)} key={index} sx={{
              bgcolor: value === index ? '#b21b1f' : '#313031',  // Dark blue when active
              color: value === index ? 'white' : 'white'        // White text when active
            }} />
          ))}
        </Tabs>
      </AppBar>
      {packagesTypesLabel.map((label, index) => (
        <TabPanel value={value} index={index} dir={theme.direction}>
          <PricingSubCategoryTab categoryId={label.id} packagesTypes={packagesTypes} setPackagesType={setPackagesType} productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} setGiftCardCredit={setGiftCardCredit} handleNext={handleNext} setOriginalCost={setOriginalCost} productRef={productRef} />
        </TabPanel>
      ))}

      {/* <TabPanel value={value} index={0} dir={theme.direction}>
        <PricingPremiumGCC packagesTypes={packagesTypes} setPackagesType={setPackagesType} productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <PricingSubTabAppearnce packagesTypes={packagesTypes} setPackagesType={setPackagesType} productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <PricingEssantialGCC packagesTypes={packagesTypes} setPackagesType={setPackagesType} productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <PricingTrimCares packagesTypes={packagesTypes} setPackagesType={setPackagesType} productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={4} dir={theme.direction}>
        <BronzeTab packagesTypes={packagesTypes} setPackagesType={setPackagesType} productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={5} dir={theme.direction}>
        <PricingSubTabGapFinancial packagesTypes={packagesTypes} setPackagesType={setPackagesType} productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
      </TabPanel> */}
    </Box>
  );
}
