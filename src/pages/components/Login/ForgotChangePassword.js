import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import TaskIcon from '@mui/icons-material/Task';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from '../../../api/axios';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ApplicationStore from '../../../utils/localStorageUtil';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';


import LockResetIcon from '@mui/icons-material/LockReset';
import { useAuthContext } from '../../../context/AuthContext';
const URL = "./auth/forgotPasswordUpdate";

function ForgotChangePassword() {
  // const { user_email } = useAuthContext();
  const navigate = useNavigate();
  const { emailId } = useParams();
  const user_email = ApplicationStore().getStorage('user_email');
  const initialLogin = ApplicationStore().getStorage('initialLogin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const [alertOpen, setAlertopen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  const [step, setStep] = useState(1);


  const [showPasswordN, setShowPasswordN] = React.useState(false);
  const [showPasswordV, setShowPasswordV] = React.useState(false);

  const handleClickShowPasswordN = () => setShowPasswordN((show) => !show);
  const handleClickShowPasswordV = () => setShowPasswordV((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

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

  const handleSubmit = async (e) => {

    e.preventDefault(); // Prevent form default behavior

    // // Input Validation
    // if (!currentPassword || !newPassword || !verifyPassword) {
    //   alert("All fields are required.");
    //   return;
    // }

    if (newPassword !== verifyPassword) {
      alert("New password and verify password do not match.");
      return;
    }


    const method = "POST";
    const data = { newPassword, email: emailId, initialLogin: 0, type: "PasswordUpdate" };
    const mainURL = URL;
    serviceMethod(mainURL, method, data, handleSuccess, handleException);
  }


  const handleSubmitOTP = async (e) => {

    e.preventDefault(); // Prevent form default behavior

    // // Input Validation
    // if (!currentPassword || !newPassword || !verifyPassword) {
    //   alert("All fields are required.");
    //   return;
    // }

    if (!otp) {
      alert("Please Enter the OTP");
      return;
    }


    const method = "POST";
    const data = { otp, email: emailId, initialLogin: 0, type: "otpCheck" };
    const mainURL = URL;
    serviceMethod(mainURL, method, data, handleSuccess, handleException);
  }



  const handleSuccess = (data) => {

    console.log("OTP results", data);

    if (data.status == 200 && step == 1) {
      setSeverity("success");
      setMessage(data.message);
      setAlertopen(true);
      if (step == 1) {
        setStep(2);
        // setAlertopen(false);
      }
    } else {
      setSeverity("success");
      setMessage(data.message);
      setAlertopen(true);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
    // setSeverity("success");
    // console.log(data);
    // setMessage(data.message);
    // setAlertopen(true);

    // // Delay navigation by 3 seconds (3000 ms)
    // setTimeout(() => {
    //   navigate('/Login');
    //   setCurrentPassword('');
    //   setNewPassword('');
    //   setVerifyPassword('');
    //   setEmail('');
    // }, 3000);
  };

  const handleException = (data) => {
    setSeverity("error");
    setMessage(data.error);
    setAlertopen(true);
  }
  useEffect(() => {
    // loadData();   
  }, []);

  const loadData = async () => {
    try {
      let URL = './company/';
      const response = await axios.get(URL);
      if (response.data.status == 401) {
        setCurrentPassword('');
      } else {
        setCurrentPassword(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }

  };

  return (
    <>
      <div style={{ marginTop: "100px", padding: "0px" }}>
        <Container maxWidth="sm" >
          <Typography variant="h5" sx={{ color: 'grey' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: "100px",
                padding: "0px"
              }}
            >
              <LockResetIcon sx={{ fontSize: '30px', color: 'grey' }} />
              {step == 1 ? <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px' }}>
                OTP
              </Typography> : <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px' }}>
                Update Password
              </Typography>
              }

            </Box>
          </Typography>
          <br></br>
          <form >
            {
              step == 1 ?
                <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <FormControl fullWidth>
                      <Typography variant="subtitle2">OTP NO</Typography>
                      <TextField
                        value={otp}
                        onChange={(e) => {
                          const input = e.target.value;
                          // Allow only digits and limit input to 6 characters
                          if (/^\d{0,6}$/.test(input)) {
                            setOtp(input);
                          }
                        }}
                        margin="normal"
                        required
                        fullWidth
                        id="otp"
                        type="text" // Use "text" to prevent automatic browser adjustments for "number"
                        name="otp"
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

                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Button
                      onClick={(e) => handleSubmitOTP(e)}  // Use arrow function to pass event to handleSubmit
                      startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
                      variant="contained"
                      sx={{
                        backgroundColor: '#0d2365',  // Change background color to navy blue
                        '&:hover': {
                          backgroundColor: '#0d2365',  // Darken the color on hover
                        },
                        borderRadius: '10px'
                      }}
                      type="button"
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
                </Box> : <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    {/* <FormControl fullWidth>
                      <Typography variant="subtitle2">New Password</Typography>
                      <TextField
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value) }}
                        margin="normal"
                        required
                        fullWidth
                        id="new-password"
                        name="newPassword"
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
                    </FormControl> */}
                    <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
                      <InputLabel
                        htmlFor="outlined-adornment-password"
                        sx={{
                          color: 'rgb(4, 8, 20)', // Default label color
                          '&.Mui-focused': {
                            color: 'rgb(4, 8, 20) !important', // Ensure focus color doesn't revert to primary
                          },
                        }}
                      >
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={showPasswordN ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'black', // Default border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'gray', // Hover border color
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'rgb(4, 8, 20) !important', // Force dark blue focus border
                            },
                          },
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={showPasswordN ? 'hide the password' : 'display the password'}
                              onClick={handleClickShowPasswordN}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPasswordN ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="New Password"
                      />
                    </FormControl>
                  </Stack>
                  <br />
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    {/* <FormControl fullWidth>
                      <Typography variant="subtitle2">Verify New Password</Typography>
                      <TextField
                        value={verifyPassword}
                        onChange={(e) => { setVerifyPassword(e.target.value) }}
                        margin="normal"
                        required
                        fullWidth
                        id="verify-password"
                        name="verifyPassword"
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
                    </FormControl> */}
                    <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
                      <InputLabel
                        htmlFor="outlined-adornment-password"
                        sx={{
                          color: 'rgb(4, 8, 20)', // Default label color
                          '&.Mui-focused': {
                            color: 'rgb(4, 8, 20) !important', // Ensure focus color doesn't revert to primary
                          },
                        }}
                      >
                        Verify New Password
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={showPasswordV ? 'text' : 'password'}
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'black', // Default border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'gray', // Hover border color
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'rgb(4, 8, 20) !important', // Force dark blue focus border
                            },
                          },
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={showPasswordV ? 'hide the password' : 'display the password'}
                              onClick={handleClickShowPasswordV}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPasswordV ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Verify New Password"
                      />
                    </FormControl>
                  </Stack>
                  <br />
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Button
                      onClick={(e) => handleSubmit(e)}  // Use arrow function to pass event to handleSubmit
                      startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
                      variant="contained"
                      sx={{
                        backgroundColor: '#0d2365',  // Change background color to navy blue
                        '&:hover': {
                          backgroundColor: '#0d2365',  // Darken the color on hover
                        },
                        borderRadius: '10px'
                      }}
                      type="button"
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

            }



          </form>

        </Container>

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
export default ForgotChangePassword;