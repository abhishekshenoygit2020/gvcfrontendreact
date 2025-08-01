// ViewInvoicingData.js
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axios from '../../../api/axios';
import { CSVLink } from 'react-csv';
import { useNavigate } from "react-router-dom";

const URL = "./dealership/getDealershipTotalCost";

function ViewInvoicingData() {
    const navigate = useNavigate();

    const [dataList, setDataList] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [totalCost, setTotalCost] = useState('$0.00');
    const [dealership, setDealership] = useState('');
    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [detailData, setDetailData] = useState([]);

    const columns = [
        { field: 'slNo', headerName: 'ID', width: 80 },
        { field: "Month", headerName: "Year-Month", width: 150 },
        { field: "tradeName", headerName: "Dealership", width: 200 },
        {
            field: "totalCost",
            headerName: "Total Billable Cost",
            width: 180,
            valueFormatter: (params) => {
                const value = parseFloat((params.value || '0').toString().replace(/,/g, ''));
                return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate('/ViewInvoicingDetailData', { state: { type:'invData', value: params.row } });
                    }}
                >
                    View Details
                </Button>
            )
        }
    ];

    const detailHeaders = [
        { label: "Warranty#", key: "id" },
        { label: "Submitted", key: "Submitted" },
        { label: "Last Name", key: "customerName" },
        { label: "VIN", key: "vinNoText" },
        { label: "Make", key: "make" },
        { label: "Model", key: "model" },
        { label: "Year", key: "year" },
        { label: "Cost", key: "productCost" },
        { label: "Sold For", key: "warrantySoldForText" },
    ];

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const safeDataList = Array.isArray(dataList) ? dataList : [];
        let rows = safeDataList;

        if (dealership) {
            const lowerSearch = dealership.toLowerCase();
            rows = safeDataList.filter((row) =>
                row.tradeName?.toLowerCase().includes(lowerSearch)
            );
        }

        const total = rows.reduce((sum, row) => {
            const cost = parseFloat((row.totalCost || '0').toString().replace(/,/g, ''));
            return sum + cost;
        }, 0);

        setFilteredRows(rows);
        setTotalCost(`$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    }, [dealership, dataList]);

    const loadDateData = async () => {
        if (!fromDate || !toDate) {
            alert("Both From Date and To Date cannot be empty!");
            return;
        }

        if (new Date(toDate) <= new Date(fromDate)) {
            alert("To Date must be greater than From Date!");
            return;
        }

        try {
            const response = await axios.post("dealership/getDealershipDateTotalCost", { dealership, fromDate, toDate });
            const dataWithIndex = (response.data.data || []).map((item, index) => ({
                slNo: index + 1,
                id: index + 1,
                ...item
            }));
            setDataList(dataWithIndex);
        } catch (err) {
            console.log("Error fetching data:", err);
            setDataList([]);
        }
    };

    const loadData = async () => {
        try {
            const response = await axios.post(URL);
            const dataWithIndex = (response.data.data || []).map((item, index) => ({
                slNo: index + 1,
                id: index + 1,
                ...item
            }));
            setDataList(dataWithIndex);
        } catch (err) {
            console.log("Error fetching data:", err);
            setDataList([]);
        }
    };

    const fetchDetailData = async (row) => {
        try {
            const response = await axios.post("/dealership/getDealershipTotalCost", {
                dealership: row.dealership,
                yearMonth: row.Month
            });
            setSelectedDetail({ dealership: row.tradeName, month: row.Month });
            setDetailData(response.data.data || []);
        } catch (error) {
            console.log("Error loading detail data:", error);
            setDetailData([]);
        }
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertopen(false);
    };

    const getMaxContentWidth = (key, label) => {
        const maxDataLength = Math.max(
            label.length,
            ...detailData.map((row) => (row[key]?.toString().length || 0))
        );

        // Estimate: ~10px per character + padding
        return Math.min(Math.max(100, maxDataLength * 10), 300); // clamp between 100 and 300px
    };

    const dynamicColumns = detailHeaders.map((h) => ({
        field: h.key,
        headerName: h.label,
        minWidth: getMaxContentWidth(h.key, h.label),
        flex: 1,
    }));

    const formatMonth = (monthStr) => {
        if (!monthStr) return "";

        const [year, month] = monthStr.split("-"); // Assuming format is "YYYY-MM"
        const date = new Date(`${year}-${month}-01`);

        return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
    };

    return (
        <div style={{ marginTop: "100px", padding: "0px" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                {!selectedDetail && (
                    <>
                        <Box sx={{ flexGrow: 1, padding: '10px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Typography variant="subtitle2">Dealership</Typography>
                                        <TextField
                                            variant="outlined"
                                            value={dealership}
                                            onChange={(e) => setDealership(e.target.value)}
                                            fullWidth
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl fullWidth>
                                        <Typography variant="subtitle2">From Date</Typography>
                                        <TextField
                                            variant="outlined"
                                            type="date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            fullWidth
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl fullWidth>
                                        <Typography variant="subtitle2">To Date</Typography>
                                        <TextField
                                            variant="outlined"
                                            type="date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                            fullWidth
                                        />
                                    </FormControl>
                                </Grid>
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
                            sx={{ height: 'auto' }}
                            components={{
                                Toolbar: () => (
                                    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'flex-start' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Invoicing Monthly Data</Typography>
                                        <Button onClick={loadDateData} sx={{ ml: 'auto', background: '#0d2365', color: 'white' }}>Fetch Data</Button>
                                        <Button onClick={() => { loadData(); setDealership(''); setFromDate(''); setToDate(''); }} sx={{ ml: 2, background: '#0d2365', color: 'white' }}>Reset</Button>
                                        <Button sx={{ ml: 2, background: '#0d2365', color: 'white' }}>
                                            <CSVLink
                                                data={filteredRows}
                                                filename="monthly_invoice_summary.csv"
                                                style={{ color: 'inherit', textDecoration: 'none' }}
                                            >
                                                Export Summary
                                            </CSVLink>
                                        </Button>
                                    </Box>
                                )
                            }}
                        />
                    </>
                )}

                {selectedDetail && (
                    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">Invoice breakdown for {selectedDetail.dealership} - {formatMonth(selectedDetail.month)}</Typography>
                            <Button
                                variant="contained"
                                onClick={() => { setSelectedDetail(null); setDetailData([]); }}
                                sx={{ backgroundColor: '#0d2365', color: 'white', borderRadius: '8px' }}
                            >
                                Go Back
                            </Button>
                        </Box>

                        <CSVLink
                            data={detailData}
                            headers={detailHeaders}
                            filename={`invoice-detail-${selectedDetail.dealership}-${selectedDetail.month}.csv`}
                            style={{
                                display: 'inline-block',
                                marginTop: 12,
                                backgroundColor: '#0d2365',
                                padding: '8px 16px',
                                color: 'white',
                                borderRadius: 8,
                                textDecoration: 'none'
                            }}
                        >
                            Export Detail CSV
                        </CSVLink>

                        <DataGrid
                            rows={detailData.map((d, i) => ({ id: i + 1, ...d }))}
                            columns={dynamicColumns}
                            autoHeight
                            pageSizeOptions={[5, 10]}
                            pagination
                            sx={{ mt: 2 }}
                        />

                    </Box>
                )}
            </Box>

            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ViewInvoicingData;
