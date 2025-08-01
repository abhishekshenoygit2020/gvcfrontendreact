import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import TaskIcon from '@mui/icons-material/Task';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../../../api/axios';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuthContext } from '../../../../context/AuthContext';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ApplicationStore from '../../../../utils/localStorageUtil';
const URL = "./personalInformation";


function AddPersonalInfo() {
  const user_email = ApplicationStore().getStorage('user_email');
  const navigate = useNavigate();
  // const { user_email } = useAuthContext();
  const [alertOpen, setAlertopen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [account, setAccount] = useState('');
  const [error,setError] = useState('');
  const [email, setEmail] = useState(user_email);
  const [dealerTrackerId, setDealerTrackerId] = useState('');
  const [mobile, setMobile] = useState('');
  const [salesPersonMarkup, setSalesPersonMarkup] = useState('');
  const [salespersonMarkupPercentage, setSalespersonMarkupPercentage] = useState('');
  const [salesmanOMVICNum, setSalesmanOMVICNum] = useState('');

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
    const method = "POST";
    const data = { account, email, dealerTrackId: dealerTrackerId, mobileNo: mobile, salesPersonMarkup, salesMarkupPercentage: salespersonMarkupPercentage, salesManOMVICNumber: salesmanOMVICNum };
    const mainURL = URL + '/update';
    serviceMethod(mainURL, method, data, handleSuccess, handleException);
  }

  const handleSuccess = (data) => {
    console.log(data);
    setSeverity("success");
    console.log(data);
    setMessage(data.message);
    setAlertopen(true);
    setTimeout(() => {
      navigate("/dashboard");
      setAccount('');
      setEmail('');
      setDealerTrackerId('');
      setMobile('');
      setSalesPersonMarkup('');
      setSalespersonMarkupPercentage('');
      setSalesmanOMVICNum('');
    }, 3000);
    
  }

  const handleException = (data) => {
    setSeverity("error");
    setMessage(data.message);
    setAlertopen(true);
    console.log(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let URL = './personalInformation/';
      const response = await axios.post(URL, { email: user_email });

      if (response.data.status == 401) {
        console.log("Unauthorized access");
      } else {
        // Assuming the first object in data array contains the data
        const data = response.data.data[0];
        console.log(data.id);

        // Set state variables with the received data
        setAccount(data.account || ''); // Fallback to an empty string if undefined
        setEmail(data.email || '');
        setDealerTrackerId(data.dealerTrackId || '');
        setMobile(data.mobileNo || '');
        setSalesPersonMarkup(data.salesPersonMarkup || '');
        setSalespersonMarkupPercentage(data.salesMarkupPercentage || '');
        setSalesmanOMVICNum(data.salesManOMVICNumber || '')
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };


  
  const handlePhoneChange = (e) => {
    const input = e.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(input)) {
      setMobile(input);

      // Validate if the phone number is exactly 10 digits
      if (input.length === 10) {
        setError(false); // Valid phone number
      } else {
        setError(true); // Invalid phone number
      }
    }
  };

  return (
    <>
      <div style={{ marginTop: "100px", padding: "0px" }}>
        <Typography variant="h5" sx={{ color: 'grey' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: "100px",
              padding: "0px"
            }}
          >
            <RecentActorsIcon sx={{ fontSize: '30px', color: 'grey' }} />
            <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px' }}>
              Sales Person
            </Typography>
          </Box>
        </Typography>
        <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
          <Toolbar />
          <Typography variant="h6">Contact Information</Typography>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', gap: '20px' }}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Account</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="account"
              
                name="billingStreat"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
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
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Email</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                disabled={true}
                id="email"
                name="billingStreat"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            </FormControl>
            <FormControl fullWidth style={{ display:"none"}}>
              <Typography variant="subtitle2">Mobile Phone</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="mobile"
                name="billingStreat"
                value={mobile}
                type="tel"
                inputProps={{ maxLength: 10 }} // Restrict maximum input length to 10
                onChange={handlePhoneChange}
                error={error} // Highlight the field if there's an error
                helperText={error ? "Please enter a valid 10-digit phone number" : ""}
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
            </FormControl>
          </Stack>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', gap: '20px' }}>
            <FormControl fullWidth  sx={{ display:"none" }}>
              <Typography variant="subtitle2">DealerTracker Id</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="dealerTrackerId"
                name="billingStreat"
                value={dealerTrackerId}
                onChange={(e) => setDealerTrackerId(e.target.value)}
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
            </FormControl>
            
          </Stack>
          <br />
          {/* <Typography variant="h6">Your Business Setting</Typography> */}
          <br />
          {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center', gap: '20px' }}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">SalesPerson Markup</Typography>
              <TextField
                margin="normal"
                
                required
                fullWidth
                id="salesPersonMarkup"
                name="billingStreat"
                value={salesPersonMarkup}
                onChange={(e) => setSalesPersonMarkup(e.target.value)}
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
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="subtitle2">SalesPerson Markup %</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="salespersonMarkupPercentage"
                name="billingStreat"
                value={salespersonMarkupPercentage}
                onChange={(e) => setSalespersonMarkupPercentage(e.target.value)}
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
            </FormControl>
          </Stack> */}
          <br />
          {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">SalesMan OMVIC Number</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="salesmanOMVICNum"
                name="billingStreat"
                value={salesmanOMVICNum}
                onChange={(e) => setSalesmanOMVICNum(e.target.value)}
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
            </FormControl>
          </Stack> */}
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button
              startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              sx={{
                backgroundColor: '#0d2365',  // Change background color to navy blue
                '&:hover': {
                  backgroundColor: '#0d2365',  // Darken the color on hover
                },
                borderRadius:'10px'
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

export default AddPersonalInfo;
