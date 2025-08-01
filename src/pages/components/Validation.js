import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function Validation() {


  const handleSubmit = (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    const confirmPassword = event.target.confirm.value;
    const contact = event.target.contact.value;
    

    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else if (!/^\d{10}$/.test(contact)) {
      alert("Please enter a valid 10-digit contact number");
    
    }
    else {
      
      alert("Form submitted successfully");
    }
    
    
  };

    
 
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
        <h2>Sign Up</h2>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12} >
          <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              pattern="[a-zA-Z\s]+" 
              title="Please enter a valid name (letters and spaces only)"
            />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="contact Number"
                  name="contact"
                  
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirm"
                label="Confirm Password"
                type="password"
                id="confirm"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
