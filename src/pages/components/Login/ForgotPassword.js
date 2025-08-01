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
import Alert from '@mui/material/Alert';
import axios from '../../../api/axios';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ApplicationStore from '../../../utils/localStorageUtil';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';



import InputAdornment from '@mui/material/InputAdornment';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useAuthContext } from '../../../context/AuthContext';
const URL = "./auth/forgotPassword";

function ForgotPassword() {
    // const { user_email } = useAuthContext();
    const navigate = useNavigate();
    const user_email = ApplicationStore().getStorage('user_email');
    const initialLogin = ApplicationStore().getStorage('initialLogin');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");
    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');

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

        // Input Validation
        if (error) {
            alert("Please Enter the Email.");
            return;
        }

        if(!currentEmail){
            alert("Please Enter the Email.");
            return;
        }

        // if (newPassword !== verifyPassword) {
        //   alert("New password and verify password do not match.");
        //   return;
        // }


        const method = "POST";
        const data = { email: currentEmail };
        const mainURL = URL;
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
    }


    const handleEmailChange = (e) => {
        const email = e.target.value;
        setCurrentEmail(email);

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError(false); // Valid email
            setError(false); // Valid email
        } else {
            setError(true); // Invalid email
        }
    };


    const handleSuccess = (data) => {
        setSeverity("success");
        console.log(data);
        setMessage(data.message);
        setAlertopen(true);

        // Delay navigation by 3 seconds (3000 ms)
        setTimeout(() => {
            navigate('/login');
            setCurrentPassword('');
            setNewPassword('');
            setVerifyPassword('');
            setCurrentEmail('');
        }, 3000);
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
                            <Typography variant="h5" sx={{ color: 'grey', marginLeft: '8px' }}>
                                Forgot Password Request
                            </Typography>
                        </Box>
                    </Typography>
                    <br></br>
                    <form >
                        <Box component="main" sx={{ flexGrow: 1, p: 3, border: '1px solid rgb(229 231 235 / 99%);', borderRadius: '8px' }}>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle2">Your Email</Typography>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="account-user-email"
                                        value={currentEmail}
                                        onChange={handleEmailChange}
                                        error={error} // Set error state
                                        helperText={error ? "Please enter a valid email" : ""}
                                        sx={textfieldStyles}
                                    />
                                </FormControl>
                            </Stack>
                            <br />


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
                                    Password Reset Link
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
export default ForgotPassword;