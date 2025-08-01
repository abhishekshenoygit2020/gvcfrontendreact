import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CSVLink } from 'react-csv';
import { TextField } from '@mui/material';
import ApplicationStore from '../../../utils/localStorageUtil';
import axios from "../../../api/axios"
const URL = "./dealership/getUserWarrantyCommissionDetails";

function ViewWarrantyCommission() {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const navigate = useNavigate();
    const userId = ApplicationStore().getStorage('salesrep');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [trigger, setTrigger] = useState(false); // State to trigger useEffect

    const handleClick = () => {
        setAlertopen(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertopen(false);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const columns = [
        { field: 'slNo', headerName: 'ID', width: 100 },
        { field: 'tradeName', headerName: 'Dealership', width: 200 },
        {
            field: "SalesrepName",
            headerName: "Sales Rep",
            width: 220,
            valueGetter: (params) => `${params.row.firstname || ''} ${params.row.lastname || ''}`
        },
        { field: "warrantyCount", headerName: "Warranty Sold", width: 150 },
        { field: "Month", headerName: "Year-Month", width: 150 },
        // { field: "Month", headerName: "Year-Month", width: 150 },
        {
            field: "totalCost",
            headerName: "Total Value",
            width: 200,
            valueFormatter: (params) => {
                const value = parseFloat((params.value || '0').toString().replace(/,/g, ''));
                return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
        },
        { field: "commissionPerc", headerName: "Commission %", width: 150 },
        {
            field: "commissionEarned",
            headerName: "Commission Earned",
            width: 150,
            valueGetter: (params) => {
                const rawCost = (params.row.totalCost || "0").toString().replace(/,/g, "");
                const cost = parseFloat(rawCost) || 0;
                const perc = parseFloat(params.row.commissionPerc) || 0;
                return `$${((cost * perc) / 100).toFixed(2)}`;
            }
        }

    ];



    const [dataList, setDataList] = useState(''); // Initialize with dummy data

    useEffect(() => {
        if (trigger) {
            console.log("useEffect is triggered by the action!");
            // Perform side effects here (e.g., fetching data, updating the DOM)

            // Reset trigger to avoid continuous execution
            setTrigger(false);
        }
        loadData();
    }, [trigger]);

    const loadData = async () => {
        try {
            const response = await axios.post(URL, { userId });

            if (response.data.status === 401) {
                setDataList(""); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                const dataWithIndex = response.data.data.map((item, index) => ({
                    id: index + 1,
                      slNo: index + 1,
                    ...item,
                   // Assign sequential SL No starting from 1
                })) || "";
                setDataList(dataWithIndex);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setDataList('');
        }
    };

    const loadDateData = async () => {
        if (fromDate === "" || toDate === "") {
            alert("Both From Date and To Date cannot be empty!");
            return false;
        }

        if (new Date(toDate) <= new Date(fromDate)) {
            alert("To Date must be greater than From Date!");
            return false;
        } else {
            try {
                const response = await axios.post("dealership/getUserWarrantyCommissionDetails", { userId, fromDate, toDate });

                if (response.data.status === 401) {
                    setDataList(""); // Keep dummy data in case of unauthorized response
                } else {
                    console.log(response.data.data)
                    const responseData = response.data.data;
                    const dataWithIndex = response.data.data.map((item, index) => ({
                        slNo: index + 1, // Assign sequential SL No starting from 1
                        id: index + 1,
                        ...item,
                    })) || "";
                    setDataList(dataWithIndex);
                }
            } catch (err) {
                console.log("Error fetching data:", err);
                // Use dummy data if request fails
                setDataList('');
            }
        }
    }

    const EditData = (props) => {
        return (
            <Tooltip title="Edit">
                <EditIcon style={{ cursor: "pointer" }} onClick={(e) => {
                    e.stopPropagation();
                    navigate('/AddCategory', { state: { type: "update", value: props.selectedRow } });

                }} />
            </Tooltip>

        );
    }

    const DeleteData = (props) => {
        return (
            <Tooltip title="Delete">
                <DeleteIcon style={{ cursor: "pointer" }}
                    onClick={() => {
                        const isConfirmed = window.confirm("Are you sure you want to delete?");
                        if (isConfirmed) {
                            console.log(props.selectedRow.id);
                            const data = { id: props.selectedRow.id };
                            const mainURL = 'dealership/' + data.id + '/deletesByIdcategory';
                            serviceMethod(mainURL, data, handleSuccess, handleException);
                        }
                    }}
                />
            </Tooltip>

        );
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

    const handleSuccess = (data) => {
        console.log("data response", data);
        setSeverity("success");
        setMessage(data.data);
        setAlertopen(true);
        setTimeout(() => {
            setTrigger(true);  // This will trigger useEffect
            setAlertopen(false);
        }, 3000); // Matches autoHideDuration

    }

    const handleException = (data) => {
        console.log("data error", data);
        setSeverity("error");
        setMessage(data.data);
        setAlertopen(true);
        setTimeout(() => {
            setTrigger(true);  // This will trigger useEffect
            setAlertopen(false);
        }, 3000); // Matches autoHideDuration
    }


    const handleSubmit = (e) => {
        navigate('/AddCategory', { state: { type: "add", value: "" } });
        // const method = "POST";
        // const data = { oldPassword: currentPassword, newPassword, email: user_email };
        // const mainURL = URL;
        // serviceMethod(mainURL, method, data, handleSuccess, handleException);
    }

    return (
        <div style={{ marginTop: "100px", padding: "0px" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>

                <Box sx={{ flexGrow: 1, padding: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={0} />
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <Typography variant="subtitle2">From Date</Typography>
                                <TextField
                                    // label="From Date"
                                    variant="outlined"
                                    type="date" // This makes the field accept only dates
                                    id="joinDate"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    sx={{ marginBottom: 2 }}  // Add some spacing below the input
                                    fullWidth  // Make it full width
                                />
                            </FormControl>

                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <Typography variant="subtitle2">To Date</Typography>
                                <TextField
                                    // label="From Date"
                                    variant="outlined"
                                    type="date" // This makes the field accept only dates
                                    id="joinDate"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    sx={{ marginBottom: 2 }}  // Add some spacing below the input
                                    fullWidth  // Make it full width
                                />
                            </FormControl>

                        </Grid>
                        <Grid item xs={2}>
                            {/* <Button color="inherit"
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
                                Add Category
                            </Button> */}
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
                    rows={dataList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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
                                        color: 'darknavy',
                                        fontFamily: 'Montserrat, sans-serif', // Ensure proper font family syntax
                                    }}
                                >
                                    Commision Earned For Warranty Sold
                                </Typography>
                                <Button
                                    color="inherit"
                                    onClick={(e) => loadDateData(e)}
                                    sx={{
                                        backgroundColor: '#0d2365',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#0d2365',
                                        },
                                        borderRadius: '10px',
                                        marginLeft: 'auto', // Pushes the button to the right
                                    }}
                                // startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
                                >
                                    Fetch Data
                                </Button>
                                <Button
                                    color="inherit"
                                    onClick={(e) => {
                                        loadData();
                                        // setDealership('');
                                        setFromDate('');
                                        setToDate('');
                                    }}
                                    sx={{
                                        backgroundColor: '#0d2365',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#0d2365',
                                        },
                                        borderRadius: '10px',
                                        marginLeft: '10px', // Pushes the button to the right
                                    }}
                                // startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
                                >
                                    Reset Data
                                </Button>
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
                                        marginLeft: '10px', // Pushes the button to the right
                                    }}
                                >
                                    {/* CSVLink wrapped inside the button with removed hyperlink styles */}
                                    <CSVLink
                                        data={dataList}
                                        filename="1.csv"
                                        style={{
                                            textDecoration: 'none',  // Removes the underline
                                            color: 'inherit',        // Inherits the color from the parent (button)
                                        }}
                                    >
                                        Export
                                    </CSVLink>
                                </Button>
                            </Box>
                        ),
                    }}
                    sx={{
                        height: 'auto', // Adjust height dynamically based on screen size
                        // height: 'calc(100vh - 200px)', // Adjust height dynamically based on screen size
                        '& .MuiDataGrid-columnHeaderTitle': {
                            color: 'darknavy', // Set column header text color to dark navy blue
                            fontWeight: 'bold', // Make column header text bold
                        },
                    }}
                />
            </Box>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert
                    onClose={handleCloseSnack}
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

export default ViewWarrantyCommission;
