import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../../../api/axios';
const URL = "./category";

function Commission() {
    const [commission, setCommision] = useState('');

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

    const handleSave = async (e) => {
        e.preventDefault();
        const method = "POST";
        const data = { commission };
        const mainURL = URL + '/add';
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
    }

    const handleSuccess = (data) => {
        console.log(data);
        alert("category name added successfully");
        setCommision('');
    }

    const handleException = (data) => {
        alert("error adding category name");
        console.log(data);
    }

    return (

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5">
                    Update Commission
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="category"
                        label="Commission"
                        name="category"
                        value={commission}
                        onChange={(e) =>
                            setCommision(e.target.value)}

                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSave}

                    >
                        SUBMIT
                    </Button>

                </Box>
            </Box>

        </Container>

    );
}
export default Commission;