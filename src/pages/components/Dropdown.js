import React, { useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dropdown() {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const navigate = useNavigate();


  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setMessage1(`You have selected ${event.target.value}`);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setMessage2(`You have selected ${event.target.value}`);
  };

  const handleSubmit = () => {
    navigate("/ChangePassword");
  }

  return (

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={selectedValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <p>{message1}</p>
      </Grid>


      <Grid item xs={12}>
        <FormControl>
          <InputLabel>Select an option</InputLabel>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Mangalore">Mangalore</MenuItem>
            <MenuItem value="Bangalore">Bangalore</MenuItem>
            <MenuItem value="Mysore">Mysore</MenuItem>
          </Select>
        </FormControl>
        <p>{message2}</p>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        ChangePassword
      </Button>
    </Grid>

  );
}

export default Dropdown;
