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
import { TextField } from '@mui/material';
import axios from '../../../api/axios';

const URL = "./user/getRelationshipManagerUserPerc";

function ViewCommissionPerc() {
    const navigate = useNavigate();

    const [dataList, setDataList] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [totalCost, setTotalCost] = useState('$0.00');
    const [accountName, setAccountName] = useState('');
    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');

    const columns = [
        { field: 'slNo', headerName: 'ID', width: 200 },
        {
            field: "relationshipManagerName",
            headerName: "Relationship Manager",
            width: 220,
            valueGetter: (params) => `${params.row.firstname || ''} ${params.row.lastname || ''}`
        },
        { field: "tradeName", headerName: "Dealership", width: 200 },
        { field: "commissionPerc", headerName: "Commission %", width: 200 },
    ];

    useEffect(() => {
        loadData();
    }, []);

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

    const loadData = async () => {
        try {
            const response = await axios.post(URL);

            if (response.data.status === 401) {
                setDataList([]);
            } else {
                const responseData = response.data.data || [];
                const dataWithIndex = responseData.map((item, index) => ({
                    ...item,
                    slNo: index + 1,
                    id: index + 1
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
                            <TextField
                                label="Search by Dealership Name"
                                variant="outlined"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                sx={{ marginBottom: 2 }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={9} />
                    </Grid>
                </Box>

                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    pagination
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
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
                                    Relationship Manager Commission Percentage
                                </Typography>
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

export default ViewCommissionPerc;
