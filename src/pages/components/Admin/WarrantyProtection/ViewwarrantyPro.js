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
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from '../../../../api/axios';
const URL = "./category/getwarrantyprotection";

function ViewwarrantyPro() {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const navigate = useNavigate();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const columns = [
        { field: 'slNo', headerName: 'ID', width: 200 },
        { field: "categoryName", headerName: "Category", width: 200 },

        { field: "subcat", headerName: "Subcategory", width: 200 },
        { field: "warrantyProtection", headerName: "Warranty Protection", width: 200 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 250,
            cellClassName: 'actions',
            getActions: (params) => {
                return [
                    // <EditData selectedRow={params.row}/>,
                    // <DeleteData selectedRow={params.row} />,                        
                    // <Block selectedRow={params.row} />
                    <EditData selectedRow={params.row} />,
                    <DeleteData selectedRow={params.row} />
                ];
            }
        },
    ];

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
            const response = await axios.post(URL);

            if (response.data.status === 401) {
                setDataList(""); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                const dataWithIndex = response.data.data.map((item, index) => ({
                     slNo: index + 1, // Assign sequential SL No starting from 1
                    ...item,                   
                })) || "";
                setDataList(dataWithIndex);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setDataList('');
        }
    };

    const EditData = (props) => {
        return (
            <Tooltip title="Edit">
                <EditIcon style={{ cursor: "pointer" }} onClick={(e) => {
                    e.stopPropagation();
                    navigate('/AddwarrantyPro', { state: { type: "update", value: props.selectedRow } });

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
                            const mainURL = 'dealership/' + data.id + '/deletesByIdwarrantyprotection';
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
        navigate('/AddwarrantyPro', { state: { type: "add", value: "" } });
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
                        <Grid item xs={9} />
                        <Grid item xs={3}>
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
                                Add Warranty protection
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
                            paginationModel: { pageSize: 100, page: 0 },
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
                                    Warranty Protection
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

export default ViewwarrantyPro;
