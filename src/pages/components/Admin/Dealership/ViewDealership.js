import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockResetIcon from '@mui/icons-material/LockReset';
import LockIcon from '@material-ui/icons/Lock';
import AddIcon from '@mui/icons-material/Add';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CSVLink } from 'react-csv';
import axios from '../../../../api/axios';
const URL = "./dealership";

function ViewDealership() {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const navigate = useNavigate();

    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [refreshData, setRefreshData] = useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const columns = [
        { field: 'slNo', headerName: 'ID', width: 200 },
        { field: "accountName", headerName: "Account Name", width: 200 },
        { field: "accountPhone", headerName: "Account Phone", width: 200 },
        { field: "acc_ovmic_no", headerName: "OMVIC Number", width: 200 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 250,
            cellClassName: 'actions',
            getActions: (params) => {
                return params.row.blocked == "0" ?
                    [
                        <EditData selectedRow={params.row} />,
                        <BlockUser selectedRow={params.row} />,
                        <Commission selectedRow={params.row} />
                    ] :
                    [
                        <EditData selectedRow={params.row} />, ,
                        <UnBlockUser selectedRow={params.row} />,
                        <Commission selectedRow={params.row} />
                    ]
            }
        },
    ];



    const [dataList, setDataList] = useState(''); // Initialize with dummy data
    const [accountName, setAccountName] = useState("");

    useEffect(() => {
        loadData();
    }, [refreshData]);

    const loadData = async () => {
        try {
            const response = await axios.get(URL);

            if (response.data.status === 401) {
                setDataList(""); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                let dataWithIndex = response.data.data.map((item, index) => ({
                    slNo: index + 1,
                    ...item,
                     // Assign sequential SL No starting from 1
                })) || "";

                dataWithIndex = dataWithIndex.filter(row => row.accountName !== 'GVC');
                setDataList(dataWithIndex);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setDataList('');
        }
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertopen(false);
    };


    const EditData = (props) => {
        return (
            <Tooltip title="Edit">
                <EditIcon style={{ cursor: "pointer" }} onClick={(e) => {
                    e.stopPropagation();
                    navigate('/AddDealership', { state: { type: "update", value: props.selectedRow } });

                }} />
            </Tooltip>

        );
    }

    const Commission = (props) => {
        return (
            <Tooltip title="Update Commission">
                <MonetizationOnIcon style={{ cursor: "pointer" }} onClick={(e) => {
                    e.stopPropagation();
                    navigate('/AddDealership', { state: { type: "updateCommission", value: props.selectedRow } });

                }} />
            </Tooltip>

        );
    }

    const DeleteData = (props) => {
        return (
            <DeleteIcon
                onClick={() => {
                    const isConfirmed = window.confirm("Are you sure you want to delete?");
                    if (isConfirmed) {
                        console.log(props.selectedRow.id);
                        const data = { id: props.selectedRow.id };
                        const mainURL = URL + '/' + data.id + '/delete';
                        // serviceMethod(mainURL,data, handleSuccess, handleException);
                    }

                }}
            />
        );
    };


    const handleSubmit = (e) => {
        navigate('/AddDealership', { state: { type: "add", value: "" } });
        // const method = "POST";
        // const data = { oldPassword: currentPassword, newPassword, email: user_email };
        // const mainURL = URL;
        // serviceMethod(mainURL, method, data, handleSuccess, handleException);
    }

    let filteredRows = dataList;

    if (accountName) {
        filteredRows = filteredRows.filter((row) =>
            row.accountName?.toLowerCase().includes(accountName.toLowerCase())
        );
    }

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

    const BlockUser = (props) => {
        return (

            <Tooltip title="Block Dealership">
                <LockOpenIcon style={{ cursor: "pointer" }} title="Block Dealership"
                    onClick={() => {
                        if (window.confirm("Are you sure you want to block this dealership?")) {
                            const data = { id: props.selectedRow.id, action: 1, type: "post" };
                            const mainURL = './dealership/blockDealership';
                            serviceUpdateMethod(mainURL, data, handleSuccess, handleException);
                        }

                    }}
                />
            </Tooltip>

        );
    };

    const UnBlockUser = (props) => {
        return (

            <Tooltip title="UnBlock Dealership">
                <LockIcon style={{ cursor: "pointer" }} title="UnBlock Dealership"
                    onClick={() => {
                        if (window.confirm("Are you sure you want to unblock this dealership?")) {
                            console.log(props.selectedRow.id);
                            const data = { id: props.selectedRow.id, action: 0 };
                            const mainURL = './dealership/blockDealership';
                            serviceUpdateMethod(mainURL, data, handleSuccess, handleException);
                        }
                    }}
                />
            </Tooltip>


        );
    };

    const handleSuccess = (data) => {
        console.log("data" + data);
        setSeverity("success");
        setMessage(data.data);
        setAlertopen(true);
        setRefreshData((oldValue) => {
            return !oldValue;
        });
    };

    const handleException = (data) => {
        console.log(data);
    };

    

    return (
        <div style={{ marginTop: "100px", padding: "0px" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>

                <Box sx={{ flexGrow: 1, padding: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                label="Search by Account Name"
                                variant="outlined"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}  // Update search input
                                sx={{ marginBottom: 2 }}  // Add some spacing below the input
                                fullWidth  // Make it full width
                            />
                        </Grid>
                        <Grid item xs={7} />
                        <Grid item xs={2}>
                            <Button color="inherit"
                                onClick={(e) => handleSubmit(e)}
                                sx={{
                                    backgroundColor: '#0d2365',
                                    color: 'white',  // Change background color to purple
                                    '&:hover': {
                                        backgroundColor: '#0d2365',  // Darken the color on hover
                                    },
                                    borderRadius: '10px'
                                }}

                                startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}>
                                Add Dealership
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={3}>



                        <div>
                            {/* <Button startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={toggleDrawer("right", true)}>
                                Add
                            </Button> */}
                        </div>
                    </Stack>
                </Stack>

                {/* <Customer  toggleDrawer={toggleDrawer} state={state}  /> */}
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
                    components={{
                        Toolbar: () => (
                            <Box
                                sx={{
                                    padding: 2,
                                    display: 'flex',
                                     justifyContent: 'space-between', // Aligns to the left
                                    borderBottom: '0.2px solid grey',  // Adds bottom border
                                }}
                            >
                                <Typography variant="h6"
                                    sx={{
                                        fontWeight: 'medium',
                                        // fontSize: '16px', // Use fontSize instead of font
                                        color: 'darknavy',
                                        fontFamily: 'Montserrat, sans-serif' // Ensure proper font family syntax
                                    }}>
                                    Dealership
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#0d2365',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#0d2365',
                                        },
                                        borderRadius: '10px',
                                    }}
                                >
                                    <CSVLink
                                        data={dataList}
                                        filename="1.csv"
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}
                                    >
                                        Export
                                    </CSVLink>
                                </Button>
                            </Box>
                        ),
                    }}

                    sx={{
                        // height: 'calc(100vh - 200px)', // Adjust height dynamically based on screen size
                        height: 'auto',
                        '& .MuiDataGrid-columnHeaderTitle': {
                            color: 'darknavy', // Set column header text color to dark navy blue
                            fontWeight: 'bold', // Make column header text bold
                        },
                    }}
                />
            </Box>
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

        </div>
    );
}

export default ViewDealership;
