import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CSVLink } from 'react-csv';
import { TextField } from '@mui/material';
import axios from '../../../api/axios';

const URL = "./dealership/getUserWarrantyCommissionDetailsRM";

function ViewRelationshipCommission() {
    const navigate = useNavigate();

    const [dataList, setDataList] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [totalCost, setTotalCost] = useState('$0.00');
    const [dealership, setDealership] = useState('');
    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [accountName, setAccountName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const columns = [
        { field: 'slNo', headerName: 'ID', width: 100 },
        {
            field: "relationshipManagerName",
            headerName: "Relationship Manager",
            width: 220,
            valueGetter: (params) => `${params.row.firstname || ''} ${params.row.lastname || ''}`
        },
        { field: "tradeName", headerName: "Dealership", width: 200 },
        { field: "warrantyCount", headerName: "Warranty Sold", width: 150 },
        { field: "Month", headerName: "Year-Month", width: 150 },
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

    // Load data only once on mount
    useEffect(() => {
        loadData();
    }, []);

    // Filter rows and calculate total on dealership or data change
    useEffect(() => {
        // Apply dealership name filter
        let filtered = [...dataList];

        if (accountName) {
            filtered = filtered.filter((row) =>
                row.tradeName?.toLowerCase().includes(accountName.toLowerCase())
            );
        }

        setFilteredRows(filtered);
    }, [accountName, dataList]);

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
                const response = await axios.post("dealership/getDateUserWarrantyCommissionDetailsRM", { dealership, fromDate, toDate });

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

    const loadData = async () => {
        try {
            const response = await axios.post(URL);

            if (response.data.status === 401) {
                setDataList([]);
            } else {
                const responseData = response.data.data || [];
                const dataWithIndex = responseData.map((item, index) => ({
                      slNo: index + 1,
                    id: index + 1,
                    ...item,
                  
                }));
                setDataList(dataWithIndex);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            setDataList([]);
        }
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertopen(false);
    };

    return (
        <div style={{ marginTop: "100px", padding: "0px" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                <Box sx={{ flexGrow: 1, padding: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <Typography variant="subtitle2">Dealership</Typography>
                                <TextField
                                    label="Search by Dealership Name"
                                    variant="outlined"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    sx={{ marginBottom: 2 }}
                                    fullWidth
                                />
                            </FormControl>

                        </Grid>
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
                        <Grid item xs={5} />
                    </Grid>
                </Box>
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
                    sx={{
                        height: 'auto',
                        '& .MuiDataGrid-columnHeaderTitle': {
                            color: 'darknavy',
                            fontWeight: 'bold',
                        },
                    }}
                    components={{
                        Toolbar: () => (
                            <Box
                                sx={{
                                    padding: 2,
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    borderBottom: '0.2px solid grey',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'medium',
                                        color: 'darknavy',
                                        fontFamily: 'Montserrat, sans-serif'
                                    }}
                                >
                                    Relationship Manager Commision 
                                </Typography>
                                {/* <Button
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
                                </Button> */}
                                {/* <Button
                                    color="inherit"
                                    onClick={(e) => {
                                        loadData();
                                        setDealership('');
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
                                </Button> */}
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
                                    onClick={(e) => loadData()}
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
                                        data={filteredRows}
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
                />
            </Box>

            <Stack spacing={3}>
                <Stack direction="row" spacing={3} sx={{ display: 'none' }}>
                    <div>
                        <Typography variant="subtitle2">Total Billable Cost</Typography>
                        <TextField
                            variant="outlined"
                            disabled
                            value={totalCost}
                            sx={{ marginBottom: 2 }}
                            fullWidth
                        />
                    </div>
                </Stack>
            </Stack>

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

export default ViewRelationshipCommission;
