import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import TaskIcon from '@mui/icons-material/Task';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../../../api/axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import JoditEditor from "jodit-react"
import Alert from '@mui/material/Alert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ApplicationStore from '../../../../utils/localStorageUtil';
import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from 'draft-js';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthContext } from '../../../../context/AuthContext';
import { makeStyles } from '@mui/styles';
import { caES } from '@mui/material/locale';
import { Editor } from "primereact/editor";

const URL = "./product";
const useStyles = makeStyles({
    editor: {
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
    },
});


function WarrantyProducts() {
    const { user_email } = useAuthContext();
    const dealership = ApplicationStore().getStorage('dealership');
    const navigate = useNavigate();
    const { state } = useLocation();
    const [id, setId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    // const [type, setType] = useState('add');
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [subCat, setSubCat] = useState("");
    const [subCatText, setSubCatText] = useState("");
    const [userDealership, setUserdealership] = useState("");
    const [userSalesrep, setUsersalesrep] = useState("");
    const [warrantyProtectionText, setWarrantyProtectionText] = useState("");
    const [warrantyprotection, setWarrantyprotection] = useState("");
    const [warrantyProtectionList, setWarrantyProtectionList] = useState([]);
    const [dealershipArray, setDealershipArray] = useState([]);
    const [salesrepArray, setSalesrepArray] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setsubcategoryList] = useState([]);
    const [productData, setProductData] = useState([{ productName: "", productPrice: "" }])
    const classes = useStyles();
    const editor = useRef(null);
    const [content, setContent] = useState("");

    const productCategoryType = ['Dealership', 'Salesrep'];

    const [pdf, setPdf] = useState("");

    const { value, type } = state;

    const handleClick = () => {
        setAlertopen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertopen(false);
    };

    const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
        console.log("helo")
        try {
            const response = await axios.post(mainURL, data);
            return handleSuccess(response.data);

        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
            } else {
                return handleException(err?.response.data);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const hasEmptyProduct = productData.some(
            (item) =>
                item.productName.trim() === "" || item.productPrice.trim() === ""
        );

        if (hasEmptyProduct) {
            alert("Please fill all product name and price fields or remove empty entries before you hit save...");
            return;
        }

        const data = { userDealership, userSalesrep, warrantyprotection, subCat, warrantyprotection, category, subCategory, features: JSON.stringify(content), products: JSON.stringify(productData), pdf }

        // console.log("Content:"+JSON.stringify(content));
        // console.log("Product Data:"+JSON.stringify(productData));
        if (type === "add") {
            const mainURL = URL + '/add';
            serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
        } else if (type == "dealershipCustom") {

            if (productCategory == "Salesrep") {
                if (!userSalesrep && !userDealership) {
                    alert("Please Select the Dealership and Salesrep");
                } else {
                    const dealershipURL = URL + '/createsSalesrepProduct';
                    serviceMethod(dealershipURL, 'POST', data, handleSuccess, handleException);
                }
            } else {
                if (!userDealership) {
                    alert("Please Select the dealership");
                } else {
                    const dealershipURL = URL + '/createsDealershipProduct';
                    serviceMethod(dealershipURL, 'POST', data, handleSuccess, handleException);
                }
            }

        } else if (type == "updateDealershipProduct") {
            if (!userDealership) {
                alert("Please Select the dealership");
            } else {
                const mainURL = URL + '/' + id + '/updateDealershipProduct';
                console.log("url", mainURL);
                serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
            }
        } else if (type == "salesrepCustom") {
            if (!userSalesrep) {
                alert("Please Select the Salesrep");
            } else {
                const dealershipURL = URL + '/createsSalesrepProduct';
                serviceMethod(dealershipURL, 'POST', data, handleSuccess, handleException);
            }
        } else if (type == "updateSalerepProduct") {
            if (!userSalesrep && !userDealership) {
                alert("Please Select the Salesrep & Dealership");
            } else {
                const mainURL = URL + '/' + id + '/updateSalesrepProduct';
                console.log("url", mainURL);
                serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
            }
        } else {
            const mainURL = URL + '/' + id + '/update';
            console.log("url", mainURL);
            serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
        }

    };

    const handleSuccess = (data) => {
        setSeverity("success");
        setMessage(data.data);
        setAlertopen(true);
        setPdf("");
        setTimeout(() => {
            navigate("/ViewWarrantyProduct");
        }, 6000); // Matches autoHideDuration

    }

    const myTheme = createTheme({
        // Set up your custom MUI theme here
    });


    useEffect(() => {

        if (type == "update") {
            setId(value.id || "");
            setCategory(value.category_id || "");
            setProductData(JSON.parse(value.products) || [{ productName: "", productPrice: "" }]);
            setSubCategory(value.product_subcategory || "");
            if (value.category_id) {
                loadSubCategory(value.category_id);
                setSubCat(value.subCat || "");
            }
            if (value.category_id && value.subCat) {
                loadwarrantyprotection(value.category_id, value.subCat);
                setWarrantyprotection(value.warrantyprotection);

            }
            setContent(JSON.parse(value.product_features) || "");


        } else if (type == "updateDealershipProduct") {
            setProductCategory("Dealership")
            loadDealership();
            setUserdealership(value.dealership || "");
            setId(value.id || "");
            setCategory(value.category || "");
            setUserdealership(value.dealership || "");
            setProductData(JSON.parse(value.products) || [{ productName: "", productPrice: "" }]);
            setSubCategory(value.subcategory || "");
            if (value.category) {
                loadSubCategory(value.category);
                setSubCat(value.subCat || "");
            }
            if (value.category && value.subCat) {
                loadwarrantyprotection(value.category, value.subCat);
                setWarrantyprotection(value.warrantyprotection);

            }
            setContent(JSON.parse(value.features) || "");


        } else if (type == "updateSalerepProduct") {
            setProductCategory("Salesrep")
            loadDealership();
            setUserdealership(value.dealership || "");
            loadSalesrep(value.dealership);
            setUsersalesrep(value.salesrep);
            setId(value.id || "");
            setCategory(value.category || "");
            setUsersalesrep(value.salesrep || "");
            setProductData(JSON.parse(value.products) || [{ productName: "", productPrice: "" }]);
            setSubCategory(value.subcategory || "");
            if (value.category) {
                loadSubCategory(value.category);
                setSubCat(value.subCat || "");
            }
            if (value.category && value.subCat) {
                loadwarrantyprotection(value.category, value.subCat);
                setWarrantyprotection(value.warrantyprotection);

            }
            setContent(JSON.parse(value.features) || "");


        } else if (type == "salesrepCustom") {
            // loadSalesrep();
            setId(value.id || "");
            setCategory(value.category_id || "");
            setProductData(JSON.parse(value.products) || [{ productName: "", productPrice: "" }]);
            setSubCategory(value.product_subcategory || "");
            if (value.category_id) {
                loadSubCategory(value.category_id);
                setSubCat(value.subCat || "");
            }
            if (value.category_id && value.subCat) {
                loadwarrantyprotection(value.category_id, value.subCat);
                setWarrantyprotection(value.warrantyprotection);

            }
            setContent(JSON.parse(value.product_features) || "");
        } else if (type == "dealershipCustom") {
            loadDealership();
            setId(value.id || "");
            setCategory(value.category_id || "");
            setProductData(JSON.parse(value.products) || [{ productName: "", productPrice: "" }]);
            setSubCategory(value.product_subcategory || "");
            if (value.category_id) {
                loadSubCategory(value.category_id);
                setSubCat(value.subCat || "");
            }
            if (value.category_id && value.subCat) {
                loadwarrantyprotection(value.category_id, value.subCat);
                setWarrantyprotection(value.warrantyprotection);

            }
            setContent(JSON.parse(value.product_features) || "");
        } else {
            setId("");
            setCategory("");
            setProductData([{ productName: "", productPrice: "" }]);
            setSubCategory("");
            setContent("");

        }
        loadCategory();
        // handleSetSubCategory();
    }, [type, value]);

    const handleSaveProduct = () => {
        setProductData([...productData, { productName: "", productPrice: "" }])
    }

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

    const loadDealership = async () => {
        try {
            const URL = "./dealership";
            const response = await axios.get(URL);

            if (response.data.status === 401) {
                setDealershipArray(""); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                // const dataWithIndex = response.data.data.map((item, index) => ({
                //     ...item,
                //     slNo: index + 1, // Assign sequential SL No starting from 1
                // })) || "";
                setDealershipArray(responseData);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setDealershipArray('');
        }
    };

    const loadSalesrep = async (dealership) => {

        try {
            const URL = "./salesrep";
            const response = await axios.post(URL, { dealership });

            if (response.data.status === 401) {
                setSalesrepArray(""); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                // const dataWithIndex = response.data.data.map((item, index) => ({
                //     ...item,
                //     slNo: index + 1, // Assign sequential SL No starting from 1
                // })) || "";
                setSalesrepArray(responseData);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setSalesrepArray('');
        }
    };

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

    const handleProductNameChange = (i, e) => {
        const onchangeVal = [...productData]
        onchangeVal[i]["productName"] = e.target.value
        setProductData(onchangeVal)
    }

    const handleProductDescriptionChange = (i, e) => {
        const onchangeVal = [...productData]
        onchangeVal[i]["productDescription"] = e.target.value
        setProductData(onchangeVal)
    }

    const handleProductPriceChange = (i, e) => {
        const onchangeVal = [...productData]
        onchangeVal[i]["productPrice"] = e.target.value
        setProductData(onchangeVal)
    }

    const handleDelete = (i) => {
        const deleteVal = [...productData]
        deleteVal.splice(i, 1)
        setProductData(deleteVal)
    }

    const handleSetSubCategory = (e) => {
        console.log("warrantyProtectionText:" + warrantyProtectionText);
        setSubCategory(subCatText + " " + e);
    }

    const handleException = (data) => {
        setSeverity("error");
        setMessage(data.data);
        setAlertopen(true);
    }

    const handleEditorChange = (state) => {
        const rawContent = convertToRaw(state.getCurrentContent());
        console.log("Editor Content:" + rawContent);
    };

    const contentFieldChanaged = (data) => {
        setContent(data);
    }

    const fetchsubcategory = async (e) => {
        loadSubCategory(e.target.value);
    }

    const fetchWarrantyProtection = async (e) => {
        loadwarrantyprotection(category, e.target.value);
    }

    const dealershipChange = (e) => {
        setUserdealership(e.target.value);

        if (productCategory == "Salesrep" && e.target.value) {
            loadSalesrep(e.target.value)
        }


    }


    return (
        <>
            <div style={{ marginTop: '100px', padding: '0px' }}>
                <Typography variant="h5" sx={{ color: 'grey' }}>
                    <TaskIcon sx={{ fontSize: '20px' }} /> &nbsp;Warranty Products
                </Typography>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        border: '1px solid rgb(229 231 235 / 99%);',
                        borderRadius: '8px',
                    }}
                >
                    <Toolbar />
                    <Typography variant="h6">Product Information</Typography>
                    {(type == "dealershipCustom" || type == "updateDealershipProduct" || type == "updateSalerepProduct") ?
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <FormControl fullWidth >
                                <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '1.0em' }}>
                                    Product Category Type
                                </Typography>
                                <Select
                                    labelId="user-role-select-label"
                                    id="user-role-select"
                                    value={productCategory}
                                    disabled={type == 'updateDealershipProduct' || type == "updateSalerepProduct"}
                                    onChange={(e) => {
                                        setProductCategory(e.target.value);
                                        setUserdealership('');
                                        setSalesrepArray([]);
                                        setUsersalesrep('');
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: { maxHeight: 200 },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'lightgray' },
                                            '&:hover fieldset': { borderColor: 'lightgray' },
                                            '&.Mui-focused fieldset': { borderColor: 'lightgray' },
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Product Category Type</em>
                                    </MenuItem>
                                    {productCategoryType.map((val, index) => (
                                        <MenuItem key={index} value={val}>
                                            {val.charAt(0).toUpperCase() + val.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth >
                                <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '1.0em' }}>
                                    Dealership
                                </Typography>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userDealership}
                                    onChange={dealershipChange}
                                    disabled={type == 'updateDealershipProduct' || type == "updateSalerepProduct"}
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
                                        <em>Please Select Dealership</em>
                                    </MenuItem>
                                    {dealershipArray.map((dealership, index) => (
                                        <MenuItem key={index} value={dealership.id}>
                                            {dealership.accountName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth >
                                <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '1.0em' }}>
                                    Sales Rep User
                                </Typography>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userSalesrep}
                                    disabled={productCategory == 'Dealership' || type == 'updateDealershipProduct' || type == "updateSalerepProduct"}
                                    onChange={(e) => setUsersalesrep(e.target.value)}
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
                                        <em>Select Sales Rep</em>
                                    </MenuItem>
                                    {salesrepArray.map((dealership, index) => (
                                        <MenuItem key={index} value={dealership.id}>
                                            {dealership.firstname + " " + dealership.lastname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack> : (type == "salesrepCustom" || type == "updateSalerepProduct") ?
                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>

                            </Stack> : ""}

                    <br />
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                        {/* Category Field */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                id="demo-simple-select"
                                labelId="demo-simple-select-label"
                                value={category}
                                onChange={(e) => { setCategory(e.target.value); fetchsubcategory(e) }}
                                label="Category"
                            >
                                <MenuItem value="">
                                    <em>Please Select Category</em>
                                </MenuItem>
                                {categoryList.map((category, index) => (
                                    <MenuItem key={index} value={category.id}>
                                        {category.categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Sub Category Field */}
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Sub category</InputLabel>
                            <Select
                                id="demo-simple-select"
                                labelId="demo-simple-select-label"

                                value={subCat}
                                onChange={(e) => {
                                    setSubCat(e.target.value);
                                    fetchWarrantyProtection(e);
                                    setSubCategory("");
                                    const selectedValue = e.target.value;

                                    // Find the selected warranty protection by its id
                                    const selectedSubCategory = subcategoryList.find(subcategory => subcategory.id === selectedValue);

                                    // Get the text value (warrantyprotection)
                                    setSubCatText(selectedSubCategory ? selectedSubCategory.subcategory : '');
                                }}
                                label="Sub category"
                            >
                                <MenuItem value="">
                                    <em>Please Select Subcategory</em>
                                </MenuItem>
                                {subcategoryList.map((subcategory, index) => (
                                    <MenuItem key={index} value={subcategory.id}>
                                        {subcategory.subcategory}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Warranty Protection</InputLabel>
                            <Select
                                id="demo-simple-select"
                                labelId="demo-simple-select-label"
                                value={warrantyprotection}
                                onChange={(e) => {
                                    setWarrantyprotection(e.target.value);
                                    const selectedValue = e.target.value;
                                    // Find the selected warranty protection by its id
                                    const selectedwarrantyProtection = warrantyProtectionList.find(warrantyprotection => warrantyprotection.id === selectedValue);
                                    // Get the text value (warrantyprotection)
                                    setWarrantyProtectionText(selectedwarrantyProtection ? selectedwarrantyProtection.warrantyprotection : '');
                                    handleSetSubCategory(selectedwarrantyProtection ? selectedwarrantyProtection.warrantyprotection : '');
                                }}
                                label="Warranty Protection"
                            >
                                <MenuItem value="">
                                    <em>Please Select Warranty Protection</em>
                                </MenuItem>
                                {warrantyProtectionList.map((warrantyprotection, index) => (
                                    <MenuItem key={index} value={warrantyprotection.id}>
                                        {warrantyprotection.warrantyprotection}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', marginTop: '15px' }}>
                        <FormControl fullWidth >
                            {/* <InputLabel id="demo-simple-select-label">Sub Category</InputLabel> */}
                            <TextField
                                // margin="normal"
                                disabled
                                required
                                fullWidth
                                label="Sub category text"
                                value={subCategory}
                                // onChange={(e) => { setSubCategory(e.target.value); }}
                                sx={textfieldStyles}
                            />
                        </FormControl>
                        {/* Upload PDF Field */}
                        <FormControl fullWidth>
                            {/* <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em' }}>
                                Upload PDF
                            </Typography> */}
                            <TextField
                                fullWidth
                                label="Upload pdf"
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setPdf(e.target.files[0]);
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                setPdf(reader.result);
                                            }
                                        };
                                        reader.readAsDataURL(e.target.files[0]);
                                    }
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>
                    </Stack>
                    <br />
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <FormControl>
                            <Typography variant="subtitle2">Product Feature</Typography>
                            {/* <ThemeProvider theme={myTheme}>
                                        <MUIRichTextEditor
                                            label="Type something here..."
                                            onChange={handleEditorChange}
                                            inlineToolbar={true}
                                            classes={{
                                                root: classes.editor,
                                            }}
                                        />
                                    </ThemeProvider> */}
                            {/* <JoditEditor
                                ref={editor}
                                value={content}
                                config={{
                                    placeholder: '', // Removes "Start typing" placeholder
                                }}
                                onChange={(newContent) => contentFieldChanaged(newContent)}
                            /> */}
                            <Editor value={content} onTextChange={(e) => setContent(e.htmlValue)} style={{ height: '320px' }} />
                            {/* <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={`product-name-${index}`}
                                        value={product.productDescription}
                                        onChange={(e) => handleProductDescriptionChange(index, e)}
                                        sx={textfieldStyles}
                                    /> */}
                        </FormControl>
                    </Stack>

                    {
                        productData.map((product, index) => (

                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <FormControl fullWidth key={index}>
                                    <Typography variant="subtitle2">Product Name</Typography>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={`product-name-${index}`}
                                        value={product.productName}
                                        onChange={(e) => handleProductNameChange(index, e)}
                                        sx={textfieldStyles}
                                    />
                                </FormControl>
                                {/* <FormControl fullWidth key={index}> */}
                                {/* <Typography variant="subtitle2">Product Description</Typography> */}
                                {/* <ThemeProvider theme={myTheme}>
                                        <MUIRichTextEditor
                                            label="Type something here..."
                                            onChange={handleEditorChange}
                                            inlineToolbar={true}
                                            classes={{
                                                root: classes.editor,
                                            }}
                                        />
                                    </ThemeProvider> */}
                                {/* <JoditEditor
                                        ref={editor}
                                        value={content}

                                        onChange={(newContent) => contentFieldChanaged(newContent)}
                                    /> */}
                                {/* <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={`product-name-${index}`}
                                        value={product.productDescription}
                                        onChange={(e) => handleProductDescriptionChange(index, e)}
                                        sx={textfieldStyles}
                                    /> */}
                                {/* </FormControl> */}
                                <FormControl fullWidth key={index}>
                                    <Typography variant="subtitle2">Product Price</Typography>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={`product-name-${index}`}
                                        value={product.productPrice}
                                        onChange={(e) => handleProductPriceChange(index, e)}
                                        sx={textfieldStyles}
                                    />
                                </FormControl>
                                <Button
                                    // startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
                                    size="medium"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#0d2365',
                                        '&:hover': {
                                            backgroundColor: '#0d2365',
                                        },
                                        borderRadius: '5px',
                                        padding: ''
                                    }}
                                    onClick={() => handleDelete(index)}
                                >
                                    <DeleteOutlineIcon />
                                </Button>

                            </Stack>


                        ))
                    }




                    <>
                        {/* <p>{JSON.stringify(productData)}</p> */}
                        {/* <div
                            dangerouslySetInnerHTML={{ __html: content }}
                            style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}
                        /> */}
                    </>




                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Button
                            startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
                            size="large"
                            variant="contained"
                            sx={{
                                backgroundColor: '#0d2365',
                                '&:hover': {
                                    backgroundColor: '#0d2365',
                                },
                                borderRadius: '10px'
                            }}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            // startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
                            size="large"
                            variant="contained"
                            sx={{
                                backgroundColor: '#0d2365',
                                '&:hover': {
                                    backgroundColor: '#0d2365',
                                },
                                borderRadius: '10px'
                            }}
                            onClick={handleSaveProduct}
                        >
                            Add New Product
                        </Button>
                        {/* <Button
                            startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
                            size="large"
                            variant="contained"
                            sx={{
                                backgroundColor: '#0d2365',
                                '&:hover': {
                                    backgroundColor: '#0d2365',
                                },
                                borderRadius: '10px'
                            }}
                            onClick={handleSave}
                        >
                            fetch
                        </Button> */}
                    </Stack>

                    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={severity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>
            </div>
        </>
    );
}

const textfieldStyles = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'lightgray', // Default border color
        },
        '&:hover fieldset': {
            borderColor: 'lightgray', // Remove hover border color
        },
        '&.Mui-focused fieldset': {
            borderColor: 'lightgray', // Remove focus border color
        },
    },
};

export default WarrantyProducts;
