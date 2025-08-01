import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import axios from "../../../api/axios";
import ApplicationStore from "../../../utils/localStorageUtil";
import { is } from "immutable";
import { isCompositeComponent } from "react-dom/test-utils";
const URL = './user/createUser';

const RelationshipModelComponent = ({ open, setOpen, isAddButton, rowData, setRefreshData, trackno, isCommissionUpdate, setIsCommissionUpdate }) => {
    //basic information
    const [id, setId] = useState('');
    const userType = ApplicationStore().getStorage('user_type');
    const [user_email, setUser_email] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [user_dealership, setUser_dealership] = useState('');
    const [user_password, setUser_password] = useState('');
    const [commissionPerc, setCommissionPerc] = useState('')
    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [ovmic_no, setOvmic_no] = useState('');
    const [userRole, setUserRole] = useState('Relationship Manager');
    const [dealershipArray, setDealershipArray] = useState([]);
    const [error, setError] = useState(false);
    const user = ApplicationStore().getStorage('user_email');
    const dealership = ApplicationStore().getStorage('dealership');

    const userRoles = userType === 'admin'
        ? [
            // { label: 'Manager', value: 'manager' },
            // { label: 'Salesrep', value: 'user' },
            { label: 'Relationship Manager', value: 'Relationship Manager' }
        ]
        : [
            { label: 'Relationship Manager', value: 'Relationship Manager' }
        ];


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

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = "POST";

        if (isAddButton) {
            if (!user_email || !firstname || !lastname || !user_password || !userRole) {
                alert("Please fill out all the fields."); // Replace with your preferred error handling
                return;
            }



            const data = { user_email, firstname, lastname, user_password, dealership: user_dealership, ovmic_no, userRole, commissionPerc };
            const mainURL = URL;
            serviceMethod(mainURL, method, data, handleSuccess, handleException);
        } else {
            if (!user_email || !firstname || !lastname || !userRole) {
                alert("Please fill out all the fields."); // Replace with your preferred error handling
                return;
            }

            // if (userRole == "Relationship Manager" && user_dealership != 131) {
            //     alert("Please Select GVC dealership for Relationship Manager");
            //     return;
            // }

            // if (!ovmic_no) {
            //     alert("Please fill out all the fields."); // Replace with your preferred error handling
            //     return;
            // }
            const data = { ovmic_no, id, dealership: user_dealership, commissionPerc, userRole };
            const mainURL = "./user" + '/updateOVMICNO';
            serviceMethod(mainURL, method, data, handleSuccess, handleException);
        }
    };

   useEffect(() => {
    if (isAddButton || rowData) {
        setAlertopen(false);
        setOpen(open);

        if (isAddButton) {
            setUser_email("");
            setFirstname("");
            setLastname("");
            setUser_password("");
            setUser_dealership("");
            setCommissionPerc("");
            setOvmic_no("");
            setUserRole("Relationship Manager"); // <- important
        } else if (rowData) {
            setId(rowData.id);
            setUser_email(rowData.user_email);
            setFirstname(rowData.firstname);
            setLastname(rowData.lastname);
            setUser_dealership(rowData.dealership);
            setCommissionPerc(rowData.commissionPerc);
            setOvmic_no(rowData.ovmic_no);
            setUserRole(rowData.userRole || "Relationship Manager"); // fallback
        }

        if (userType !== "admin") {
            setUser_dealership(dealership);
        }
    }
}, [rowData, isAddButton, userType]);

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

    const loadData = (rowData) => {
        // console.log("testt "+rowData.dealership);
        setId(rowData.id);
        setUser_email(rowData.user_email);
        // setUser_dealership(48);
        setFirstname(rowData.firstname);
        setLastname(rowData.lastname);
        // setCommissionPerc(rowData.commissionPerc);
    };

    const handleSuccess = (data) => {
        setSeverity("success");
        if (isAddButton) {

            setMessage("Data Added Successfully");
        } else {
            setMessage("Data Updated Successfully");
        }

        setAlertopen(true);
        setTimeout(() => {
            setOpen(false);
            setRefreshData((oldValue) => !oldValue);
        }, 1000); // Matches autoHideDuration
    };

    const handleException = (data) => {
        setSeverity("error");
        setMessage(data.data);
        setAlertopen(true);
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
    };

    const generateAutoPassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        // console.log("Generated Password:", password);
        setUser_password(password);
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%' } }}
            open={open}
        >
            <form>
                <DialogTitle
                    sx={{
                        color: 'navy', // Text color (affects the outline for outlined buttons)
                        borderColor: 'navy', // Outline color
                        '&:hover': {
                            borderColor: 'darkblue', // Darken the outline on hover
                        },
                    }}>
                    {isAddButton ? "Add Relationship Manager User" : "Edit Relationship Manager User"}
                </DialogTitle>
                <DialogContent>
                    <Grid item xs={12}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={4} style={{ display: isAddButton ? "block" : isCommissionUpdate ? "none" : "block" }}>
                                <FormControl fullWidth >
                                    <Typography variant="subtitle2" gutterBottom sx={{ marginBottom: '1.0em' }}>
                                        Usertype
                                    </Typography>
                                    <Select
                                        labelId="user-role-select-label"
                                        id="user-role-select"
                                        value={userRole}
                                        onChange={(e) => setUserRole(e.target.value)}
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
                                            <em>Please Select User Role</em>
                                        </MenuItem>
                                        {userRoles.map((role, index) => (
                                            <MenuItem key={index} value={role.value}>
                                                {role.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} style={{ display: isAddButton ? "block" : "none" }}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle2" gutterBottom>
                                        First Name
                                    </Typography>
                                    <TextField
                                        value={firstname}
                                        margin="dense"
                                        id="outlined-basic"
                                        variant="outlined"
                                        required
                                        onChange={(e) => { setFirstname(e.target.value) }}
                                        sx={{
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
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} style={{ display: isAddButton ? "block" : "none" }}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Last Name
                                    </Typography>
                                    <TextField
                                        value={lastname}
                                        margin="dense"
                                        id="outlined-basic"
                                        variant="outlined"
                                        required
                                        onChange={(e) => { setLastname(e.target.value) }}
                                        sx={{
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
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4} style={{ display: isAddButton ? "block" : isCommissionUpdate ? "none" : "block" }}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Email
                                    </Typography>
                                    <TextField
                                        value={user_email}
                                        margin="dense"
                                        id="outlined-basic"
                                        variant="outlined"
                                        disabled={!isAddButton}
                                        required
                                        type="email"
                                        onChange={handleEmailChange}
                                        error={error} // Set error state
                                        helperText={error ? "Please enter a valid email with '.com'" : ""}
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
                            </Grid>
                            <Grid item xs={4} style={{ display: isAddButton ? "block" : isCommissionUpdate ? "none" : "block" }}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle2" gutterBottom>
                                        OMVIC No
                                    </Typography>
                                    <TextField
                                        value={ovmic_no}
                                        margin="dense"
                                        id="outlined-basic"
                                        variant="outlined"
                                        required
                                        onChange={(e) => { setOvmic_no(e.target.value) }}
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
                            </Grid>
                            <Grid item xs={4} style={{ display: isAddButton ? "block" : "none" }}>
                                <FormControl fullWidth>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Password
                                    </Typography>
                                    <TextField
                                        value={user_password}
                                        margin="dense"
                                        id="outlined-basic"
                                        variant="outlined"
                                        required
                                        onChange={(e) => { setUser_password(e.target.value) }}
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
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ margin: '10px' }}>
                    <Button
                        size="large"
                        variant="outlined"
                        sx={{
                            color: 'navy',
                            borderColor: 'navy',
                            '&:hover': {
                                borderColor: 'darkblue',
                            },
                        }}
                        autoFocus
                        onClick={(e) => {
                            setOpen(false);
                            setIsCommissionUpdate(false);
                        }}
                    >
                        Cancel
                    </Button>
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
                        onClick={handleSubmit}
                    >
                        {isAddButton ? "Save" : "Update"}
                    </Button>

                    <Button
                        size="large"
                        variant="contained"

                        sx={{
                            backgroundColor: '#0d2365',  // Change background color to navy blue
                            '&:hover': {
                                backgroundColor: '#0d2365',  // Darken the color on hover
                            },
                            borderRadius: '10px',
                            display: isAddButton ? "block" : "none"
                        }}
                        type="button"
                        onClick={generateAutoPassword}
                    >
                        {"Autogenerate Password"}
                    </Button>

                </DialogActions>
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
            </form>
        </Dialog>
    );
}

export default RelationshipModelComponent;
