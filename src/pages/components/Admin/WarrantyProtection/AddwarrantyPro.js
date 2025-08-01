import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import TaskIcon from '@mui/icons-material/Task';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from '../../../../api/axios';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuthContext } from '../../../../context/AuthContext';
import { caES } from '@mui/material/locale';

const URL = "./category";

function AddwarrantyPro() {
  const { user_email } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [id, setId] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [warrantyprotection, setWarrantyprotection] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setsubcategoryList] = useState([]);
  const [alertOpen, setAlertopen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
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
    const data = {
      category, subcategory, warrantyprotection
    };
    console.log("type" + type);
    if (type === "add") {
      const mainURL = URL + '/addwarrantyprotection';
      serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
    } else {
      const mainURL = URL + '/' + id + '/updatewarrantyprotection';
      console.log("url", mainURL);
      serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
    }

  };

  const handleSuccess = (data) => {
    setSeverity("success");
    setMessage(data.data);
    setAlertopen(true);
    setTimeout(() => {
      navigate("/ViewwarrantyPro");
    }, 6000); // Matches autoHideDuration

  }

  useEffect(() => {
    if (type == "update") {
      setId(value.id || '');
      setCategory(value.category || '');
      setWarrantyprotection(value.warrantyProtection || '');
      if(value.category){
        loadSubCategory(value.category);
        setSubcategory(value.subcategory || "");
      }
      // setCategoryName(value.categoryName || '');

    } else {
      setId('');
      setCategory('');
      setSubcategory('');
      setWarrantyprotection('');

    }
    loadCategory();
  }, [value, type]);

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


  const handleException = (data) => {
    setSeverity("error");
    setMessage(data.data);
    setAlertopen(true);
  }

  const fetchsubcategory = async (e) => {
    loadSubCategory(e.target.value)
    
  }

  return (
    <>
      <div style={{ marginTop: '100px', padding: '0px' }}>
        <Typography variant="h5" sx={{ color: 'grey' }}>
          {/* <TaskIcon sx={{ fontSize: '20px' }} /> &nbsp; */}
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
          <Typography variant="h6">Warranty Protection Information</Typography>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
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


            <FormControl fullWidth>
              {/* <Typography variant="subtitle2">Warranty Protection</Typography> */}
              <TextField
                margin="none"
                label="Warranty Protection"
                required
                fullWidth
                id="account-user-email"
                value={warrantyprotection}
                onChange={(e) => setWarrantyprotection(e.target.value)}
              // sx={{
              //     '& .MuiInputLabel-root': {
              //         transform: 'translate(14px, -6px) scale(1)', // Adjust the label position
              //     },
              //     '& .MuiInputBase-root': {
              //         marginTop: '0px', // Controls the input field's vertical alignment
              //     },
              // }}
              />
            </FormControl>
          </Stack>
          <br />


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

export default AddwarrantyPro;
