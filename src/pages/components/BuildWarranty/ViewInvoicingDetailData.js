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
import { useNavigate, useLocation } from "react-router-dom";
import ApplicationStore from '../../../utils/localStorageUtil';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { CSVLink } from 'react-csv';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from '../../../api/axios';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const URL = "./dealership/getUserWarrantyCommissionDetailsSR";

function ViewInvoicingDetailData() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dealershipNew = ApplicationStore().getStorage('dealership');
    const [dataList, setDataList] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [totalCost, setTotalCost] = useState('$0.00');
    const [dealership, setDealership] = useState('');
    const [alertOpen, setAlertopen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [accountName, setAccountName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [dealershipArray, setDealershipArray] = useState([]);
    const [dealershipValue, setDealershipValue] = useState('');
    const [dealershipText, setDealershipText] = useState('');
    const [detailData, setDetailData] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);

    const { value, type } = state;

    useEffect(() => {
        loadData();
        loadDealershipUser(value);
        if (type === "invData") {
            fetchDetailData(value);
        }
    }, [value, type]);

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
        { label: "Sales Rep", key: "user" }
    ];

    const getMaxContentWidth = (key, label) => {
        const maxDataLength = Math.max(
            label.length,
            ...detailData.map((row) => (row[key]?.toString().length || 0))
        );
        return Math.min(Math.max(100, maxDataLength * 10), 300);
    };

    const dynamicColumns = detailHeaders.map((h) => ({
        field: h.key,
        headerName: h.label,
        minWidth: getMaxContentWidth(h.key, h.label),
        flex: 1,
    }));

    const loadData = async () => {
        try {
            const response = await axios.post(URL, { dealership: dealershipNew });
            if (response.data.status === 401) {
                setDataList([]);
            } else {
                const responseData = response.data.data || [];
                const dataWithIndex = responseData.map((item, index) => ({
                    slNo: index + 1,
                    id: index + 1,
                    ...item
                }));
                setDataList(dataWithIndex);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            setDataList([]);
        }
    };

    const loadDealershipUser = async (row) => {
        try {
            const URL = "./dealership/getDealershipUsers";
            const response = await axios.post(URL, { dealership: row.dealership });
            if (response.data.status === 401) {
                setDealershipArray([]);
            } else {
                const responseData = response.data.data || [];
                setDealershipArray(responseData);
                // setSelectedUsers(responseData.slice(0, 2)); // preselect users if needed
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            setDealershipArray([]);
        }
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertopen(false);
    };

    const formatMonth = (monthStr) => {
        if (!monthStr) return "";
        const [year, month] = monthStr.split("-");
        const date = new Date(`${year}-${month}-01`);
        return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
    };

    const filteredDetailData = detailData.filter((d) => {
        if (!selectedUsers.length || dealershipNew != 0) return true;
        return selectedUsers.some(
            (rep) =>
                `${rep.firstname} ${rep.lastname}`.toLowerCase() === d.user?.toLowerCase()
        );
    });

    const totalCostAmount = filteredDetailData.reduce((sum, item) => {
        const cost = parseFloat(item.productCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
        return sum + cost;
    }, 0);

    const formattedTotalCost = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(totalCostAmount);

    const convertImageToBase64 = async () => {
        // Make sure the image path is relative to the public folder
        const response = await fetch(`${process.env.PUBLIC_URL}/carCanadaLogo.png`);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(blob);
        });
    };


    const generatePdf = async (data) => {
        console.log("data 123" + JSON.stringify(data));
        const LOGO = await convertImageToBase64();

        // Extract the values using regex


        var tradeName = "";
        var billingStreet = "";
        var billingCity = "";
        var billingCountry = "";
        var billingZippostalCode = "";
        var ovmic_no = "";
        var accountPhone = "";
        var acc_ovmic_no = "";

        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: '2-digit' });

        const totalCost = filteredDetailData.reduce((acc, item) => acc + (Number(item.productCost) || 0), 0);

        try {
            const response = await axios.get("dealership/" + data[0].dealership + "/fetch");

            if (response.data.success === 500) {
                console.error("Server error: Failed to fetch dealership data.");
                // Handle the error appropriately, e.g., show an alert or return early
                return;
            }

            const responseData = response.data.data;
            if (responseData) {
                const dealershipaddress = JSON.stringify(responseData[0]); // Converts object to string
                const dealershipData = JSON.parse(dealershipaddress); // Parse it back to an object

                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.tradeName) tradeName = dealershipData.tradeName;
                if (dealershipData?.billingStreet) billingStreet = dealershipData.billingStreet;
                if (dealershipData?.billingCity) billingCity = dealershipData.billingCity;
                if (dealershipData?.billingCountry) billingCountry = dealershipData.billingCountry;
                if (dealershipData?.billingZippostalCode) billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.ovmic_no) ovmic_no = dealershipData.ovmic_no;
                if (dealershipData?.accountPhone) accountPhone = dealershipData.accountPhone;
                if (dealershipData?.acc_ovmic_no) acc_ovmic_no = dealershipData.acc_ovmic_no;

                console.log(tradeName, billingStreet, billingCity, billingCountry, billingZippostalCode, ovmic_no, accountPhone);
            }
        } catch (error) {
            console.error("An error occurred while fetching dealership data:", error);
        }

        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape', // 👈 This makes the layout horizontal
            pageMargins: [20, 20, 20, 20],
            content: [
                // First Table
                {
                    table: {
                        widths: ['30%', '35%', '35%'],
                        body: [
                            [
                                {
                                    image: LOGO,
                                    rowSpan: 3,
                                    fit: [150, 150],
                                    border: [false, false, false, false]
                                },
                                {
                                    text: [
                                        { text: ' \n', fontSize: 10 },
                                        { text: ' \n', fontSize: 10 },
                                        { text: '', fontSize: 10 },
                                        { text: '', fontSize: 10 }
                                    ],
                                    alignment: 'center',
                                    bold: true,
                                    border: [false, false, false, false]
                                },
                                {
                                    text: '1200 Bay Street, Suite #1201 Toronta, Ontario,',
                                    fontSize: 12,
                                    alignment: 'right',
                                    bold: true,
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                { text: '', border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] },
                                {
                                    text: ' M5R 2A5, Phone: 905.291.2940',
                                    fontSize: 12,
                                    alignment: 'right',
                                    bold: true,
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                { text: '', border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] },
                                {
                                    text: 'claims@getcoveredcanada.com',
                                    fontSize: 12,
                                    alignment: 'right',
                                    bold: true,
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                { text: '', border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] },
                                {
                                    text: 'www.getcoveredcanada.com',
                                    fontSize: 12,
                                    alignment: 'right',
                                    bold: true,
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                {
                                    text: 'Get Covered Canada',
                                    fontSize: 12,
                                    bold: true,
                                    border: [false, false, false, false]
                                },
                                { text: '', border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] }
                            ],
                            [
                                {
                                    text: 'SERVING CANADIANS SINCE 1978',
                                    fontSize: 12,
                                    bold: true,
                                    border: [false, false, false, false]
                                },
                                { text: '', border: [false, false, false, false] },
                                {
                                    text: 'GST/HST: 737149310  RP0001',
                                    fontSize: 12,
                                    bold: true,
                                    alignment: 'right',
                                    border: [false, false, false, false]
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders' // This also ensures no borders are rendered
                },
                { text: '\n' }, // Add spacing between the tables
                { text: '\n' }, // Add spacing between the tables

                {
                    table: {
                        widths: ['30%', '35%', '35%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: "Dealer: " + tradeName + '\n', border: [false, false, false, true], bold: true,
                                    alignment: 'left', fontSize: 12
                                },
                                {
                                    text: 'WARRANTY REMMITTANCE INVOICE', border: [false, false, false, true], bold: true,
                                    alignment: 'center', fontSize: 15
                                },
                                {
                                    text: `Date: ${formattedDate}`, border: [false, false, false, true], bold: true,
                                    alignment: 'right', fontSize: 12
                                },
                            ],

                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables                
                {
                    table: {
                        widths: ['6%', '10%', '10%', '10%', '24%', '10%', '10%', '10%', '10%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: "SL NO",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Warranty#",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Submitted",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Last Name",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "VIN",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Make",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Model",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Year",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Cost",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                }
                            ],
                            ...filteredDetailData.map((item, index) =>
                                [
                                    {
                                        text: parseInt(index + 1),
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.id,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.Submitted,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.customerName,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.vinNoText,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.make,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.model,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.year,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: (Number(item.productCost) || 0).toFixed(2),
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    }
                                ]
                            )
                        ]
                    }
                },
                // { text: '\n' },
                { text: '\n' },
                {
                    table: {
                        widths: ['10%', '20%', '70%'],
                        body: [
                            [
                                {
                                    text: 'Count',
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                {
                                    text: `: ${filteredDetailData.length}`,
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                { text: '', border: [false, false, false, false] }
                            ],
                            [
                                {
                                    text: 'SubTotal',
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                {
                                    text: `: $${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                { text: '', border: [false, false, false, false] }
                            ],
                            [
                                {
                                    text: 'Tax (13%)',
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                {
                                    text: `: $${(totalCost * 0.13).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                { text: '', border: [false, false, false, false] }
                            ],
                            [
                                {
                                    text: 'Total',
                                    border: [false, false, false, false],
                                    bold: true,
                                    alignment: 'left',
                                    fontSize: 14
                                },
                                {
                                    text: `: $${(totalCost * 1.13).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                                    border: [false, false, false, false],
                                    bold: true,
                                    alignment: 'left',
                                    fontSize: 14
                                },
                                { text: '', border: [false, false, false, false] }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['6%', '10%', '10%', '15%', '5%', '15%', '5%', '20%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Check Number",
                                    border: [false, true, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Check Amount",
                                    border: [false, true, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Contact Name/Phone",
                                    border: [false, true, false, false],
                                    fontSize: 10,
                                    bold: true
                                },

                            ],

                        ]
                    }
                },
            ]
        };

        // Generate the PDF and open it in a new tab
        pdfMake.createPdf(docDefinition).open();
    };

    const sendPdf = async (data) => {
        console.log("data 123" + JSON.stringify(data));
        const LOGO = await convertImageToBase64();

        // Extract the values using regex


        var tradeName = "";
        var billingStreet = "";
        var billingCity = "";
        var billingCountry = "";
        var billingZippostalCode = "";
        var ovmic_no = "";
        var accountPhone = "";
        var acc_ovmic_no = "";
        var accountUserEmail = "";

        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: '2-digit' });

        const totalCost = filteredDetailData.reduce((acc, item) => acc + (Number(item.productCost) || 0), 0);

        try {
            const response = await axios.get("dealership/" + data[0].dealership + "/fetch");

            if (response.data.success === 500) {
                console.error("Server error: Failed to fetch dealership data.");
                // Handle the error appropriately, e.g., show an alert or return early
                return;
            }

            const responseData = response.data.data;
            if (responseData) {
                const dealershipaddress = JSON.stringify(responseData[0]); // Converts object to string
                const dealershipData = JSON.parse(dealershipaddress); // Parse it back to an object

                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // tradeName = dealershipData.tradeName;
                // billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.tradeName) tradeName = dealershipData.tradeName;
                if (dealershipData?.billingStreet) billingStreet = dealershipData.billingStreet;
                if (dealershipData?.billingCity) billingCity = dealershipData.billingCity;
                if (dealershipData?.billingCountry) billingCountry = dealershipData.billingCountry;
                if (dealershipData?.billingZippostalCode) billingZippostalCode = dealershipData.billingZippostalCode;
                if (dealershipData?.ovmic_no) ovmic_no = dealershipData.ovmic_no;
                if (dealershipData?.accountPhone) accountPhone = dealershipData.accountPhone;
                if (dealershipData?.acc_ovmic_no) acc_ovmic_no = dealershipData.acc_ovmic_no;
                if (dealershipData?.accountUserEmail) accountUserEmail = dealershipData.accountUserEmail;


                console.log(tradeName, billingStreet, billingCity, billingCountry, billingZippostalCode, ovmic_no, accountPhone);
            }
        } catch (error) {
            console.error("An error occurred while fetching dealership data:", error);
        }

        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape', // 👈 This makes the layout horizontal
            pageMargins: [20, 20, 20, 20],
            content: [
                // First Table
                {
                    table: {
                        widths: ['30%', '35%', '35%'],
                        body: [
                            [
                                {
                                    image: LOGO,
                                    rowSpan: 3,
                                    fit: [150, 150],
                                    border: [false, false, false, false]
                                },
                                {
                                    text: [
                                        { text: ' \n', fontSize: 10 },
                                        { text: ' \n', fontSize: 10 },
                                        { text: '', fontSize: 10 },
                                        { text: '', fontSize: 10 }
                                    ],
                                    alignment: 'center',
                                    bold: true,
                                    border: [false, false, false, false]
                                },
                                {
                                    text: '1200 Bay Street, Suite #1201 Toronta, Ontario,',
                                    fontSize: 12,
                                    alignment: 'right',
                                    bold: true,
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                { text: '', border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] },
                                {
                                    text: ' M5R 2A5, Phone: 905.291.2940',
                                    fontSize: 12,
                                    alignment: 'right',
                                    bold: true,
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                { text: '', border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] },
                                {
                                    text: 'claims@getcoveredcanada.com',
                                    fontSize: 12,
                                    alignment: 'right',
                                    bold: true,
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                { text: '', border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] },
                                {
                                    text: 'www.getcoveredcanada.com',
                                    fontSize: 12,
                                    alignment: 'right',
                                    bold: true,
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                {
                                    text: 'Get Covered Canada',
                                    fontSize: 12,
                                    bold: true,
                                    border: [false, false, false, false]
                                },
                                { text: '', border: [false, false, false, false] },
                                { text: '', border: [false, false, false, false] }
                            ],
                            [
                                {
                                    text: 'SERVING CANADIANS SINCE 1978',
                                    fontSize: 12,
                                    bold: true,
                                    border: [false, false, false, false]
                                },
                                { text: '', border: [false, false, false, false] },
                                {
                                    text: 'GST/HST: 737149310  RP0001',
                                    fontSize: 12,
                                    bold: true,
                                    alignment: 'right',
                                    border: [false, false, false, false]
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders' // This also ensures no borders are rendered
                },
                { text: '\n' }, // Add spacing between the tables
                { text: '\n' }, // Add spacing between the tables

                {
                    table: {
                        widths: ['30%', '35%', '35%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: "Dealer: " + tradeName + '\n', border: [false, false, false, true], bold: true,
                                    alignment: 'left', fontSize: 12
                                },
                                {
                                    text: 'WARRANTY REMMITTANCE INVOICE', border: [false, false, false, true], bold: true,
                                    alignment: 'center', fontSize: 15
                                },
                                {
                                    text: `Date: ${formattedDate}`, border: [false, false, false, true], bold: true,
                                    alignment: 'right', fontSize: 12
                                },
                            ],

                        ]
                    }
                },
                { text: '\n' }, // Add spacing between the tables                
                {
                    table: {
                        widths: ['6%', '10%', '10%', '10%', '24%', '10%', '10%', '10%', '10%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: "SL NO",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Warranty#",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Submitted",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Last Name",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "VIN",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Make",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Model",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Year",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Cost",
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    bold: true
                                }
                            ],
                            ...filteredDetailData.map((item, index) =>
                                [
                                    {
                                        text: parseInt(index + 1),
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.id,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.Submitted,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.customerName,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.vinNoText,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.make,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.model,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: item.year,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: (Number(item.productCost) || 0).toFixed(2),
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    }
                                ]
                            )
                        ]
                    }
                },
                // { text: '\n' },
                { text: '\n' },
                {
                    table: {
                        widths: ['10%', '20%', '70%'],
                        body: [
                            [
                                {
                                    text: 'Count',
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                {
                                    text: `: ${filteredDetailData.length}`,
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                { text: '', border: [false, false, false, false] }
                            ],
                            [
                                {
                                    text: 'SubTotal',
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                {
                                    text: `: $${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                { text: '', border: [false, false, false, false] }
                            ],
                            [
                                {
                                    text: 'Tax (13%)',
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                {
                                    text: `: $${(totalCost * 0.13).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                                    border: [false, false, false, false],
                                    alignment: 'left',
                                    fontSize: 12
                                },
                                { text: '', border: [false, false, false, false] }
                            ],
                            [
                                {
                                    text: 'Total',
                                    border: [false, false, false, false],
                                    bold: true,
                                    alignment: 'left',
                                    fontSize: 14
                                },
                                {
                                    text: `: $${(totalCost * 1.13).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                                    border: [false, false, false, false],
                                    bold: true,
                                    alignment: 'left',
                                    fontSize: 14
                                },
                                { text: '', border: [false, false, false, false] }
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['6%', '10%', '10%', '15%', '5%', '15%', '5%', '20%'], // Adjust the column widths for this table
                        body: [
                            [
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Check Number",
                                    border: [false, true, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Check Amount",
                                    border: [false, true, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "",
                                    border: [false, false, false, false],
                                    fontSize: 10,
                                    bold: true
                                },
                                {
                                    text: "Contact Name/Phone",
                                    border: [false, true, false, false],
                                    fontSize: 10,
                                    bold: true
                                },

                            ],

                        ]
                    }
                },
            ]
        };

        // Generate the PDF and open it in a new tab
        // pdfMake.createPdf(docDefinition).open();


        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        const sendEmailUrl = "/send-invoice";

        pdfDocGenerator.getBase64(async (data) => {
            try {
                await axios.post(sendEmailUrl, {
                    filename: "invoice.pdf",
                    pdfBase64: data,
                    tradeName: tradeName,
                    accountUserEmail: accountUserEmail,
                    month: selectedDetail.month
                });

                setSeverity("success");
                setMessage("Invoice Email Sent");
                setAlertopen(true);
                setTimeout(() => {
                    // navigate("/viewCategory");
                    setAlertopen(false);
                    setMessage("");
                }, 3000); // Matches autoHideDuration

                console.log("Invoice sent successfully!");
            } catch (error) {
                setSeverity("error");
                setMessage("Something went wrong");
                setAlertopen(true);
                setTimeout(() => {
                    // navigate("/viewCategory");
                    setAlertopen(false);
                    setMessage("");
                }, 3000); // Matches autoHideDuration
                console.error("Error sending invoice:", error);
            }
        });


    };

    return (
        <div style={{ marginTop: "100px", padding: "0px" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                <Box sx={{ flexGrow: 1, padding: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={4} style={{ display: dealershipNew == 0 ? "block" : "none" }}>
                            <FormControl fullWidth required>
                                <Typography variant="subtitle2">Sales Reps</Typography>
                                <Autocomplete
                                    multiple
                                    options={dealershipArray}
                                    value={selectedUsers}
                                    onChange={(event, newValue) => setSelectedUsers(newValue)}
                                    getOptionLabel={(option) =>
                                        `${option.firstname || ''}${option.lastname ? ' ' + option.lastname : ''}`
                                    }
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}></Grid>
                    </Grid>
                </Box>

                {selectedDetail && (
                    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">
                                Invoice breakdown for {selectedDetail.dealership} - {formatMonth(selectedDetail.month)}
                            </Typography>

                            <Button
                                variant="contained"
                                onClick={() => {

                                    setSelectedDetail(null);
                                    setDetailData([]);
                                    navigate('/ViewInvoicingData');
                                    // generatePdf(filteredDetailData);

                                }}
                                sx={{ backgroundColor: '#0d2365', color: 'white', borderRadius: '8px' }}
                            >
                                Go Back
                            </Button>
                        </Box>

                        <CSVLink
                            data={filteredDetailData}
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
                        <Button
                            variant="contained"
                            onClick={() => {

                                // setSelectedDetail(null); 
                                // setDetailData([]); 
                                // navigate('/ViewInvoicingData');
                                generatePdf(filteredDetailData);

                            }}
                            style={{
                                display: 'inline-block',
                                marginLeft: 2,
                                backgroundColor: '#0d2365',
                                padding: '8px 16px',
                                color: 'white',
                                borderRadius: 8,
                                textDecoration: 'none'
                            }}
                        >
                            Print Invoice
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {

                                // setSelectedDetail(null); 
                                // setDetailData([]); 
                                // navigate('/ViewInvoicingData');
                                sendPdf(filteredDetailData);

                            }}
                            style={{
                                display: 'inline-block',
                                marginLeft: 2,
                                backgroundColor: '#0d2365',
                                padding: '8px 16px',
                                color: 'white',
                                borderRadius: 8,
                                textDecoration: 'none'
                            }}
                        >
                            Send Invoice
                        </Button>

                        <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                            Showing {filteredDetailData.length} records
                        </Typography>

                        <DataGrid
                            rows={filteredDetailData.map((d, i) => ({ id: i + 1, ...d }))}
                            columns={dynamicColumns}
                            autoHeight
                            pageSizeOptions={[5, 10]}
                            pagination
                            sx={{ mt: 2 }}
                        />

                        <Typography variant="subtitle1" sx={{ mt: 2, textAlign: 'right' }}>
                            Total Cost: <strong>{formattedTotalCost}</strong>
                        </Typography>
                    </Box>
                )}
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

export default ViewInvoicingDetailData;
