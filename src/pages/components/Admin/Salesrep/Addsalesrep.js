import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import TaskIcon from '@mui/icons-material/Task';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../../../api/axios';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuthContext } from '../../../../context/AuthContext';

const URL = "./salesrep";

function AddSalesrep() {
  const { user_email } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [id, setId] = useState('');
  const [error, setError] = useState("");
  const [user_dealership, setUser_dealership] = useState('');
  const [dealershipArray, setDealershipArray] = useState([]);
  const [tradeName, setTradeName] = useState('');
  const [password, setPassword] = useState('');
  const [accountUserEmail, setAccountUserEmail] = useState('');
  const [accountPhone, setAccountPhone] = useState('');
  const [nameLegal, setNameLegal] = useState('');
  const [accountFax, setAccountFax] = useState('');
  const [accountName, setAccountName] = useState('');
  const [website, setWebsite] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [doNotShowPriceContracts, setDoNotShowPriceContracts] = useState(true);
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingStateProvince, setBillingStateProvince] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [acc_ovmic_no, setAcc_ovmic_no] = useState('');
  const [ovmic_no, setOvmic_no] = useState('');
  const [billingZippostalCode, setBillingZippostalCode] = useState('');
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

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setAccountUserEmail(email);

    // Check if the email includes ".com"
    if (email.includes(".com") && /\S+@\S+\.\S+/.test(email)) {
      setError(false); // Valid email
    } else {
      setError(true); // Invalid email
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(input)) {
      setAccountPhone(input);

      // Validate if the phone number is exactly 10 digits
      if (input.length === 10) {
        setError(false); // Valid phone number
      } else {
        setError(true); // Invalid phone number
      }
    }
  };

  const handleAccovmicno = (e) => {
    const input = e.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(input)) {
      setAcc_ovmic_no(input);

      // Validate if the phone number is exactly 10 digits
      if (input.length === 10) {
        setError(false); // Valid phone number
      } else {
        setError(true); // Invalid phone number
      }
    }
  };

  const handleovmicno = (e) => {
    const input = e.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(input)) {
      setOvmic_no(input);

      // Validate if the phone number is exactly 10 digits
      if (input.length === 10) {
        setError(false); // Valid phone number
      } else {
        setError(true); // Invalid phone number
      }
    }
  };

  const handleWebsiteChange = (e) => {
    const input = e.target.value;
    setWebsite(input);

    // Regex for basic website validation
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

    if (websiteRegex.test(input) || input === "") {
      setError(false); // Valid website or empty field
    } else {
      setError(true); // Invalid website
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (accountUserEmail == "") {
      alert("Please enter your Account Email");
      return false;
    }

    if (firstname == "") {
      alert("Please enter the firstname");
      return false;
    }

    if (lastname == "") {
      alert("Please enter the lastname");
      return false;
    }

    if (accountName == "") {
      alert("Please enter the Account Name");
      return false;
    }

    if (password == "") {
      alert("Please enter your Password");
      return false;
    }
    if (accountPhone == "") {
      alert("Please enter your Phone Number");
      return false;
    }
    if (nameLegal == "") {
      alert("Please enter your Legal Name");
      return false;
    }

    const data = {
      dealership:user_dealership,
      accountUserEmail,
      firstname,
      lastname,
      password,
      tradeName,
      accountPhone,
      nameLegal,
      accountFax,
      accountName,
      website,
      doNotShowPriceContracts,
      billingStreet,
      billingCity,
      billingStateProvince,
      billingCountry,
      billingZippostalCode,
      acc_ovmic_no,
      ovmic_no
    };
    console.log("type" + type);
    if (type === "add") {
      const mainURL = URL + '/add';
      serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
    } else {
      const mainURL = URL + '/' + id + '/update';
      console.log("url", mainURL);
      serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
    }

  };

  const handleSuccess = (data) => {
    setSeverity("success");
    setMessage("Data added Successfully");
    setAlertopen(true);
    setTimeout(() => {
      navigate("/ViewSalesrep");
    }, 6000); // Matches autoHideDuration

  }

  useEffect(() => {
    loadDealership();
    if (type == "update") {

      setId(value.id || '');
      setTradeName(value.tradeName || '');
      setUser_dealership(value.dealership || '');
      setAccountUserEmail(value.accountUserEmail || '');
      setFirstname(value.firstname || '');
      setLastname(value.lastname || '');
      setPassword('*****************');
      setAccountPhone(value.accountPhone || '');
      setNameLegal(value.nameLegal || '');
      setAccountFax(value.accountFax || '');
      setAccountName(value.accountName || '');
      setWebsite(value.website || '');
      setDoNotShowPriceContracts(value.doNotShowPriceContracts == "1" ? true : false);
      setBillingStreet(value.billingStreet || '');
      setBillingCity(value.billingCity || '');
      setBillingStateProvince(value.billingStateProvince || '');
      setBillingCountry(value.billingCountry || '');
      setBillingZippostalCode(value.billingZippostalCode || '');
      setAcc_ovmic_no(value.acc_ovmic_no || '');
      setOvmic_no(value.ovmic_no || '');
    } else {
      setId('');
      setTradeName('');
      setAccountUserEmail('');
      setPassword('');
      setAccountPhone('');
      setNameLegal('');
      setAccountFax('');
      setAccountName('');
      setWebsite('');
      setDoNotShowPriceContracts(false);
      setBillingStreet('');
      setBillingCity('');
      setBillingStateProvince('');
      setBillingCountry('');
      setBillingZippostalCode('');
      setAcc_ovmic_no('');
      setOvmic_no('');
    }
  }, [value, type]);

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


  const handleException = (data) => {
    setSeverity("error");
    setMessage(data.data);
    setAlertopen(true);
  }

  const generateAutoPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    // console.log("Generated Password:", password);
    setPassword(password);
  }


  return (
    <>
      <div style={{ marginTop: '50px', padding: '0px' }}>
        <Typography variant="h5" sx={{ color: 'grey' }}>
          <TaskIcon sx={{ fontSize: '20px' }} /> &nbsp;Salerep
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
          <Typography variant="h6">Account Information</Typography>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <FormControl fullWidth >
              <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '0.5em', }}>
                Dealership
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user_dealership}
                disabled={type == 'update'}
                onChange={(e) => setUser_dealership(e.target.value)}
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
            <FormControl fullWidth>
              <Typography variant="subtitle2"  >Account User Email</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="account-user-email"
                value={accountUserEmail}
                onChange={handleEmailChange}
                disabled={type == 'update'}
                error={error} // Set error state
                helperText={error ? "Please enter a valid email with '.com'" : ""}
                sx={textfieldStyles}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Account User Password</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="account-user-email"
                disabled={type == 'update'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="subtitle2">First Name</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="account-user-email"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                // disabled={type == 'update'}
                // error={error} // Set error state
                // helperText={error ? "Please enter a valid email with '.com'" : ""}
                sx={textfieldStyles}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Last Name</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="account-user-email"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                // disabled={type == 'update'}
                // error={error} // Set error state
                // helperText={error ? "Please enter a valid email with '.com'" : ""}
                sx={textfieldStyles}
              />
            </FormControl>
          </Stack>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Trade Name</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="tradeName"
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="subtitle2">Account Phone</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="accountPhone"
                value={accountPhone}
                type="tel"
                inputProps={{ maxLength: 10 }} // Restrict maximum input length to 10
                onChange={handlePhoneChange}
                error={error} // Highlight the field if there's an error
                helperText={error ? "Please enter a valid 10-digit phone number" : ""}
                sx={textfieldStyles}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="subtitle2">Name (Legal)</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nameLegal"
                value={nameLegal}
                onChange={(e) => setNameLegal(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Account Fax</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="accountFax"
                value={accountFax}
                onChange={(e) => setAccountFax(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>
          </Stack>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>


            <FormControl fullWidth>
              <Typography variant="subtitle2">Account Name</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="subtitle2">Website</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="website"
                value={website}
                type="url"
                onChange={handleWebsiteChange}
                error={error} // Highlight the field if there's an error
                helperText={error ? "Please enter a valid website URL (e.g., https://example.com)" : ""}
                sx={textfieldStyles}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Sales OMVIC #</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="website"
                value={acc_ovmic_no}
                type="text"
                onChange={(e) => { setAcc_ovmic_no(e.target.value) }}
                // error={error} // Highlight the field if there's an error
                // helperText={error ? "Please enter only number" : ""}
                sx={textfieldStyles}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Admin OMVIC #</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="website"
                value={ovmic_no}
                type="text"
                onChange={(e) => { setOvmic_no(e.target.value) }}
                // error={error} // Highlight the field if there's an error
                // helperText={error ? "Please enter only number" : ""}
                sx={textfieldStyles}
              />
            </FormControl>
          </Stack>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={doNotShowPriceContracts}
                  onChange={(e) => setDoNotShowPriceContracts(e.target.checked)}
                  sx={{
                    color: 'purple',
                    '&.Mui-checked': {
                      color: 'purple',
                    },
                  }}
                />
              }
              label="Do Not Show Price Contracts"
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: 'purple',
                },
              }}
            />
          </Stack>
          <br />
          <Typography variant="h6">Billing Address</Typography>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Billing Street</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="billingStreet"
                value={billingStreet}
                onChange={(e) => setBillingStreet(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="subtitle2">Billing City</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="billingCity"
                value={billingCity}
                onChange={(e) => setBillingCity(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="subtitle2">Billing State/Province</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="billingStateProvince"
                value={billingStateProvince}
                onChange={(e) => setBillingStateProvince(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>
          </Stack>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Billing Country</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="billingCountry"
                value={billingCountry}
                onChange={(e) => setBillingCountry(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="subtitle2">Billing Zip/Postal Code</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="billingZippostalCode"
                value={billingZippostalCode}
                onChange={(e) => setBillingZippostalCode(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>
          </Stack>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
              onClick={handleSave}
            >
              Save
            </Button>
            {type != "update" ?
              <Button
                size="large"
                variant="contained"

                sx={{
                  backgroundColor: '#0d2365',  // Change background color to navy blue
                  '&:hover': {
                    backgroundColor: '#0d2365',  // Darken the color on hover
                  },
                  borderRadius: '10px'
                }}
                type="button"
                onClick={generateAutoPassword}
              >
                {"Autogenerate Password"}
              </Button> : ""
            }

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

export default AddSalesrep;
