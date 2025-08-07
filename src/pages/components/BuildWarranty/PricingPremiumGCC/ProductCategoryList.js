import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from '../../../../api/axios';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ApplicationStore from '../../../../utils/localStorageUtil';
import GAPPDF from '../PDF/DIGITAL-Financial-GAP-Warranties-2020-ENGLISH.pdf';
import { applyInitialState } from '@mui/x-data-grid/hooks/features/columns/gridColumnsUtils';


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

export default function ProductCategoryList({ categoryId, subcategory, productIndex, setProductIndex, setProductName, setProductCost, setGiftCardCredit, handleNext, setOriginalCost, productRef }) {

    const [tabLabels, setTabLabels] = useState([]);
    const [prices, setPrices] = useState([]);
    const [productFeature, setProductFeature] = useState("");
    const dealership = ApplicationStore().getStorage('dealership');
    const salesrep = ApplicationStore().getStorage('salesrep');

    const [value, setValue] = React.useState(productIndex);
    const [pdf, Setpdf] = useState('');
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
        setProductIndex(newValue);
        // console.log("tabLabels:" + tabLabels[newValue]);
        // console.log("price :" + prices[newValue]);
    };

    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);

    // Array of tab labels
    const tabLabelsNew = [
        "60 Months/105000 KM",
        "48 Months/85000 KM",
        "36 Months/65000 KM",
        "24 Months/50000 KM",
        "12 Months/25000 KM"
    ];

    const PricesNew = [
        "1319",
        "1319",
        "949",
        "739",
        "569"
    ];

    const ProductData = (e) => {

        // const str = tabLabels[value];
        // const containsUnlimited = str.toLowerCase().includes("unlimited");

        // console.log("test:"+containsUnlimited);
        // console.log("odometer:"+odometer);

        // if (parseInt(odometer) > 20000 && containsUnlimited) {
        //     alert("Current product cannot be selected!");
        // } else {
            setProductCost(prices[value]);
            setProductIndex(value);
            setProductName(`${subcategory}(${tabLabels[value]})`);
            productRef.current = tabLabels[value];
            const productNameToFind = tabLabels[value];
            setOriginalCost(prices[value]);

            const filteredProducts = originalProducts.filter(p => p.productName === productNameToFind);

            if (filteredProducts.length > 0) {
                const productPrice = filteredProducts[0].productPrice;
                console.log("Product Price:", productPrice);
                setOriginalCost(productPrice);
                setGiftCardCredit(prices[value] - productPrice);

            } else {
                // console.log("Product not found");
                setGiftCardCredit(0);
            }

            handleNext();
        // }




    }


    useEffect(() => {
        // console.log("products new "+products);
        // const extractedProductNames = products.map(product => product.productName);
        // setTabLabels(extractedProductNames);
        loadProductFeatures(categoryId, subcategory);

    }, [categoryId, subcategory, productRef]);


    const loadProductFeatures = async (categoryId, subcategory) => {
        try {
            const URL = "./product/" + categoryId + "/getProductFeatures";
            const data = { subcategory, dealership, salesrep };
            const response = await axios.post(URL, data);

            if (response.data.status === 401) {
                setTabLabels([]); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                const extractedProductNames = responseData.products.map(product => product.productName);
                const extractedProductPrices = responseData.products.map(product => product.productPrice);
                setOriginalProducts(responseData.originalProducts);
                setTabLabels(extractedProductNames);
                setPrices(extractedProductPrices);
                setProductFeature(JSON.parse(responseData.features));
                Setpdf(responseData.PDF);
                if (productIndex && productIndex < extractedProductNames.length) {
                    setValue(productIndex);
                } else {
                    setValue(0);
                }

            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setTabLabels([]);
        }
    };

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
                sx={{ borderRight: 1, borderColor: 'divider', width: '700px' }} // Set a fixed width for tabs
            >
                {tabLabels.map((label, index) => (
                    <Tab label={label} {...a11yProps(index)} key={index} sx={{ fontSize: '12px' }} />
                ))}
            </Tabs>
            {tabLabels.map((content, index) => (
                <TabPanel value={value} index={index} key={index}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={12}>
                            <Box sx={{ padding: 2, border: '2px solid red', borderRadius: '8px' }}>


                                <Grid container spacing={2} justifyContent="flex-start">
                                    <Grid item xs={12}>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: productFeature }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <a href={'https://sl.synchash.in' + pdf} target="_blank"
                                            rel="noreferrer"><Button variant="outlined" color="primary" sx={{ whiteSpace: 'normal', textAlign: 'center' }} fullWidth>
                                                View PDF Brochure
                                            </Button></a>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* <Button
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
                                        </Button> */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" color="success" fullWidth>
                                            Great Support: CALL TOLL FREE (905) 291-2940
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
                                            {`$` + prices[index]}
                                            {/* <b>${dealership == 48 ? categoryId == 6 ? Number(prices[index])+100  : Number(prices[index]) + 150 : dealership == 72 ? Number(prices[index]) + 100 : dealership == 57 ? Number(prices[index])*2 : prices[index]}</b> */}
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



