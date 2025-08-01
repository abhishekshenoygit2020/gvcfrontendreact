import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import ApplicationStore from "../../../utils/localStorageUtil";
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockResetIcon from '@mui/icons-material/LockReset';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@mui/material/Typography';
import BlockIcon from '@mui/icons-material/Block';
import Alert from '@mui/material/Alert';

import Snackbar from '@mui/material/Snackbar';

import axios from "../../../api/axios";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useAuthContext } from "../../../context/AuthContext";
import { Lock } from "@mui/icons-material";
const URL = './dealership/getLogDetails';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const LogList = () => {
    const dealership = ApplicationStore().getStorage('dealership');
    const user_type = ApplicationStore().getStorage('user_type');
    const user_email = ApplicationStore().getStorage('user_email');

    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const columns = [
        { field: 'slNo', headerName: 'ID', width: 200 },
        {
            field: 'warrantyId',
            headerName: 'Warranty ID',
            width: 200,
            editable: false,
        },
        {
            field: 'VINNO',
            headerName: 'VIN NO',
            width: 200,
            editable: false,
        },
         {
            field: 'dealership',
            headerName: 'Dealership',
            width: 200,
            editable: false,
        },
        {
            field: 'previousUser',
            headerName: 'Previous User',
            width: 200,
            editable: false,
        },
        {
            field: 'currentUser',
            headerName: 'Current User',
            width: 200,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            editable: false,
        },
        {
            field: 'dateTime',
            headerName: 'Date & Time',
            width: 200,
            editable: false,
        },
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Actions',
        //     width: 200,
        //     cellClassName: 'actions',
        //     getActions: (params) => {
        //         return params.row.dealershipblocked == 1 ? [
        //             <BlockDealership selectedRow={params.row} />
        //         ] : params.row.userblocked == "0" ? user_type == "admin" ?
        //             [
        //                 <PasswordResetLink selectedRow={params.row} />,
        //                 <BlockUser selectedRow={params.row} />,
        //                 <EditData selectedRow={params.row} />
        //             ] :
        //             [
        //                 // <DeleteData selectedRow={params.row} />,
        //                 <BlockUser selectedRow={params.row} />,
        //                 <EditData selectedRow={params.row} />
        //             ] : user_type == "admin" ?
        //             [
        //                 <PasswordResetLink selectedRow={params.row} />,
        //                 <UnBlockUser selectedRow={params.row} />,
        //                 <EditData selectedRow={params.row} />
        //             ] :
        //             [
        //                 <UnBlockUser selectedRow={params.row} />,
        //                 <EditData selectedRow={params.row} />
        //             ];
        //     }
        // },
    ];

    const [open, setOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editData, setEditData] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [isLoading, setGridLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [trackno, setTrackno] = useState('');
    const [email, setEmail] = useState("");


    const serviceMethod = async (mainURL, data, handleSuccess, handleException) => {
        try {
            const response = await axios.delete(mainURL, data);
            return handleSuccess(response.data);
        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
            } else {
                return handleException(err?.response.data);
            }
        }
    };

    const serviceUpdateMethod = async (mainURL, data, handleSuccess, handleException) => {
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

    useEffect(() => {
        loadData();

    }, [refreshData]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertopen(false);
    };



    const loadData = async () => {
        try {
            const response = await axios.post(URL, { dealership });
            const dataWithIndex = response.data.data.map((item, index) => ({
                ...item,
                slNo: index + 1, // Assign sequential SL No starting from 1
                user_type: item.user_type == "admin" ? "ADMIN" : item.user_type == "dealership" ? "Dealership Admin" : item.user_type == "user" ? "Dealership User":item.user_type == "manager" ? "Dealership Manager" : item.user_type
            })) || "";
            setDataList(dataWithIndex || '');
            // setDataList(response.data.data || '');
        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
            } else {
                console.log(err?.response.data);
            }
        }
    };

    const EditData = (props) => {
        return (
            <EditIcon style={{ cursor: "pointer" }} onClick={(e) => {
                e.stopPropagation();
                console.log(props.selectedRow.id);
                setEditData(props.selectedRow);
                setIsAddButton(false);
                setOpen(true);
            }} />
        );
    };

    const DeleteData = (props) => {
        return (
            <DeleteIcon style={{ cursor: "pointer" }}
                onClick={() => {
                    const isConfirmed = window.confirm("Are you sure you want to delete?");
                    if(isConfirmed){
                        const data = { id: props.selectedRow.id, type: "delete" };
                        const mainURL = './user' + '/' + data.id + '/deleteUser';
                        serviceMethod(mainURL, data, handleSuccess, handleException);
                    }    
                    
                }}
            />
        );
    };

    const PasswordResetLink = (props) => {
        return (
            props.selectedRow.user_email == user_email ? "" :
                <Tooltip title="Password Reset Link">
                    <LockResetIcon style={{ cursor: "pointer" }}
                        onClick={() => {

                            const data = { email: props.selectedRow.user_email, type: "post", userType: "admin" };
                            const mainURL = './auth/forgotPassword';
                            serviceUpdateMethod(mainURL, data, handleSuccess, handleException);
                        }}
                    />
                </Tooltip>

        );
    };


    const BlockDealership = (props) => {
        return (
            props.selectedRow.user_email == user_email ? "" :
                <Tooltip title="Respective dealership is blocked">
                    <BlockIcon style={{ cursor: "pointer" }} title="Respective dealership is blocked"
                    // onClick={() => {
                    //     if (window.confirm("Are you sure you want to block this user?")) {
                    //         const data = { id: props.selectedRow.id, action: 1, type: "post" };
                    //         const mainURL = './user' + '/blockById';
                    //         serviceUpdateMethod(mainURL, data, handleSuccess, handleException);
                    //     }

                    // }}
                    />
                </Tooltip>

        );
    };

    const BlockUser = (props) => {
        return (
            props.selectedRow.user_email == user_email ? "" :
                <Tooltip title="Block User">
                    <LockOpenIcon style={{ cursor: "pointer" }} title="Block User"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to block this user?")) {
                                const data = { id: props.selectedRow.id, action: 1, type: "post" };
                                const mainURL = './user' + '/blockById';
                                serviceUpdateMethod(mainURL, data, handleSuccess, handleException);
                            }

                        }}
                    />
                </Tooltip>

        );
    };

    const UnBlockUser = (props) => {
        return (
            props.selectedRow.user_email == user_email ? "" :
                <Tooltip title="UnBlock User">
                    <LockIcon style={{ cursor: "pointer" }} title="UnBlock User"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to unblock this user?")) {
                                console.log(props.selectedRow.id);
                                const data = { id: props.selectedRow.id, action: 0 };
                                const mainURL = './user' + '/blockById';
                                serviceUpdateMethod(mainURL, data, handleSuccess, handleException);
                            }
                        }}
                    />
                </Tooltip>


        );
    };

    const Block = (props) => {
        return (
            <>
                {
                    props.selectedRow.block == '0' ?
                        <LockOpenIcon
                            onClick={() => {
                                console.log(props.selectedRow.block);
                                var oldBlock = props.selectedRow.block;
                                var block = oldBlock == 1 ? 0 : 1;
                                const data = { id: props.selectedRow.id, block: block };
                                const mainURL = URL + '/' + data.id + '/updateBlockStatus';
                                serviceUpdateMethod(mainURL, data, handleSuccess, handleException);
                            }}
                        /> :
                        <LockIcon
                            onClick={() => {
                                console.log(props.selectedRow.block);
                                var oldBlock = props.selectedRow.block;
                                var block = oldBlock == 1 ? 0 : 1;
                                const data = { id: props.selectedRow.id, block: block };
                                const mainURL = URL + '/' + data.id + '/updateBlockStatus';
                                serviceUpdateMethod(mainURL, data, handleSuccess, handleException);
                            }}
                        />
                }
            </>
        );
    };

    const handleSuccess = (data) => {
        console.log("data" + data);
        setSeverity("success");
        setMessage(data.message);
        setAlertopen(true);
        setRefreshData((oldValue) => {
            return !oldValue;
        });
    };

    const handleException = (data) => {
        console.log(data);
    };

    let filteredRows = dataList;

    // Filter by VIN
    if (email) {
        filteredRows = filteredRows.filter((row) =>
            row.user_email?.toLowerCase().includes(email.toLowerCase())
        );
    }

    return (
        <div style={{ marginTop: '75px', padding: '25px' }}>
            <div className="topContent">
                <Box sx={{ flexGrow: 1, padding: '10px' }}>
                    <Grid container spacing={2}>

                        <Grid item xs={3}>
                            {/* <TextField
                                label="Search by Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  // Update search input
                                sx={{ marginBottom: 2 }}  // Add some spacing below the input
                                fullWidth  // Make it full width
                            /> */}
                        </Grid>
                        <Grid item xs={7} />
                        <Grid item xs={2}>
                            {/* <Button variant="contained"
                                sx={{
                                    backgroundColor: '#0d2365',  // Change background color to navy
                                    '&:hover': {
                                        backgroundColor: '#0d2365',  // Darken the color on hover
                                    },
                                    borderRadius: '10px'
                                }}
                                onClick={(e) => {
                                    setIsAddButton(true);
                                    setOpen(true);
                                    setEditData([]);
                                }}
                            >
                                Add User
                            </Button> */}
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <div className="GridContent">
                <Box sx={{ flexGrow: 1, padding: '0px', height: 'auto', width: '100%' }}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                      pageSizeOptions={[5, 10, 25, 50, 100]}
                            pagination
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 100, page: 0 },
                                },
                            }}
                        getRowId={(row) => row.id}
                        components={{
                            Toolbar: () => (
                                <Box
                                    sx={{
                                        padding: 2,
                                        display: 'flex',
                                        justifyContent: 'flex-start', // Aligns to the left
                                        borderBottom: '0.2px solid grey', // Adds bottom border
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'medium',
                                            // fontSize: '16px', // Use fontSize instead of font
                                            color: 'darknavy',
                                            fontFamily: 'Montserrat, sans-serif' // Ensure proper font family syntax
                                        }}
                                    >
                                        Log Details
                                    </Typography>
                                </Box>
                            ),
                        }}
                        sx={{
                            height: 'calc(100vh - 200px)', // Adjust height dynamically based on screen size
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: 'darknavy', // Set column header text color to dark navy blue
                                fontWeight: 'bold', // Make column header text bold
                            },
                        }}
                    />
                   
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
        </div>
    );
};

export default LogList;
