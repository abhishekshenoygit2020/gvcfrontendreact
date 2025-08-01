import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
const URL ="./auth";




export default function Registration() {
  const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email,setEmail]=useState('');
    const [contact,setContact]=useState('');
    const [password,setPassword]=useState('');
    const [confirm,setConfirmPassword]=useState('');
    const navigate = useNavigate();

    const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
        try{
            const response = await axios.post(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");                
            }else{                
                return handleException(err?.response.data);
            }
        }                  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = "POST";
        try{      
            const data = {name,email,contact,password,confirm};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess,handleException);
        }catch(e){
        console.error(e);
      }
        } 

        const handleSuccess = (data) => {         
            console.log(data);
            alert("registered successfully");
            navigate('/Login');   
        }
    
        const handleException = (data) => {
            console.log(data);
        }
    

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  value={name}
                  onChange={(e) => { setName(e.target.value)}}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="family-name"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="contact"
                  name="contact"
                  autoComplete="family-name"
                  value={contact}
                  onChange={(e) => { setContact(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirm"
                  label="confirm password"
                  name="confirm"
                  autoComplete="confirm"
                  value={confirm}
                  onChange={(e) => { setConfirmPassword(e.target.value)}}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="Login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    
  );
}