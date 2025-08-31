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
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { json, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';


import axios from '../../../../api/axios';
const URL = "./dealership";

function ViewCategory() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [dataList, setDataList] = useState(''); // Initialize with dummy data
    const [id, setId] = useState(''); // Initialize with dummy data
    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [categoryName, setCategoryName] = useState("");
    const [trigger, setTrigger] = useState(false); // State to trigger useEffect
    const { value, type } = state;

    const handleClick = () => {
        setAlertopen(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertopen(false);
    };

    // const toggleDrawer = (anchor, open) => (event) => {
    //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }
    //     setState({ ...state, [anchor]: open });
    // };

    const columns = [
        { field: "id", headerName: "ID", width: 300 },
        { field: "accountName", headerName: "Account Name", width: 300 },
        // { field: "category_status", headerName: "Status", width: 150 },
        {
            field: "visibility",
            headerName: "Visibility",
            width: 150,
            renderCell: (params) => (
                <IconButton
                    onClick={() => handleToggleVisibility(params.row.id)}
                    color="primary"
                >
                    {params.row.visibility === "Yes" ? (
                        <VisibilityIcon />
                    ) : (
                        <VisibilityOffIcon />
                    )}
                </IconButton>
            ),
        },
    ];





    // useEffect(() => {
    //     if (trigger) {
    //         console.log("useEffect is triggered by the action!");
    //         // Perform side effects here (e.g., fetching data, updating the DOM)

    //         // Reset trigger to avoid continuous execution
    //         setTrigger(false);
    //     }
    //     loadData();
    // }, [trigger]);

    useEffect(() => {

        if (value.dealershipVisiblity === null) {
            setId(value.id);
            setCategoryName(value.categoryName);
            loadData();
        } else {
            setId(value.id);
            setCategoryName(value.categoryName);
            setDataList(JSON.parse(value.dealershipVisiblity));
        }

    }, [value, type]);


    const loadData = async () => {
        try {
            const response = await axios.get(URL);

            if (response.data.status === 401) {
                setDataList([]);
            } else {
                // Map API response to match DataGrid columns
                const responseData = response.data.data.map((item) => ({
                    id: item.id,
                    accountName: item.accountName,
                    // category_status: "Active",
                    visibility: "Yes", // default value
                }));
                setDataList(responseData);
            }
        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
            } else {
                console.log(err?.response.data);
            }
        }
    };

    // Toggle visibility for a row
    const handleToggleVisibility = (id) => {
        setDataList((prev) =>
            prev.map((row) =>
                row.id === id
                    ? { ...row, visibility: row.visibility === "Yes" ? "No" : "Yes" }
                    : row
            )
        );
    };

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
        // navigate('/AddCategory', { state: { type: "add", value: "" } });
        console.log("data" + JSON.stringify(dataList));
        const method = "POST";
        const data = { dealershipVisiblity: JSON.stringify(dataList) };
        const mainURL = "./category/" + id + "/updateDealershipCategory";
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
    }

    const handleSuccess = (data) => {
        console.log("data response", data);
        setSeverity("success");
        setMessage(data.data);
        setAlertopen(true);
        setTimeout(() => {
            // setTrigger(true);  // This will trigger useEffect
            // setAlertopen(false);
            navigate("/viewCategory");
        }, 3000); // Matches autoHideDuration

    }

    return (
        <div style={{ marginTop: "100px", padding: "0px" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>

                <Box sx={{ flexGrow: 1, padding: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10} />
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

                            // startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
                            >
                                Update Dealership Visiblity
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
                    rows={dataList}
                    columns={columns}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    pagination
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
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
                                    {categoryName + " Visiblity for Dealerships"}
                                </Typography>
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

export default ViewCategory;
