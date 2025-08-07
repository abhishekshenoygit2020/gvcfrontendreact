import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LockResetIcon from '@mui/icons-material/LockReset';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from '../../../api/axios';
import InputAdornment from '@mui/material/InputAdornment';

import RoadSideAssitance from './RoadSideAssitance';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PricingTab from './PricingTab';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ApplicationStore from '../../../utils/localStorageUtil';
import { useAuthContext } from '../../../context/AuthContext';
import { FormControlLabel, Checkbox, } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PDFPrint from "./PDFPrint";

import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
const steps = ['The Vehicle', 'The Warranty', 'Pricing', 'Customer Info', 'Summary & Save'];
const ADDURL = "./dealership/addDealershipWarranty";
const UPURL = "./dealership/updateDealershipWarranty";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function BuildWarranty() {
    const user = ApplicationStore().getStorage('userName');
    const dealership = ApplicationStore().getStorage('dealership');
    const omvic_no = ApplicationStore().getStorage('omvic_no');
    const accovmicno = ApplicationStore().getStorage('accovmicno');
    const commission = ApplicationStore().getStorage('commission');
    const userId = ApplicationStore().getStorage('salesrep');
    const { sidebarItemIndex, setSidebarItemIndex } = useAuthContext();
    const saveStatusRef = useRef(0);
    const navigate = useNavigate();
    const { state } = useLocation();
    const { data, type } = state || "";
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [oldUser, setOlduser] = useState("");
    const productRef = useRef("");
    const [id, setId] = useState("");

    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');

    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]);

    const [vinNoText, setVinNoText] = useState("");
    const [makeText, setMakeText] = useState('');
    const [modelText, setModelText] = useState('');
    const [yearText, setYearText] = useState('');
    const [odometerText, setOdometerText] = useState('');
    const [salePriceofVehicleText, setSalePriceofVehicleText] = useState('');
    const [comprehensiveFactoryWarrantyValidText, setComprehensiveFactoryWarrantyValidText] = useState("No");
    const [languageText, setLanguageText] = useState('None');
    const [serviceDateText, setServiceDateText] = useState('');

    const [warrantyClassText, setWarrantyClassText] = useState('');
    const [warrantyTypeText, setWarrantyTypeText] = useState('');
    const [warrantyProtectionText, setWarrantyProtectionText] = useState('');

    const [warrantyOptionText, setWarrantyOptionText] = useState('');
    const [warrantyOptionPriceText, setWarrantyOptionPriceText] = useState(0);
    const [highRatioCoverageText, setHighRatioCoverageText] = useState("0");
    const [highRatioCoveragePriceText, setHighRatioCoveragePriceText] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [deductibleText, setDeductibleText] = useState("0");
    const [deductiblePriceText, setDeductiblePriceText] = useState("0");

    const [customerFirstNameText, setCustomerFirstNameText] = useState('');
    const [customerLastNameText, setCustomerLastNameText] = useState('');
    const [streetAddressText, setStreetAddressText] = useState('');
    const [townText, setTownText] = useState('');
    const [provinceText, setProvinceText] = useState('');
    const [postalCodeText, setPostalCodeText] = useState('');
    const [customerPhoneText, setCustomerPhoneText] = useState('');
    const [customerEmailText, setCustomerEmailText] = useState('');
    const [driverLicenceText, setDriverLicenceText] = useState('');
    const [customerLanguageText, setCustomerLanguageText] = useState('');
    const [dealNotesText, setDealNotesText] = useState('');

    const [vinCustText, setVinCustText] = useState("");
    const [salePriceofVehicleCustText, setSalePriceofVehicleCustText] = useState("");
    const [financeCompanyText, setFinanceCompanyText] = useState("");
    const [vehicleDeliveryDateText, setVehicleDeliveryDateText] = useState("");
    const [warrantySoldForText, setWarrantySoldForText] = useState("");
    const [termsConditonChecked, setTermsConditionChecked] = useState(true)


    //The vehicle

    const [vinNo, setVinNo] = useState("");
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [odometer, setOdometer] = useState('');
    const [salePriceofVehicle, setSalePriceofVehicle] = useState('');
    const [comprehensiveFactoryWarrantyValid, setComprehensiveFactoryWarrantyValid] = useState("No");
    const [commercialVehicle, setCommercialVehicle] = useState("No");
    const [language, setLanguage] = useState('0');
    const [serviceDate, setServiceDate] = useState('');

    //The Warranty

    const [warrantyClass, setWarrantyClass] = useState('');
    const [warrantyType, setWarrantyType] = useState('');
    const [warrantyProtection, setWarrantyProtection] = useState('');

    //Pricing
    const [packages, setPackages] = useState(0);
    const [packagesText, setPackagesText] = useState("");
    const [packagesTypes, setPackagesType] = useState(0);
    const [productIndex, setProductIndex] = useState(0);
    const [productName, setProductName] = useState(0);
    const [productCost, setProductCost] = useState("");


    //The Warranty options

    const [warrantyOption, setWarrantyOption] = useState('');
    const [highRatioCoverage, setHighRatioCoverage] = useState("0");
    const [highRatioCoveragePrice, setHighRatioCoveragePrice] = useState(0);
    const [deductible, setDeductible] = useState("0");
    const [deductiblePrice, setDeductiblePrice] = useState("0");

    //The Customer Info

    const [customerFirstName, setCustomerFirstName] = useState('');
    const [customerLastName, setCustomerLastName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [town, setTown] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [driverLicence, setDriverLicence] = useState('');
    const [customerLanguage, setCustomerLanguage] = useState('');
    const [dealNotes, setDealNotes] = useState('');

    const [vinCust, setVinCust] = useState("");
    const [salePriceofVehicleCust, setSalePriceofVehicleCust] = useState("");
    const [financeCompany, setFinanceCompany] = useState("");
    const [vehicleDeliveryDate, setVehicleDeliveryDate] = useState("");
    const [warrantySoldFor, setWarrantySoldFor] = useState("");
    const [warrantyApplicationDate, setWarrantyApplicationDate] = useState('');


    const [warrantyProtectionList, setWarrantyProtectionList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setsubcategoryList] = useState([]);
    const [giftCardCredit, setGiftCardCredit] = useState(0);
    const [originalCost, setOriginalCost] = useState(0);

    const [errorText, setErrorText] = useState("");



    /** model open */
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = () => {
        setAlertopen(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertopen(false);
    };

    const carData = {
        BMW: ['X1', 'X3', 'X5', 'M4'],
        Audi: ['A3', 'A4', 'Q5', 'Q7'],
        Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLA'],
    };

    // Handle change for car selection
    const handleCarChange = (event, newvalue) => {
        console.log(newvalue);
        setMake(newvalue);
        setMakeText(newvalue);
        // var makeD = "BMW";
        loadModel(newvalue, model);
    };

    // Handle change for model selection
    const handleModelChange = (event) => {
        setModel(event.target.value);
        setModelText(event.target.value);
    };

    const handleEmailChange = (e) => {
        setCustomerEmail(e.target.value); setCustomerEmailText(e.target.value);
        const email = e.target.value;
        // Check if the email includes ".com"
        if (email) {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setErrorText(false); // Valid email
            } else {
                setErrorText(true); // Invalid email
            }
        }

    }

    const highRatioCoverageAmount = (event) => {
        if (event.target.value == "Yes") {
            setHighRatioCoveragePriceText(325);
            setHighRatioCoveragePrice(325);
        } else {
            setHighRatioCoveragePriceText(0);
            setHighRatioCoveragePrice(0);
        }
    };

    const warrantyOptionPrice = (event) => {
        if (event.target.value == "0") {
            setWarrantyOptionPriceText(0);
        } else if (event.target.value == "1") {
            setWarrantyOptionPriceText(45);
        } else if (event.target.value == "2") {
            setWarrantyOptionPriceText(80);
        } else if (event.target.value == "3") {
            setWarrantyOptionPriceText(115);
        } else if (event.target.value == "4") {
            setWarrantyOptionPriceText(135);
        } else if (event.target.value == "5") {
            setWarrantyOptionPriceText(165);
        }
    };

    useEffect(() => {
        loadMake("test");
        // Set the values from the data object
        if (type == "update") {
            console.log("update data" + JSON.stringify(data));
            loadModel(data.make, data.model);
            setOlduser(data.user);
            setId(data.id);
            setWarrantyApplicationDate(data.warrantyApplicationDate);
            setPackages(Number(data.packages));
            setPackagesType(Number(data.packagesTypes));
            setProductCost(data.productCost);
            setProductName(data.productName);
            setProductIndex(Number(data.productIndex));
            setPackagesText(data.packagesText);
            setCommercialVehicle(data.commercialVehicle);
            setVinNo(data.vinNo);
            setVinNoText(data.vinNoText);
            setMake(data.make);
            setMakeText(data.makeText);
            // setModel(data.model);
            setModelText(data.modelText);
            setYear(data.year);
            setYearText(data.yearText);
            setOdometer(data.odometer);
            setOdometerText(data.odometerText);
            setSalePriceofVehicle(data.salePriceofVehicle);
            setSalePriceofVehicleText(data.salePriceofVehicleText);

            setComprehensiveFactoryWarrantyValid(data.comprehensiveFactoryWarrantyValid);
            setComprehensiveFactoryWarrantyValidText(data.comprehensiveFactoryWarrantyValidText);
            setServiceDate(data.serviceDate);
            setServiceDateText(data.serviceDateText);
            if (data.warrantyClass) {
                loadSubCategory(data.warrantyClass);
                setWarrantyClass(data.warrantyClass);
            }

            if (data.warrantyClass) {
                loadwarrantyprotection(data.warrantyClass, data.warrantyType);
                setWarrantyClassText(data.warrantyClassText);
                setWarrantyType(data.warrantyType);
                setWarrantyTypeText(data.warrantyTypeText);
            }
            console.log("data wara" + data.warrantyProtection);

            if (data.warrantyProtection) {
                setWarrantyProtection(data.warrantyProtection);
                setWarrantyProtectionText(data.warrantyProtectionText);
                setWarrantyOptionPriceText(data.warrantyOptionPriceText);



                // const selectedwarrantyProtection = warrantyProtectionList.find(warrantyprotection => warrantyprotection.id === data.warrantyProtection);
                // setWarrantyProtectionText(selectedwarrantyProtection ? selectedwarrantyProtection.warrantyprotection : '');

                // // console.log("text two: " + selectedwarrantyProtection.warrantyprotection);
                // const URL = "./product/" + data.warrantyClass + "/getByCategory";
                // const response = axios.post(URL);
                // console.log("response"+ response);
                // if (response.data.success == 0) {
                //     // setPackagesLabel([]); // Keep dummy data in case of unauthorized response
                // } else {
                //     const responseData = response.data.data;
                //     var subCatType = warrantyTypeText + " " + selectedwarrantyProtection.warrantyprotection;
                //     // console.log("response data", subCatType);
                //     // console.log("response data 1234", responseData);
                //     const index = responseData.findIndex(item => item.subcategory === subCatType);
                //     setPackagesType(index);


                // }
            }

            setWarrantyOption(data.warrantyOption);
            setWarrantyOptionText(data.warrantyOptionText);
            setHighRatioCoverage(data.highRatioCoverage);
            setHighRatioCoverageText(data.highRatioCoverageText);
            setHighRatioCoveragePriceText(data.highRatioCoveragePriceText);
            setDeductible(data.deductible);
            setDeductibleText(data.deductibleText);

            setCustomerFirstName(data.customerFirstName);
            setCustomerFirstNameText(data.customerFirstNameText);
            setCustomerLastName(data.customerLastName);
            setCustomerLastNameText(data.customerLastNameText);
            setStreetAddress(data.streetAddress);
            setStreetAddressText(data.streetAddressText);
            setTown(data.town);
            setTownText(data.townText);
            setProvince(data.province);
            setProvinceText(data.provinceText);
            setPostalCode(data.postalCode);
            setPostalCodeText(data.postalCodeText);
            setCustomerPhone(data.customerPhone);
            setCustomerPhoneText(data.customerPhoneText);
            setCustomerEmail(data.customerEmail);
            setCustomerEmailText(data.customerEmailText);

            setDriverLicence(data.driverLicence);
            setDriverLicenceText(data.driverLicenceText);
            setCustomerLanguage(data.customerLanguage);
            setCustomerLanguageText(data.customerLanguageText);
            setDealNotes(data.dealNotes);
            setDealNotesText(data.dealNotesText);
            setVinCust(data.vinCust);
            setVinCustText(data.vinCustText);
            setSalePriceofVehicleCust(data.salePriceofVehicleCust);
            setSalePriceofVehicleCustText(data.salePriceofVehicleCustText);
            setFinanceCompany(data.financeCompany);
            setFinanceCompanyText(data.financeCompanyText);
            setVehicleDeliveryDate(data.vehicleDeliveryDate);
            setVehicleDeliveryDateText(data.vehicleDeliveryDateText);
            setWarrantySoldFor(data.warrantySoldFor);
            setWarrantySoldForText(data.warrantySoldForText);




        } else if (type == "recreate") {
            console.log("update data" + JSON.stringify(data));
            loadModel(data.make, data.model);
            setId("");
            setWarrantyApplicationDate(data.warrantyApplicationDate);
            setPackages(Number(data.packages));
            setPackagesType(Number(data.packagesTypes));
            setProductCost(data.productCost);
            setProductName(data.productName);
            setProductIndex(Number(data.productIndex));
            setPackagesText(data.packagesText);

            setVinNo(data.vinNo);
            setVinNoText(data.vinNoText);
            setMake(data.make);
            setMakeText(data.makeText);
            // setModel(data.model);
            setModelText(data.modelText);
            setYear(data.year);
            setYearText(data.yearText);
            setOdometer(data.odometer);
            setOdometerText(data.odometerText);
            setSalePriceofVehicle(data.salePriceofVehicle);
            setSalePriceofVehicleText(data.salePriceofVehicleText);
            setCommercialVehicle(data.commercialVehicle);
            setComprehensiveFactoryWarrantyValid(data.comprehensiveFactoryWarrantyValid);
            setComprehensiveFactoryWarrantyValidText(data.comprehensiveFactoryWarrantyValidText);
            setServiceDate(data.serviceDate);
            setServiceDateText(data.serviceDateText);
            if (data.warrantyClass) {
                loadSubCategory(data.warrantyClass);
                setWarrantyClass(data.warrantyClass);
            }

            if (data.warrantyClass) {
                loadwarrantyprotection(data.warrantyClass, data.warrantyType);
                setWarrantyClassText(data.warrantyClassText);
                setWarrantyType(data.warrantyType);
                setWarrantyTypeText(data.warrantyTypeText);
            }
            console.log("data wara" + data.warrantyProtection);

            if (data.warrantyProtection) {
                setWarrantyProtection(data.warrantyProtection);
                setWarrantyProtectionText(data.warrantyProtectionText);
                setWarrantyOptionPriceText(data.warrantyOptionPriceText);



                // const selectedwarrantyProtection = warrantyProtectionList.find(warrantyprotection => warrantyprotection.id === data.warrantyProtection);
                // setWarrantyProtectionText(selectedwarrantyProtection ? selectedwarrantyProtection.warrantyprotection : '');

                // // console.log("text two: " + selectedwarrantyProtection.warrantyprotection);
                // const URL = "./product/" + data.warrantyClass + "/getByCategory";
                // const response = axios.post(URL);
                // console.log("response"+ response);
                // if (response.data.success == 0) {
                //     // setPackagesLabel([]); // Keep dummy data in case of unauthorized response
                // } else {
                //     const responseData = response.data.data;
                //     var subCatType = warrantyTypeText + " " + selectedwarrantyProtection.warrantyprotection;
                //     // console.log("response data", subCatType);
                //     // console.log("response data 1234", responseData);
                //     const index = responseData.findIndex(item => item.subcategory === subCatType);
                //     setPackagesType(index);


                // }
            }

            setWarrantyOption(data.warrantyOption);
            setWarrantyOptionText(data.warrantyOptionText);
            setHighRatioCoverage(data.highRatioCoverage);
            setHighRatioCoverageText(data.highRatioCoverageText);
            setHighRatioCoveragePriceText(data.highRatioCoveragePriceText);
            setDeductible(data.deductible);
            setDeductibleText(data.deductibleText);

            setCustomerFirstName(data.customerFirstName);
            setCustomerFirstNameText(data.customerFirstNameText);
            setCustomerLastName(data.customerLastName);
            setCustomerLastNameText(data.customerLastNameText);
            setStreetAddress(data.streetAddress);
            setStreetAddressText(data.streetAddressText);
            setTown(data.town);
            setTownText(data.townText);
            setProvince(data.province);
            setProvinceText(data.provinceText);
            setPostalCode(data.postalCode);
            setPostalCodeText(data.postalCodeText);
            setCustomerPhone(data.customerPhone);
            setCustomerPhoneText(data.customerPhoneText);
            setCustomerEmail(data.customerEmail);
            setCustomerEmailText(data.customerEmailText);

            setDriverLicence(data.driverLicence);
            setDriverLicenceText(data.driverLicenceText);
            setCustomerLanguage(data.customerLanguage);
            setCustomerLanguageText(data.customerLanguageText);
            setDealNotes(data.dealNotes);
            setDealNotesText(data.dealNotesText);
            setVinCust(data.vinCust);
            setVinCustText(data.vinCustText);
            setSalePriceofVehicleCust(data.salePriceofVehicleCust);
            setSalePriceofVehicleCustText(data.salePriceofVehicleCustText);
            setFinanceCompany(data.financeCompany);
            setFinanceCompanyText(data.financeCompanyText);
            setVehicleDeliveryDate(data.vehicleDeliveryDate);
            setVehicleDeliveryDateText(data.vehicleDeliveryDateText);
            setWarrantySoldFor(data.warrantySoldFor);
            setWarrantySoldForText(data.warrantySoldForText);




        } else {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const dd = String(today.getDate()).padStart(2, '0');

            const formattedDate = `${yyyy}-${mm}-${dd}`;
            setWarrantyApplicationDate(formattedDate);
            setActiveStep(0);
            setPackages(0);
            setPackagesType(0);
            setProductCost("");
            setProductName("");
            setProductIndex(0);

            setVinNo("");
            setVinNoText("");
            setMake("");
            setMakeText("");
            setModel("");
            setModelText("");
            setYear("");
            setYearText("");
            setOdometer("");
            setOdometerText("");
            setSalePriceofVehicle("");
            setSalePriceofVehicleText("");
            setCommercialVehicle("No");
            setComprehensiveFactoryWarrantyValid(false);
            setComprehensiveFactoryWarrantyValidText("");
            setServiceDate("");
            setServiceDateText("");

            setWarrantyClass("");
            setWarrantyClassText("");
            setWarrantyType("");
            setWarrantyTypeText("");
            setWarrantyProtection("");
            setWarrantyProtectionText("");

            setWarrantyOption("");
            setWarrantyOptionText("");
            setHighRatioCoverage("");
            setHighRatioCoverageText("");
            setDeductible("");
            setDeductibleText("");

            setCustomerFirstName("");
            setCustomerFirstNameText("");
            setCustomerLastName("");
            setCustomerLastNameText("");
            setStreetAddress("");
            setStreetAddressText("");
            setTown("");
            setTownText("");
            setProvince("");
            setProvinceText("");
            setPostalCode("");
            setPostalCodeText("");
            setCustomerPhone("");
            setCustomerPhoneText("");
            setCustomerEmail("");
            setCustomerEmailText("");

            setDriverLicence("");
            setDriverLicenceText("");
            setCustomerLanguage("");
            setCustomerLanguageText("");
            setDealNotes("");
            setDealNotesText("");

            setVinCust("");
            setVinCustText("");
            setSalePriceofVehicleCust("");
            setSalePriceofVehicleCustText("");
            setFinanceCompany("");
            setFinanceCompanyText("");
            setVehicleDeliveryDate("");
            setVehicleDeliveryDateText("");
            setWarrantySoldFor("");
            setWarrantySoldForText("");
        }
        loadCategory();

    }, [data, type]);


    const loadCategory = async (e) => {
        try {
            const URL = "./category";
            const response = await axios.get(URL);

            if (response.data.status === 401) {
                setCategoryList([]); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                // const dataWithIndex = response.data.data.map((item, index) => ({
                //     ...item,
                //     slNo: index + 1, // Assign sequential SL No starting from 1
                // })) || "";
                setCategoryList(responseData);
                // console.log("category data" + response.data.data);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setCategoryList('');
        }
    };

    const loadSubCategory = async (id) => {
        try {
            const URL = "./category/getsubcategorybycat";
            const response = await axios.post(URL, { id: id });

            if (response.data.status === 401) {
                setsubcategoryList([]); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                // const dataWithIndex = response.data.data.map((item, index) => ({
                //     ...item,
                //     slNo: index + 1, // Assign sequential SL No starting from 1
                // })) || "";
                setsubcategoryList(responseData);
                // console.log("category data" + response.data.data);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setsubcategoryList([]);
        }
    };

    const loadwarrantyprotection = async (category, subcategory) => {
        try {
            const URL = "./category/getwarrantyprobycatsubcat";
            const response = await axios.post(URL, { category: category, subcategory: subcategory });

            if (response.data.status === 401) {
                setWarrantyProtectionList([]); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                // const dataWithIndex = response.data.data.map((item, index) => ({
                //     ...item,
                //     slNo: index + 1, // Assign sequential SL No starting from 1
                // })) || "";
                setWarrantyProtectionList(responseData);
                // console.log("category data" + response.data.data);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setWarrantyProtectionList([]);
        }
    };

    const loadMake = async (make) => {
        try {
            const response = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json");
            const data = response;
            // console.log("data before", data.data.Results.length);
            if (data.data.Results && data.data.Results.length) {
                // Extract `Make_Name` and push into array
                const makeNamesArray = data.data.Results
                    .filter(item => item.Make_Name && item.Make_Name.trim() !== "")
                    // .slice(0, 1500)  // Limit to 10 items
                    .map(item => item.Make_Name);
                // Update the state with the array
                setVehicleMakes(makeNamesArray);
                // var makeD = "BMW";
                // loadModel(makeD);
                // console.log('No data found for this VIN.',makeNamesArray);
            } else {
                // console.log('No data found for this VIN.');
            }

        } catch (err) {
            // if (!err?.response) {
            //     console.log("No server response");
            // } else {
            //     console.log(err?.response.data);
            // }
        }
    };

    const loadMakeModels = async (vinNoText) => {
        try {
            const response = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/" + vinNoText + "?format=json");
            const data = response;
            // console.log("data before", data.data.Results.length);
            if (data.data.Results && data.data.Results.length > 0) {
                // Extract `Make_Name` and push into array
                console.log("data vin", data.data.Results[0]);
                setMake(data.data.Results[0].Make);

                // setVehicleMakes(makeNamesArray);
                // var makeD = "BMW";
                loadModel(data.data.Results[0].Make, data.data.Results[0].Model);
                setYear(data.data.Results[0].ModelYear);
                // console.log('No data found for this VIN.',makeNamesArray);
            } else {
                // console.log('No data found for this VIN.');
            }

        } catch (err) {
            // if (!err?.response) {
            //     console.log("No server response");
            // } else {
            //     console.log(err?.response.data);
            // }
        }
    };

    const loadModel = async (make, model) => {
        try {
            const response = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/" + make + "?format=json");
            const data = response;
            console.log("data before", data.data.Results.length);
            if (data.data.Results && data.data.Results.length > 0) {
                // Extract `Make_Name` and push into array
                const modelsNamesArray = data.data.Results
                    .filter(item => item.Model_Name && item.Model_Name.trim() !== "")
                    // .slice(0, 1500)  // Limit to 10 items
                    .map(item => item.Model_Name);
                // Update the state with the array
                setVehicleModels(modelsNamesArray);
                setModel(model);
                console.log('No data found for this Models.', modelsNamesArray);
            } else {
                console.log('No data found for this VIN.');
                setVehicleModels([]);
            }
            // setDataList(response.data.data || '');
        } catch (err) {
            // if (!err?.response) {
            //     console.log("No server response");
            // } else {
            //     console.log(err?.response.data);
            // }
        }
    };


    const data1 = {
        "packages": 4,
        "packagesTypes": 0,
        "productIndex": 2,
        "productCost": "519",
        "productName": "GAP Financial Protection Bundle - Max Liability: $75,000 - Financed Amt: $0 - $75,000 (96 Months/unlimted)",
        "vinNo": "2589",
        "vinNoText": "2589",
        "make": "BMW",
        "makeText": "BMW",
        "model": "X1",
        "modelText": "X1",
        "year": 1998,
        "yearText": 1998,
        "odometer": "25000",
        "odometerText": "25000",
        "salePriceofVehicle": "5222",
        "salePriceofVehicleText": "5222",
        "comprehensiveFactoryWarrantyValid": "Yes",
        "comprehensiveFactoryWarrantyValidText": "Yes",
        "serviceDate": "2024-10-01",
        "serviceDateText": "2024-10-01",
        "warrantyClass": "Essential GCC",
        "warrantyClassText": "Essential GCC",
        "warrantyType": "Interior Shield",
        "warrantyTypeText": "Interior Shield",
        "warrantyProtection": "Extended",
        "warrantyProtectionText": "Extended",
        "warrantyOption": "1",
        "warrantyOptionText": "1",
        "highRatioCoverage": "Yes",
        "highRatioCoverageText": "Yes",
        "deductible": "$0 Deductible",
        "deductibleText": "$0 Deductible",
        "customerFirstName": "Manoj",
        "customerFirstNameText": "Manoj",
        "customerLastName": "Nayak",
        "customerLastNameText": "Nayak",
        "streetAddress": "kodila",
        "streetAddressText": "kodila",
        "town": "mangalore",
        "townText": "mangalore",
        "province": "British Columbia",
        "provinceText": "British Columbia",
        "postalCode": "857485",
        "postalCodeText": "857485",
        "customerPhone": "8574859685",
        "customerPhoneText": "8574859685",
        "customerEmail": "Abhi@gmail.com",
        "customerEmailText": "Abhi@gmail.com",
        "driverLicence": "78596",
        "driverLicenceText": "78596",
        "customerLanguage": "Francais",
        "customerLanguageText": "Francais",
        "dealNotes": "89655",
        "dealNotesText": "89655",
        "vinCust": "",
        "vinCustText": "",
        "salePriceofVehicleCust": "5222",
        "salePriceofVehicleCustText": "5222",
        "financeCompany": "mangalore",
        "financeCompanyText": "mangalore",
        "vehicleDeliveryDate": "2024-10-01",
        "vehicleDeliveryDateText": "2024-10-01",
        "warrantySoldFor": "966666666666666",
        "warrantySoldForText": "966666666666666"
    };

    const data2 =
    {
        "packages": 4, "packagesTypes": 0, "productIndex": 3, "productCost": "519", "productName": "GAP Financial Protection Bundle - Max Liability: $75,000 - Financed Amt: $0 - $75,000 (96 Months/unlimted)",
        "vinNo": "258888888888", "vinNoText": "258888888888", "make": "Mercedes", "makeText": "Mercedes", "model": "C-Class", "modelText": "C-Class", "year": 2000, "yearText": 2000, "odometer": "25000", "odometerText": "25000", "salePriceofVehicle": "5222", "salePriceofVehicleText": "5222", "comprehensiveFactoryWarrantyValid": "No", "comprehensiveFactoryWarrantyValidText": "No", "serviceDate": "2024-10-01", "serviceDateText": "2024-10-01", "warrantyClass": "Appearnce Packages", "warrantyClassText": "Appearnce Packages", "warrantyType": "Rust Shield", "warrantyTypeText": "Rust Shield", "warrantyProtection": "Extended", "warrantyProtectionText": "Extended", "warrantyOption": "1", "warrantyOptionText": "1", "highRatioCoverage": "Yes", "highRatioCoverageText": "Yes", "deductible": "$0 Deductible", "deductibleText": "$0 Deductible", "customerFirstName": "Arun", "customerFirstNameText": "Arun", "language": "0", "languageText": "None", "customerLastName": "Nayak", "customerLastNameText": "Nayak", "streetAddress": "mysore", "streetAddressText": "mysore", "town": "mangalore", "townText": "mangalore", "province": "British Columbia", "provinceText": "British Columbia", "postalCode": "857485", "postalCodeText": "857485", "customerPhone": "89685748596", "customerPhoneText": "89685748596", "customerEmail": "arun@gmail.com", "customerEmailText": "arun@gmail.com", "driverLicence": "87458596", "driverLicenceText": "87458596", "customerLanguage": "Francais", "customerLanguageText": "Francais", "dealNotes": "87458555", "dealNotesText": "87458555", "vinCust": "258888888888", "vinCustText": "258888888888", "salePriceofVehicleCust": "5222", "salePriceofVehicleCustText": "5222", "financeCompany": "mangalore", "financeCompanyText": "mangalore", "vehicleDeliveryDate": "2024-10-02", "vehicleDeliveryDateText": "2024-10-02", "warrantySoldFor": "966666666666666", "warrantySoldForText": "966666666666666"
    }



    const handleClickOpen = () => {
        setOpen(true);
        setTotalCost(Number(warrantyOptionPriceText) + Number(highRatioCoveragePriceText) + Number(productCost));
    };

    const handleCloseModel = () => {
        setOpen(false);

    };

    const handleCheck = () => {
        setTermsConditionChecked(!termsConditonChecked);
    };

    /** model close */


    const isStepOptional = (step) => {
        // return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        const productName = productRef.current;

        if (activeStep == 0) {


            if (make == "") {
                validateField("Please Select Make");
                return false;
            }

            if (model == "") {
                validateField("Please Select Model");
                return false;
            }

            if (year == "") {
                validateField("Please Select Year");
                return false;
            }

            if (odometer == "") {
                validateField("Please Enter Odometer");
                return false;
            }

            if (salePriceofVehicle == "") {
                validateField("Please Enter Sale Price of Vehicle");
                return false;
            }

            if (comprehensiveFactoryWarrantyValid == "") {
                validateField("Please Select Comprehensive Factory Warranty Validity");
                return false;
            }

            if (comprehensiveFactoryWarrantyValid == "Yes" && serviceDate == "") {
                validateField("Please Enter Service Date");
                return false;
            }

        }

        if (activeStep == 1) {

            if (warrantyClass == "") {
                validateField("Please Select Warranty Class");
                return false;
            }
            if (warrantyType == "") {
                validateField("Please Select Warranty Type");
                return false;
            }
            if (warrantyProtection == "") {
                validateField("Please Select Warranty Protection");
                return false;
            }
        }

        if (activeStep == 2) {

            if (productName === "") {
                validateField("Please Select Product");
                return false;
            } else if (productName.toLowerCase().includes("unlimited") && parseInt(odometer) > 200000) {
                alert("Unlimted Product cannot be selected!")
                return false;
            }

            console.log("Gift card" + giftCardCredit);
        }

        // if (activeStep == 3) {
        //     // warrantyOption,highRatioCoverage,deductible

        //     if (warrantyOption == "") {
        //         validateField("Please select the warranty Option");
        //         return false;
        //     }

        //     if (highRatioCoverage == "") {
        //         validateField("Please select the High ratio coverage");
        //         return false;
        //     }

        //     if (deductible == "") {
        //         validateField("Please select the deductible");
        //         return false;
        //     }
        // }

        if (activeStep == 3) {
            // warrantyOption,highRatioCoverage,deductible

            if (!customerFirstName) {
                validateField("Please enter the customer's first name");
                return false;
            }
            if (!customerLastName) {
                validateField("Please enter the customer's last name");
                return false;
            }
            if (!streetAddress) {
                validateField("Please enter the street address");
                return false;
            }
            if (!town) {
                validateField("Please enter the town");
                return false;
            }
            if (!province) {
                validateField("Please select the province");
                return false;
            }
            if (!postalCode) {
                validateField("Please enter the postal code");
                return false;
            }
            if (!customerPhone) {
                validateField("Please enter the customer's phone number");
                return false;
            }
            if (!customerEmail) {
                validateField("Please enter the customer's email address");
                return false;
            }
            if (!driverLicence) {
                validateField("Please enter the driver's license number");
                return false;
            }
            if (!customerLanguage) {
                validateField("Please select the customer's language");
                return false;
            }
            // if (!dealNotes) {
            //     validateField("Please add deal notes");
            //     return false;
            // }
            if (!salePriceofVehicleCust) {
                validateField("Please enter the sale price of the vehicle");
                return false;
            }

            if (!vinCust) {
                validateField("Please enter the Vin Number");
                return false;
            }
            if (!financeCompany) {
                validateField("Please enter the finance company");
                return false;
            }
            if (!vehicleDeliveryDate) {
                validateField("Please enter the vehicle delivery date");
                return false;
            }
            if (!warrantySoldFor) {
                validateField("Please enter the warranty sold");
                return false;
            }


            // if (!warrantyOption) {
            //     validateField("Please select the warranty option");
            //     return false;
            // }
            // if (!highRatioCoverage) {
            //     validateField("Please select the high ratio coverage");
            //     return false;
            // }
            // if (!warrantySoldFor) {
            //     validateField("Please enter the warranty sold price");
            //     return false;
            // }
        }



        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const validateField = (error) => {
        setSeverity("error");
        setMessage(error);
        setAlertopen(true);
        setTimeout(() => {
            setAlertopen(false);
        }, 2000);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        setLanguageText(event.target.value);
        setCustomerLanguage(event.target.value);
        setCustomerLanguageText(event.target.value);
    };

    const warrantyOptions = {
        Gold: [
            { value: "Gold Core", label: "Gold Core" },
            { value: "Gold Elite", label: "Gold Elite" },
            { value: "Gold Elite Hi-Tech", label: "Gold Elite Hi-Tech" },
        ],
        Silver: [
            { value: "Silver Powertrain", label: "Silver Powertrain" },
            { value: "Silver Powertrain PLUS", label: "Silver Powertrain PLUS" },
        ],
        Bronze: [
            { value: "Bronze Powertrain", label: "Bronze Powertrain" },
            { value: "Bronze Powertrain PLUS", label: "Bronze Powertrain PLUS" },
        ],
    };

    const warrantyProtections = {
        'Gold Core': [
            { value: "$2500 Per Claim", label: "$2500 Per Claim" },
            { value: "No Per Claim Max", label: "No Per Claim Max" }
        ],
        'Gold Elite': [
            { value: "$2500 Per Claim", label: "$2500 Per Claim" },
            { value: "No Per Claim Max", label: "No Per Claim Max" }
        ],
        'Gold Elite Hi-Tech': [
            { value: "$2500 Per Claim", label: "$2500 Per Claim" },
            { value: "No Per Claim Max", label: "No Per Claim Max" }
        ],
        'Silver Powertrain': [
            { value: "$1000 Per Claim", label: "$1000 Per Claim" },
            { value: "$1500 Per Claim", label: "$1500 Per Claim" },
            { value: "$2500 Per Claim", label: "$2500 Per Claim" },
        ],
        'Silver Powertrain PLUS': [
            { value: "$4000 Per Claim", label: "$4000 Per Claim" },
            { value: "$2500 Per Claim", label: "$2500 Per Claim" }
        ],
        'Bronze Powertrain': [
            { value: "$1000 Per Claim", label: "$1000 Per Claim" },
            { value: "$1500 Per Claim", label: "$1500 Per Claim" }
        ],
        'Bronze Powertrain PLUS': [
            { value: "$1000 Per Claim", label: "$1000 Per Claim" },
            { value: "$1500 Per Claim", label: "$1500 Per Claim" }
        ],
    };


    const warrantyTypeClass = {
        'Gold Core/$2500 Per Claim': 0,
        'Gold Core/No Per Claim Max': 1,
        'Gold Elite/$2500 Per Claim': 2,
        'Gold Elite/No Per Claim Max': 3,
        'Gold Elite Hi-Tech/$2500 Per Claim': 4,
        'Gold Elite Hi-Tech/No Per Claim Max': 5,
        'Silver Powertrain/$1000 Per Claim': 0,
        'Silver Powertrain/$1500 Per Claim': 1,
        'Silver Powertrain/$2500 Per Claim': 2,
        'Silver Powertrain PLUS/$4000 Per Claim': 3,
        'Silver Powertrain PLUS/$2500 Per Claim': 4,
        'Bronze Powertrain/$1000 Per Claim': 0,
        'Bronze Powertrain/$1500 Per Claim': 1,
        'Bronze Powertrain PLUS/$1000 Per Claim': 2,
        'Bronze Powertrain PLUS/$1500 Per Claim': 3,

    }

    const handleWarrantyChange = (e) => {

        var value = e.target.value;
        if (value) {
            const selectedIndex = categoryList.findIndex(category => category.id === value);
            setPackages(selectedIndex);
            loadSubCategory(e.target.value);
            setWarrantyClass(e.target.value);
            const selectedValue = e.target.value;
            // Find the selected warranty protection by its id
            const selectedSubCategory = categoryList.find(category => category.id === selectedValue);
            console.log("data category " + selectedSubCategory.categoryName);
            setWarrantyClassText(selectedSubCategory.categoryName);
        }


    }

    const fetchWarrantyProtection = async (e) => {
        const selectedValue = e.target.value;
        if (selectedValue) {
            const selectedSubCategory = subcategoryList.find(subcategory => subcategory.id === selectedValue);
            // console.log("data SUBcategory "+selectedSubCategory.subcategory);
            setWarrantyTypeText(selectedSubCategory.subcategory);
            loadwarrantyprotection(warrantyClass, e.target.value);
        }

    }

    const handleWarrantyProtectionChange = async (e) => {
        const selectedValue = e.target.value;
        if (selectedValue) {
            const selectedwarrantyProtection = warrantyProtectionList.find(warrantyprotection => warrantyprotection.id === selectedValue);
            setWarrantyProtectionText(selectedwarrantyProtection ? selectedwarrantyProtection.warrantyprotection : '');

            console.log("text two: " + selectedwarrantyProtection.warrantyprotection);
            const URL = "./product/" + warrantyClass + "/getByCategory";
            const response = await axios.post(URL);
            if (response.data.status === 401) {
                // setPackagesLabel([]); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                var subCatType = warrantyTypeText + " " + selectedwarrantyProtection.warrantyprotection;
                console.log("response data", subCatType);
                console.log("response data 1234", responseData);
                const index = responseData.findIndex(item => item.subcategory === subCatType);

                setPackagesType(index);
            }
        }

        // var wrtType = warrantyType + "/" + e.target.value;
        // // console.log("wrtType"+wrtType);
        // console.log("index" + warrantyTypeClass[wrtType]);
        // setPackagesType(warrantyTypeClass[wrtType]);


    }

    const warrantyTypeOptions = warrantyOptions[warrantyClass] || [];
    const warrantyProtectionsTypes = warrantyProtections[warrantyType] || [];

    const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
        console.log("helo");
        try {
            const response = await axios.post(mainURL, data);
            if (saveStatusRef.current === 1) {
                if (type == "update") {
                    generatePdf(data, data.id);
                } else {
                    generatePdf(data, response.data.data.results.insertId);
                }

            } else {
                if (type == "update") {
                    generateInvoicePdf(data, response.data.data.invCount, response.data.data.merchantno, data.id);
                } else {
                    generateInvoicePdf(data, response.data.data.invCount, response.data.data.merchantno, response.data.data.results.insertId);
                }

            }

            return handleSuccess(response.data);

        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
            } else {
                return handleException(err?.response.data);
            }
        }
    };



    const getVinDetails = async (e) => {
        const data2 = { vinNo, vinNoText, make, makeText, model, modelText, year, yearText, odometer, odometerText, salePriceofVehicle, salePriceofVehicleText, comprehensiveFactoryWarrantyValid, comprehensiveFactoryWarrantyValidText, serviceDate, serviceDateText, warrantyClass, warrantyClassText, warrantyType, warrantyTypeText, warrantyProtection, warrantyProtectionText, warrantyOption, warrantyOptionText, highRatioCoverage, highRatioCoverageText, deductible, deductibleText, customerFirstName, customerFirstNameText, language, languageText, customerLastName, customerLastNameText, streetAddress, streetAddressText, town, townText, province, provinceText, postalCode, postalCodeText, customerPhone, customerPhoneText, customerEmail, customerEmailText, driverLicence, driverLicenceText, customerLanguage, customerLanguageText, dealNotes, dealNotesText, vinCust, vinCustText, salePriceofVehicleCust, salePriceofVehicleCustText, financeCompany, financeCompanyText, vehicleDeliveryDate, vehicleDeliveryDateText, warrantySoldFor, warrantySoldForText, packages, packagesTypes, productIndex, productCost, packagesText, productName };

        loadMakeModels(vinNoText);
    }

    const ClosedWon = async (e) => {
        saveStatusRef.current = 2;
        const data = { id, commercialVehicle, giftCardCredit, originalCost, warrantyApplicationDate, user, oldUser, useromvicno: omvic_no, dealership, highRatioCoveragePriceText, warrantyOptionPriceText, vinNo, vinNoText, make, makeText, model, modelText, year, yearText, odometer, odometerText, salePriceofVehicle, salePriceofVehicleText, comprehensiveFactoryWarrantyValid, comprehensiveFactoryWarrantyValidText, serviceDate, serviceDateText, warrantyClass, warrantyClassText, warrantyType, warrantyTypeText, warrantyProtection, warrantyProtectionText, warrantyOption, warrantyOptionText, highRatioCoverage, highRatioCoverageText, deductible, deductibleText, customerFirstName, customerFirstNameText, language, languageText, customerLastName, customerLastNameText, streetAddress, streetAddressText, town, townText, province, provinceText, postalCode, postalCodeText, customerPhone, customerPhoneText, customerEmail, customerEmailText, driverLicence, driverLicenceText, customerLanguage, customerLanguageText, dealNotes, dealNotesText, vinCust, vinCustText, salePriceofVehicleCust, salePriceofVehicleCustText, financeCompany, financeCompanyText, vehicleDeliveryDate, vehicleDeliveryDateText, warrantySoldFor, warrantySoldForText, packages, packagesTypes, productIndex, productCost, packagesText, productName, Status: "Closed Won", commission, userId };
        // generateInvoicePdf(data);
        if (!termsConditonChecked) {
            alert("Please tick the terms & conditions")
        } else {
            if (id == "") {
                const mainURL = ADDURL;
                serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
            } else {
                const mainURL = UPURL;
                console.log("url", mainURL);
                serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
            }
        }

    }

    const convertImageToBase64 = async () => {
        // Make sure the image path is relative to the public folder
        const response = await fetch(`${process.env.PUBLIC_URL}/carCanadaLogo.png`);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(blob);
        });
    };
    const generatePdfOld = async (data, applicationId) => {
        console.log("data" + JSON.stringify(data));
        const LOGO = await convertImageToBase64();

        // Render the PDFPrint component as static HTML
        // const componentHtml = ReactDOMServer.renderToStaticMarkup(<PDFPrintNew />);

        // Convert the HTML content to pdfMake format
        // const pdfContent = htmlToPdfmake(componentHtml, { window });

        // Create the PDF document definition using the converted content

        const text = data.productName;

        let dealershipaddress = ""

        // Extract the values using regex

        console.log("222222220" + data.dealership);
        var tradeName = "";
        var billingStreet = "";
        var billingCity = "";
        var billingCountry = "";
        var billingZippostalCode = "";
        var ovmic_no = "";
        var accountPhone = "";
        var acc_ovmic_no = "";

        try {
            const response = await axios.get("dealership/" + data.dealership + "/fetch");

            if (response.data.success === 500) {
                console.error("Server error: Failed to fetch dealership data.");
                // Handle the error appropriately, e.g., show an alert or return early
                return;
            }

            const responseData = response.data.data;
            if (responseData) {
                const dealershipaddress = JSON.stringify(responseData[0]); // Converts object to string
                const dealershipData = JSON.parse(dealershipaddress); // Parse it back to an object

                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.tradeName) tradeName = dealershipData.tradeName;
                if (dealershipData?.billingStreet) billingStreet = dealershipData.billingStreet;
                if (dealershipData?.billingCity) billingCity = dealershipData.billingCity;
                if (dealershipData?.billingCountry) billingCountry = dealershipData.billingCountry;
                if (dealershipData?.billingZippostalCode) billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.ovmic_no) ovmic_no = dealershipData.ovmic_no;
                if (dealershipData?.accountPhone) accountPhone = dealershipData.accountPhone;
                if (dealershipData?.acc_ovmic_no) acc_ovmic_no = dealershipData.acc_ovmic_no;

                console.log(tradeName, billingStreet, billingCity, billingCountry, billingZippostalCode, ovmic_no, accountPhone);
            }
        } catch (error) {
            console.error("An error occurred while fetching dealership data:", error);
        }

        // let warrantySold = parseFloat(data.salePriceofVehicleText).toFixed(2);

        let warrantySold = parseFloat(data.salePriceofVehicle.replace(/,/g, '')).toFixed(2);
        let kilometers = "";
        let customerNM = data.customerFirstNameText + " " + data.customerLastNameText;
        let user = data.user.split("@");
        const monthsMatch = text.match(/\((\d+)\s*months/i);
        let Months = monthsMatch ? parseInt(monthsMatch[1], 10) + " Months" : "-";

        const inserviceDate = new Date(data.serviceDateText);
        const formattedDatefmt = inserviceDate.toLocaleDateString("en-CA", { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'America/Toronto' });

        const vehicleDeliveryDate = new Date(data.vehicleDeliveryDate);
        const vehicleDeliveryDatefmt = vehicleDeliveryDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: '2-digit' });

        // Extract Kilometers
        if (text.includes("/")) {
            let kmMatch = text.split("/");
            if (kmMatch.length > 1) {
                kilometers = kmMatch[1].split(")")[0].trim();
            }
        }

        let applicationtitle = "";

        if (data.warrantyClass == 6) {
            applicationtitle = "Application for GAP Insurance";
        } else {
            applicationtitle = "Application for Warranty Coverage";
        }


        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [20, 20, 20, 20],
            content: [
                // First Table
                {
                    table: {
                        widths: ['50%', '50%'], // Set the width for each column
                        body: [
                            [
                                {
                                    image: LOGO, // Use the 'image' key for the logo
                                    rowSpan: 6,
                                    fit: [150, 150], // Adjust size as needed
                                    border: [false, false, false, false]
                                },
                                { text: `Application ID: ${applicationId}`, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }
                            ],
                            ['', { text: `Warranty Status: ${data.Status}`, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }],
                            ['', { text: `Warranty Price: $${parseFloat(data.warrantySoldFor).toFixed(2)}`, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }],
                            ['', { text: ``, border: [false, false, false, false] }],
                            ['', { text: ``, border: [false, false, false, false] }],
                            [
                                { text: 'Application for GAP Bundle Warranty Coverage', rowSpan: 3, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true },
                                { text: `25 Sheppard Avenue West, Suite 300, North York, Ontario, M2N 6S6, Phone: 905.291.2940`, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }
                            ],

                            [{ text: 'Get Covered Canada', border: [false, false, false, false], fontSize: 10, bold: true }, { text: 'claims@getcoveredcanada.com', border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }],
                            [{ text: `${applicationtitle}`, border: [false, false, false, false], fontSize: 10, bold: true }, { text: 'www.getcoveredcanada.com', border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }]
                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: 'Customer Details', border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },
                // { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: '', border: [false, false, false, true], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },
                {
                    table: {
                        widths: ['20%', '30%', '20%', '30%'], // Adjust the column widths for this table
                        body: [
                            // [
                            //     { text: 'Customer details', border: [false, false, false, false],fontSize: 10, bold: true },
                            //     { text: '', border: [false, false, false, false] },
                            //     { text: '', border: [false, false, false, false] },
                            //     { text: '', border: [false, false, false, false] },
                            // ],
                            [
                                { text: `Customer First Name:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.customerFirstNameText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Address: `, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.streetAddressText}\n ${data.townText},  ${data.provinceText},  ${data.postalCodeText}`, border: [false, false, false, false], fontSize: 8, bold: false, alignment: "left" }
                            ],
                            [
                                { text: `Customer Last Name:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.customerLastNameText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],
                            [
                                { text: `Drivers Licence:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.driverLicenceText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Email:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.customerEmailText}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],
                            [
                                { text: `Phone:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.customerPhoneText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],


                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables  townText. provinceText. postalCodeText
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: 'Vehicle Details', border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },
                // { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: '', border: [false, false, false, true], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },

                // Second Table
                {
                    table: {
                        widths: ['20%', '30%', '20%', '30%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: `Year:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.year}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Sale Price:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `$ ${warrantySold}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],
                            [
                                { text: `Make:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.make}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],

                            [
                                { text: `Model:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.model}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Vehicle Delivery Date:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${vehicleDeliveryDatefmt == "Invalid Date" ? "" : vehicleDeliveryDatefmt}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],

                            [
                                { text: `VIN:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.vinNoText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `In Service Date:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${formattedDatefmt == "Invalid Date" ? "" : formattedDatefmt}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],

                            [
                                { text: `Odometer:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.odometerText} KM`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Finance Company:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.financeCompanyText}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],

                        ]
                    }
                },

                { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: 'Warranty Details', border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },
                // { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: '', border: [false, false, false, true], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },


                // Second Table
                {
                    table: {
                        widths: ['20%', '30%', '20%', '30%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: `Warranty Plan:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.productName}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Deductible:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.deductible}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],
                            [
                                { text: `Max Protection:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.warrantyProtectionText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Roadside:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `None`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],

                            [
                                { text: `Warranty Length:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${Months}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],

                            [
                                { text: `Coverage:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${kilometers}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],





                        ]
                    }
                },

                { text: '\n' }, // Add spacing between the tables

                {
                    text: 'Terms', // Heading
                    style: { fontSize: 10, bold: true, margin: [0, 10, 0, 10] }, // Style for the heading
                },


                {
                    text: [
                        { fontSize: 8, text: '• I, the Buyer, have read, selected, understand, and accept the terms and conditions of the Warranty Application and the Warranty Policy as outlined in the following pages and have retained a copy of the application and acknowledge that the selling dealer has made no representation outside the Terms and Conditions.\n', margin: [0, 5] },
                        { fontSize: 8, text: '• I, understand and agree that is my obligation to maintain the vehicle according to the manufacturers guidelines, including changing engine oil and filters and monitoring and changing other fluids according to the manufacturers guidelines, and section 3 of this agreement.\n', margin: [0, 5] },
                        { fontSize: 8, text: '• I understand any abuse misuse or neglect of my vehicle may lead to my claims denied. I, understand that I must keep maintenance records and receipts of the maintenance performed as I may be asked to submit these records if a claim is submitted to Get Covered Canada.\n', margin: [0, 5] },
                        { fontSize: 8, text: '• I, understand that maintenance must be performed by licensed mechanic or maintenance shops. Do-it-yourself oil changes are not accepted\n', margin: [0, 5] },
                        { fontSize: 8, text: '• I, understand repairs made to covered components without prior authorization by Get Covered Canada will not be reimbursed. \n', margin: [0, 5] },
                        { fontSize: 8, text: '• I hereby certify that all of the information set out herein is true and accurate, I am applying for coverage at the time of the vehicle purchase or prior to the expiration of an existing full manufacturers warranty and the vehicle is in proper operating condition at the date of the application. Misleading or False Information will void warranty coverage. \n', margin: [0, 5] }
                    ],
                    border: [true, true, true, true]
                },
                { text: '\n' }, // Add spacing between the tables

                {
                    table: {
                        widths: ['25%', '5%', '70%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: `Applicant's Signature:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Salesperson's Signature:`, border: [false, false, false, false], fontSize: 8, bold: false },

                            ],
                            [
                                { text: `X`, border: [false, false, false, true], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `X`, border: [false, false, false, true], fontSize: 8, bold: false },

                            ],


                        ]
                    }
                },
                {
                    table: {
                        widths: ['30%', '40%', '30%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: `Customer Name:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `Salesperson:`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Salesperson #:${data.useromvicno}`, border: [false, false, false, false], fontSize: 8, bold: false },

                            ],
                            [
                                { text: `${customerNM}`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${user[0].toUpperCase()}`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: false },
                            ],


                        ]
                    }
                },
                {
                    table: {
                        widths: ['30%', '70%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `I, the representative of the selling Dealer, certify that the named used vehicle is mechanically fit`, border: [false, false, false, false], fontSize: 8, bold: true },

                            ],


                        ]
                    }
                },
                {
                    table: {
                        widths: ['30%', '40%', '30%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },

                                // { text: `${tradeName} \n ${billingStreet} \n ${billingCity} \n ${billingCountry} \n  ${billingZippostalCode}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `${tradeName}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                // { text: `Reg #: ${ovmic_no} \n Phone: ${accountPhone}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Reg #: ${acc_ovmic_no} \n `, border: [false, false, false, false], fontSize: 8, bold: false },
                            ],



                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables
                {
                    text: 'Terms and Conditions',
                    style: { fontSize: 8, bold: false, margin: [0, 10, 0, 10] },
                },
                {
                    text: [
                        {
                            fontSize: 8, alignment: 'left', text: `This Warranty Agreement, including the Warranty Holder Registration Page and the Terms and Conditions make up the entire Warranty Agreement (“the Agreement”). No other documents, unless provided directly to you as the warranty holder from Get Covered Canada are legal and binding. Please retain a copy of this Warranty Agreement as evidence of your coverage. Please note that only the parts, labour and benefits listed within this Agreement are covered by this Agreement. This Agreement is an Inclusionary Mechanical Breakdown warranty, and not a service agreement. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `1. Essential Warranty Plans:
                                                     Subject to the Terms and Conditions as contained herein, Get Covered Canada (the “Administrator”) warrants that it will repair the Registered Owner’s vehicle (“Warranty Holder”) and all reasonable costs incurred as denoted as covered by this Agreement during the term of the warranty offered under this Agreement, when a Mechanical Failure or Breakdown has occurred. For the purposes of this Agreement, a Breakdown or Mechanical Failure for the purposes of this Agreement shall mean: the failure of a Covered Part under normal service. A Covered Part has failed when it can no longer perform the function for which it was designed solely because of its condition and not because of the action or inaction of any non-Covered Part. Only the parts and labour described below as covered (“Covered Part”) are covered by this Agreement in the event of a Mechanical Failure or a Breakdown. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `Coverage under this Agreement can only be applied for in two cases, i) at the time of the sale or lease of the covered vehicle, as applicable to the covered vehicle, being the vehicle identified on the front page of this Agreement (the “Covered Vehicle”), ii) at a point in time prior to the expiration of an existing original Manufacturer’s Warranty. In the case of purchase under the terms of (ii) herein, the coverage purchased under this Agreement must have equal or lesser coverage than the expiring manufacturer warranty. The obligations of Get Covered Canada shall commence immediately or when an existing factory warranty expires, as applicable to the timing of the purchase of this Agreement. The obligations of Get Covered Canada shall expire according to the length of term indicated on the front page of this Agreement, based on the earlier of Agreement term length or odometer reading, whichever occurs first. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `on the front page of this Agreement, based on the earlier of Agreement term length or odometer reading, whichever occurs first. Coverage of the Covered Vehicle will begin on the Start Date stated on the first page of this Agreement and upon the issuance of the Warranty Authorization Number, the receipt of this signed Agreement and fulfillment of payment terms as agreed. Get Covered Canada reserves the right to cancel this Agreement in the event of non-payment or if a payment plan is in place, such payments are not up-to-date and current. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `The Warranty Holder hereby certifies that the information contained in this Agreement is true and correct as of the Start Date stated on the first page of this Agreement. The Warranty Holder further certifies that the Covered Vehicle is in proper operating condition as of the Start Date stated on the front page of this Agreement. In the event that any information is determined incorrect or misleading, this Agreement shall be deemed void and any monies paid will be returned to the Warranty Holder, less an administration fee of $99.00. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `2. Vehicle Eligibility:
                 The following vehicles are not eligible and are specifically excluded from all coverage under this Agreement, unless otherwise approved by Get Covered Canada:
                 • Audi R8 (all other Audi Models are eligible); Ferrari; Aston Martin; Bentley; Bugatti; Lamborghini; Lexus LF4 (all other Lexus Models are eligible); Maserati; Maybach; Mercedes SLR and Mercedes SLS (all other Mercedes Models are eligible); Nissan GTR (all other Nissan models are eligible); Panoz; Rolls-Royce; Fisker Karma; McLaren; and Dodge Viper (all other Dodge Models are eligible);
                 • Any vehicles classified with a payload capacity of more than one (1) ton; or 
                 • Vehicles used partially or exclusively for the following purposes: taxis, courier vehicles (including passenger vehicles used for courier use), chauffeured vehicles, Ride-hailing or Ride-Sharing Services (i.e Uber); delivery vehicles; snowplows or vehicles for which a snowplow is attached; tow-trucks; vehicles used for racing (professional or non-professional); police vehicles; ambulances and mobile canteens trucks;
                 Warranties on vehicles that fall under any of the above excluded categories will be cancelled and any monies received will be returned to the Warranty Holder, through the original selling dealership \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: ` 3. Maintenance Requirements:
                                                  In order to maintain eligibility for coverage, the warranty holder must perform fluid changes on their vehicle according to the manufacturer’s requirements, including any special instructions (i.e.special oil, or increased frequency), for vehicles that have a high portion of short journeys (city driving) or operate in severe weather conditions. Engine oil and filter must be changed every 10,000 kms or once a year (whichever comes first) or according to the manufacture’s guidelines if frequency is more. Do-it-yourself maintenance is not accepted under any circumstance. Required maintenance documentation must include: The name and contact information of the repair or service facility (letterhead format); Date and work order number and/or invoice number; Warranty Holder’s home address and phone number; the vehicles VIN, make, model and year and current kilometres; a description and breakdown of maintenance performed and associated costs; proof of payment by credit card or debit card only (cash not acceptable). The required maintenance documentation may be requested before claim approval. Get Covered Canada reserves the right to refuse claims based on negligence to perform the required maintenance services\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `4. Components & Benefits of Coverage:
                 According to the warranty plan chosen, as indicated on the first Page of this Agreement (and subject to full payment thereof), the Warranty Holder will receive the coverage indicated within the applicable sections of Section 7 below:
                 i.) Essential Powertrain Plans: Includes components and benefits listed in Section A.
                 ii.) Essential Powertrain Plus Plans: Includes components and benefits listed in Section A and B.
                 iii.) Essential Superior Plans: Includes components and benefits listed in Section A, B, and C.\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `5. Maximum Liabilities: \n The maximum liability undertaken by Get Covered Canada hereunder shall not exceed,
                 i.) $1000 per claim or half the purchase price of the vehicle whichever is less, and the total liability for the full term of coverage shall not exceed the full purchase price of the vehicle.
                 ii.) $1500 Per Claim or half the purchase price of the vehicle whichever is less, and the total liability for the full term of coverage shall not exceed the full purchase price of the vehicle.
                 iii.) $2500 Per Claim or half the purchase price of the vehicle whichever is less, and the total liability for the full term of coverage shall not exceed the full purchase price of the vehicle.
                 iv.) $3500 Per Claim or half the purchase price of the vehicle whichever is less, and the total liability for the full term of coverage shall not exceed the full purchase price of the vehicle.
                 v.) $4000 Per Claim or half the purchase price of the vehicle whichever is less, and the total liability for the full term of coverage shall not exceed the full purchase price of the vehicle. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: ` 6. Deductible:
                 According to the front page of this document, all claims are subject to the payment of a deductible of $75, $0, or otherwise indicated on the first page of this contract.\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: ` 7. Warranty Coverage:
                 Only the parts and labour described below (as applicable to your specific coverage selected and identified within Section 4 above) are covered (“covered part”) in the event of a Mechanical Failure or a Breakdown. Diagnostics are covered if the claim is validly covered by this Agreement (Maximum Diagnostic time deemed reasonable is one (1) hour). When reasonable, and at its sole discretion, Get Covered Canada may authorize payment of fluids associated with a repair.\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: ` The following shall be covered parts as outlined or limited herein:
                 (A) provides coverage for:
                 • Engine: Internally lubricated parts when damaged from within including but not limited to: Head gasket, engine block; cylinder heads; crankshaft and main bearings; crankshaft gears; connecting rods and bearings; camshaft and bearings; camshaft gears; push rods; pistons; rings and pins; intake and exhaust valves; valve springs and retainers; guides; lifters; rocker arm; shafts and pivots; harmonic balancer and pulley; timing chain; oil pump and shaft; ring gear, oil separator.
                 • Turbocharger and Supercharger: Internally lubricated parts when damaged from within; including but not limited to: Housing; Wastegate actuator; Compressor valves.
                 • Automatic Transmission: Internally lubricated parts when damaged from within including; but not limited to: torque converter; valve body; gear sets; clutches and bands; oil pump; flywheel; Ring gear.
                 • Manual Transmission/Transaxle: Internally lubricated parts when damaged from within including but not limited to: Housing; Gear sets; Synchronizer rings; Shifter fork; bearings.
                 • Differential (front and rear): Internally lubricated parts when damaged from within including but not limited to: carrier gear and case; drive pinion and pinion gear; differential cover; bearings; mounts.
                 • Transaxle: Internally lubricated parts when damaged from within including but not limited to:Housing; crown and pinion; pinion gears and bearings.
                 • Transfer Case: Internally lubricated parts when damaged from within including but not limited to: housing; gear group; sprocket and chain; bearings; shims.
                 • Trip-Interruption Allowance (Parts & Labour): A maximum of $100.00 per day including applicable sales taxes for a maximum of five (5) days will be reimbursed for lodging expenses at a hotel or motel when a Mechanical Failure or Breakdown is covered by the Agreement. The registered vehicle must be immobilized for a period of more than 24 hours and be more than 250 kilometres away from the Warranty Holder’s address indicated on the first page of this Agreement for such coverage hereunder to be authorized.
                 • Rental Allowance (Parts & Labour): A rental vehicle allowance of $40.00 per day including applicable sales taxes, per day, for a maximum of five (5) days per claim repair occurrence will be granted, upon receipt from a rental establishment or a licensed repair shop. A rental vehicle is only covered if the Breakdown or Mechanical Failure is covered by this Agreement. The Covered Vehicle must be immobilized for more than 24 hours and a valid receipt must be submitted for reimbursement. Please note that there shall be no reimbursement for rental vehicle gas, rental insurance, 407 highway charges or other highway toll charges, accessory charges (such as SirusXM radio or GPS units).
                 (B) provides coverage for:
                 • Air Conditioner (Parts & Labour): Compressor; compressor clutch and pulley; condenser and evaporator; orifice tube; lines; accumulator; dryer; high and low-pressure cutoff switches. Gas filling and other refrigerating products are covered only when a Covered Part is repaired. Cracks or corrosion is excluded from coverage.
                 • Seals & Gaskets (Parts & Labour): Gaskets and oil seals that leak from Covered Parts enumerated in the Agreement. Minor leaks/seepage or fluid oozing are considered normal and are not covered.
                 • Electric System (Parts & Labour): Automatic temperature control/programmer-display unit; Heater blower switches; Main dashboard digital display cluster; Power door locks: switches; Alternator;Starter, Windshield washer pump; Rear window washer pump; Front and rear wipers: motors, switches, regulation and gearing; Power windows: Switches; Power seats: switches; Side-view mirrors: switches; Power sunroof: switches; Headlights: Switches; Headlamp: switches; Turn signals: switches; Cruise control: switch; Rear window defroster: switch; Emergency warning flashers: Switch.
                 (C) provides coverage for:
                 • Brakes (Parts & Labour): Master cylinder; brake booster; wheel cylinders; brake split valve; disc brake calipers; flexible hydraulic brake lines and fittings; oil seals; combination valve; Vacuum assist booster pump; Parking brake linkage and cables.
                 • ABS Brakes/Traction Control System (TCS) (Parts & Labour): ABS/TCS pressure regulator; Pressure accumulator; hydraulic pump; hydraulic pressure valves.
                 • Fuel Injection System (Parts & Labour): Fuel injectors; Fuel pump and metal gas links; fuel tank and fuel gauge; fuel pressure regulator; fuel rails.
                 • Front Suspension (Parts & Labour): Ball joints; upper and lower suspension arms; bushings; hub and wheel bearings (excluding shock absorbers and air suspension).
                 • Power Steering (Parts & Labour): Rack-and-pinion gear; Power Steering Pump; Tie rod ends.\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `8. How to make a claim:
                 In the event that repairs to the Covered Vehicle become necessary and covered by this Agreement:
                 1) The Warranty Holder must contact Get Covered Canada 905.291.2940 immediately to initiate the claim process;
                 2) The Covered Vehicle may be taken to any licensed mechanic of the Warranty Holder’s choice, including the covered vehicle's franchise store. Get Covered Canada reserves the right to refuse any repair estimate and/or has the right to request a second opinion at an alternative repair facility if a repair estimate is judged unreasonable;
                 3) Get Covered Canada may request the Warranty Holder to produce documentation to substantiate maintenance requirements have been met as per Section 3 of this Agreement.
                 4) In some cases, claims adjusters will be required for onsite assessment(s). The amounts paid by Get Covered Canada for parts and labour are determined by the average similar repair costs or by the MITCHELL GUIDE or similarly recognized repair manuals. The liability of Get Covered Canada under this warranty will extend only to repairs which have been duly authorized by Get Covered
                 Canada and up to the limits identified within Section 5. Pre-Authorization is only granted when the Terms and Conditions set out in this Agreement have been met and this Agreement remains in force and the cost estimate is satisfactory to Get Covered Canada. A Claim Authorization Number is only valid for a period of thirty (30) days and only as applicable to the repair shop identified therein;
                 5) Get Covered Canada may at its sole discretion replace failed parts with OEM, aftermarket, used or rebuilt parts.
                 6) If this Agreement expires, is canceled or terminated by Get Covered Canada (as permitted herein) prior to the work being completed, the repairs will not be covered by this Agreement.
                 7) Get Covered Canada will pay repair costs directly to the mutually agreed upon licensed repair shop after a Claim Authorization Number is given in writing; after repairs are completed; after the final invoice is signed by the Warranty Holder and such is received by Get Covered Canada. The Registered Owner will only have to pay the deductible plus taxes, if applicable, and other miscellaneous non-covered items directly to the licensed mechanic.
                 8) In special circumstances only, Get Covered Canada will reimburse the Warranty Holder for pre-authorized repairs. The Warranty Holder will have to present Get Covered Canada copies of the repair documents including the payment receipt within ten (10) days of paying for the repair to substantiate the reimbursement. Any repair completed outside of the Province of Ontario will be evaluated as per the standards of the Ontario automobile industry. All covered repair costs will be reimbursed in Canadian funds. The Warranty Holder will have to present documents, including the payment receipt to substantiate any rental allowance or trip interruption reimbursements, within ten (10) business days of paying for those services. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `9. Warranty Coverage Exclusions:
                 The following are excluded from coverage under this Agreement.
                 a) All parts and labour not included in Part 6 of this document in accordance with the Warranty Plan indicated on the first page of this document;
                 b) Any mechanical defect judged to have existed prior to the Start Date for coverage as listed on the First Page of this Agreement;
                 c) Any repairs not authorized by Get Covered Canada, or carried on at a location not authorized by Get Covered Canada;
                 d) All parts and maintenance services described in the Covered Vehicle maintenance manual, including but not limited to: alignment; adjustments; software updates; wheel balancing; tune-ups; spark plugs; spark plug wires; Supercharger isolator etc.;
                 e) Any electrical wiring repairs; hardware (nuts, bolts etc.); amplifier; glow plugs; hoses; seat belts; wiper blades; shop supplies; storage costs; hoist fees or cleaning materials; heated seats; rear backup cameras; weather stripping; windshield; Lumbar seat bladder; Oil filter housing; diesel AdBlue System; Drive belt pulley and idlers; Valve Cover and/or valve cover gasket; Intake and/or exhaust manifold;
                 f) Mechanical Failure or Breakdown to the Covered Vehicle as a result of inadequate maintenance; abuse; misuse; or neglect or Mechanical Failure or Breakdown caused by a failure to adhere to the manufacturer’s required maintenance schedule;
                 g) Manual transmission clutch, throw out bearing, for solenoid or linkage;
                 h) Any Mechanical Failure or Breakdown due to an accumulation of dirty oil; carbonized or burnt valves; seized piston rings or an accumulation of carbon;
                 i) Any repair or replacement of a Covered Part, if a failure has not occurred (i.e. fraud) or if the wear on the part has not exceeded the field tolerances permitted by the manufacturer;
                 j) Any failure as a result of expired; contaminated; or improper fluids;
                 k) Any failure as a result of not maintaining proper levels of lubricants; fluids; refrigerants; or coolants including damage caused by failure of water hoses; radiators; or their connections; or in the transmission oil cooler lines;
                 l) Any failure caused to Covered Parts by the failure of non-covered parts;
                 m) The Covered Vehicle if it is in any way modified from its factory specifications;
                 n) Four wheel or rear-wheel steering;
                 o) Any repairs where the only malfunction is high oil consumption and/or low compression;
                 p) Any failure caused to a Covered Part(s) by the breakdown of non-manufacturer installed parts;
                 q) Any failure of non-manufacturer installed parts;
                 r) Vehicles used to tow a trailer in excess of the limits recommended by the vehicle’s manufacturer;
                 s) Any failure caused by unauthorized repair or teardown or parts inadequately installed;
                 t) Any parts and repairs already covered by another Canadian or foreign warranty; including but not limited to a manufacturer or repairer’s warranty, or valid insurance policy of any kind;
                 u) All parts and repairs for which the manufacturer has announced its responsibility through any means including recall campaigns and factory service bulletins issued in the United States or Canada;
                 v) Any repairs subject to a class-action lawsuit in the United States or Canada;
                 w) Vehicles with tampered or broken odometers;
                 x) Any Mechanical failure or Breakdown as a result of an accident; collision with another vehicle or road hazard; or falling objects;
                 y) Any Mechanical Failure or Breakdown caused or aggravated by the failure to properly protect the vehicle in the event or indication of failure to an operating part;
                 z) Any failure caused by fire; smoke; explosion; theft; vandalism; protests and riots; acts of terrorism or nuclear contamination;
                 aa) Any Mechanical Failure or Breakdown caused by Acts of God; the weather; environment or a natural disaster; including but not limited to damage caused by water; flood; frost; condensation;lightning; earthquake; fierce winds; hail; rodents or other pests;
                 bb) Any deterioration or any failure caused by rust; corrosion or pitting;
                 cc) Get Covered Canada is also not responsible for any liability for property damage; for injury to or death of any person arising out of the operation; maintenance or use of the vehicle whether or not
                 related to the part(s) covered or following a repair made by a mechanic in an authorized repair shop;
                 dd) Get Covered Canada is not responsible for any time loss; profit loss; inconvenience or any other loss that results from a failure; including delays in parts shipments or approving claims; or
                 ee) Any suspicious noises coming from any parts or components that are in operation and do not affect any other parts or components.\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `10. Cancellations:
                 This Agreement is non-cancellable except within ten (10) days of the purchase date of the coverage under this Agreement. During this period the Warranty Holder may cancel this Agreement through the selling dealer providing that no claims have been made. A cancellation fee of 25% of the sale price of the warranty (minimum of $100) plus taxes applies in all cases. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `11. Total Loss:
                 This Clause only Applies to Finance Companies and if the Covered Vehicle and this Agreement have been financed, the lienholder may cancel this Agreement if your Covered Vehicle is declared a total loss and/or a repossessed for any reason including for non-payment. Get Covered Canada will refund an amount of the warranty Agreement according to the premium paid to Get Covered Canada by the original selling dealer and not the actual financed and/or the amount of the warranty Agreement at the time this warranty Agreement was purchased. Such refund will be according to the following paragraph, less a $75 (seventy-five) Canadian dollars administrative fee, and less any amounts paid out on this Agreement (claims). In the event of cancellation, the lienholder, if any, will be named on a cancellation refund cheque as their interest may appear. Total loss and/or a repossessed in Month 1 = 80% Refund; Total loss and/or a repossessed in Month 2 = 70% Refund; Total loss and/or a repossessed in Month 3 = 60% Refund; Total loss and/or a repossessed in Month 4 = 50% Refund; Total loss and/or a repossessed in Month 5 = 40% Refund; Total loss and/or a repossessed in Month 6 = 30% Refund; Total loss and/or a repossessed in Month 7 = 20% Refund; Total loss and/or a repossessed in Month 8 = 0% Refund, Total loss and/or a repossessed in Month 9 = 0% Refund; Total loss and/or a repossessed in Month 10 = 0% Refund; Total loss and/or a repossessed in Month 11 = 0% Refund; Total loss and/or a repossessed in Month 12 = 0% Refund. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: ` 12. OMVIC Compliance:
                 OMVIC Compliance: This warranty contract complies with the requirements under the new Motor Vehicle Dealers Act (MVDA). As such, this warranty is not insured but a letter of credit in favour of the Motor Vehicle Dealers Compensation Fund has been provided to the Ontario Motor Vehicle Industry Council (OMVIC) by Get Covered Canada\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: ` 13. Transfer: If all the Terms and Conditions of this Agreement have been met, any remaining benefits may be transferred to a subsequent owner once. This Agreement cannot be transferred to another vehicle. Get Covered Canada must be notified within ten (10) days with the new Warranty Holder’s information (refer to PERSONAL INFORMATION on the front section of this Agreement). A copy of the vehicle registration and the bill of sale must also be emailed or faxed to Get Covered Canada. The new warranty holder is responsible for collecting all maintenance records from the previous owner in the event of a claim. A transfer fee of $100.00 plus taxes will apply, without exceptions and be owing by the named Warranty Holder. A failure to pay the transfer fee will result in a cancellation of the Agreement as of the transfer date without refund, and no claims will be honored thereafter.\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `14. Financial Agreements: If this Agreement’s coverage was financed either via a payment plan from Get Covered Canada or through a third-party finance company, including an OEM credit arm (the “Funding Party”), the Funding Party shall be entitled to any refunds resulting from the cancellation of this Agreement for any reason, including but not limited to, repossession of the Covered Vehicle,total loss of the Covered Vehicle (including by way of theft). Failure to make monthly payments for this Agreement’s coverage in a timely manner may result in cancellation of this Agreement, under which no refund will be due and no claim will be approved. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `15. Right to Recover: If the Warranty Holder has a right to recover funds that Get Covered Canada has paid under this Agreement against another party, the Warranty Holders rights against said third party shall become Get Covered Canada’s rights. The Warranty Holder agrees to provide reasonable assistance to help Get Covered Canada to recover these funds.\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: ` 16. Territory: This Agreement applies only to a Mechanical Failure or Breakdown that occurs and repairs made within Canada and the United States. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: ` 17. Dispute Resolution: Most disputes or disagreements between Get Covered Canada and the Warranty Holder arising under this Agreement can be resolved quickly by contacting Get Covered Canada at the address noted on the first page of this Agreement. In the event Get Covered Canada is unable to resolve a dispute with the Warranty Holder after attempting to do so informally, the parties to this Agreement agree to resolve such disputes through binding arbitration in accordance with the rules of the Canadian Arbitration Association. The party that intends to seek arbitration must first send to the other party, by certified mail, a written notice of dispute (“NOD”). The NOD should be addressed to other party and contain (a) the nature and basis of the claim or dispute; and (b) set forth the specific relief sought. If the parties do not reach a settlement within thirty (30) days of receipt of the NOD, either party may commence an arbitration proceeding. Unless otherwise agreed to mutually by the parties, the arbitration process will take place in the Province of Ontario.\n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: ` 18. Personal Information. The Warranty Holder hereby agrees that any personal information provided to Ensurall during the purchasing of this Agreement, the provision of a payment plan, processing and payment of claims hereunder, and/or the cancellation or transfer of this Agreement, is hereby consented to. Please note that Get Covered Canada may use third party data storage providers outside of Canada and may also need to facilitate claims repairs outside Canada. The Warranty Holder hereby consents to the collection, use, storage and disclosure of their personal information for the purposes outlined herein. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `19. This Agreement constitutes the entire agreement between Get Covered Canada and the Warranty Holder and supersedes and extinguishes all previous drafts, agreement, arrangement and understandings between them, whether written or oral, related to this subject matter. \n`, margin: [0, 5]
                        },
                        {
                            fontSize: 8, alignment: 'left', text: `20. This Agreement shall be governed by the laws of the province of Ontario. \n`, margin: [0, 5]
                        },

                    ],
                    border: [true, true, true, true]
                },








            ]
        };

        // Generate the PDF and open it in a new tab
        pdfMake.createPdf(docDefinition).open();
    };

    const generatePdf = async (data, applicationId) => {
        console.log("data" + JSON.stringify(data));
        const LOGO = await convertImageToBase64();

        // Render the PDFPrint component as static HTML
        // const componentHtml = ReactDOMServer.renderToStaticMarkup(<PDFPrintNew />);

        // Convert the HTML content to pdfMake format
        // const pdfContent = htmlToPdfmake(componentHtml, { window });

        // Create the PDF document definition using the converted content

        const text = data.productName;

        let dealershipaddress = ""

        // Extract the values using regex

        console.log("222222220" + data.dealership);
        var tradeName = "";
        var billingStreet = "";
        var billingCity = "";
        var billingCountry = "";
        var billingZippostalCode = "";
        var ovmic_no = "";
        var accountPhone = "";
        var acc_ovmic_no = "";

        try {
            const response = await axios.get("dealership/" + data.dealership + "/fetch");

            if (response.data.success === 500) {
                console.error("Server error: Failed to fetch dealership data.");
                // Handle the error appropriately, e.g., show an alert or return early
                return;
            }

            const responseData = response.data.data;
            if (responseData) {
                const dealershipaddress = JSON.stringify(responseData[0]); // Converts object to string
                const dealershipData = JSON.parse(dealershipaddress); // Parse it back to an object

                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.tradeName) tradeName = dealershipData.tradeName;
                if (dealershipData?.billingStreet) billingStreet = dealershipData.billingStreet;
                if (dealershipData?.billingCity) billingCity = dealershipData.billingCity;
                if (dealershipData?.billingCountry) billingCountry = dealershipData.billingCountry;
                if (dealershipData?.billingZippostalCode) billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.ovmic_no) ovmic_no = dealershipData.ovmic_no;
                if (dealershipData?.accountPhone) accountPhone = dealershipData.accountPhone;
                if (dealershipData?.acc_ovmic_no) acc_ovmic_no = dealershipData.acc_ovmic_no;

                console.log(tradeName, billingStreet, billingCity, billingCountry, billingZippostalCode, ovmic_no, accountPhone);
            }
        } catch (error) {
            console.error("An error occurred while fetching dealership data:", error);
        }

        let warrantySold = parseFloat(data.salePriceofVehicle.replace(/,/g, '')).toFixed(2);
        // let warrantySold = data.salePriceofVehicle;

        let kilometers = "";
        let customerNM = data.customerFirstNameText + " " + data.customerLastNameText;
        let user = data.user.split("@");
        const monthsMatch = text.match(/\((\d+)\s*months/i);
        let Months = monthsMatch ? parseInt(monthsMatch[1], 10) + " Months" : "-";

        const inserviceDate = new Date(data.serviceDateText);
        const formattedDatefmt = inserviceDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: '2-digit' });

        const vehicleDeliveryDate = new Date(data.vehicleDeliveryDate);
        const vehicleDeliveryDatefmt = vehicleDeliveryDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: '2-digit' });

        // Extract Kilometers
        if (text.includes("/")) {
            let kmMatch = text.split("/");
            if (kmMatch.length > 1) {
                kilometers = kmMatch[1].split(")")[0].trim();
            }
        }

        let applicationtitle = "";

        if (data.warrantyClass == 26) {
            applicationtitle = "Application for GAP Insurance";
        } else {
            applicationtitle = "Application for Warranty Coverage";
        }


        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [20, 20, 20, 20],
            content: [
                // First Table
                {
                    table: {
                        widths: ['50%', '50%'], // Set the width for each column
                        body: [
                            [
                                {
                                    image: LOGO, // Use the 'image' key for the logo
                                    rowSpan: 6,
                                    fit: [150, 150], // Adjust size as needed
                                    border: [false, false, false, false]
                                },
                                { text: `Application ID: ${data.id}`, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }
                            ],
                            ['', { text: `Warranty Status: ${data.Status}`, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }],
                            ['', { text: `Warranty Price: $${parseFloat(data.warrantySoldFor).toFixed(2)}`, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }],
                            ['', { text: ``, border: [false, false, false, false] }],
                            ['', { text: ``, border: [false, false, false, false] }],
                            [
                                { text: 'Application for GAP Bundle Warranty Coverage', rowSpan: 3, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true },
                                { text: `25 Sheppard Avenue West, Suite 300, North York, Ontario, M2N 6S6, Phone: 905.291.2940`, border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }
                            ],

                            [{ text: 'Get Covered Canada', border: [false, false, false, false], fontSize: 10, bold: true }, { text: 'claims@getcoveredcanada.com', border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }],
                            [{ text: `${applicationtitle}`, border: [false, false, false, false], fontSize: 10, bold: true }, { text: 'www.getcoveredcanada.com', border: [false, false, false, false], fontSize: 10, alignment: 'right', bold: true }]
                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: 'Customer Details', border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },
                // { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: '', border: [false, false, false, true], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },
                {
                    table: {
                        widths: ['20%', '30%', '20%', '30%'], // Adjust the column widths for this table
                        body: [
                            // [
                            //     { text: 'Customer details', border: [false, false, false, false],fontSize: 10, bold: true },
                            //     { text: '', border: [false, false, false, false] },
                            //     { text: '', border: [false, false, false, false] },
                            //     { text: '', border: [false, false, false, false] },
                            // ],
                            [
                                { text: `Customer First Name:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.customerFirstNameText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Address: `, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.streetAddressText}\n ${data.townText},  ${data.provinceText},  ${data.postalCodeText}`, border: [false, false, false, false], fontSize: 8, bold: false, alignment: "left" }
                            ],
                            [
                                { text: `Customer Last Name:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.customerLastNameText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],
                            [
                                { text: `Drivers Licence:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.driverLicenceText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Email:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.customerEmailText}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],
                            [
                                { text: `Phone:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.customerPhoneText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],


                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables  townText. provinceText. postalCodeText
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: 'Vehicle Details', border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },
                // { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: '', border: [false, false, false, true], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },

                // Second Table
                {
                    table: {
                        widths: ['20%', '30%', '20%', '30%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: `Year:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.year}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Sale Price:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `$ ${warrantySold}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],
                            [
                                { text: `Make:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.make}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],

                            [
                                { text: `Model:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.model}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Vehicle Delivery Date:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${vehicleDeliveryDatefmt == "Invalid Date" ? "" : vehicleDeliveryDatefmt}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],

                            [
                                { text: `VIN:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.vinNoText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `In Service Date:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${formattedDatefmt == "Invalid Date" ? "" : formattedDatefmt}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],

                            [
                                { text: `Odometer:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.odometerText} KM`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Finance Company:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.financeCompanyText}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],

                        ]
                    }
                },

                { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: 'Warranty Details', border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },
                // { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: '', border: [false, false, false, true], bold: true,
                                    alignment: 'left', fontSize: 10
                                },
                            ],

                        ]
                    }
                },


                // Second Table
                {
                    table: {
                        widths: ['20%', '30%', '20%', '30%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: `Warranty Plan:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.productName}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Deductible:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.deductible}`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],
                            [
                                { text: `Max Protection:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${data.warrantyProtectionText}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Roadside:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `None`, border: [false, false, false, false], fontSize: 8, bold: false }
                            ],

                            [
                                { text: `Warranty Length:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${Months}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],

                            [
                                { text: `Coverage:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${kilometers}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true }
                            ],





                        ]
                    }
                },

                { text: '\n' }, // Add spacing between the tables

                {
                    text: 'Terms', // Heading
                    style: { fontSize: 10, bold: true, margin: [0, 10, 0, 10] }, // Style for the heading
                },


                {
                    text: [
                        { fontSize: 8, text: '• I, the Buyer, have read, selected, understand, and accept the terms and conditions of the Warranty Application and the Warranty Policy as outlined in the following pages and have retained a copy of the application and acknowledge that the selling dealer has made no representation outside the Terms and Conditions.\n', margin: [0, 5] },
                        { fontSize: 8, text: '• I, understand and agree that is my obligation to maintain the vehicle according to the manufacturers guidelines, including changing engine oil and filters and monitoring and changing other fluids according to the manufacturers guidelines, and section 3 of this agreement.\n', margin: [0, 5] },
                        { fontSize: 8, text: '• I understand any abuse misuse or neglect of my vehicle may lead to my claims denied. I, understand that I must keep maintenance records and receipts of the maintenance performed as I may be asked to submit these records if a claim is submitted to Get Covered Canada.\n', margin: [0, 5] },
                        { fontSize: 8, text: '• I, understand that maintenance must be performed by licensed mechanic or maintenance shops. Do-it-yourself oil changes are not accepted\n', margin: [0, 5] },
                        { fontSize: 8, text: '• I, understand repairs made to covered components without prior authorization by Get Covered Canada will not be reimbursed. \n', margin: [0, 5] },
                        { fontSize: 8, text: '• I hereby certify that all of the information set out herein is true and accurate, I am applying for coverage at the time of the vehicle purchase or prior to the expiration of an existing full manufacturers warranty and the vehicle is in proper operating condition at the date of the application. Misleading or False Information will void warranty coverage. \n', margin: [0, 5] }
                    ],
                    border: [true, true, true, true]
                },
                { text: '\n' }, // Add spacing between the tables

                {
                    table: {
                        widths: ['25%', '5%', '70%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: `Applicant's Signature:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Salesperson's Signature:`, border: [false, false, false, false], fontSize: 8, bold: false },

                            ],
                            [
                                { text: `X`, border: [false, false, false, true], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `X`, border: [false, false, false, true], fontSize: 8, bold: false },

                            ],


                        ]
                    }
                },
                {
                    table: {
                        widths: ['30%', '40%', '30%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: `Customer Name:`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `Salesperson:`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Salesperson #:${data.useromvicno}`, border: [false, false, false, false], fontSize: 8, bold: false },

                            ],
                            [
                                { text: `${customerNM}`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `${user[0].toUpperCase()}`, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: false },
                            ],


                        ]
                    }
                },
                {
                    table: {
                        widths: ['30%', '70%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },
                                { text: `I, the representative of the selling Dealer, certify that the named used vehicle is mechanically fit`, border: [false, false, false, false], fontSize: 8, bold: true },

                            ],


                        ]
                    }
                },
                {
                    table: {
                        widths: ['30%', '40%', '30%'], // Adjust the column widths for this table
                        body: [
                            [
                                { text: ``, border: [false, false, false, false], fontSize: 8, bold: true },

                                // { text: `${tradeName} \n ${billingStreet} \n ${billingCity} \n ${billingCountry} \n  ${billingZippostalCode}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `${tradeName}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                // { text: `Reg #: ${ovmic_no} \n Phone: ${accountPhone}`, border: [false, false, false, false], fontSize: 8, bold: false },
                                { text: `Reg #: ${acc_ovmic_no} \n `, border: [false, false, false, false], fontSize: 8, bold: false },
                            ],



                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables

                ...(data.warrantyClass == 26 ? [{
                    text: 'Policy Terms and Conditions',
                    style: { fontSize: 8, bold: false, margin: [0, 10, 0, 10] }
                }] : [{
                    text: 'Terms and Conditions',
                    style: { fontSize: 8, bold: false, margin: [0, 10, 0, 10] }
                }]),

                ...(data.warrantyClass == 26 ? [
                    {

                        text: [
                            {
                                fontSize: 8, alignment: 'left', text: `Section 1 - Definitions \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Applicant: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The individual listed on the application who is also the registered owner of the vehicle.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Application: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The form submitted to Get covered Canada for GAP Insurance coverage/proection, certified by the applicant as accurate and complete, and attached to this policy.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Claim: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `A formal request for coverage under this policy, made by the policy holder.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Commercial Purposes: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Use of the financed or purchased vehicle for business-related activities including, but not limited to: transporting goods or passengers for compensation, security services, taxi or ride-sharing (e.g. UBER, Lyft), school or public buses, police or emergency use, and vehicles insured under a commercial policy. Personal use under a commercial policy by a sole driver is not considered “Commercial Use.”\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Covered Vehicle: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The motor vehicle, recreational vehicle, trailer, or watercraft listed on the application and licensed for use solely under the applicatant.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Covered Vehicle Purchase Price: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The reasonable purchase price of the covered vehicle (excluding taxes and excessive fees), as listed in the original financing or lease agreement/contract.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Date of Loss: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The actual date when the vehicle is declared a 'Total Loss' due to damage or theft.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Dealer: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The selling dealership as named in the application\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Down-Payment Amount: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The cash or trade-in equity paid by the applicant, as listed in the application. It does not include any financed portion of the trade-in vehicle.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Equity Trade-in Amount: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The value of a traded-in vehicle (not including any outstanding balance), as reflected in the bill of sale or lease agreement.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Finance Contract: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The original loan or lease agreement between the policy holder and the finance company.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Finance Contract Amount: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The full amount financed as specified in the application on page one\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Finance Contract Term: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The duration of the finance contract, as stated in the application on page one\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Finance Company: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The lender or leasing company listed in the application on page one\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Loss: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The difference between the outstanding balance of the finance contract at the date of loss, and the 'Actual Cash Value' (ACV) of the covered vehicle as determined by the primary policy insurer. Certain items are excluded from this balance, including overdue payments, future interest, taxes, unpaid premiums, and other specified fees or deductions\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Policy: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `This GAP Insurance contract, including the the first page of the application and the terms and conditions\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Policy Holder: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The applicant(s) listed on page one of the application, only if the policy has been issued and the individual(s) are also named on the finance contract\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Policy Period: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The shorter of either 96 months or the stated finance contract term noted on page one\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Primary Policy: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The underlying auto or property insurance policy that provides physical damage coverage for said covered vehicle on the application\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Primary Policy Insurer: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The insurance company that issued the primary policy on the covered vehicle\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Proof of Loss: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Documentation submitted by the policy holder to support a claim, which may include a police report, loan agreement, valuation report, and/or other required records\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Total Loss: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `An incident covered by the primary policy resulting in either:\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Irreparable damage exceeding the vehicle’s ACV: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Theft with the vehicle deemed non-recoverable\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Total Premium: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The full GAP Insurance premium listed on the first page of the application, paid by the applicant via a licensed OMVIC dealership to GET COVERED CANADA INC.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Vehicle Valuation Report: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `A settlement breakdown from the primary policy insurer showing how the ACV was calculated on/at the 'date of loss'.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `VIN: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The unique 17-digit Vehicle Identification Number listed on the application.\n`, margin: [0, 5]
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Section 2 – Coverage \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Upon full payment of the total premium and subject to a valid claim being paid by the primary insurer, coverage is provided as follows: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `A. GAP Insurance Coverage \n`, margin: [0, 5], bold: true,
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `GET COVERED CANADA INC. will pay the difference between:`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	The outstanding balance on the finance contract as of the date of loss, and \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	The Actual Cash Value (ACV) as determined by the primary insurer`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Coverage Limit - As stated on the first page of the application/contract \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `B. Partial Loss Deductible Reimbursement\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `If the covered vehicle is involved in an at-fault accident that results in a partial loss: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	We will reimburse the policy holder for the collision deductible charged by the primary insurer, up to $1,000\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Only one claim may be made under this coverage for the life of the policy \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `C. Maximum Payout\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `The total benefits paid under Sections 2A and 2B combined will not exceed the limit stated on the first page of this application/contract. \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Note: All GAP Insurance payouts are made directly to the finance company/lender by GET COVERED CANADA Inc.\n`, margin: [0, 5], bold: false
                            },

                            {
                                fontSize: 8, alignment: 'left', text: `Section 3 – Exclusions \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `This Policy does not provide coverage for any of the following: \n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	If no down-payment coverage was selected\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Any promises or coverage not specifically included in Section 2\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Consequential or indirect damages, including loss due to negligence or fraud\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Any losses caused by criminal activity (charges being laid) or where charges were laid under the Highway Traffic Act, to any party in the covered vehicle at the time of the accident/incident\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Misrepresentation of any kind, and where alcohol or drug use was involved – determined at the time of the claim, incident, or any time thereafter by the police and/or by a credible investigation team\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Use of the vehicle for commercial (where/when not permitted), governmental, or racing purposes/use\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Vehicles older than eleven (11) model years at the time of application\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Loan amounts exceeding the Loan-to-Value (LTV) limit noted in the policy\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Excessive vehicle pricing, unreasonable fees, or cashback amounts\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	War, rebellion, or civil unrest\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Mechanical or electrical failure\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Use in races, contests, or stunt events\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Loss due to the use of custom parts, after-market parts, and/or specialized equipment\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Providing false information on the application, later in time, or during a claim process\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Claims reported more than 60 days after the date of loss\n `, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Any loss caused by a primary insurance deductible\n `, margin: [0, 5], bold: false
                            },

                            {
                                fontSize: 8, alignment: 'left', text: `Section 4 – Claims Process \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `A. Notice of Loss \n `, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	You must notify GET COVERED CANADA INC. in writing within 30 days from the date of loss. \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `B. Proof of Loss  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` You must submit the required documentation in writing to GET COVERED CANADA Inc. within:\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	30 days of the date of loss, or  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	30 days after your initial claim notice \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Documentation may include your insurance settlement, police report, finance agreement, valuation report, etc... deemed acceptable by Get Covered Canada and/or their representatives  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `C. Claim Review & Payment  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Claims will be reviewed within 60 days of receiving satisfactory documentation. If approved, the payment will be made directly to the finance company/lender  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `D. Duty to Minimize Loss  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `You are responsible for taking reasonable steps to: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Protect the vehicle at all times from damage or theft \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Maximize your primary insurer’s payout \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Note: Failure to do so may reduce the benefits paid under this policy \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Section 5 – Termination  \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `A. Cancelling the Policy (Applicant)  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `You may cancel by sending written notice to GET COVERED CANADA INC., (using the email address: sales@getcoveredcanada.ca) stating your desired cancellation date and reason  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `B. Refund Within 30 Days – by applicant  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	If cancelled by the applicant within 30 days of purchase, the applicant will receive a full refund of the total premium  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `C. Cancellation After 30 Days – by applicant  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	If cancelled after 30 days from the date of purchase, the applicant will receive no refund (partial or full)  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `D. Cancellation - by Insurer  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	The insurer or GET COVERED CANADA INC. may cancel this policy with at least 15 days' written notice.  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `E. Refund - Upon Insurer Cancellation  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	If your policy is cancelled by the insurer or Get Covered Canada you will receive a pro-rated refund for the unused portion, subject to any minimum retained premium  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `F. Termination Timing  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Cancellation is effective at 12:01 a.m. (Standard Time) on the listed termination date  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `G. Notice Delivery  \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Notices are considered delivered once sent via registered mail to the address listed on the policy  \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Section 6 – General Provisions & Notices \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `A. Communications \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	All correspondence must be sent by registered mail. Either party may update their address via written notice \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `B. Subrogation \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	If the Insurer or GET COVERED CANADA INC. pays a claim, they may pursue recovery from third parties. The policy holder must assist in this process \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `C. Recoveries \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	If you receive any other compensation related to a covered claim, that amount must be reimbursed to GET COVERED CANADA INC. or the insurer \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `D. Other Insurance \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	This policy pays only after other valid automotive insurance is exhausted \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `E. Privacy \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	GET COVERED CANADA INC. complies with PIPEDA and only collects or shares personal information as necessary to: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Process applications and claims \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Detect fraud \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Meet legal requirements \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Data may be stored outside Canada and accessible to foreign authorities. Security safeguards are in place, but absolute protection cannot be guaranteed \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `For all inquiries, please contact - Lou Hoffer @ 416-825-5564 - Customer Relations Officer, Get Covered Canada Inc. O/A Get Covered Canada \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `F. Currency \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	All reported quotes, fees, transactions, etc... and dollar amounts are written in Canadian Dollars. \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `G. Third-Party Rights \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Only the policy polder is entitled to policy benefits \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `H. Governing Law \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	This policy is governed by the provincial laws of the province of Ontario (Get Covered Canada's province of business) and the federal laws of Canada. \n`, margin: [0, 5], bold: false
                            },

                        ]


                        //                 text: [
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Section 1 - Definitions \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Applicant: \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `The individual listed on the application who is also the registered owner of the vehicle.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `"Application" means the Application for Guaranteed Asset protection (GAP) lnsurance attached to the Policy' which Application has been certified by the Applicant as being accurate and correct' \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `"Claim" means a claim made under the Policy, by the Policy Holder for coverage under the Policy' \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `"Coinsurance Factor" means the factor calculated by divrdrng $100,000 by the Finance contract Amount stated in the Application' \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `"Commercial purposes", means a vehicle that is used for carrying goods or passengers for livery or delivery purposes or for compensation of any kind. commercial purposes shall also includle vehicles used for any of the following purposes at the ttme of the accident or theft that lead to the Total Loss: security services, taxi cabs or similar passenger travel such as Uber or Lyft' buses' school buses, facilrtation of transportation of commercial goods, police vehicles, emergency vehicles, or the primary insurance policy for the Vehicle is under a commercial classification or commercial insurance policy. However, share-the expense private passenger, carpool vehicle, or personal use vehicle driven by orre driver insured under a commercial vehicle policy are not considered to Comnrerclal Purposes \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `"Covered Vehicle"  or "Vehicle"  means the licensed motor vehicle, watercraft, recreational vehicle or personal trailer' as described on the Application\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `"Covered Vehicle purchase price" means a reasonable purchase price, exclusive of taxes, unreasonable fees and charges' of the Covered Vehicle as stated in the original loan or lease Policy' \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Date of Loss" shall mean the actual date of the Total Loss or theft \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `"Dealer" means the Dealersthip Name as stated on the Application. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Down-payment Amount" means the cash down-payment and/or equity trade-in amount. as stated on the Application and within the bill of sale or lease agreement for the covered Vehicle. Equrty Trade-in Anrount shall not include any financed or other amount owing on the Vehicle.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Finance contract" means the original loan or lease policy entered into by the Polrcy Holder and the Finance company' with regard to the Policy Holder's purchase or lease of the covered Vehicle.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Finance Contract Amount" means the Finance Contract Amount as stated in the Application\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Finance contract term" means the Finance contract Term as stated on the Application' \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Finance company" means the creditor as stated on the Application \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Loss" means those costs actually, reasonably and necessarily incurred by the Policy Holder under the Finance contract tn the event of a Total Loss. Such costs are equal to any positive amount resulting from deducting (a) the actual cash value of the covered Vehrcle as of the date of rotal Loss as determined by the Primary Policy lnsurer, fronr (b) the outstanding balance under the Finance contract as of the date of rotal Loss. lt is furlher understood that the outstanding balance under the Finance contract as of the date of rotal Loss shall not include any delinquent payments, future interest payments, GST/HST any failure of the prirnary policy lnsurer to pay any amounts under the principal automotive policy due to the actions or inactions of the Applicant' or deducted by the primary policy lnsurer due to wear and tear. prior damage, unpaid insurance premiums salvage, towing or slorage costs, security deposits, other refundable rnsurance and all past due charges, fines' costs or other miscellaneous expenses or unreasonable fees under the Finance contract as of the date of rotal Loss. where the Finance contract has a deferred payment start date, the outstanding balance will be recalculated as though the loan started on the Aoolication date, using the interest rate' term, and paymentfrequency as stipulated in the Finance Cont"ract. Get Covered Canada reserves the rightto examine the Vehicle Valuation Report to determine its own reasonable actual cash value of the covered Vehicle at the time of the loss' PolicyHolders are enCoUraged to not aCCept any offer of settlement from their Primary Policy lnsurer until has a chance to provide input on the actual cash value of the Covered Vehicle' \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Policy" means the coverage under the policy of Guaranteed Asset Protection (GAP) lnsurance, and includes the Application' \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Policy Holder" means the Applicant as stated on the Applicatron, if and only rf the Applrcatton has been accepted and the policy has been subsequently issued to the Applicant, who must be the primary party on the Finance Contract.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Policy period" means the periocl of time during which the Policy is in force, and will be the lesser of 96 months or the Finance Contract Term.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Primary policy", means (a) the statutory personal automobile insurance policy. or (b) the personal watercraft property insurance policy, issued by the primary policy lnsurer to the Policy Holder, insuring the covered vehicle. and must include but not limited to direct physical loss or damage insurance coverage' \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Primary policy lnsurer" means the Insurance company that issued the Primary Policy.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` "Proof of Loss" means the written submission By the policy Holder to  Get Covered Canada  in the event of a Total Loss, of pertinent Claim information as required by Get Covered Canada and will include but may not be limtted to:\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` i) a completed copy of the proof of loss under the Primary Policy including police report, when issued;
                        //                                                 ii) a copy of the Policy:
                        //                                                 iii) a copy of the Finance Contract;
                        //                                                 Iv) a copy of the original loan or lease Policy:
                        //                                                 v) the Vehicle Valuation RePort;
                        //                                                 vi) the account from the Finance company setting out the outstanding balance under the Finance Contract as of the date of Total
                        //                                                 Loss;
                        //                                                 vii) for Down-payment Amounts, a copy of a bank statement showing cash payment or trade in statement from the dealership  showing total equity amount in trade in; and
                        //                                                 viii) other documentation, report or informatron as requested by in respect of the clarm, including but not limited to documents to substantiate lien payouts for any traded in vehicles at the time Vehicle purchase'
                        //                                                 "Total Loss" means an incident, covered underthe Primary Policy and occurring during the Policy Period, of:
                        //                                                 i) direct physical loss or damage to the covered Vehicle, caused by an event other than theft, where the cost of repair exceeds the
                        //                                                 Covered Vehicle's actual cash value at the tirne of Total Loss as determined by the Primary Poltcy lnsurer; or
                        //                                                 ii) theft of the covered Vehicle, where the covered Vehicle is not recoverable as determined by the Primary Policy lnsurer'
                        //                                                 "Total premium", means the Gap lnsurance Total Premium as stated in the Application, payable under the Policy, and charged to the
                        //                                                 Applicant in respect of the Application. Such Total Premium is to be paid by the Applicant through the Dealer to cannot be subject to any discount or credit.
                        //                                                 "Vehicle Valuation Report" means the total loss settlement statement from the Primary Policy lnsurer setting out the calculation of
                        //                                                 the actual cash value of the Covered vehicle as of the rJate of rotal Loss as determined and paid by the Primary Policy lnsurer'
                        //                                                 "VlN" means the unique serial or vehicle identification number of the Covered Vehicle as stated on the Application'\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Section 2 Coverage \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `ln consideration of the payment of the Total Premium, subject to all of the terms and conditions of the Policy, and subject to a legitimate insurance claim being paid under the Primary Policy in event of a Total Loss in connection with a claim, the lnsurer agrees to indemnify the Policy Holder for Loss, subject to the following limits: \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(a) The maximum benefit for Loss is limited to $25000 as indicated on the first page of the Application; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(b) partial Loss Collision Deductible protection: ln addition to the benefits detailed above, in the event that the Policy Holder and the Covered Vehicle is involved in a partial loss at fault accident, the lnsurer will reimburse the Policy Holder the Auto Collision deductible applied by the policy Holder's primary lnsurance provider up to a maximum of $1,000.00. The Policy Holder may qualify to make a claim under this option only once under the Policy Period. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(c)The maximum total benefit payable under this Policy is limited to $25000 combined for all benefits listed in Section 2(a) and Section 2(b). \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `lf the policy Holder has a Total Loss and the Financed Amount stated in the Application is greater than $100,000, the total payment for Loss under the policy will be reduced using the Coinsurance Factor. ln such case, the benefit payable for Loss under the Policy will be the Loss multiplied by the coinsurance factor. All amounts payable under the Policy will be paid to the Ftnance Company only. Neither the tnsurer nor  will have any duty to defend the Policy Holder or others in any lawsuit or other judicial or administrative proceeding involving the Policy Holder, or to pay or reimburse the Policy Holder for the costs of defense of any such lawsuit or other judicial or administrative proceeding. By acceptance of the Policy, the Policy Holder has warranted that itwill maintain in force and in good standing the Primary Policy during the Policy Period, a failure of which to do so by the Applicant, shall result in a denial of coverage to the Policy Holder under this Policy. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Section 3 - Exclusions \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `The policy does not cover or apply to any of the following. or to any liabilrty or obligation arising in connection with any of the following: \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(a) Benefits for Down-payment Amount, rf the Policy Holder has selected "No" for Down-Payment Protection, on the Application,
                        //                                     (b) Any liability, cost, expense, danrage, charge, assessnrent, exposure, or detrinrent of any description other than Total Loss, or up to a maximum of $1000.00 for the life of the policy in the case of an at fault partial loss only to cover a deductible applied to the at fault claim by the Primary lnsurance policy;
                        //                                     (c) Any warranty, representation, promise, covenant, commitment, guarantee, or other <Juty or obligation not covered under Section 2;
                        //                                     (d)Any and all special, incidental, direct, indirect, consequential, exemplary, extra contractual, or punitive damages or liabilities of any descriptron whatever including without limitation that which arise from any act or omission by the Policy Holder, or any agent of the Policy Holder;
                        //                                     (e) Any gross negligence, misrepresentation, willful or intentional misconduct, strict liability, or any fraudulent, dishonest. or criminal act committed during the application process for this policy, during the process of submitting a claim against this policy, or during  the events of the Total Loss or partial Loss, will negate coverage under this policy, even if a claim was accepted by the Primary lnsurance company; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(f) Any misrepresentation during the purchase of the vehicle, including but not limited to misrepresentation of submitted to obtain financing will negate coverage under this policy, even if a claim was accepted by the Primary lnsurance Company. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(g) Any Total Loss or partial Loss direcily or indirectly caused by the Policy Holder, or any individual with express or implied permission to possess the covered Vehicle, while committing or attempting to commit a criminal act or if the operator of the Covered Vehicle was impaired at the time of the Total Loss or Partial Loss, even if a claim was accepted by the Primary lnsurance Company;
                        //  \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(h) Any Loss to the Covered Vehicle will not be covered if the Primary lnsurance Pollcy is not in the name of the Applicant(s) listed on the first page of this Policy. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` (i) Any Total Loss on a Covered Vehicle used for Commercial Purposes, or a Covered Vehicle utilized by government, municipal or police services, an exhibition or racing vehicle and a short-term rental vehtcle even if a claim was accepted by the Primary Insurance Company,\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `j) Any Total Loss on a Covered Vehicle older than 10 model years on the Application date; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `k) Any portion of the Loss resulting from the Finance Contract Amount exceeding the Maximum Loan-to-Value Percentage specified on the front page of this Policy, calculated based on the Covered Vehicle Purchase Price, will not be covered. ln such cases, the Outstanding Loan Balance will be adjusted using the Maximum Loan-to-Value Percentage. The Financed Amount will be recalculated as if the Finance Contract Amount had been limited to the Loan-to-Value Percentage stated on the front page of the contract, relative to the Covered Vehicle Purchase Price' \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(l) Any part of the Loss that exceeds N/aximum Loan-to-Value Percentage specified on the front page of this Policy of the actual cash value at the time of the loss \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(m) Any Loss that includes a cash back payment included in the sale of the vehicle or any Loss where the sale price of the vehicle or any accessories or other products listed on the bill of sale are unreasonable; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(m) Any Loss that includes a cash back payment included in the sale of the vehicle or any Loss where the sale price of the vehicle or any accessories or other products listed on the bill of sale are unreasonable; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(n)Any Loss due to war, whether or not declared, any type of invasion, civil war, insurrection, rebellion or revolution; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(o) Any Loss that results from or is due to a mechanical or electrical breakdown or failure; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(p) Any Loss resulting from the vehicle being operated, used or maintained in any race, speed contest or similar type of contest whether on a road or closed circuit, even if a claim was accepted by the Primary lnsurance Company; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(q) Any Loss attributed to non-standard equipment, including but not limited to, roll bars, furniture, audio or video equipment, specialized racking or storage, sleeping or cooking equipment, customized paint or wraps, or equipment installed to overcome any physical handicap, even if a claim was accepted by the Primary lnsurance Company; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(r) Any Loss due to providing incorrect information during the registration process, including but not limited to, the policy period' financed amount, or interest rate, will not be covered. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` (s) Any Loss arising from products, fees, insurances, vehicle accessories, or other charges on the Vehicle bill of sale that exceed $10,000 will not be covered. ln such cases, the Finance Amount will be adjusted accordingly.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` (t) Any Loss that is reported more than 60 days after the Date of Loss, even if a claim was accepted by the Primary lnsurance Company\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(u)Any Loss due to a deductible subtracted by your Piimary lnsurance Company \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Section 4 - Claim Procedures \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Notice Claim: ln the event the Policy Holder wishes to make a Claim, the Policy Holder must give written notice of Claim to RENCORE TNSURANCE lNC. with all available information within 60 days after the Date of Loss. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Proof of Loss: The Policy Holder must give the Proof of Loss to  within the earIier of 60days of providing the written notice of Claim to the 60days from the Date of Loss \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Settlement of Claim: RENCORE INSURANCE lNC. will adjudicate the Claim on behalf of the lnsurer, and subject to the lnsurer being liable under the Policy,within 60days of's receipt of satisfactory Proof of Loss,will work with the lnsurer to pay the Finance Company. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Mitigation of Loss: The policy Holder must do all that is reasonable and practical to avoid or reduce any Loss under this Policy and to protect the Covered Vehicle from further Loss. The Policy Holder must take all reasonable measures to ensure that the maximum amount is paid by the Primary Policy lnsurer. Any portion of the Loss that is due to the Policy Holder's failure to protect the Covered Vehicle or maximize the settlement noted here in shall be considered to be a part of the Loss.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Section 5 - Termination \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(a)This Policy may be terminated by the Policy Holder by giving Written notice stating when there after the termination shall be effective. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(b)if terminated by the policy Holder within 30 days of the Policy Effective Date,  will facilitate the refund as soon as practicable of '100% of the Total Premtum actually paid by the Policy Holder \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(c) lf terminated by the poticy Holder after 30 days from the Policy Effective Date,  will refund as soon as practicable the excess of the Total premium actually paid by the Policy Holder over the short rate premium for the expired time according to the table in use by the Insurer at the time of the termination, but in no event may the short rate premium for the expired time be less than any minimum retained premium specified on the first page of the Application. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(d)This Policy may be terminated by the lnsurer or on its behalf by giving to the Policy Holder written notice stating when, not less than 15 days there after, such termination shall be effective \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(e)lf terminated by the lnsurer or on its behalf will facilitate the refund 0f the excess of premium actually paid by the Policy Holder over the prorated premium for the expired time, but in no event may the prorated premium for the expired time be less than any minimum retained premium specified on the first page of the Application \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(f) The effective date of termination stated in the notice of termination shall become the end of the Policy Period. The time of termination shall be effective as of 12:01 a.m. Standard Time at the address of the Policy Holder as stated in the Application \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(g) Notice of termination as provided above, shall be given upon deposit in the Canadian mails, registered and postage prepaid' and sent to the address of the Policy Holder as the case may be. The 1S-day period mentioned in paragraph (c) above begins to run on the day following the receipt of the registered letter at the post office to which it is addressed. No claim or coverage shall be afforded to the Policy Holder as of the date of termination.
                        //  \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` Section 6 - General Provisions, and Notices \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `All notices, Proof of Loss, and surrender of the Policy will be deemed to be given: \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` (a)lf to Upon deposit in the Canadian mails,registered and post age prepaid,addressed to address shown in the Policy; or\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(b) lf to the Policy Holder, upon deposit in the Canadian mails, registered and postage prepaid, addressed to the Policy Holder's address shown in the Policy \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` Either the lnsurer, or the Policy Holder may change any such address by delivery of a  written notice to the other as provided above.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` Subrogation \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `ln the event of any payment by the lnsurer or RENCORE INSURANCE lNC. on its behalf under the Policy, will be subrogated to all of the Policy Holder's rights of recovery therefore against any person or entity, and the Policy Holder will execute and deliver jointly to the lnsurer and such instruments, assignments, and papers as requested by and do whatever is necessary to secure such right sand effectuate the lnsurer and exercise of such rights.The Policy Holder will do nothing to prejudice or waive such rights. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` Recoveries\n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `All amounts recovered by the Policy Holder for which the Policy Holder has also received benefits under the Policy will belong to RENCORE INSURANCE lNC. and/or the lnsurer as determined by these two parties, and will be paid to RENCORE INSURANCE lNC. by the Policy Holder up to the Total Premium amount paid under this Policy. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Other lnsurance \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Coverage provided under the Policy is in excess of any other applicable valid and collectible insurance or indemnity available to the Policy Holder, and the lnsurer will be liable only for the excess of the amount of loss over the amount covered by other insurance or indemnity after all other insurance or indemnity has been exhausted. The coverage provided under the Policy will not apply as contributory insurance and this non-contribution will prevail despite any non-contribution provision in other insurance or indemnity.The lnsurer will indemnify the Policy Holder only to the extent that a covered Loss is not covered by such other insurance or indemnity \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Privacy and Data Protection \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `the lnsurer are committed to protecting your privacy in accordance with applicable privacy legislation, including the Personat tnformation Protection and Electronic Documenfs Act (PIPEDA). The information you submit to us above will be handled in accordance with our privacy policy]WilIcollect,use and disclose your personal information only to process and administer the application, and administer the program, once in force. This includes \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` (i) Processing your Claims and otherwise providing you with our services; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(ii) verifying your identity and detecting and investigating fraud; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(iii)communicating with you and responding to your requests: \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(iv) resolving disputes: \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(v) providing you with information about products and services (with your consent where required by law); and \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(vi)other purposes as requrred or permitted by law \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Get Covered Canada may share your personal information with the following types of third parties: \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(i) service providers who assist us in managing our business operations, such as Salesforce, a cloud-based customer relationship management (CRlVl) provider, which we use to store and manage client information, and Stannp, a third-party mailing service provider, which we use to send contracts. Both of these service providers are based in the United States, and your personal information may be processed and stored in that country; \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(ii) third parties or affiliates in connection with a corporate transaction, such as a sale, consolidation, or merger; and \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `(iii) governmental authorities and third parties to comply with legal requirements, such as demands, subpoenas, court orders, and other legal processes. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` Some of these entities may be located outside of Canada, meaning your personal information may be transferred outslde Canada
                        // and may be accessible to courts, law enforcement and national authorities in other countries. and the Insurer will protect your personal information with safeguards commensurate with the sensitivity of the data. These include physical, organizational, and technical safeguards. However, the transmission or storage of personal information via the internet or other electronic means is not completely secure. Although we take steps to protect your personal information, we cannot fully guarantee the security of your data. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` lf you have any questions about our handling of your personal information, please contact Lov Hoffes, VP of Operations, 905-291-2940 \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Currency \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `All amounts and payments under the Policy will be in Canadian dollars \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `No Benefit to Third Parties \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Except as expressly provided by applicable law, the insurance afforded by the Policy is solely for the benefit of the Policy Holder. ln no circumstances will any person or entity other than the Policy Holder (or such assignee) have any rights or be entitled to any benefits under the Policy. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Governing Law \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `The Policy and all of its terrns and conditions will be governed and construed in accordance with the laws of the province in which the Dealer resides and the federal laws of Canada applicable therein. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Territory \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `The Policy only applies to a Total Loss which occurs within Canada and the Continental United States of America. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Changes in the Policy \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `Severability of the Policy Provisions \n`, margin: [0, 5], bold: true
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `ln the event that any provision of this Policy or any amendments hereto will be deemed invalid or void, in whole or in part, because it is now or may hereafter be against public policy or for any reason, the offending provision will be severable from the Policy and the remaining terms and provisions of the Policy will remain in full force and effect, subject always to the terms and conditions of applicable law.
                        //  \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `The Ontario lnsurance Act states that no term of the contract or condition, stipulation, warranty or proviso modifying or impairing its effect is valid or admissible in evidence to the preludrce of the insured unless agreed upon in writing by the insurer and the insured after the issuance of the policy. The federal Fair Treatment Guidance states that where there are changes in terms and conditions, the insurer notifies the policyholder of their rights and obligations regarding such changes and obtains the policyholder's consent as appropriate. \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `This is required pursuant to sectlcn 578(5) 0f the federal insurance Companies Act Since TIC is a foreiqn Insurance company' Seems duplicative of "Total Premium" defined below \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: `please indicate if any of these purposes will be exclusively carried out by Get Covered Canada, in which case this section should be modified accordingly. For instance, is one party solely responsible for providing customer service? \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` This can be removed if the company can verify that information is kept in Canada at all times. See comment on the application page.\n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` \n`, margin: [0, 5]
                        //                     },
                        //                     {
                        //                         fontSize: 8, alignment: 'left', text: ` \n`, margin: [0, 5]
                        //                     },
                        //                 ]
                    }


                ] :
                    [{
                        text: [
                            // {
                            //     fontSize: 8, alignment: 'left', text: `Extended Warranty Program – Terms & Conditions \n`, margin: [0, 5], bold: true
                            // },
                            {
                                fontSize: 8, alignment: 'left', text: `Extended Warranty Agreement Overview \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	The full Agreement includes both the Extended Warranty Application/Registration Page & Terms and Conditions of the policy \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Only documents provided to the policy holder directly by Get Covered Canada are valid \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Please keep a copy as proof of coverage for the full term of the policy \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Only listed parts, labour, and specified benefits are covered \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	This is an Inclusionary Mechanical Breakdown Warranty, not a service agreement or contract \n\n\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `1. Essential Warranty Plans \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Get Covered Canada Inc. will cover reasonable repair costs for Covered Parts due to Mechanical Failure \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Mechanical Failure: Failure of a covered part under normal use, not caused by non-covered parts \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Coverage applies only if: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	i) Purchased at time of sale/lease of the vehicle on the policy, or \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	ii) Before expiry of original manufacturer’s warranty (with equal/lesser coverage)\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Coverage starts on the 'Start Date' noted on page one of this application and with a noted: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Warranty Authorization Number \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Signed agreement\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Proof of full payment recived on or before the date of the application \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	The 'term' ends when the 'end term date' has arrived on the clendar or the odometer limit (whichever comes first) is reached \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	This policy may be cancelled for non-payment at any time and at the discretion of Get Covered Canada Inc. and/or their authoized agent(s) \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	The vehicle under this policy must be in proper operating condition at program commencement date\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	False information shall VOID this agreement - and a $299.00 administrative fee will apply and be due by the policy holder in cases of this nature \n\n\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `2. Vehicle Eligibility (Exclusions) \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Not eligible: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	High-end or exotic vehicles (e.g., Ferrari, Lamborghini, Rolls-Royce, Bentley, Mclaren, Bugatti, etc.) \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Vehicles over 1-ton payload capacity \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Vehicles used for:\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Taxi, courier, chauffeuring, UBER/Ride-sharing, delivery, snowplowing, tow-truck, racing, police, ambulance, other emergency use purposed vehicles, food trucks, heavy use hauling \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Ineligible warranties will be cancelled and refunded through the dealership.\n\n\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `3. Maintenance Requirements \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Must follow manufacturer’s fluid and maintenance schedule. \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Oil & filter change every 10,000 km or or six (6) months, whichever comes sooner \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	DIY ('do it yourself') maintenance is NOT allowed \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Maintenance documentation must include:\n\n\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `4. Warranty Plans and Coverage \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Based on selected plan:\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Bronze Powertrain Programs \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Bronze Powertrain Plus Programs \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Silver Powertrain Programs \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Silver Powertrain Plus Programs \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Silver Electric Vehicle Powertrain Plus Programs \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Gold Powertrain Plus Programs \n\n\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `5. Maximum Liabilities \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Based on numerous offered plans: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	$1000 / $1500 / $2000/ $2500 / $3000 / $4000 / $5000 /$10,000 per claim \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	OR half the purchase price (whichever is less)\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Total term limit = purchase price of vehicle \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Any claim MUST be made with five business days of the issue being reported to a licensed mechanic!\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Duely stated and noted on the first page of this policy/application\n\n\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `6. Deductible \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	EXCLUSIVE $0.00 deductible as stated on the agreement front page!\n\n\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `7. Warranty Coverage Details \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `(A) Includes: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Engine \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Turbo/Supercharger \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Transmissions (auto/manual) \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Differentials / Transaxles / Transfer Case \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Trip-Interruption: Up to $100/day, 5 days, 250km+ from home \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Rental Allowance: $40/day, 5 days; certain conditions apply \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `(B) Includes: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Air Conditioner \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Seals & Gaskets (if applicable to your plan)\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Electrical System: Switches, wipers, lights, mirrors, seat controls, etc.\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `C) Includes: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Brakes\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	ABS / Traction Control \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Fuel Injection System\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Front Suspension (excludes shocks/air suspension) \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Power Steering \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `8. How to Make a Claim \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` 1.	Call Get Covered Canada: Immediately call 905-291-2940 or 416-825-5564 – Direct all claim related inquiries to: Lou Hoffer – Senior Customer Relations Officer\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `2.	Provide maintenance documentation when instructed to do so \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `3.	A Get Covered Canada on-site claims adjuster may be required \n\n\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Repair Coverage & Authorization \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Repair costs are based on average similar repairs or the MITCHELL GUIDE or similar manuals \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Only repairs authorized by Get Covered Canada are covered, and as such MUSt be submitted PRIOR to any work being completed  and made with in Section 5 limititations \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Pre-Authorization granted only if: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Terms & Conditions are met \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Agreement /term policy is active \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Cost estimate is acceptable and provided to Get Covered Canada by a licensed automotive facility \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Claim Authorization Number: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Genreated  by Get Covered Canada and valid for 30 days \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Valid only for specified and authorized repair shops\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Get Covered Canada may use OEM, aftermarket, used, or rebuilt parts at its sole discretion \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	No coverage (policy is VOID) if  this policy agreement expires, is cancelled, or terminated before any work is completed! \n\n\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` Payment process \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `▪	Claims shall be paid directly to licensed repair shop after: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Claim Authorization Number has been issued \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Repairs are completed by authorized repair facility \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Final invoice signed and submitted by all parties involved\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Warranty Holder pays deductible, taxes, and non-covered items \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Reimbursement (in special cases only authorized in advance by Get Covered Canada): \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Must be pre-authorized \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Documents and receipts required within 10 business days \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Repairs outside Ontario evaluated per Ontario standards \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Reimbursements made in Canadian dollars \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Warranty Coverage Exclusions \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Parts and labour not listed in Part 6 \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Pre-existing mechanical defects \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Unauthorized repairs or unauthorized locations \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Regular maintenance items (e.g., alignment, spark plugs, software updates) \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Electrical wiring, certain hardware, and accessories (e.g., heated seats, cameras) \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Failures from poor maintenance, abuse, or neglect \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Dirty oil, carbon buildup, or non-wear-based issues\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Failures from improper and/or contaminated fluids or lubricant issues \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Failures due to modified vehicles or non-OEM parts \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Wear-only issues (e.g., high oil consumption)\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Failures from accidents, weather, natural disasters, rodents, fire, vandalism, etc. \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Failures caused by non-covered parts\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Tampered odometers \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Failures already covered under other warranties or legal actions \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Time loss, inconvenience, or profit loss due to delays or failures \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Noises that don’t affect part or vehicle operation \n\n\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `"No Claims Double Term Option" Extended Coverage Offer \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Applies to original owners of 1 - 4 year policies purchased after April 1, 2025. \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Not applicable to transferred or renewed policies \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Eligibility conditions: \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `1.	Original GCC extended warranty holder/owner of vehicle only \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `2.	All Agreement obligations must be met and substaniated with documentation as required/requested by Get Covered Canada \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `3.	Submit all maintenance records upon registration \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` 4.	No previous claims (paid, authorized, or pending)\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `5.	Policy holder has contacted Get Covered Canada before original term ends \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `6.	Pay $199.00 + HST and get oil change (if required). \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `7.	NOTE: The second term has not cancellable and/or is not transferable or cash convertible \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `8.	Coverage may differ from original policy \n\n\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Cancellations \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Non-cancellable except within 10 days of purchase. \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Must go through selling dealer with no claims made \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	25% cancellation fee (minimum $100) + HST applies \n\n\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Total Loss Clause (For Finance Companies) \n`, margin: [0, 5], bold: true, fontSize: 13
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Cancellation allowed if vehicle is: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Declared a total loss by the insurer\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Repossessed \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Refund based on amount paid by dealer, minus: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	$75 admin fee \n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Any claim payouts\n`, margin: [0, 5], bold: false
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Refund schedule: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Month 1: 75% \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Month 2: 70%\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Month 3: 50%\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Month 4: 40% \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Month 5: 30% \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Month 6: 20% \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Month 7: 10% \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Month 8–12: 0% \n\n\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `Other Terms \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	OMVIC Compliance: Get Covered Canada Inc. O/A Get Covered Canada omplies with all MVDA and UCDA guidelines, policies, and procedures; backed by letter of credit to OMVIC. \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Transferability: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	One-time transfer to new owner (same vehicle only) \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Notify within 10 days \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Provide registration & bill of sale \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	$199 + HST transfer fee required. \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Failure to pay will result in policy cancellation \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Financial Agreements: \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Financing companies entitled to cancellation refunds \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Missed payments may lead to cancellation with no refund or claim \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Right to Recover: Get Covered Canada can pursue third parties for reimbursed claims \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Territory: Valid for repairs in Canada & United States of America \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Dispute Resolution: Must follow binding arbitration via Canadian Arbitration Association (after written notice of dispute) \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: ` •	Privacy: Consent required for data collection, possibly outside Canada\n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Entire Agreement: Supersedes all previous terms, conditions, and policies, written or oral \n`, margin: [0, 5], bold: true
                            },
                            {
                                fontSize: 8, alignment: 'left', text: `•	Governing Laws: Get Covered Canada is legally entiltled to operate business in Ontario, and as such is bound by the laws within the province of Ontario (provincially), and within the country of Canada, abiding by all federal laws \n`, margin: [0, 5], bold: true
                            },

                        ],
                        border: [true, true, true, true]
                    }]
                ),










            ]
        };

        // Generate the PDF and open it in a new tab
        pdfMake.createPdf(docDefinition).open();
    };

    const generateInvoicePdf = async (data, invCount, merchantno, applicationId) => {
        console.log("data" + JSON.stringify(data));
        const LOGO = await convertImageToBase64();
        // Render the PDFPrint component as static HTML
        // const componentHtml = ReactDOMServer.renderToStaticMarkup(<PDFPrintNew />);

        // Convert the HTML content to pdfMake format
        // const pdfContent = htmlToPdfmake(componentHtml, { window });

        // Create the PDF document definition using the converted content

        var tradeName = "";
        var billingStreet = "";
        var billingCity = "";
        var billingCountry = "";
        var billingZippostalCode = "";
        var ovmic_no = "";
        var accountPhone = "";
        var acc_ovmic_no = "";

        try {
            const response = await axios.get("dealership/" + data.dealership + "/fetch");

            if (response.data.success === 500) {
                console.error("Server error: Failed to fetch dealership data.");
                // Handle the error appropriately, e.g., show an alert or return early
                return;
            }

            const responseData = response.data.data;
            if (responseData) {
                const dealershipaddress = JSON.stringify(responseData[0]); // Converts object to string
                const dealershipData = JSON.parse(dealershipaddress); // Parse it back to an object

                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.tradeName) tradeName = dealershipData.tradeName;
                if (dealershipData?.billingStreet) billingStreet = dealershipData.billingStreet;
                if (dealershipData?.billingCity) billingCity = dealershipData.billingCity;
                if (dealershipData?.billingCountry) billingCountry = dealershipData.billingCountry;
                if (dealershipData?.billingZippostalCode) billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.ovmic_no) ovmic_no = dealershipData.ovmic_no;
                if (dealershipData?.accountPhone) accountPhone = dealershipData.accountPhone;
                if (dealershipData?.acc_ovmic_no) acc_ovmic_no = dealershipData.acc_ovmic_no;

                console.log(tradeName, billingStreet, billingCity, billingCountry, billingZippostalCode, ovmic_no, accountPhone);
            }
        } catch (error) {
            console.error("An error occurred while fetching dealership data:", error);
        }


        const match = data.productName.match(/(\d+)\s*Months/);
        let months = "";

        if (match) {
            months = parseInt(match[1], 10) + " Months";
            console.log(months); // Output: 60
        } else {
            console.log("Months not found");
        }
        let warrantyAdminCost = data.warrantySoldFor;
        let taxCost = (warrantyAdminCost * (13 / 100));
        let totalCost = parseFloat(Number(warrantyAdminCost) + Number(taxCost), 2);


        let liabilityLimit = parseFloat(0).toFixed(2);
        let unLimitedMileage = parseFloat(0).toFixed(2);
        let deductible = parseFloat(0).toFixed(2);
        let totTrueCost = parseFloat(0).toFixed(2);

        // Convert back to numbers for calculation and update totTrueCost
        totTrueCost = parseFloat(totTrueCost) + parseFloat(liabilityLimit) + parseFloat(unLimitedMileage) + parseFloat(deductible);

        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-CA", { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'America/Toronto' });
        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [20, 20, 20, 20],
            content: [
                // First Table
                {
                    table: {
                        widths: ['50%', '50%'], // Set the width for each column
                        body: [
                            [
                                {
                                    image: LOGO, // Use the 'image' key for the logo
                                    rowSpan: 5,
                                    fit: [150, 150], // Adjust size as needed
                                    border: [false, false, false, false]
                                },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            ['', { text: `25 Sheppard Avenue West, Suite 300, North York, Ontario,`, fontSize: 10, alignment: 'right', bold: true, border: [false, false, false, false], }],
                            ['', { text: ` M2N 6S6, Phone: 905.291.2940`, fontSize: 10, bold: true, border: [false, false, false, false], alignment: 'right' }],
                            ['', { text: `claims@getcoveredcanada.com`, fontSize: 10, bold: true, border: [false, false, false, false], alignment: 'right' }],
                            ['', { text: `www.getcoveredcanada.com`, bold: true, fontSize: 10, border: [false, false, false, false], alignment: 'right' }],
                            [{ text: `Get Covered Canada`, fontSize: 12, bold: true, border: [false, false, false, false] }, { text: ``, bold: true, border: [false, false, false, false] }],
                            [{ text: `SERVING CANADIANS SINCE 1978`, fontSize: 10, bold: true, border: [false, false, false, false] }, { text: ``, bold: true, border: [false, false, false, false] }],



                        ]
                    }
                },
                {
                    table: {
                        widths: ['100%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: 'Invoice', border: [false, false, false, true], bold: true,
                                    alignment: 'center', fontSize: 18
                                },
                            ],

                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['50%', '50%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: `Date: ${formattedDate}`, border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 8
                                },
                                {
                                    text: '', border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 8
                                },
                            ],

                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables
                {
                    table: {
                        widths: ['40%', '60%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: `${tradeName} \n ${billingStreet} \n ${billingCity} \n ${billingCountry} \n  ${billingZippostalCode}`, border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 8
                                },
                                {
                                    text: '', border: [false, false, false, false], bold: true,
                                    alignment: 'left', fontSize: 8
                                },
                            ],

                        ]
                    }
                },

                {
                    table: {
                        widths: ['30%', '50%', '20%'], // Adjust the column widths for this table
                        body: [

                            [
                                { text: ``, border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Merchant: ${merchantno}`, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Invoice:#${invCount}`, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: ``, fontSize: 10, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: ``, border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: ``, border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Application ID:`, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${applicationId}`, fontSize: 8, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Customer Full Name:`, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${data.customerFirstNameText} ${data.customerLastNameText}`, fontSize: 8, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Vehicle Information: `, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${data.yearText + ' ' + data.modelText}`, fontSize: 7, bold: false, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Warranty Plan:  `, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: ` ${data.productName}`, fontSize: 8, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Warranty Length:  `, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${months}`, fontSize: 8, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Liability Limit:  `, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${data.warrantyProtectionText} `, fontSize: 8, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Warranty Admin Cost:  `, fontSize: 10, bold: true, border: [false, false, false, true] },
                                { text: ``, border: [false, false, false, true] },
                                { text: `$${warrantyAdminCost}`, fontSize: 8, border: [false, false, false, true], alignment: 'right' }
                            ],
                            [
                                { text: `Total Cost:  `, fontSize: 10, bold: true, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] },
                                { text: `$${warrantyAdminCost}`, fontSize: 8, border: [false, false, false, false], alignment: 'right' }
                            ],
                            [
                                { text: ``, fontSize: 10, bold: true, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] },
                                { text: ``, fontSize: 8, border: [false, false, false, false], alignment: 'right' }
                            ],
                            [
                                { text: `Tax 13%:  `, fontSize: 10, bold: true, border: [false, false, false, true] },
                                { text: ``, border: [false, false, false, true] },
                                { text: `$${taxCost}`, fontSize: 8, border: [false, false, false, true], alignment: 'right' }
                            ],
                            [
                                { text: `Total Cost:  `, fontSize: 10, bold: true, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] },
                                { text: `$${totalCost}`, fontSize: 8, bold: true, border: [false, false, false, false], alignment: 'right' }
                            ],
                            [
                                { text: `HST #: 105511554RP002  `, fontSize: 10, bold: true, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false], alignment: 'right' }
                            ],

                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables
                { text: '\n' }, // Add spacing between the tables
                { text: '', pageBreak: 'before' },
                {
                    table: {
                        widths: ['30%', '30%', '40%'], // Adjust the column widths for this table
                        body: [

                            [
                                { text: ``, fontSize: 10, bold: true, border: [false, false, false, true] },
                                { text: `True Total Cost`, fontSize: 13, bold: true, border: [false, false, false, true] },
                                { text: ``, border: [false, false, false, true] }
                            ],
                            [
                                { text: `Application ID:`, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${data.id}`, fontSize: 8, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Customer Full Name:`, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${data.customerFirstNameText} ${data.customerLastNameText}`, fontSize: 8, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Vehicle Information: `, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${data.yearText + ' ' + data.modelText}`, fontSize: 8, bold: false, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Warranty Plan:  `, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: ` ${data.productName}`, fontSize: 8, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Warranty Length:  `, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${months}`, fontSize: 8, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] }
                            ],
                            [
                                { text: `Liability Limit:  `, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `${data.warrantyProtectionText} `, fontSize: 8, border: [false, false, false, false] },
                                { text: `$${data.productCost}`, fontSize: 8, border: [false, false, false, false], alignment: 'right' }
                            ],
                            [
                                { text: `Unlimited Milage:  `, fontSize: 9, bold: true, border: [false, false, false, false] },
                                { text: `NO`, fontSize: 7, border: [false, false, false, false] },
                                { text: `$${unLimitedMileage}`, fontSize: 8, border: [false, false, false, false], alignment: 'right' }
                            ],
                            [
                                { text: `Deductible:  `, fontSize: 9, bold: true, border: [false, false, false, true] },
                                { text: `${data.deductibleText} `, fontSize: 8, border: [false, false, false, true] },
                                { text: `$${deductible}`, fontSize: 8, border: [false, false, false, true], alignment: 'right' }
                            ],

                            [
                                { text: `Total True Cost:  `, fontSize: 10, bold: true, border: [false, false, false, false] },
                                { text: ``, border: [false, false, false, false] },
                                { text: `$${data.productCost}`, bold: true, fontSize: 8, border: [false, false, false, false], alignment: 'right' }
                            ],


                        ]
                    }
                },














            ]
        };

        // Generate the PDF and open it in a new tab
        pdfMake.createPdf(docDefinition).open();
    };

    const SaveAsPending = async (e) => {
        saveStatusRef.current = 1;
        const data = { id, commercialVehicle, originalCost, giftCardCredit, warrantyApplicationDate, user, oldUser, useromvicno: omvic_no, dealership, vinNo, highRatioCoveragePriceText, warrantyOptionPriceText, vinNoText, make, makeText, model, modelText, year, yearText, odometer, odometerText, salePriceofVehicle, salePriceofVehicleText, comprehensiveFactoryWarrantyValid, comprehensiveFactoryWarrantyValidText, serviceDate, serviceDateText, warrantyClass, warrantyClassText, warrantyType, warrantyTypeText, warrantyProtection, warrantyProtectionText, warrantyOption, warrantyOptionText, highRatioCoverage, highRatioCoverageText, deductible, deductibleText, customerFirstName, customerFirstNameText, language, languageText, customerLastName, customerLastNameText, streetAddress, streetAddressText, town, townText, province, provinceText, postalCode, postalCodeText, customerPhone, customerPhoneText, customerEmail, customerEmailText, driverLicence, driverLicenceText, customerLanguage, customerLanguageText, dealNotes, dealNotesText, vinCust, vinCustText, salePriceofVehicleCust, salePriceofVehicleCustText, financeCompany, financeCompanyText, vehicleDeliveryDate, vehicleDeliveryDateText, warrantySoldFor, warrantySoldForText, packages, packagesTypes, productIndex, productCost, packagesText, productName, Status: "Pending", commission, userId };
        // generateInvoicePdf(data);    
        // generatePdf(data);

        // console.log("saving data"+JSON.stringify(data));

        if (!termsConditonChecked) {
            alert("Please tick the terms & conditions")
        } else {


            if (id == "") {
                const mainURL = ADDURL;
                serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
            } else {
                const mainURL = UPURL;
                console.log("url", mainURL);
                serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
            }


        }


    }

    const handleSuccess = (data) => {
        setSeverity("success");
        if (saveStatusRef.current === 1) {
            setMessage(data.data.message);
        } else {
            setMessage(data.data.message);
        }

        setAlertopen(true);
        setTimeout(() => {
            console.log("SaveStatus", saveStatusRef)
            if (saveStatusRef.current === 1) {
                ApplicationStore().setStorage('sideBarIndex', "4");
                setSidebarItemIndex(4);
                navigate("/ViewPendingWarranty");
            } else {
                ApplicationStore().setStorage('sideBarIndex', "5");
                setSidebarItemIndex(5);
                navigate("/ViewClosedWarranty");
            }

        }, 3000); // Matches autoHideDuration
    }

    const handleException = (data) => {
        setSeverity("error");
        setMessage(data.data);
        setAlertopen(true);
    }



    return (
        <>
            <Box sx={{ marginTop: "150px" }}>
                <Stepper activeStep={activeStep} sx={{
                    // backgroundColor: '#0d2365',  // Change background color to navy blue
                    // '&:hover': {
                    //     backgroundColor: '#0d2365',  // Darken the color on hover
                    // }
                }}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};

                        // Check if the step is optional
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption"></Typography>
                            );
                        }

                        // Check if the step is skipped
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }

                        return (
                            <Step key={label} {...stepProps} sx={{
                                // backgroundColor: '#0d2365',  // Change background color to navy blue
                                // '&:hover': {
                                //     backgroundColor: '#0d2365',  // Darken the color on hover
                                // }
                            }}>
                                <StepLabel
                                    {...labelProps}
                                    StepIconProps={{
                                        sx: {
                                            color: index === activeStep ? 'green' : '', // #0d2365 color for the active index, default for others
                                        },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, }}>Step {activeStep + 1}</Typography>
                        {
                            activeStep == 0 ?
                                <>
                                    {/* <Typography variant="h5" sx={{ color: 'grey' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',  
                                                marginTop: "100px",
                                                padding: "0px"
                                            }}
                                        >
                                           
                                            <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px', color: 'black', fontWeight: 'bold' }}>
                                                Vehicle Information
                                            </Typography>

                                        </Box>
                                    </Typography> */}

                                    <br></br>
                                    <form >
                                        <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                                            <Typography variant="h5" sx={{ color: 'grey' }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',  // Added this line
                                                        marginBottom: "1em",
                                                        padding: "0px"
                                                    }}
                                                >
                                                    {/* <LockResetIcon sx={{ fontSize: '30px', color: 'grey' }} /> */}
                                                    <Typography variant="h6" sx={{ color: 'grey', marginLeft: '8px', color: 'black', fontWeight: '500', fontSize: '20px' }}>
                                                        Vehicle Information
                                                    </Typography>

                                                </Box>
                                            </Typography>

                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',  // Stack label and input vertically
                                                        alignItems: 'flex-start',
                                                        backgroundColor: '#f5f5f5',
                                                        padding: '8px 16px',
                                                        borderRadius: '8px',
                                                        width: '100%',
                                                        maxWidth: '500px',
                                                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{ marginBottom: '8px', fontWeight: 'bold', color: '#333' }}
                                                        variant="body1"
                                                    >
                                                        Enter VIN
                                                    </Typography>

                                                    <Box sx={{ display: 'flex', width: '100%' }}>
                                                        <TextField
                                                            variant="outlined"
                                                            fullWidth
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    '& fieldset': {
                                                                        borderColor: 'lightgray', // Default border color
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: 'lightgray', // Hover border color
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: 'lightgray', // Disable focus border change
                                                                    },
                                                                },
                                                            }}
                                                            value={vinNo}
                                                            onChange={(e) => {
                                                                setVinNo(e.target.value);
                                                                setVinNoText(e.target.value);
                                                                setVinCust(e.target.value);
                                                                setVinCustText(e.target.value);
                                                            }}
                                                        />
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            sx={{ backgroundColor: '#0d2365', padding: '8px 16px', marginLeft: '8px' }}
                                                            onClick={(e) => getVinDetails(e)}
                                                        >
                                                            Decode
                                                        </Button>
                                                    </Box>
                                                </Box>

                                            </Stack>
                                            <br></br>
                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>

                                                {/* <FormControl fullWidth required  >
                                                    <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                        Make
                                                    </Typography>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={make}
                                                        // label="make"
                                                        onChange={handleCarChange}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 200,
                                                                },
                                                            },
                                                        }}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Please Select Make</em>
                                                        </MenuItem>
                                                        {vehicleMakes.map((make, index) => (
                                                            <MenuItem key={index} value={make}>
                                                                {make}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl> */}

                                                <FormControl fullWidth required  >
                                                    <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                        Make
                                                    </Typography>
                                                    <Autocomplete
                                                        value={make}
                                                        options={vehicleMakes}
                                                        onChange={handleCarChange}  // Handle the selection
                                                        sx={{ width: '100%' }}  // Responsive width for the TextField
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Select Vehicle Make"  // Add a label for clarity
                                                            />
                                                        )}
                                                    />
                                                </FormControl>



                                                <FormControl fullWidth required  >
                                                    <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em', }}>
                                                        Model
                                                    </Typography>

                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        // label="make"
                                                        value={model}
                                                        onChange={handleModelChange}

                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 200,
                                                                },
                                                            },
                                                        }}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Please Select Model</em>
                                                        </MenuItem>
                                                        {vehicleModels.map((make, index) => (
                                                            <MenuItem key={index} value={make}>
                                                                {make}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                <FormControl fullWidth required  >
                                                    <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                        Year
                                                    </Typography>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={year}
                                                        // label="Year"
                                                        onChange={(e) => {
                                                            setYear(e.target.value);
                                                            setYearText(e.target.value);
                                                        }}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 200,
                                                                },
                                                            },
                                                        }}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                            },
                                                        }}
                                                    >

                                                        <MenuItem value="">
                                                            <em>Please Select Year</em>
                                                        </MenuItem>
                                                        {Array.from({ length: 2025 - 1998 + 1 }, (_, index) => (
                                                            <MenuItem key={index} value={1998 + index}>
                                                                {1998 + index}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>


                                            </Stack>
                                            <br></br>
                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                {/* Odometer Input */}
                                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                    <Typography variant="subtitle2" sx={{ marginBottom: '0.5em' }} >
                                                        Odometer
                                                    </Typography>
                                                    <TextField

                                                        required
                                                        fullWidth
                                                        id="odometer"
                                                        name="odometer"
                                                        value={odometer}
                                                        onChange={(e) => {
                                                            setOdometer(e.target.value);
                                                            setOdometerText(e.target.value);
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">KM</InputAdornment>,
                                                        }}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </Box>

                                                {/* Sale Price Input */}
                                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                    <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                        Sale Price Of The Vehicle
                                                    </Typography>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="sale"
                                                        name="sale"
                                                        value={salePriceofVehicle}
                                                        onChange={(e) => {
                                                            setSalePriceofVehicle(e.target.value);
                                                            setSalePriceofVehicleCust(e.target.value);
                                                            setSalePriceofVehicleText(e.target.value);
                                                            setSalePriceofVehicleCustText(e.target.value);
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                                        }}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </Box>

                                                {/* Comprehensive Factory Warranty Valid Select */}
                                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                    <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                        Warranty Application Date
                                                    </Typography>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="sale"
                                                        name="saleDate"
                                                        type="date"
                                                        value={warrantyApplicationDate}
                                                        onChange={(e) => {
                                                            setWarrantyApplicationDate(e.target.value);
                                                            // setServiceDateText(e.target.value);
                                                            // setVehicleDeliveryDate(e.target.value);
                                                            // setVehicleDeliveryDateText(e.target.value);
                                                        }}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: 'lightgray',
                                                                },
                                                            },
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true, // Ensures the label doesn't overlap with the date input
                                                        }}
                                                    />
                                                </Box>

                                            </Stack>
                                            <br></br>



                                            <>
                                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                        <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                            Comprehensive Factory Warranty Valid?
                                                        </Typography>
                                                        <FormControl fullWidth required >
                                                            <Select
                                                                value={comprehensiveFactoryWarrantyValid}
                                                                onChange={(e) => {
                                                                    setComprehensiveFactoryWarrantyValid(e.target.value);
                                                                    setComprehensiveFactoryWarrantyValidText(e.target.value);
                                                                }}
                                                                MenuProps={{
                                                                    PaperProps: {
                                                                        style: {
                                                                            maxHeight: 200,
                                                                        },
                                                                    },
                                                                }}
                                                                sx={{
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            borderColor: 'lightgray',
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: 'lightgray',
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: 'lightgray',
                                                                        },
                                                                    },
                                                                }}
                                                            >
                                                                <MenuItem value="Yes">Yes</MenuItem>
                                                                <MenuItem value="No">No</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                    {comprehensiveFactoryWarrantyValid === "Yes" && (
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                            <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                                In Service Date
                                                            </Typography>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                id="sale"
                                                                name="saleDate"
                                                                type="date"
                                                                value={serviceDate}
                                                                onChange={(e) => {
                                                                    setServiceDate(e.target.value);
                                                                    setServiceDateText(e.target.value);
                                                                    // setVehicleDeliveryDate(e.target.value);
                                                                    // setVehicleDeliveryDateText(e.target.value);
                                                                }}
                                                                sx={{
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            borderColor: 'lightgray',
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: 'lightgray',
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: 'lightgray',
                                                                        },
                                                                    },
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true, // Ensures the label doesn't overlap with the date input
                                                                }}
                                                            />
                                                        </Box>
                                                    )}

                                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                        <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                            Is a Commercial Vehicle?
                                                        </Typography>
                                                        <FormControl fullWidth required >
                                                            <Select
                                                                value={commercialVehicle}
                                                                onChange={(e) => {
                                                                    setCommercialVehicle(e.target.value);
                                                                }}
                                                                MenuProps={{
                                                                    PaperProps: {
                                                                        style: {
                                                                            maxHeight: 200,
                                                                        },
                                                                    },
                                                                }}
                                                                sx={{
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            borderColor: 'lightgray',
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            borderColor: 'lightgray',
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: 'lightgray',
                                                                        },
                                                                    },
                                                                }}
                                                            >
                                                                <MenuItem value="Yes">Yes</MenuItem>
                                                                <MenuItem value="No">No</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>

                                                </Stack>




                                            </>




                                        </Box>
                                    </form>
                                </>
                                : activeStep == 1 ?
                                    <>


                                        <form >
                                            <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                                                {/* <Toolbar /> */}

                                                <Typography variant="h5" sx={{ color: 'grey' }}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',  // Added this line
                                                            marginBottom: "1em",
                                                            padding: "0px"
                                                        }}
                                                    >
                                                        {/* <LockResetIcon sx={{ fontSize: '30px', color: 'grey' }} /> */}
                                                        <Typography variant="h5" sx={{ color: 'grey', marginLeft: '0', color: 'black', fontWeight: '500', fontSize: '20px' }}>
                                                            Select a warranty product
                                                        </Typography>

                                                    </Box>
                                                </Typography>
                                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>

                                                    <FormControl fullWidth required >
                                                        <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                            Warranty Class
                                                        </Typography>
                                                        <Select
                                                            labelId="warranty-class-select"
                                                            id="warranty-class-select"
                                                            value={warrantyClass}

                                                            onChange={(e) => {
                                                                handleWarrantyChange(e);
                                                                setWarrantyProtection("");
                                                            }}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    style: {
                                                                        maxHeight: 200,
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    '& fieldset': {
                                                                        borderColor: 'lightgray', // Default border color
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: 'lightgray', // Hover border color
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: 'lightgray', // Disable focus border change
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>Please Select Warranty Class</em>
                                                            </MenuItem>
                                                            {/* <MenuItem value="Gold">Gold</MenuItem>
                                                            <MenuItem value="Silver">Silver</MenuItem>
                                                            <MenuItem value="Bronze">Bronze</MenuItem> */}
                                                            {categoryList.map((category, index) => (
                                                                <MenuItem key={index} value={category.id}>
                                                                    {category.categoryName}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl fullWidth required sx={{ marginTop: "1em" }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            gutterBottom
                                                            sx={{ marginBottom: "0.5em" }}
                                                        >
                                                            Warranty Type
                                                        </Typography>
                                                        <Select
                                                            labelId="warranty-type-select"
                                                            id="warranty-type-select"
                                                            value={warrantyType}
                                                            onChange={(e) => {
                                                                setWarrantyType(e.target.value);
                                                                setWarrantyProtection("");
                                                                fetchWarrantyProtection(e);
                                                            }
                                                            }
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    style: { maxHeight: 200 },
                                                                },
                                                            }}
                                                            sx={{
                                                                "& .MuiOutlinedInput-root": {
                                                                    "& fieldset": { borderColor: "lightgray" },
                                                                    "&:hover fieldset": { borderColor: "lightgray" },
                                                                    "&.Mui-focused fieldset": { borderColor: "lightgray" },
                                                                },
                                                            }}
                                                            disabled={!warrantyClass} // Disable if no class is selected
                                                        >
                                                            <MenuItem value="">
                                                                <em>Select Warranty Type</em>
                                                            </MenuItem>
                                                            {/* {warrantyTypeOptions.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))} */}

                                                            {subcategoryList.map((subcategory, index) => (
                                                                <MenuItem key={index} value={subcategory.id}>
                                                                    {subcategory.subcategory}
                                                                </MenuItem>
                                                            ))}

                                                        </Select>
                                                    </FormControl>

                                                    <FormControl fullWidth required >
                                                        <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                                            Warranty Protection
                                                        </Typography>
                                                        <Select
                                                            labelId="warranty-protection-select"
                                                            id="warranty-protection-select"
                                                            value={warrantyProtection}
                                                            onChange={(e) => {
                                                                setWarrantyProtection(e.target.value);
                                                                handleWarrantyProtectionChange(e);
                                                            }}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    style: {
                                                                        maxHeight: 200,
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    '& fieldset': {
                                                                        borderColor: 'lightgray', // Default border color
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: 'lightgray', // Hover border color
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: 'lightgray', // Disable focus border change
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>Select Warranty Protection</em>
                                                            </MenuItem>
                                                            {/* {warrantyProtectionsTypes.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))} */}
                                                            {warrantyProtectionList.map((warrantyprotection, index) => (
                                                                <MenuItem key={index} value={warrantyprotection.id}>
                                                                    {warrantyprotection.warrantyprotection}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                </Stack>

                                                <br />
                                            </Box>
                                        </form>

                                    </> : activeStep == 2 ?
                                        <>
                                            <Typography variant="h5" sx={{ color: 'grey' }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',  // Added this line
                                                        marginTop: "100px",
                                                        padding: "0px"
                                                    }}
                                                >
                                                    {/* <LockResetIcon sx={{ fontSize: '30px', color: 'grey' }} /> */}
                                                    <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px', color: 'black', fontWeight: '500', fontSize: '20px' }}>

                                                        Pricing
                                                    </Typography>

                                                </Box>
                                            </Typography>

                                            <br></br>
                                            <form >
                                                <Box
                                                    component="main"
                                                    sx={{
                                                        width: '100%',        // Set the width to 100%
                                                        flexGrow: 1,
                                                        p: 0,
                                                        border: '1px solid rgb(229 231 235 / 99%)',
                                                        borderRadius: '8px',
                                                        boxSizing: 'border-box' // Ensures padding and border are included in the width calculation
                                                    }}
                                                >
                                                    {/* <Toolbar /> */}

                                                    <PricingTab packages={packages} setPackages={setPackages} packagesTypes={packagesTypes} setPackagesType={setPackagesType} productIndex={productIndex} setProductIndex={setProductIndex} setProductName={setProductName} setProductCost={setProductCost} handleNext={handleNext} setPackagesText={setPackagesText} setGiftCardCredit={setGiftCardCredit} setOriginalCost={setOriginalCost} productRef={productRef} />
                                                </Box>

                                            </form>

                                        </> : activeStep == 9 ?
                                            <>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item lg={4}>
                                                            <Item>
                                                                <Typography variant="h5" sx={{ color: 'grey' }}>
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'space-between',
                                                                            marginBottom: "1em",
                                                                            padding: "0px"
                                                                        }}
                                                                    >
                                                                        <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px', color: 'black', fontWeight: '500', fontSize: '20px' }}>
                                                                            RoadSide Assistance
                                                                        </Typography>

                                                                        <Button variant="outlined" size="small" onClick={handleClickOpen}>
                                                                            Pricing
                                                                        </Button>
                                                                        <Dialog
                                                                            open={open}
                                                                            onClose={handleCloseModel}
                                                                            sx={{
                                                                                '& .MuiDialog-paper': {
                                                                                    width: '200px',  // Set fixed width for the dialog
                                                                                    margin: 'auto',  // Center the dialog horizontally and vertically
                                                                                },
                                                                            }}
                                                                            aria-labelledby="responsive-dialog-title"
                                                                        >
                                                                            <DialogTitle id="responsive-dialog-title">
                                                                                {"Pricing"}
                                                                            </DialogTitle>
                                                                            <DialogContent>
                                                                                <DialogContentText>
                                                                                    <Typography>1 Year: $45</Typography>
                                                                                    <Typography>2 Year: $80</Typography>
                                                                                    <Typography>3 Year: $115</Typography>
                                                                                    <Typography>4 Year: $135</Typography>
                                                                                    <Typography>5 Year: $165</Typography>
                                                                                </DialogContentText>
                                                                            </DialogContent>
                                                                            <DialogActions>
                                                                                <Button autoFocus onClick={handleCloseModel}>
                                                                                    Close
                                                                                </Button>
                                                                            </DialogActions>
                                                                        </Dialog>
                                                                    </Box>
                                                                </Typography>

                                                                <form>
                                                                    <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                                                                        <Stack direction="row" spacing={1} sx={{ alignItems: 'left' }}>
                                                                            <FormControl fullWidth required >
                                                                                <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em', textAlign: 'left' }}>
                                                                                    Warranty Option
                                                                                </Typography>
                                                                                <Select
                                                                                    labelId="warranty-option-select"
                                                                                    id="warranty-option-select"
                                                                                    value={warrantyOption}
                                                                                    onChange={(e) => {
                                                                                        setWarrantyOption(e.target.value);
                                                                                        setWarrantyOptionText(e.target.value);
                                                                                        warrantyOptionPrice(e);
                                                                                    }}
                                                                                    MenuProps={{
                                                                                        PaperProps: {
                                                                                            style: {
                                                                                                maxHeight: 200,
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                    sx={{
                                                                                        '& .MuiOutlinedInput-root': {
                                                                                            '& fieldset': {
                                                                                                borderColor: 'lightgray', // Default border color
                                                                                            },
                                                                                            '&:hover fieldset': {
                                                                                                borderColor: 'lightgray', // Hover border color
                                                                                            },
                                                                                            '&.Mui-focused fieldset': {
                                                                                                borderColor: 'lightgray', // Disable focus border change
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                >
                                                                                    <MenuItem value="">
                                                                                        <em>Select Warranty Option</em>
                                                                                    </MenuItem>
                                                                                    <MenuItem value="0">None</MenuItem>
                                                                                    <MenuItem value="1">1 Year</MenuItem>
                                                                                    <MenuItem value="2">2 Year</MenuItem>
                                                                                    <MenuItem value="3">3 Year</MenuItem>
                                                                                    <MenuItem value="4">4 Year</MenuItem>
                                                                                    <MenuItem value="5">5 Year</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Stack>

                                                                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                                            <FormControl fullWidth required >
                                                                                <TextField
                                                                                    disabled
                                                                                    margin="normal"
                                                                                    id="coverageDetails"
                                                                                    label="Coverage Details"
                                                                                    name="coverageDetails"
                                                                                    multiline
                                                                                    rows={15} // Adjust the number of rows as needed
                                                                                    defaultValue={`Coverage:
Your policy allows a maximum of four (4) services per year combined. This policy covers the named vehicle only.
Services: 
1.  Tire change: If you have a flat or deflated tire, one of our service providers will install the vehicle’s spare tire if it is usable.
2.  Fuel delivery: In the event that your vehicle runs out of fuel, up to 5 liters of fuel will be delivered free of charge. Specific quantities, brands or octane numbers cannot be guaranteed.
3.  Battery recharge: If your vehicle's battery is discharged, one of our service providers will boost its battery in an attempt to allow it to operate autonomously. If your vehicle is still unable to start, we will provide a towing service (will be considered a single service).
4.  Winching: In the event that your vehicle is stuck, the nearest service provider will be sent to proceed with the winching of your vehicle, from a road where the operator has clear and unobstructed access to the vehicle.
5.  Towing Services: If your vehicle is immobilized due to a mechanical failure, it will be towed to the nearest authorized service facility within 40 km of your service location. 
Exceptions:
•   Vehicles that have broken down in an exclusive zone must obtain their own towing service and then submit the receipts for possible reimbursement to VCG Group. The maximum amount of eligible reimbursement is $100.
•   Any towing service longer than 40 km may be billed directly to the customer at the time of delivery of the vehicle to the authorized establishment.
•   Unlock service: In the event that your keys are lost, broken or locked in the vehicle, we will send an authorized person to attempt to unlock your vehicle.
•   Please note that you may need to sign a release form before services are rendered.
•   In the event that a new key is required, you will be responsible for the cost of replacing the key.
•   Frozen locks are not covered by the unlock service but we can tow your vehicle to a warmer place designated by you. The cost of this towing service will be at your expense.
* The vehicle operator must be present for services to be rendered.`}
                                                                                    inputProps={{
                                                                                        style: { textAlign: 'left' },  // Align text to the left
                                                                                    }}
                                                                                    sx={{
                                                                                        '& .MuiOutlinedInput-root': {
                                                                                            '& fieldset': {
                                                                                                borderColor: 'lightgray', // Default border color
                                                                                            },
                                                                                            '&:hover fieldset': {
                                                                                                borderColor: 'lightgray', // Hover border color
                                                                                            },
                                                                                            '&.Mui-focused fieldset': {
                                                                                                borderColor: 'lightgray', // Disable focus border change
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                        </Stack>
                                                                    </Box>
                                                                </form>
                                                            </Item>
                                                        </Grid>
                                                        <Grid item lg={4}>
                                                            <Item>
                                                                <Typography variant="h5" sx={{ color: 'grey' }}>
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'space-between',
                                                                            marginBottom: "1em",
                                                                            padding: "0px"
                                                                        }}
                                                                    >
                                                                        <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px', color: 'black', fontWeight: '500', fontSize: '20px', textAlign: 'left' }}>
                                                                            High Ratio Coverage
                                                                        </Typography>

                                                                        {/* <Button variant="outlined" onClick={handleClickOpen}>
                                                                        Pricing
                                                                    </Button> */}
                                                                        <Dialog
                                                                            open={open}
                                                                            onClose={handleCloseModel}
                                                                            sx={{
                                                                                '& .MuiDialog-paper': {
                                                                                    width: '200px',  // Set fixed width for the dialog
                                                                                    margin: 'auto',  // Center the dialog horizontally and vertically
                                                                                },
                                                                            }}
                                                                            aria-labelledby="responsive-dialog-title"
                                                                        >
                                                                            <DialogTitle id="responsive-dialog-title">
                                                                                {"Pricing"}
                                                                            </DialogTitle>
                                                                            <DialogContent>
                                                                                <DialogContentText>
                                                                                    <Typography>1 Year: $45</Typography>
                                                                                    <Typography>2 Year: $80</Typography>
                                                                                    <Typography>3 Year: $115</Typography>
                                                                                    <Typography>4 Year: $135</Typography>
                                                                                    <Typography>5 Year: $165</Typography>
                                                                                </DialogContentText>
                                                                            </DialogContent>
                                                                            <DialogActions>
                                                                                <Button autoFocus onClick={handleCloseModel}>
                                                                                    Close
                                                                                </Button>
                                                                            </DialogActions>
                                                                        </Dialog>
                                                                    </Box>
                                                                </Typography>

                                                                <form>
                                                                    <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                                                                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                                            <FormControl fullWidth required >
                                                                                <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em', textAlign: 'left' }}>
                                                                                    High Ratio Coverage
                                                                                </Typography>
                                                                                <Select
                                                                                    labelId="high-ratio-coverage-label"
                                                                                    id="high-ratio-coverage-select"
                                                                                    value={highRatioCoverage}
                                                                                    // label="High Ratio Coverage"
                                                                                    onChange={(e) => {
                                                                                        setHighRatioCoverage(e.target.value);
                                                                                        setHighRatioCoverageText(e.target.value);
                                                                                        highRatioCoverageAmount(e);
                                                                                    }}
                                                                                    MenuProps={{
                                                                                        PaperProps: {
                                                                                            style: {
                                                                                                maxHeight: 200,
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                    sx={{
                                                                                        '& .MuiOutlinedInput-root': {
                                                                                            '& fieldset': {
                                                                                                borderColor: 'lightgray', // Default border color
                                                                                            },
                                                                                            '&:hover fieldset': {
                                                                                                borderColor: 'lightgray', // Hover border color
                                                                                            },
                                                                                            '&.Mui-focused fieldset': {
                                                                                                borderColor: 'lightgray', // Disable focus border change
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                >
                                                                                    <MenuItem value="">
                                                                                        <em>Select Option</em>
                                                                                    </MenuItem>
                                                                                    <MenuItem value="No">No</MenuItem>
                                                                                    <MenuItem value="Yes">Yes - include</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Stack>

                                                                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                                            <FormControl fullWidth required >
                                                                                <TextField
                                                                                    disabled
                                                                                    margin="normal"
                                                                                    id="coverageDetails"
                                                                                    label="Coverage Details"
                                                                                    name="coverageDetails"
                                                                                    multiline
                                                                                    rows={15} // Adjust the number of rows as needed
                                                                                    defaultValue={`High Ratio Coverage Option Adds $325`}
                                                                                    inputProps={{
                                                                                        style: { textAlign: 'left' },  // Align text to the left
                                                                                    }}
                                                                                    sx={{
                                                                                        '& .MuiOutlinedInput-root': {
                                                                                            '& fieldset': {
                                                                                                borderColor: 'lightgray', // Default border color
                                                                                            },
                                                                                            '&:hover fieldset': {
                                                                                                borderColor: 'lightgray', // Hover border color
                                                                                            },
                                                                                            '&.Mui-focused fieldset': {
                                                                                                borderColor: 'lightgray', // Disable focus border change
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                        </Stack>
                                                                    </Box>
                                                                </form>
                                                            </Item>
                                                        </Grid>
                                                        <Grid item lg={4}>
                                                            <Item>
                                                                <Typography variant="h5" sx={{ color: 'grey' }}>
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'space-between',
                                                                            marginBottom: "1em",
                                                                            padding: "0px"
                                                                        }}
                                                                    >
                                                                        <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px', color: 'black', fontWeight: '500', fontSize: '20px', textAlign: 'left' }}>
                                                                            Deductible
                                                                        </Typography>

                                                                        {/* <Button variant="outlined" onClick={handleClickOpen}>
                                                                        Pricing
                                                                    </Button> */}
                                                                        <Dialog
                                                                            open={open}
                                                                            onClose={handleCloseModel}
                                                                            sx={{
                                                                                '& .MuiDialog-paper': {
                                                                                    width: '200px',  // Set fixed width for the dialog
                                                                                    margin: 'auto',  // Center the dialog horizontally and vertically
                                                                                },
                                                                            }}
                                                                            aria-labelledby="responsive-dialog-title"
                                                                        >
                                                                            <DialogTitle id="responsive-dialog-title">
                                                                                {"Pricing"}
                                                                            </DialogTitle>
                                                                            <DialogContent>
                                                                                <DialogContentText>
                                                                                    <Typography>1 Year: $45</Typography>
                                                                                    <Typography>2 Year: $80</Typography>
                                                                                    <Typography>3 Year: $115</Typography>
                                                                                    <Typography>4 Year: $135</Typography>
                                                                                    <Typography>5 Year: $165</Typography>
                                                                                </DialogContentText>
                                                                            </DialogContent>
                                                                            <DialogActions>
                                                                                <Button autoFocus onClick={handleCloseModel}>
                                                                                    Close
                                                                                </Button>
                                                                            </DialogActions>
                                                                        </Dialog>
                                                                    </Box>
                                                                </Typography>

                                                                <form>
                                                                    <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                                                                        <Stack direction="row" spacing={1} sx={{}}>
                                                                            <FormControl fullWidth required >
                                                                                <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em', textAlign: 'left' }}>
                                                                                    Deductible
                                                                                </Typography>
                                                                                <Select
                                                                                    labelId="demo-simple-select-label"
                                                                                    id="demo-simple-select"
                                                                                    value={deductible}
                                                                                    // label="Deductible"
                                                                                    onChange={(e) => { setDeductible(e.target.value); setDeductibleText(e.target.value); }}
                                                                                    MenuProps={{
                                                                                        PaperProps: {
                                                                                            style: {
                                                                                                maxHeight: 200,
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                    sx={{
                                                                                        '& .MuiOutlinedInput-root': {
                                                                                            '& fieldset': {
                                                                                                borderColor: 'lightgray', // Default border color
                                                                                            },
                                                                                            '&:hover fieldset': {
                                                                                                borderColor: 'lightgray', // Hover border color
                                                                                            },
                                                                                            '&.Mui-focused fieldset': {
                                                                                                borderColor: 'lightgray', // Disable focus border change
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                >
                                                                                    <MenuItem value="">
                                                                                        <em>Select Option</em>
                                                                                    </MenuItem>
                                                                                    <MenuItem value="$0 Deductible">$0 Deductible Included</MenuItem>
                                                                                    {/* <MenuItem value="1">Yes - include</MenuItem> */}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Stack>

                                                                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                                            <FormControl fullWidth required >
                                                                                <TextField
                                                                                    disabled
                                                                                    margin="normal"
                                                                                    id="coverageDetails"
                                                                                    label="Coverage Details"
                                                                                    name="coverageDetails"
                                                                                    multiline
                                                                                    rows={15} // Adjust the number of rows as needed
                                                                                    defaultValue={`$0 Deductible Cost: (Included)`}
                                                                                    inputProps={{
                                                                                        style: { textAlign: 'left' }  // Align text to the right
                                                                                    }}
                                                                                    sx={{
                                                                                        '& .MuiOutlinedInput-root': {
                                                                                            '& fieldset': {
                                                                                                borderColor: 'lightgray', // Default border color
                                                                                            },
                                                                                            '&:hover fieldset': {
                                                                                                borderColor: 'lightgray', // Hover border color
                                                                                            },
                                                                                            '&.Mui-focused fieldset': {
                                                                                                borderColor: 'lightgray', // Disable focus border change
                                                                                            },
                                                                                        },
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                        </Stack>
                                                                    </Box>
                                                                </form>
                                                            </Item>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </>
                                            : activeStep == 3 ?
                                                <>


                                                    <form >
                                                        <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                                                            {/* <Toolbar /> */}

                                                            <Typography variant="h5" sx={{ color: 'grey' }}>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',  // Added this line
                                                                        marginBottom: "1.5em",
                                                                        padding: "0px"
                                                                    }}
                                                                >

                                                                    <Typography variant="h5" sx={{ color: 'grey', marginLeft: '0', color: 'black', fontWeight: '500', fontSize: '20px', }}>
                                                                        Customer Information
                                                                    </Typography>

                                                                    <Dialog
                                                                        fullScreen={fullScreen}
                                                                        open={open}
                                                                        onClose={handleCloseModel}
                                                                        aria-labelledby="responsive-dialog-title"
                                                                    >
                                                                        <DialogTitle id="responsive-dialog-title">
                                                                            {"Pricing"}
                                                                        </DialogTitle>
                                                                        <DialogContent>
                                                                            <DialogContentText>
                                                                                <Typography>1 Year: $45</Typography>
                                                                                <Typography>2 Year: $80</Typography>
                                                                                <Typography>3 Year: $115</Typography>
                                                                                <Typography>4 Year: $135</Typography>
                                                                                <Typography>5 Year: $165</Typography>
                                                                            </DialogContentText>

                                                                        </DialogContent>
                                                                        <DialogActions>
                                                                            <Button autoFocus onClick={handleCloseModel}>
                                                                                Close
                                                                            </Button>

                                                                        </DialogActions>
                                                                    </Dialog>

                                                                </Box>
                                                            </Typography>
                                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Customer First Name&nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField
                                                                        required

                                                                        value={customerFirstName}
                                                                        onChange={(e) => {
                                                                            setCustomerFirstName(e.target.value);
                                                                            setCustomerFirstNameText(e.target.value);
                                                                        }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Customer Last Name &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField
                                                                        required

                                                                        value={customerLastName}
                                                                        onChange={(e) => {
                                                                            setCustomerLastName(e.target.value);
                                                                            setCustomerLastNameText(e.target.value);
                                                                        }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Street Address &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField
                                                                        required

                                                                        value={streetAddress}
                                                                        onChange={(e) => {
                                                                            setStreetAddress(e.target.value);
                                                                            setStreetAddressText(e.target.value);
                                                                        }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Town/City &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField
                                                                        required
                                                                        value={town}
                                                                        onChange={(e) => {
                                                                            setTown(e.target.value);
                                                                            setTownText(e.target.value);
                                                                        }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            </Stack>
                                                            <br></br>
                                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}> {/* Adjusted margin-bottom for consistent spacing */}
                                                                        Province &nbsp;
                                                                        <Typography component="span" color="error">*</Typography>
                                                                    </Typography>
                                                                    <Select
                                                                        required
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={province}
                                                                        onChange={(e) => { setProvince(e.target.value); setProvinceText(e.target.value); }}
                                                                        MenuProps={{
                                                                            PaperProps: {
                                                                                style: {
                                                                                    maxHeight: 200,
                                                                                },
                                                                            },
                                                                        }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    >
                                                                        <MenuItem value="Alberta">Alberta</MenuItem>
                                                                        <MenuItem value="British Columbia">British Columbia</MenuItem>
                                                                        <MenuItem value="Manitoba">Manitoba</MenuItem>
                                                                        <MenuItem value="New Brunswick">New Brunswick</MenuItem>
                                                                        <MenuItem value="Newfoundland and Labrador">Newfoundland and Labrador</MenuItem>
                                                                        <MenuItem value="Northwest Territories">Northwest Territories</MenuItem>
                                                                        <MenuItem value="Nova Scotia">Nova Scotia</MenuItem>
                                                                        <MenuItem value="Nunavut">Nunavut</MenuItem>
                                                                        <MenuItem value="Ontario">Ontario</MenuItem>
                                                                        <MenuItem value="Prince Edward Island">Prince Edward Island</MenuItem>
                                                                        <MenuItem value="Québec">Québec</MenuItem>
                                                                        <MenuItem value="Saskatchewan">Saskatchewan</MenuItem>
                                                                        <MenuItem value="Yukon">Yukon</MenuItem>
                                                                    </Select>
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}> {/* Ensured margin-bottom is the same as above */}
                                                                        Postal Code &nbsp;
                                                                        <Typography component="span" color="error">*</Typography>
                                                                    </Typography>
                                                                    <TextField
                                                                        required
                                                                        value={postalCode}
                                                                        MenuProps={{
                                                                            PaperProps: {
                                                                                style: {
                                                                                    maxHeight: 200,
                                                                                },
                                                                            },
                                                                        }}
                                                                        onChange={(e) => { setPostalCode(e.target.value); setPostalCodeText(e.target.value); }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Customer Phone &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField
                                                                        required

                                                                        value={customerPhone}
                                                                        onChange={(e) => {
                                                                            const input = e.target.value;
                                                                            if (/^\d{0,12}$/.test(input)) {
                                                                                setCustomerPhone(e.target.value);
                                                                                setCustomerPhoneText(e.target.value);
                                                                            }
                                                                        }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Customer Email &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField
                                                                        required

                                                                        value={customerEmail}
                                                                        onChange={(e) => { handleEmailChange(e); }}
                                                                        error={errorText} // Set error state
                                                                        helperText={errorText ? "Please enter a valid email" : ""}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            </Stack>
                                                            <br></br>
                                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Driver's License &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField
                                                                        required

                                                                        value={driverLicence}
                                                                        onChange={(e) => { setDriverLicence(e.target.value); setDriverLicenceText(e.target.value) }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Customer Language &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <Select
                                                                        required

                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={customerLanguage}
                                                                        onChange={handleLanguageChange}
                                                                        MenuProps={{
                                                                            PaperProps: {
                                                                                style: {
                                                                                    maxHeight: 200,
                                                                                },
                                                                            },
                                                                        }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    >
                                                                        <MenuItem value="English">English</MenuItem>
                                                                        <MenuItem value="Francais">Francais</MenuItem>
                                                                    </Select>
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Deal Notes &nbsp;
                                                                    </Typography>
                                                                    <TextField
                                                                        required

                                                                        value={dealNotes}
                                                                        onChange={(e) => { setDealNotes(e.target.value); setDealNotesText(e.target.value); }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            </Stack>
                                                            <br></br>

                                                        </Box>
                                                        <br></br>
                                                        <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                                                            {/* <Toolbar /> */}
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',  // Added this line
                                                                    marginBottom: "1.5em",
                                                                    padding: "0px"
                                                                }}
                                                            >

                                                                <Typography variant="h5" sx={{ color: 'grey', marginLeft: '0', color: 'black', fontWeight: '500', fontSize: '20px' }}>
                                                                    Vehicle Information
                                                                </Typography>

                                                                <Dialog
                                                                    fullScreen={fullScreen}
                                                                    open={open}
                                                                    onClose={handleCloseModel}
                                                                    aria-labelledby="responsive-dialog-title"
                                                                >
                                                                    <DialogTitle id="responsive-dialog-title">
                                                                        {"Pricing"}
                                                                    </DialogTitle>
                                                                    <DialogContent>
                                                                        <DialogContentText>
                                                                            <Typography>1 Year: $45</Typography>
                                                                            <Typography>2 Year: $80</Typography>
                                                                            <Typography>3 Year: $115</Typography>
                                                                            <Typography>4 Year: $135</Typography>
                                                                            <Typography>5 Year: $165</Typography>
                                                                        </DialogContentText>

                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button autoFocus onClick={handleCloseModel}>
                                                                            Close
                                                                        </Button>

                                                                    </DialogActions>
                                                                </Dialog>

                                                            </Box>


                                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>VIN &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField
                                                                        // disabled
                                                                        value={vinCust}
                                                                        onChange={(e) => { setVinCust(e.target.value); setVinCustText(e.target.value); }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Sale Price Of The Vehicle</Typography>
                                                                    <TextField
                                                                        disabled
                                                                        value={salePriceofVehicleCust}
                                                                        onChange={(e) => { setSalePriceofVehicleCust(e.target.value); setSalePriceofVehicleCustText(e.target.value); }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Finance Company &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField

                                                                        value={financeCompany}
                                                                        onChange={(e) => { setFinanceCompany(e.target.value); setFinanceCompanyText(e.target.value); }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <Typography variant="body1" sx={{ marginBottom: '0.5em' }}>Vehicle Delivery Date &nbsp;
                                                                        <Typography component="span" color="error">*</Typography></Typography>
                                                                    <TextField

                                                                        id="sale"
                                                                        name="saleDate"
                                                                        type="date"
                                                                        value={vehicleDeliveryDate}
                                                                        onChange={(e) => { setVehicleDeliveryDate(e.target.value); setVehicleDeliveryDateText(e.target.value); }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                            },
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true, // Ensures the label doesn't overlap with the date input
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            </Stack>
                                                            <br></br>
                                                            <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px', color: 'black', fontWeight: '500', fontSize: '20px' }}>
                                                                Final warranty Price
                                                            </Typography>
                                                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 5 }}>
                                                                {/* First FormControl */}
                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="product-label" sx={{ fontWeight: 'bold' }}>
                                                                        Product
                                                                    </InputLabel>
                                                                    {/* Add your Select or Input component here for Product */}
                                                                </FormControl>

                                                                {/* Second FormControl */}
                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="service-label">{productName}</InputLabel>
                                                                    {/* Add your Select or Input component here for Service */}
                                                                </FormControl>
                                                            </Stack>

                                                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 5 }}>
                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="product-label" sx={{ fontWeight: 'bold' }}>
                                                                        Deductible
                                                                    </InputLabel>
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="service-label">${deductiblePriceText} Deductible</InputLabel>
                                                                </FormControl>
                                                            </Stack>

                                                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 5 }}>
                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="product-label" sx={{ fontWeight: 'bold' }}>
                                                                        Roadside
                                                                    </InputLabel>
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="service-label">{warrantyOptionText + " Year"}</InputLabel>
                                                                </FormControl>
                                                            </Stack>

                                                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 5 }}>
                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="product-label" sx={{ fontWeight: 'bold' }}>
                                                                        Unlimited Mileage:
                                                                    </InputLabel>
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="service-label">No</InputLabel>
                                                                </FormControl>
                                                            </Stack>

                                                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 5 }}>
                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="product-label" sx={{ fontWeight: 'bold' }}>
                                                                        Financial Gap Coverage:
                                                                    </InputLabel>
                                                                </FormControl>

                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="service-label">None</InputLabel>
                                                                </FormControl>
                                                            </Stack>

                                                            {/* <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 5 }}>
                                                                <FormControl fullWidth required >
                                                                    <InputLabel id="product-label" sx={{ fontWeight: 'bold' }}>
                                                                        Warranty Sold For:
                                                                    </InputLabel>
                                                                </FormControl>

                                                                <FormControl fullWidth required sx={{}}>
                                                                    <TextField
                                                                        required
                                                                        fullWidth
                                                                        id="sale"
                                                                        
                                                                        name="sale"
                                                                        value={warrantySoldFor}
                                                                        onChange={(e) => { setWarrantySoldFor(e.target.value); setWarrantySoldForText(e.target.value); }}
                                                                        InputProps={{
                                                                            endAdornment: <InputAdornment position="end">$</InputAdornment>,
                                                                        }}
                                                                        sx={{
                                                                            '& .MuiOutlinedInput-root': {
                                                                                '& fieldset': {
                                                                                    borderColor: 'lightgray', // Default border color
                                                                                },
                                                                                '&:hover fieldset': {
                                                                                    borderColor: 'lightgray', // Hover border color
                                                                                },
                                                                                '&.Mui-focused fieldset': {
                                                                                    borderColor: 'lightgray', // Keep the same color on focus
                                                                                },
                                                                                marginTop: '25px'
                                                                            },
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            </Stack> */}
                                                            <br></br>
                                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',  // Stack label and input vertically
                                                                        alignItems: 'flex-start',
                                                                        backgroundColor: '#f5f5f5',
                                                                        padding: '8px 16px',
                                                                        borderRadius: '8px',
                                                                        width: '100%',
                                                                        maxWidth: '500px',
                                                                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{ marginBottom: '8px', fontWeight: 'bold', color: '#333' }}
                                                                        variant="body1"
                                                                    >
                                                                        Warranty Sold For:
                                                                    </Typography>

                                                                    <Box sx={{ display: 'flex', width: '100%' }}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            sx={{
                                                                                '& .MuiOutlinedInput-root': {
                                                                                    '& fieldset': {
                                                                                        borderColor: 'lightgray', // Default border color
                                                                                    },
                                                                                    '&:hover fieldset': {
                                                                                        borderColor: 'lightgray', // Hover border color
                                                                                    },
                                                                                    '&.Mui-focused fieldset': {
                                                                                        borderColor: 'lightgray', // Disable focus border change
                                                                                    },
                                                                                },
                                                                            }}
                                                                            value={warrantySoldFor}
                                                                            onChange={(e) => {
                                                                                const input = e.target.value;
                                                                                // Allow only digits and limit input to 6 characters
                                                                                if (/^\d+$/.test(input)) {
                                                                                    setWarrantySoldFor(e.target.value);
                                                                                    setWarrantySoldForText(e.target.value);
                                                                                }
                                                                            }}
                                                                        />
                                                                        {/* <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        sx={{ backgroundColor: '#0d2365', padding: '8px 16px', marginLeft: '8px' }}
                                                                        onClick={(e) => getVinDetails(e)}
                                                                    >
                                                                        Decode
                                                                    </Button> */}
                                                                    </Box>
                                                                </Box>

                                                            </Stack>

                                                        </Box>


                                                    </form>

                                                </> : activeStep == 4 ?
                                                    <>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Grid container spacing={2}>
                                                                <Grid item lg={4}>
                                                                    <Item sx={{ height: '380px' }}>
                                                                        <Typography variant="h5" sx={{ color: 'grey' }}>
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'space-between',
                                                                                    marginTop: "0",
                                                                                    padding: "0px"
                                                                                }}
                                                                            >
                                                                                <AppBar position="left" sx={{
                                                                                    backgroundColor: '#0d2365',  // Change background color to navy blue
                                                                                    '&:hover': {
                                                                                        backgroundColor: '#0d2365',  // Darken the color on hover
                                                                                    },
                                                                                }}>
                                                                                    <Toolbar>
                                                                                        <Typography component="h1" variant="h6" sx={{ textAlign: 'left', width: '100%', }}>
                                                                                            Customer Details
                                                                                        </Typography>
                                                                                    </Toolbar>
                                                                                </AppBar>

                                                                                {/* <Button variant="outlined" onClick={handleClickOpen}>
                                                                                    Pricing
                                                                                </Button> */}
                                                                                <Dialog
                                                                                    // open={open}
                                                                                    // onClose={handleCloseModel}
                                                                                    sx={{
                                                                                        '& .MuiDialog-paper': {
                                                                                            width: '200px',  // Set fixed width for the dialog
                                                                                            margin: 'auto',  // Center the dialog horizontally and vertically
                                                                                        },
                                                                                    }}
                                                                                    aria-labelledby="responsive-dialog-title"
                                                                                >
                                                                                    <DialogTitle id="responsive-dialog-title">
                                                                                        {"Pricing"}
                                                                                    </DialogTitle>
                                                                                    <DialogContent>
                                                                                        <DialogContentText>
                                                                                            <Typography>1 Year: $45</Typography>
                                                                                            <Typography>2 Year: $80</Typography>
                                                                                            <Typography>3 Year: $115</Typography>
                                                                                            <Typography>4 Year: $135</Typography>
                                                                                            <Typography>5 Year: $165</Typography>
                                                                                        </DialogContentText>
                                                                                    </DialogContent>
                                                                                    <DialogActions>
                                                                                        <Button autoFocus onClick={handleCloseModel}>
                                                                                            Close
                                                                                        </Button>
                                                                                    </DialogActions>
                                                                                </Dialog>
                                                                            </Box>
                                                                        </Typography>

                                                                        <form>
                                                                            <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>


                                                                                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
                                                                                    <Box
                                                                                        sx={{
                                                                                            flexGrow: 1,  // Allows the Box to expand and take up available space
                                                                                            padding: '8px 16px',  // Add some padding for spacing
                                                                                            backgroundColor: 'rgb(231 231 231 / 38%)',  // Light blue background
                                                                                            border: '1px solid #ccc',  // Border color
                                                                                            borderRadius: '4px',  // Optional: rounded corners
                                                                                        }}
                                                                                    >
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Name: {customerFirstNameText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Phone: {customerPhoneText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Email: {customerEmailText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Driver License: {driverLicenceText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Street Address: {streetAddressText}</Typography>
                                                                                    </Box>
                                                                                </Stack>
                                                                            </Box>
                                                                        </form>
                                                                    </Item>
                                                                </Grid>
                                                                <Grid item lg={4}>
                                                                    <Item sx={{ height: '380px' }}>
                                                                        <Typography variant="h5" sx={{ color: 'grey' }}>
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'space-between',
                                                                                    marginTop: "0px",
                                                                                    padding: "0px"
                                                                                }}
                                                                            >
                                                                                <AppBar position="left" sx={{
                                                                                    backgroundColor: '#0d2365',  // Change background color to navy blue
                                                                                    '&:hover': {
                                                                                        backgroundColor: '#0d2365',  // Darken the color on hover
                                                                                    },
                                                                                }}>
                                                                                    <Toolbar>
                                                                                        <Typography component="h1" variant="h6" sx={{ textAlign: 'left', width: '100%' }}>
                                                                                            Vehicle Details
                                                                                        </Typography>
                                                                                    </Toolbar>
                                                                                </AppBar>

                                                                                {/* <Button variant="outlined" onClick={handleClickOpen}>
                                                                                    Pricing
                                                                                </Button> */}
                                                                                <Dialog
                                                                                    // open={open}
                                                                                    // onClose={handleCloseModel}
                                                                                    sx={{
                                                                                        '& .MuiDialog-paper': {
                                                                                            width: '200px',  // Set fixed width for the dialog
                                                                                            margin: 'auto',  // Center the dialog horizontally and vertically
                                                                                        },
                                                                                    }}
                                                                                    aria-labelledby="responsive-dialog-title"
                                                                                >
                                                                                    <DialogTitle id="responsive-dialog-title">
                                                                                        {"Pricing"}
                                                                                    </DialogTitle>
                                                                                    <DialogContent>
                                                                                        <DialogContentText>
                                                                                            <Typography>1 Year: $45</Typography>
                                                                                            <Typography>2 Year: $80</Typography>
                                                                                            <Typography>3 Year: $115</Typography>
                                                                                            <Typography>4 Year: $135</Typography>
                                                                                            <Typography>5 Year: $165</Typography>
                                                                                        </DialogContentText>
                                                                                    </DialogContent>
                                                                                    <DialogActions>
                                                                                        <Button autoFocus onClick={handleCloseModel}>
                                                                                            Close
                                                                                        </Button>
                                                                                    </DialogActions>
                                                                                </Dialog>
                                                                            </Box>
                                                                        </Typography>

                                                                        <form>
                                                                            <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>


                                                                                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
                                                                                    <Box
                                                                                        sx={{
                                                                                            flexGrow: 1,  // Allows the Box to expand and take up available space
                                                                                            padding: '8px 16px',  // Add some padding for spacing
                                                                                            backgroundColor: 'rgb(231 231 231 / 38%)',  // Light blue background
                                                                                            border: '1px solid #ccc',  // Border color
                                                                                            borderRadius: '4px',  // Optional: rounded corners
                                                                                        }}
                                                                                    >
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Vehicle: {year + " " + make + "-" + model}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Odometer: {odometerText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>VIN: {vinCust}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Sale Price: {salePriceofVehicleText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Finance Company: {financeCompanyText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Comprehensive Factory Warranty Valid?: {comprehensiveFactoryWarrantyValidText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>In Service Date: {serviceDateText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Vehicle Delivery Date: {vehicleDeliveryDateText}</Typography>
                                                                                    </Box>
                                                                                </Stack>
                                                                            </Box>
                                                                        </form>
                                                                    </Item>
                                                                </Grid>
                                                                <Grid item lg={4}>
                                                                    <Item sx={{ height: '380px' }}>
                                                                        <Typography variant="h5" sx={{ color: 'grey' }}>
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'space-between',
                                                                                    marginTop: "0px",
                                                                                    padding: "0px"
                                                                                }}
                                                                            >
                                                                                <AppBar position="left" sx={{
                                                                                    backgroundColor: '#0d2365',  // Change background color to navy blue
                                                                                    '&:hover': {
                                                                                        backgroundColor: '#0d2365',  // Darken the color on hover
                                                                                    },
                                                                                }}>
                                                                                    <Toolbar>
                                                                                        <Typography component="h1" variant="h6" sx={{ textAlign: 'left', width: '100%' }}>
                                                                                            Warranty Details
                                                                                        </Typography>
                                                                                    </Toolbar>
                                                                                </AppBar>


                                                                                <Dialog
                                                                                    open={open}
                                                                                    onClose={handleCloseModel}
                                                                                    sx={{
                                                                                        '& .MuiDialog-paper': {
                                                                                            width: '300px',  // Set fixed width for the dialog
                                                                                            margin: 'auto',  // Center the dialog horizontally and vertically
                                                                                        },
                                                                                    }}
                                                                                    aria-labelledby="responsive-dialog-title"
                                                                                >
                                                                                    <DialogTitle id="responsive-dialog-title">
                                                                                        {/* {"Pricing"} */}
                                                                                    </DialogTitle>
                                                                                    <DialogContent>
                                                                                        <DialogContentText>
                                                                                            <Typography>Package Cost: $45</Typography>
                                                                                            <Typography>RoadSide Assitance: $80</Typography>
                                                                                            <Typography>High Ratio Coverage Price: $80</Typography>
                                                                                            <hr></hr>
                                                                                            <Typography>TotalCost: $115</Typography>

                                                                                        </DialogContentText>
                                                                                    </DialogContent>
                                                                                    <DialogActions>
                                                                                        <Button autoFocus onClick={handleCloseModel}>
                                                                                            Close
                                                                                        </Button>
                                                                                    </DialogActions>
                                                                                </Dialog>
                                                                            </Box>
                                                                        </Typography>

                                                                        <form>
                                                                            <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>


                                                                                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
                                                                                    <Box
                                                                                        sx={{
                                                                                            flexGrow: 1,  // Allows the Box to expand and take up available space
                                                                                            padding: '8px 16px',  // Add some padding for spacing
                                                                                            backgroundColor: 'rgb(231 231 231 / 38%)',  // Light blue background
                                                                                            border: '1px solid #ccc',  // Border color
                                                                                            borderRadius: '4px',  // Optional: rounded corners
                                                                                        }}
                                                                                    >
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Product: {productName}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Deductible: {deductibleText}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Roadside: {warrantyOptionText + " Year"}</Typography>
                                                                                        <Typography variant="body1" sx={{ textAlign: "left" }}>Driver License: {driverLicenceText}</Typography>
                                                                                        {
                                                                                            warrantyClass == 26 ? <Typography variant="body1" sx={{ textAlign: "left" }}>GAP Bundle Price: ${warrantySoldForText}</Typography> : <Typography variant="body1" sx={{ textAlign: "left" }}>Warranty Bundle Price: ${warrantySoldForText}</Typography>
                                                                                        }

                                                                                    </Box>
                                                                                </Stack>
                                                                                <br></br>
                                                                                <Stack direction="row" spacing={2} sx={{ alignItems: 'left', width: '10%' }}>
                                                                                    <Button
                                                                                        variant="outlined"
                                                                                        sx={{
                                                                                            flexGrow: 1, // Allows the Button to expand and take up available space
                                                                                            backgroundColor: 'lightblue', // Light blue background
                                                                                            border: '1px solid #ccc', // Border color
                                                                                            borderRadius: '4px', // Optional: rounded corners
                                                                                        }}
                                                                                        onClick={handleClickOpen}
                                                                                    >
                                                                                        C
                                                                                    </Button>
                                                                                </Stack>

                                                                            </Box>
                                                                        </form>
                                                                    </Item>
                                                                </Grid>

                                                            </Grid>
                                                            <br></br>
                                                            <Grid container>
                                                                <Grid item lg={12}>
                                                                    <Item sx={{ height: 'auto' }}>
                                                                        <Typography variant="h5" sx={{ color: 'grey' }}>
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'space-between',
                                                                                    marginTop: "0px",
                                                                                    padding: "0px"
                                                                                }}
                                                                            >
                                                                                <AppBar position="left" sx={{
                                                                                    backgroundColor: '#0d2365',  // Change background color to navy blue
                                                                                    '&:hover': {
                                                                                        backgroundColor: '#0d2365',  // Darken the color on hover
                                                                                    },
                                                                                }}>
                                                                                    <Toolbar>
                                                                                        <Typography component="h1" variant="h6" sx={{ textAlign: 'left', width: '100%' }}>
                                                                                            Terms & Conditions
                                                                                        </Typography>
                                                                                    </Toolbar>
                                                                                </AppBar>


                                                                                <Dialog
                                                                                    open={open}
                                                                                    onClose={handleCloseModel}
                                                                                    sx={{
                                                                                        '& .MuiDialog-paper': {
                                                                                            width: '300px',  // Set fixed width for the dialog
                                                                                            margin: 'auto',  // Center the dialog horizontally and vertically
                                                                                        },
                                                                                    }}
                                                                                    aria-labelledby="responsive-dialog-title"
                                                                                >
                                                                                    <DialogTitle id="responsive-dialog-title">
                                                                                        {/* {"Pricing"} */}
                                                                                    </DialogTitle>
                                                                                    <DialogContent>
                                                                                        <DialogContentText>
                                                                                            <Typography>Package Costs: ${productCost}</Typography>
                                                                                            <Typography>RoadSide Assitance: ${warrantyOptionPriceText}</Typography>
                                                                                            <Typography>High Ratio Coverage Price: ${highRatioCoveragePriceText}</Typography>
                                                                                            <hr></hr>
                                                                                            <Typography>TotalCost: ${totalCost}</Typography>

                                                                                        </DialogContentText>
                                                                                    </DialogContent>
                                                                                    <DialogActions>
                                                                                        <Button autoFocus onClick={handleCloseModel}>
                                                                                            Close
                                                                                        </Button>
                                                                                    </DialogActions>
                                                                                </Dialog>
                                                                            </Box>
                                                                        </Typography>

                                                                        <form>
                                                                            <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>


                                                                                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
                                                                                    <Box
                                                                                        sx={{
                                                                                            flexGrow: 1,  // Allows the Box to expand and take up available space
                                                                                            padding: '8px 16px',  // Add some padding for spacing
                                                                                            backgroundColor: 'rgb(231 231 231 / 38%)',  // Light blue background
                                                                                            border: '1px solid #ccc',  // Border color
                                                                                            borderRadius: '4px',  // Optional: rounded corners
                                                                                        }}
                                                                                    >
                                                                                        <FormControl fullWidth required >
                                                                                            <TextField
                                                                                                disabled
                                                                                                id="coverageDetails"
                                                                                                label="Terms & conditions"
                                                                                                name="coverageDetails"
                                                                                                multiline
                                                                                                rows={15} // Adjust the number of rows as needed
                                                                                                defaultValue={`Terms and Conditions
This Warranty Agreement & Financial GAP Bundle, including this Warranty Holder Registration Page and the attached Terms and Conditions make up the entire Warranty Agreement (“the Agreement”). No other documents, unless provided directly to you as the warranty holder from Get Covered Canada are legal and binding. Please retain a copy of this Warranty Agreement to evidence your coverage. Please note that only the parts, labour and benefits listed within this Agreement are covered by this Agreement. 

Part I: FINANCE GAP PROTECTION BUNDLE 
GAP: TOTAL LOSS ACCIDENT PROTECTION 
1. Maximum Liability Amounts:
The Maximum Liability amount is indicated on the first page of this Warranty Agreement
Option A $7,500 or 150% of the retail value of the vehicle at the time of loss whichever is less
Option B $25,000 or 150% of the retail value of the vehicle at the time of loss whichever is less 
If the FInance GAP Protection Bundle is chosen, and is indicated on the first page of this Warranty Agreement,  a claim can be made in two cases: 
i.) The Covered Vehicle is declared a Total Loss, due to any accidental physical damage, by the warranty holder’s primary insurance company;
ii.) The Covered Vehicle is declared a Total Loss, in the case where the Covered Vehicle is stolen and not recovered within 120 days, or is recovered within 120 days but is damaged to the extent it is considered a Total Loss. 
In these cases Get Covered Canada will reimburse the Warranty Agreement holder up to the Maximum Liability Limit chosen, less any Deductible applied to this Warranty Agreement, for the shortfall between the outstanding Fixed Loan Balance at the time of the Settlement of The Total Loss excluding taxes & miscellaneous fees, and the amount paid by the primary insurance company, after the covered vehicle is deemed a total loss, up to the Maximum Liability indicated on the first page of this Agreement as defined above.  
The original Fixed Loan Amount cannot exceed 150% of the retail Black Book Value of the vehicle, at the time of the sale, to the Maximum amount referenced above. Any original Fixed Loan Amount that exceeds this will mitigate any claim payment under this clause in a proportional manner.
Any changes to the original fixed loan agreement may exclude or mitigate any claim payment under this clause. 
This benefit is available to the original warranty holder only and is not transferable or refundable; a claim paid under this clause will terminate this contract in full. 
If the Agreement Holder has other insurance, warranty or guarantee, which applies to a loss or claim, or would have applied in this Warranty Agreement did not exist, this Warranty Agreement will be considered excess coverage and will not pay any loss or claims until the amount of such other coverage is exhausted. 
To make a claim the following must be submitted to Get Covered Canada: Original copies of the police report, filed within 30 days from the date of the loss; Original copies of the insurance claim report, filed within 30 days from the date of the loss; Original copies of proof of payment by the primary insurance company; Get Covered Canada reserves the right to obtain original copies of any and all other supporting documents, as they may be required in our sole discretion to verify the claim. Time is of the essence: Get Covered Canada must be informed of any claims within 30 days of any loss. 
2. OPTIONAL COVERAGE:
HIGH RATIO COVERAGE: If the option is indicated on the first page of this agreement the 150% Cap on the Total Loss Accident Protection can be increased by up to $7500. This option does not increase the chosen Total Maximum Liability of $7500 or $25000.
3. LOYALTY CREDIT:
In addition to the benefits described above, We will pay you a benefit of $500 if: a) within 30 days following a Total Loss, you purchase a new or used vehicle from the dealer from whom the Insured Vehicle was purchased; and b) the dealer listes the credit in the bill of sale agreement for the replacement vehicle; and c) you or the dealer provides us with a copy of the bill of sale and a letter applying for the credit within 15 days of the bill of sale. 
4. GAP: PARTIAL LOSS COLLISION DEDUCTIBLE PROTECTION
In addition to the benefits detailed above, in the event that the warranty holder and the covered vehicle is involved in a Partial Loss at fault accident, Get Covered Canada will reimburse the warranty holder, less the deductible indicated on the first page of this contract, the Auto Collision deductible applied by the warranty holder’s primary insurance provider up to a maximum of $1000.00. The warranty holder may qualify to make a claim under this option only once under this Warranty Agreement. This benefit is available to the original warranty holder only, and is not transferrable. To submit a claim the following must be submitted to Get Covered Canada: Original copy of the police report, filed within 30 days from the date of the loss; Original copy of the insurance claim report, filed within 30 days from the date of the loss; Original copy of proof of payment by primary insurance company; Get Covered Canada reserves the right to obtain original copies of any and all other supporting documents, as they may be required in our sole discretion to verify the claim. Time is of the essence: Get Covered Canada must be informed of any claims within 30 days of any loss. .

Part II: MECHANICAL BREAKDOWN:
Term: 30 Days from Initiation Date.
Maximum Liability: $1000 Per Claim.
Deductable: $500 Per Claim.
1. This Part pertains to mechanical breakdowns, and is not a service agreement. As part of Your Financial GAP Bundle and subject to the Terms and Conditions as contained herein, Get Covered Canada (the “Administrator”) warrants that it will repair the Registered Owner’s vehicle (“Warranty Holder”) and all reasonable costs incurred as denoted as covered by this Agreement during the term of the warranty offered under this Agreement, when a Mechanical Failure or Breakdown has occurred. For the purposes of this Agreement, a Breakdown or Mechanical Failure for the purposes of this Agreement shall mean: the failure of a Covered Part under normal service. A Covered Part has failed when it can no longer perform the function for which it was designed solely because of its condition and not because of the action or inaction of any non-Covered Part.  Only the parts and labour described below as covered (“Covered Part”) are covered by this Agreement in the event of a Mechanical Failure or a Breakdown.
Coverage under this Agreement can only be applied for in two cases, i)  at the time of the sale or lease of the covered vehicle, as applicable to the covered vehicle, being the vehicle identified on the front page of this Agreement (the “Covered Vehicle”), ii) at a point in time prior to the expiration of an existing original Manufacturer’s Warranty. In the case of purchase under the terms of (ii) herein, the coverage purchased under this Agreement must have equal or lesser coverage than the expiring manufacturer warranty. The obligations of Get Covered Canada shall commence immediately or when an existing factory warranty expires, as applicable to the timing of the purchase of this Agreement. The obligations of Get Covered Canada shall expire according to the length of term indicated on the front page of this Agreement, based on the earlier of Agreement term length or odometer reading, whichever occurs first.
Coverage of the Covered Vehicle will begin on the Start Date stated on the first page of this Agreement and upon the issuance of the Warranty Authorization Number, the receipt of this signed Agreement and fulfillment of payment terms as agreed. Get Covered Canada reserves the right to cancel this Agreement in the event of non-payment or if a payment plan is in place, such payments are not up-to-date and current.
The Warranty Holder hereby certifies that the information contained in this Agreement is true and correct as of the Start Date stated on the first page of this Agreement. The Warranty Holder further certifies that the Covered Vehicle is in proper operating condition as of the Start Date stated on the front page of this Agreement. In the event that any information is determined incorrect or misleading, this Agreement shall be deemed void and any monies paid will be returned to the Warranty Holder, less an administration fee of $99.00.
2. Vehicle Eligibility:
The following vehicles are not eligible and are specifically excluded from all coverage under this Agreement, unless otherwise approved by Get Covered Canada:
• Audi R8 (all other Audi Models are eligible); Ferrari; Aston Martin; Bentley; Bugatti; Lamborghini; Lexus LF4 (all other Lexus Models are eligible); Maserati; Maybach; Mercedes SLR and Mercedes SLS (all other Mercedes Models are eligible); Nissan GTR (all other Nissan models are eligible); Panoz; Rolls-Royce; Fisker Karma; McLaren; and Dodge Viper (all other Dodge Models are eligible);
• Any vehicles classified with a payload capacity of more than one (1) ton; or
• Vehicles used partially or exclusively for the following purposes: taxis, courier vehicles (including passenger vehicles used for courier use), chauffeured vehicles, Ride-hailing or Ride-Sharing Services (i.e Uber); delivery vehicles;  snowplows or vehicles for which a snowplow is attached; tow-trucks; vehicles used for racing (professional or non-professional); police vehicles; ambulances and mobile canteens trucks;
Warranties on vehicles that fall under any of the above excluded categories will be cancelled and any monies received will be returned to the Warranty Holder, through the original selling dealership.
3. Maintenance Requirements:
In order to maintain eligibility for coverage under this Agreement, the Warranty Holder must perform regularly scheduled maintenance, fluid changes on the Covered Vehicle according to the manufacturer’s requirements, including any special instructions (i.e. special oil, or increased frequency), for vehicles that have a high portion of short journeys (city driving) or operate in severe weather conditions. In all cases, an oil change interval cannot exceed 10,000 kilometres. Documentation to substantiate this maintenance from a licensed repair facility may be requested before a claim is approval. Get Covered Canada reserves the right to refuse claims based on failure to perform the required maintenance services.
4. Components & Benefits of Coverage Mechanical Warranty Coverage:
According to the warranty plan chosen, as indicated on the first Page of this Agreement (and subject to full payment thereof), the Warranty Holder will receive the coverage indicated within the applicable sections of Section 7 below:
i.) Essential Powertrain Plans: Includes components and benefits listed in Section A.  
5. Maximum Liabilities:
The maximum liability undertaken by Get Covered Canada hereunder shall not exceed, 
i.) $1000 per claim or half the purchase price of the vehicle whichever is less, and the total liability for the full term of coverage shall not exceed the full purchase price of the vehicle.  
6. Deductible: 
According to the front page of this document, all claims are subject to the payment of a deductible of $500.
7. Warranty Coverage:
Only the parts and labour described below (as applicable to your specific coverage selected and identified within Section 4 above) are covered (“covered part”) in the event of a Mechanical Failure or a Breakdown. Diagnostics are covered if the claim is validly covered by this Agreement (Maximum Diagnostic time deemed reasonable is one (1) hour). When reasonable, and at its sole discretion, Get Covered Canada may authorize payment of fluids associated with a repair.
The following shall be covered parts as outlined or limited herein:
(A) provides coverage for:  
• Engine: Internally lubricated parts when damaged from within including but not limited to: Head gasket, engine block; cylinder heads; crankshaft and main bearings; crankshaft gears; connecting rods and bearings; camshaft and bearings; camshaft gears; push rods; pistons; rings and pins; intake and exhaust valves; valve springs and retainers; guides; lifters; rocker arm; shafts and pivots; harmonic balancer and pulley; timing chain; oil pump and shaft; ring gear, oil pan.
• Turbocharger and Supercharger: Internally lubricated parts when damaged from within; including but not limited to: Housing; Wastegate actuator; Compressor valves.
• Automatic Transmission: Internally lubricated parts when damaged from within including; but not limited to: torque converter; valve body; gear sets; main and intermediate shafts; clutches and bands; oil pump; flywheel; Ring gear.
• Manual Transmission/Transaxle: Internally lubricated parts when damaged from within including but not limited to: Housing; Main and intermediate shafts; Gear sets; Synchronizer rings; Shifter fork; bearings.
• Differential (front and rear): Internally lubricated parts when damaged from within including but not limited to: carrier gear and case; drive pinion and pinion gear; differential cover; bearings; mounts.
• Transfer Case: Internally lubricated parts when damaged from within including but not limited to: housing; main shaft; gear group; sprocket and chain; bearings; shims.
8. How to make a claim:
In the event that repairs to the Covered Vehicle become necessary and covered by this Agreement:
The Warranty Holder must contact Get Covered Canada 1.800.268.3284 immediately to initiate the claim process;
The Covered Vehicle may be taken to any licensed mechanic of the Warranty Holder’s choice. Get Covered Canada reserves the right to refuse any repair estimate and/or has the right to request a second opinion at an alternative repair facility if a repair estimate is judged unreasonable;
Get Covered Canada may request the Warranty Holder to produce documentation to substantiate maintenance requirements have been met as per Section 3 of this Agreement.
In some cases, claims adjusters will be required for onsite assessment(s). The amounts paid by Guarantee V.C. for parts and labour are determined by the average similar repair costs or by the MITCHELL GUIDE or similar recognized repair manuals. The liability of Get Covered Canada under this warranty will extend only to repairs which have been duly authorized by Get Covered Canada and up to the limits identified within Section 5. Pre-Authorization is only granted when the Terms and Conditions set out in this Agreement have been met and this Agreement remains in force and the cost estimate is satisfactory to Get Covered Canada. A Claim Authorization Number is only valid for a period of thirty (30) days and only as applicable to the repair shop identified therein;
Guarantee V.C. may at its sole discretion replace failed parts with OEM, aftermarket, used or rebuilt parts.
If this Agreement expires, is cancelled or terminated by Get Covered Canada (as permitted herein) prior to the work being completed, the repairs will not be covered by this Agreement.
Get Covered Canada will pay repair costs directly to the mutually agreed upon licensed repair shop after a Claim Authorization Number is given in writing; after repairs are completed; after the final invoice is signed by the Warranty Holder and such is received by Get Covered Canada. The Registered Owner will only have to pay the deductible plus taxes, if applicable, and other miscellaneous non-covered items directly to the licensed mechanic.
In special circumstances only, Get Covered Canada will reimburse the Warranty Holder for pre-authorized repairs. The Warranty Holder will have to present Get Covered Canada copies of the repair documents including the payment receipt within ten (10) days of paying for the repair to substantiate the reimbursement. Any repair completed outside of the Province of Ontario will be evaluated as per the standards of the Ontario automobile industry. All covered repair costs will be reimbursed in Canadian funds. The Warranty Holder will have to present documents, including the payment receipt to substantiate any rental allowance or trip interruption reimbursements, within ten (10) business days of paying for those services.
9. Mechanical Warranty Coverage Exclusions:
The following are excluded from coverage under this Agreement.
a) All parts and labour not included in Part 6 of this document in accordance with the Warranty Plan indicated on the first page of this document;
b) Any mechanical defect judged to have existed prior to the Start Date for coverage as listed on the First Page of this Agreement;
c) Any repairs not authorized by Get Covered Canada, or carried on at a location not authorized by Get Covered Canada;
d) All parts and maintenance services described in the Covered Vehicle maintenance manual, including but not limited to: alignment; adjustments; software updates; wheel balancing; tune ups; spark plugs; spark plug wires; Supercharger isolator etc.;
e) Any electrical wiring repairs; hardware (nuts, bolts etc.); amplifier; glow plugs; hoses; seat belts; wiper blades; shop supplies; storage costs; hoist fees or cleaning materials; heated seats; rear backup cameras; weather stripping; windshield; Lumbar seat bladder; Oil filter housing; DEF lines; and/or drive belt pulley and idlers;
f) Mechanical Failure or Breakdown to the Covered Vehicle as a result of inadequate maintenance; abuse; misuse; or neglect or Mechanical Failure or Breakdown caused by a failure to adhere to the manufacturer’s required maintenance schedule;
g) Manual transmission clutch, throw out bearing, for solenoid or linkage;
h) Any Mechanical Failure or Breakdown due to an accumulation of dirty oil; carbonized or burnt valves; seized piston rings or an accumulation of carbon;
i)  Any repair or replacement of a Covered Part, if a failure has not occurred (i.e. fraud) or if the wear on the part has not exceeded the field tolerances permitted by the manufacturer;
j)  Any failure as a result of expired; contaminated; or improper fluids;
k) Any failure as a result of overheating or not maintaining proper levels of lubricants; fluids; refrigerants; or coolants including damage caused by failure of water hoses; radiators; or their connections; or in the transmission oil cooler lines;
l)  Any failure caused to Covered Parts by the failure of non-covered parts;
m) The Covered Vehicle if it is in anyway modified from its factory specifications;
n) Four wheel or rear wheel steering;
o) Any repairs where the only malfunction is high oil consumption and/or low compression;
p) Any failure caused to a Covered Part(s) by the breakdown of non-manufacturer installed parts;
q)  Any failure of non-manufacturer installed parts;
r) Vehicles used to tow a trailer in excess of the limits recommended by the vehicle’s manufacturer;
s)  Any failure caused by unauthorized repair or teardown or parts inadequately installed;
t) Any parts and repairs already covered by another Canadian or foreign warranty; including but not limited to a manufacturer or repairer’s warranty, or valid insurance policy of any kind;
u)  All parts and repairs for which the manufacturer has announced its responsibility through any means including recall campaigns and factory service bulletins issued in the United States or Canada;
v)  Any repairs subject to a class action lawsuit in the United States or Canada;
w) Vehicles with tampered or broken odometers;
x) Any Mechanical failure or Breakdown as a result of an accident; collision with another vehicle or road hazard; or falling objects;
y)  Any Mechanical Failure or Breakdown caused or aggravated by the failure to properly protect the vehicle in the event or indication of failure to an operating part;
z)  Any failure caused by fire; smoke; explosion; theft; vandalism; protests and riots; act of terrorism or nuclear contamination;
aa) Any Mechanical Failure or Breakdown caused by Acts of God; the weather; environment or a natural disaster; including but not limited to damage caused by water; flood; frost; condensation; lightning; earthquake; fierce winds; hail; rodents or other pests;
bb) Any deterioration or any failure caused by rust; corrosion or pitting;
cc)  Guarantee V.C. is also not responsible for any liability for property damage; for injury to or death of any person arising out of the operation; maintenance or use of the vehicle whether or not related to the part(s) covered or following a repair made by a mechanic in an authorized repair shop;
dd) Guarantee V.C. is not responsible for any time loss; profit loss; inconvenience or any other loss that results from a failure; including delays in parts shipments or approving claims; or
ee) Any suspicious noises coming from any parts or components that are in operation and do not affect any other parts or components.
Part III: GENERAL TERMS OF THE ENTIRE AGREEMENT
1. Cancellations:
This Agreement is non-cancellable except within ten (10) days of the purchase date of the coverage under this Agreement. During this period the Warranty Holder may cancel this Agreement through the selling dealer providing that no claims have been made. A cancellation fee of 25% of the sale price of the warranty (minimum of $100) plus taxes applies in all cases.
2. OMVIC Compliance:
This Agreement complies with the requirements under the new Motor Vehicle Dealers Act (MVDA). Surety is provided to Veri-Cheque Ltd, O/A “GVC Premium Warranty Company / Get Covered Canada”, by Unica Insurance Inc.; 7150 Derrycrest Drive, Mississauga, ON, L5W 0E5.
3. Transfer: This Agreement Can Not be transferred to another vehicle or subsequent owner of the named vehicle.
4. Financial Agreements: If this Agreement’s coverage was financed either via a payment plan from Get Covered Canada or through a third-party finance company, including an OEM credit arm (the “Funding Party”), the Funding Party shall be entitled to any refunds resulting from the cancellation of this Agreement for any reason, including but not limited to, repossession of the Covered Vehicle, total loss of the Covered Vehicle (including by way of theft). Failure to make monthly payments for this Agreement’s coverage in a timely manner may result in cancellation of this Agreement, under which no refund will be due and no claim will be approved.
5. Right to Recover: If the Warranty Holder has a right to recover funds that Get Covered Canada has paid under this Agreement against another party, the Warranty Holders rights against said third party shall become Get Covered Canada’s rights. The Warranty Holder agrees to provide reasonable assistance to help Get Covered Canada to recover these funds.
6. Territory: This Agreement applies only to a Mechanical Failure or Breakdown that occurs and repairs made within Canada and the United States.
7. Dispute Resolution: Most disputes or disagreements between Get Covered Canada and the Warranty Holder arising under this Agreement can be resolved quickly by contacting Get Covered Canada at the address noted on the first page of this Agreement. In the event Get Covered Canada is unable to resolve a dispute with the Warranty Holder after attempting to do so informally, the parties to this Agreement agree to resolve such disputes through binding arbitration in accordance with the rules of the Canadian Arbitration Association. The party that intends to seek arbitration must first send to the other party, by certified mail, a written notice of dispute (“NOD”). The NOD should be addressed to other party and contain (a) the nature and basis of the claim or dispute; and (b) set forth the specific relief sought. If the parties do not reach a settlement within thirty (30) days of receipt of the NOD, either party may commence an arbitration proceeding. Unless otherwise agreed to mutually by the parties, the arbitration process will take place in the Province of Ontario.
8. Personal Information. The Warranty Holder hereby agrees that any personal information provided to Get Covered Canada during the purchasing of this Agreement, the provision of a payment plan, processing and payment of claims hereunder, and/or the cancellation or transfer of this Agreement, is hereby consented to. Please note that Get Covered Canada may use third party data storage providers outside of Canada and may also need to facilitate claims repairs outside Canada. The Warranty Holder hereby consents to the collection, use, storage and disclosure of their personal information for the purposes outlined herein.
9. This Agreement constitutes the entire agreement between Get Covered Canada and the Warranty Holder and supersedes and extinguishes all previous drafts, agreement, arrangement and understandings between them, whether written or oral, related to this subject matter.
10. This Agreement shall be governed by the laws of the province of Ontario.`}
                                                                                                inputProps={{
                                                                                                    style: { textAlign: 'left' }  // Align text to the right
                                                                                                }}
                                                                                                sx={{
                                                                                                    width: '100%', // Now set to 100% to take full width of the item
                                                                                                    '& label.Mui-focused': {
                                                                                                        color: '#0d2365',
                                                                                                    },
                                                                                                    '& .MuiOutlinedInput-root': {
                                                                                                        '& fieldset': {
                                                                                                            borderColor: 'black', // Default border color
                                                                                                        },
                                                                                                        '&:hover fieldset': {
                                                                                                            borderColor: 'gray', // Hover border color
                                                                                                        },
                                                                                                        '&.Mui-focused fieldset': {
                                                                                                            borderColor: '#0d2365', // Focus border color
                                                                                                        },
                                                                                                    },
                                                                                                }}
                                                                                            />
                                                                                        </FormControl>
                                                                                    </Box>
                                                                                </Stack>
                                                                                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
                                                                                    <FormControl component="fieldset">
                                                                                        {/* <Typography variant="h6">Select Options</Typography> */}
                                                                                        <FormControlLabel
                                                                                            control={
                                                                                                <Checkbox
                                                                                                    checked={termsConditonChecked}
                                                                                                    onChange={handleCheck}
                                                                                                    name="myCheckbox"
                                                                                                    color="primary" // Optional: color of the checkbox
                                                                                                />
                                                                                            }
                                                                                            label="By Proceeding with this Quote, you are accepting these Terms and Conditions" // Checkbox label
                                                                                        />
                                                                                    </FormControl>
                                                                                </Stack>
                                                                            </Box>
                                                                        </form>
                                                                    </Item>
                                                                </Grid>
                                                            </Grid>
                                                            <br></br>
                                                            <Grid container>
                                                                <Grid item lg={12}>
                                                                    <Item sx={{ height: 'auto' }}>
                                                                        <Typography variant="h5" sx={{ color: 'grey' }}>
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'space-between',
                                                                                    marginTop: "0px",
                                                                                    padding: "0px"
                                                                                }}
                                                                            >
                                                                                <AppBar position="left" sx={{
                                                                                    backgroundColor: '#0d2365',  // Change background color to navy blue
                                                                                    '&:hover': {
                                                                                        backgroundColor: '#0d2365',  // Darken the color on hover
                                                                                    },
                                                                                }}>
                                                                                    <Toolbar>
                                                                                        <Typography component="h1" variant="h6" sx={{ textAlign: 'left', width: '100%' }}>
                                                                                            Next Step
                                                                                        </Typography>
                                                                                    </Toolbar>
                                                                                </AppBar>


                                                                                <Dialog
                                                                                    // open={open}
                                                                                    // onClose={handleCloseModel}
                                                                                    sx={{
                                                                                        '& .MuiDialog-paper': {
                                                                                            width: '300px',  // Set fixed width for the dialog
                                                                                            margin: 'auto',  // Center the dialog horizontally and vertically
                                                                                        },
                                                                                    }}
                                                                                    aria-labelledby="responsive-dialog-title"
                                                                                >
                                                                                    <DialogTitle id="responsive-dialog-title">
                                                                                        {/* {"Pricing"} */}
                                                                                    </DialogTitle>
                                                                                    <DialogContent>
                                                                                        <DialogContentText>
                                                                                            <Typography>Package Cost: $45</Typography>
                                                                                            <Typography>RoadSide Assitance: $80</Typography>
                                                                                            <Typography>High Ratio Coverage Price: ${highRatioCoveragePriceText}</Typography>
                                                                                            <hr></hr>
                                                                                            <Typography>TotalCost: $115</Typography>

                                                                                        </DialogContentText>
                                                                                    </DialogContent>
                                                                                    <DialogActions>
                                                                                        <Button autoFocus onClick={handleCloseModel}>
                                                                                            Close
                                                                                        </Button>
                                                                                    </DialogActions>
                                                                                </Dialog>
                                                                            </Box>
                                                                        </Typography>

                                                                        <form>
                                                                            <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>


                                                                                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
                                                                                    <Box
                                                                                        sx={{
                                                                                            flexGrow: 1,  // Allows the Box to expand and take up available space
                                                                                            padding: '8px 16px',  // Add some padding for spacing
                                                                                            backgroundColor: 'rgba(255, 165, 0, 0.7)',  // Light blue background
                                                                                            border: '1px solid #ccc',  // Border color
                                                                                            borderRadius: '4px',  // Optional: rounded corners
                                                                                        }}
                                                                                    >
                                                                                        <Toolbar>
                                                                                            <Typography
                                                                                                component="h1"
                                                                                                variant="h6"
                                                                                                sx={{
                                                                                                    textAlign: 'left',
                                                                                                    width: '100%',
                                                                                                    color: 'black', // Light orange color (adjust opacity if needed)
                                                                                                }}
                                                                                            >
                                                                                                Saving as Pending will allow you to Edit or Cancel this warranty. You will find this application in your Pending Warranties page.
                                                                                            </Typography>
                                                                                            <Button
                                                                                                variant="contained"
                                                                                                onClick={(e) => SaveAsPending(e)}
                                                                                                sx={{
                                                                                                    backgroundColor: '#FF8C00', // Dark orange color
                                                                                                    color: 'white', // Text color (white for better contrast)
                                                                                                    '&:hover': {
                                                                                                        backgroundColor: '#FF7F00', // Lighter dark orange on hover
                                                                                                    },
                                                                                                }}
                                                                                            >

                                                                                                Save As Pending
                                                                                            </Button>
                                                                                        </Toolbar>
                                                                                    </Box>
                                                                                </Stack>
                                                                                <br></br>
                                                                                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
                                                                                    <Box
                                                                                        sx={{
                                                                                            flexGrow: 1,  // Allows the Box to expand and take up available space
                                                                                            padding: '8px 16px',  // Add some padding for spacing
                                                                                            backgroundColor: 'rgba(144, 238, 144, 0.8)',  // Light blue background
                                                                                            border: '1px solid #ccc',  // Border color
                                                                                            borderRadius: '4px',  // Optional: rounded corners
                                                                                        }}
                                                                                    >
                                                                                        <Toolbar>

                                                                                            <Typography
                                                                                                component="h1"
                                                                                                variant="h6"
                                                                                                sx={{
                                                                                                    textAlign: 'left',
                                                                                                    width: '100%',
                                                                                                    color: 'black', // Light green color (with some opacity)
                                                                                                }}
                                                                                            >
                                                                                                After Submitting This Application you will NOT BE ABLE to edit it further.
                                                                                            </Typography>
                                                                                            <Button
                                                                                                variant="contained"
                                                                                                onClick={(e) => ClosedWon(e)}
                                                                                                color="success" // Material-UI success color
                                                                                                sx={{
                                                                                                    '&:hover': {
                                                                                                        backgroundColor: '#388E3C', // Darker shade for hover effect (if needed)
                                                                                                    },
                                                                                                }}
                                                                                            >
                                                                                                Submit Application
                                                                                            </Button>
                                                                                        </Toolbar>
                                                                                    </Box>
                                                                                </Stack>
                                                                            </Box>
                                                                        </form>
                                                                    </Item>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </> : ""

                        }
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? '' : activeStep == 2 ? '' : 'Next'}
                            </Button>
                        </Box>
                        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
                            <Alert
                                onClose={handleCloseSnack}
                                severity={severity}
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                {message}
                            </Alert>
                        </Snackbar>
                    </React.Fragment>
                )}
            </Box >
        </>

    );
}