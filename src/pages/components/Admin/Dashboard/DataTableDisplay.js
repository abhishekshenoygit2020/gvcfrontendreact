import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TaskIcon from '@mui/icons-material/Task';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';


import axios from '../../../../api/axios';
const URL = "./dealership";

function DataTableDisplay() {
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
        { field: 'id', headerName: 'ID', width: 300 },
        { field: "accountName", headerName: "Account Name", width: 300 },
        { field: "accountPhone", headerName: "Account Phone", width: 300 },
        { field: "license_number", headerName: "License Number", width: 300 },
       
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width:250,
            cellClassName:'actions',
            getActions : (params) => {
                return [
                        // <EditData selectedRow={params.row}/>,
                        // <DeleteData selectedRow={params.row} />,                        
                        // <Block selectedRow={params.row} />
                        <EditData selectedRow={params.row} />,
                        // <DeleteData selectedRow={params.row} />
                ];            
            }            
        },
    ];

   

    const [dataList, setDataList] = useState(''); // Initialize with dummy data

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get(URL);

            if (response.data.status === 401) {
                setDataList(""); // Keep dummy data in case of unauthorized response
            } else {
                const responseData = response.data.data;
                // for (let i = 0; i < responseData.length; i++) {
                //     responseData[i].id = i + 1;
                // }
                setDataList(responseData);
            }
        } catch (err) {
            console.log("Error fetching data:", err);
            // Use dummy data if request fails
            setDataList('');
        }
    };

    const EditData = (props) => {
        return (
            <EditIcon style={{ cursor: "pointer" }} onClick={(e) => {
                e.stopPropagation();                
                navigate('/AddDealership', { state: { type:"update", value:props.selectedRow } });
                        
            }}/>
        );
    }
    
    const DeleteData = (props) => {
        return (
            <DeleteIcon 
                onClick={() => {
                    console.log(props.selectedRow.id);
                    const data = {id:props.selectedRow.id};
                    const mainURL = URL +'/'+data.id+ '/delete';
                    // serviceMethod(mainURL,data, handleSuccess, handleException);
                }}
            />
        );
    };


    const handleSubmit = (e) => {
        navigate('/AddDealership', { state: { type:"add" ,value:"" } });
        // const method = "POST";
        // const data = { oldPassword: currentPassword, newPassword, email: user_email };
        // const mainURL = URL;
        // serviceMethod(mainURL, method, data, handleSuccess, handleException);
    }

    return (
        <div style={{ marginTop: "100px", padding: "0px" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />               
               
                {/* <Customer  toggleDrawer={toggleDrawer} state={state}  /> */}
                <DataGrid
                    rows={dataList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </Box>

        </div>
    );
}

export default DataTableDisplay;
