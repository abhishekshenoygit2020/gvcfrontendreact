import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LOGOimg from './../../../../src/Images/GVClogo.png';
import LOGO from "../../../../src/Images/carCanada.png"
import LoginIcon from '@mui/icons-material/Login';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Commission from '../Admin/Dealership/Commision';

const LOGIN_URL = './auth/login';

function Login() {
  const [user_email, setUser_email] = useState('');
  const [user_password, setUser_password] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { Login } = useAuthContext();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUser_email(email);

    // Check if the email includes ".com"
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(false); // Valid email
    } else {
      setError(true); // Invalid email
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner 


    if (error) {
      setLoading(false);
      return false;
    }
    // Simulate a minimum of 5 seconds loading time
    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const data = { user_email, user_password };
      const dataResponse = await axios.post(LOGIN_URL, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (dataResponse.data.success === 1) {
        const resData = dataResponse.data.data;
        const initialLogin = resData.initialLogin;
        const userType = resData.user_type == "Relationship Manager" ? "admin" : resData.user_type;
        const userData = {
          userName: resData.username,
          userToken: resData.token,
          user_type: userType,
          user_email: resData.user_email,
          initialLogin: resData.initialLogin,
          dealership: resData.dealership,
          omvic_no: resData.ovmic_no,
          accovmicno: resData.accovmicno,
          salesrep: resData.salesrep,
          commission: resData.commission
        };

        Login(userData);
        setAlertMessage('Login successful!');
        setAlertSeverity('success');
        setUser_email('');
        setUser_password('');

        await minLoadingTime;
        setLoading(false);

        if (loading === false) {
          setOpenAlert(true);
        }
        setOpenAlert(false);

        if (initialLogin == 1) {
          navigate('/InitialPasswordChange');
        } else if (resData.user_type == "user") {
          navigate('/BuildWarranty');
        } else {
          navigate('/Dashboard');
        }


      }
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error // Server-provided error
          : err.message || 'An unknown error occurred'; // Generic fallback

      setAlertSeverity('error');
      setAlertMessage(errorMessage);

      await minLoadingTime;
      setLoading(false);
      setOpenAlert(true);

      // Auto-hide alert after 2 seconds
      setTimeout(() => setOpenAlert(false), 2000);
    } finally {
      // Ensure the loading is visible for exactly 5 seconds
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          // marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          
        </Avatar> */}
        <img src={LOGO} alt="Logo" style={{ margin: '50px 0', height: '100px', width: '200px' }} />
        <Typography component="h1" variant="h5">

        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSave}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={user_email}
            onChange={handleEmailChange}
            error={error} // Set error state
            helperText={error ? "Please enter a valid email" : ""}
            autoFocus
            sx={{
              '& label.Mui-focused': {
                color: '#0d2365', // Change to #0d2365 blue
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#0d2365', // Change to #0d2365 blue
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black', // default border color
                },
                '&:hover fieldset': {
                  borderColor: 'gray', // hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0d2365', // focus border color changed to #0d2365 blue
                },
              },
            }}
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user_password}
            onChange={(e) => setUser_password(e.target.value)}
            sx={{
              '& label.Mui-focused': {
                color: '#0d2365', // Change to #0d2365 blue
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#0d2365', // Change to #0d2365 blue
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black', // default border color
                },
                '&:hover fieldset': {
                  borderColor: 'gray', // hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0d2365', // focus border color changed to #0d2365 blue
                },
              },
            }}
           
          /> */}

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
              Password
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={user_password}
              onChange={(e) => setUser_password(e.target.value)}
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
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            startIcon={<LoginIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            sx={{
              backgroundColor: '#0d2365',  // Change background color to #0d2365 blue
              '&:hover': {
                backgroundColor: '#0d2365',  // Change hover color to blue
              },
              mt: 2
            }}
            disabled={loading}  // Disable button when loading
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              textAlign: 'center',
              backgroundColor: '#f8f9fa',
              padding: '5px',
              boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              color: '#6c757d',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '0.5px',
              height: '40px',
            }}
          >
            <span>
              Web Application developed by{' '}
              <a
                href="https://www.alhamwebtech.com" // Replace with actual link
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
              >
                Alham Webtech
              </a>
            </span>
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="ForgotPasswordRequest" variant="body2">
              {"Forgot Password? Click Here!"}
            </Link>
          </Grid>
        </Grid>

      </Box>
      <br></br>
      {/* Alert for success or error */}
      <Box sx={{ width: '100%' }}>
        <Collapse in={openAlert}>
          <Alert
            severity={alertSeverity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setOpenAlert(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alertMessage}
          </Alert>
        </Collapse>
      </Box>

      {/* Backdrop for loading spinner */}
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>

  );
}

export default Login;
