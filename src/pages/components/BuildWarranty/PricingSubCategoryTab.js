import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from '../../../api/axios';
import GoldCoreA from './PricingPremiumGCC/GoldCoreA';
import ProductCategoryList from './PricingPremiumGCC/ProductCategoryList';
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

const packagesLabelOLD = [
    "Gold Core $2500 Per Claim",
    "Gold Core No Per Claim Max",
    "Gold Elite $2500 Per Claim",
    "Gold Elite No Per Claim Max",
    "Gold Elite Hi-Tech $2500 Per Claim",
    "Gold Elite Hi-Tech No Per Claim Max",

];
export default function PricingSubCategoryTab({ categoryId, packagesTypes, setPackagesType, productIndex, setProductIndex, setProductName, setProductCost, setGiftCardCredit, handleNext, setOriginalCost }) {
    const theme = useTheme();
    const [packagesLabel, setPackagesLabel] = useState([]);
    const [value, setValue] = useState(2);
    

    const [products,setProducts] = useState([]);
    const [features,setFeatures] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);       
        setPackagesType(newValue);
        // console.log("packagesType value text"+ packagesLabel[newValue].subcategory);
    };

    useEffect(() => {
        // loadCategory();
        console.log("packagesTypes abhi"+packagesTypes)
        console.log("categoryId" + categoryId);
        if (categoryId) {
            // setValue(1);
            loadSubcategory(categoryId);
        }
    }, [categoryId]);


    const loadSubcategory = async (categoryId) => {
        try {
            const URL = "./product/" + categoryId + "/getByCategory";
            const response = await axios.post(URL);

            if (response.data.status === 401) {
                setPackagesLabel([]); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                // const dataWithIndex = response.data.data.map((item, index) => ({
                //     ...item,
                //     slNo: index + 1, // Assign sequential SL No starting from 1
                // })) || "";

                setPackagesLabel(responseData);      

                setValue(packagesTypes);        
                
                // console.log("category data" + JSON.stringify(responseData.subcategories));
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setPackagesLabel([]);
        }
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
                        <Tab label={label.subcategory} {...a11yProps(index)} key={index} sx={{
                            bgcolor: value === index ? '#b21b1f' : '#313031',  // Dark blue when active
                            color: value === index ? 'white' : 'white'        // White text when active
                        }} />
                    ))}
                </Tabs>
            </AppBar>

            {
                packagesLabel.map((label, index) => (
                    <TabPanel value={value} index={index} dir={theme.direction}>
                        <ProductCategoryList categoryId={categoryId} subcategory={label.subcategory} productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} setGiftCardCredit={setGiftCardCredit} handleNext={handleNext} setOriginalCost={setOriginalCost}/>
                    </TabPanel>
                ))
            }

            {/* <TabPanel value={value} index={0} dir={theme.direction}>                
                <GoldCoreA productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>               
                <GoldCoreB productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
               
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
            </TabPanel> */}
        </Box>
    );
}
