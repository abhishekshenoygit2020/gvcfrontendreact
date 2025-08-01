import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import TaskIcon from '@mui/icons-material/Task';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../../../api/axios';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuthContext } from '../../../../context/AuthContext';
import { caES } from '@mui/material/locale';

const URL = "./category";

function AddCategory() {
  const { user_email } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [id, setId] = useState('');
  const [categoryName, setCategoryName] = useState('');  
  const [alertOpen, setAlertopen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const { value, type } = state;

  const handleClick = () => {
    setAlertopen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertopen(false);
  };

  const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
    console.log("helo")
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

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      categoryName
    };
    console.log("type" + type);
    if (type === "add") {
      const mainURL = URL + '/add';
      serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
    } else {
      const mainURL = URL + '/' + id + '/update';
      console.log("url", mainURL);
      serviceMethod(mainURL, 'POST', data, handleSuccess, handleException);
    }

  };

  const handleSuccess = (data) => {
    setSeverity("success");
    setMessage(data.data);
    setAlertopen(true);
    setTimeout(() => {
      navigate("/viewCategory");
    }, 6000); // Matches autoHideDuration

  }

  useEffect(() => {
    if (type == "update") {

      setId(value.id || '');
      setCategoryName(value.categoryName || '');
      
    } else {
      setId('');
      setCategoryName('');
      
    }
  }, [value, type]);

  const handleException = (data) => {
    setSeverity("error");
    setMessage(data.data);
    setAlertopen(true);
  }

  return (
    <>
      <div style={{ marginTop: '100px', padding: '0px' }}>
        <Typography variant="h5" sx={{ color: 'grey' }}>
          {/* <TaskIcon sx={{ fontSize: '20px' }} /> &nbsp; */}
        </Typography>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            border: '1px solid rgb(229 231 235 / 99%);',
            borderRadius: '8px',
          }}
        >
          <Toolbar />
          <Typography variant="h6">Category Information</Typography>
          <br />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">Category Name</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="account-user-email"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                sx={textfieldStyles}
              />
            </FormControl>

            

            
          </Stack>
          <br />
         
         
        
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button
              startIcon={<AddIcon fontSize="var(--icon-fontSize-md)" />}
              size="large"
              variant="contained"
              sx={{
                backgroundColor: '#0d2365',
                '&:hover': {
                  backgroundColor: '#0d2365',
                },
                borderRadius: '10px'
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
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
    </>
  );
}

const textfieldStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'lightgray', // Default border color
    },
    '&:hover fieldset': {
      borderColor: 'lightgray', // Remove hover border color
    },
    '&.Mui-focused fieldset': {
      borderColor: 'lightgray', // Remove focus border color
    },
  },
};

export default AddCategory;
