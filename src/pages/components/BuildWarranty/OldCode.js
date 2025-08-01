import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton'; // Add StepButton for interactive steps
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from '../../../api/axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';


const steps = [
    'The Vehicle',
    'The Warranty',
    'Pricing',
    'Warranty Option',
    'Customer Info',
    'Summary & Save'
];

function BuildWarranty() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [odometer, setOdometer] = useState('');
    const [salePriceofVehicle, setSalePriceofVehicle] = useState('');
    const [comprehensiveFactoryWarrantyValid, setComprehensiveFactoryWarrantyValid] = useState([]);
    const [language, setLanguage] = useState('English');

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const method = "POST";
        const data = { make, model, year, odometer, salePriceofVehicle, comprehensiveFactoryWarrantyValid };
        const mainURL = '/api/add-warranty';

        // try {
        //     const response = await axios.post(mainURL, data);
        //     console.log('Form submitted successfully', response.data);
        //     alert("Warranty information submitted successfully!");

        //     setMake('');
        //     setModel('');
        //     setYear('');
        //     setOdometer('');
        //     setSalePriceofVehicle('');
        //     setComprehensiveFactoryWarrantyValid([]);
        // } catch (error) {
        //     console.error('Error submitting form', error.response ? error.response.data : error);
        //     alert("Error submitting the form. Please try again.");
        // }
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        // try {
        //     let URL = './company/';
        //     const response = await axios.get(URL);
        //     if (response.data.status === 401) {
        //         setMake('');
        //     } else {
        //         setMake(response.data.data);
        //     }
        // } catch (err) {
        //     if (!err?.response) {
        //         console.log("No server response");
        //     } else {
        //         console.log(err?.response.data);
        //     }
        // }
    };

    return (
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Typography component="h1" variant="h4">
                    Build A Warranty Quote
                </Typography>


                <Select
                    value={language}
                    onChange={handleLanguageChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select Language' }}
                    sx={{ minWidth: 100, fontSize: '0.875rem', margin: 3 }}
                >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                </Select>
            </Box>

            {/* Full-width Stepper */}
            <Box sx={{ width: '100%', marginTop: 2, position: 'relative' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            <br />
            <br />

            <Box sx={{ flexGrow: 2 }}>
                <AppBar position="left">
                    <Toolbar>
                        <Typography component="h1" variant="h6" sx={{ textAlign: 'left', width: '100%' }}>
                            Vehicle Information
                        </Typography>

                    </Toolbar>
                </AppBar>
            </Box>

            <br></br>
            <br></br>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    maxWidth: '500px',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                }}
            >
                <TextField
                    label="Enter VIN"
                    variant="outlined"
                    fullWidth
                    sx={{ marginRight: 2, backgroundColor: '#fff' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: '#0066CC', padding: '8px 16px' }}
                >
                    Decode
                </Button>
            </Box>


            <Box component="form" noValidate sx={{ mt: 3, width: '30%' }} onSubmit={handleSave}>
                <FormControl fullWidth required margin="normal" >
                    <InputLabel id="demo-simple-select-label">Make</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={make}
                        label="make"
                        onChange={make}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 200,
                                },
                            },
                        }}
                    >
                        <MenuItem value="">
                            <em>Please Select Make</em>
                        </MenuItem>
                        <MenuItem value="ACURA">ACURA</MenuItem>
                        <MenuItem value="ALFA ROMEO">ALFA ROMEO</MenuItem>
                        <MenuItem value="AUDI">AUDI</MenuItem>
                        <MenuItem value="BMW">BMW</MenuItem>
                        <MenuItem value="BUICK">BUICK</MenuItem>
                        <MenuItem value="CADILLAC">CADILLAC</MenuItem>
                        <MenuItem value="CHEVROLET">CHEVROLET</MenuItem>
                        <MenuItem value="CHRYSLER">CHRYSLER</MenuItem>
                        <MenuItem value="DODGE">DODGE</MenuItem>
                        <MenuItem value="EAGLE">EAGLE</MenuItem>
                        <MenuItem value="FIAT">FIAT</MenuItem>
                        <MenuItem value="FORD">FORD</MenuItem>
                        <MenuItem value="GENESIS">GENESIS</MenuItem>
                        <MenuItem value="GEO">GEO</MenuItem>
                        <MenuItem value="GMC">GMC</MenuItem>
                        <MenuItem value="HONDA">HONDA</MenuItem>
                        <MenuItem value="HUMMER">HUMMER</MenuItem>
                        <MenuItem value="HYUNDAI">HYUNDAI</MenuItem>
                        <MenuItem value="INFINITI">INFINITI</MenuItem>
                        <MenuItem value="ISUZU">ISUZU</MenuItem>
                        <MenuItem value="JAGUAR">JAGUAR</MenuItem>
                        <MenuItem value="JEEP">JEEP</MenuItem>
                        <MenuItem value="KIA">KIA</MenuItem>
                        <MenuItem value="LAND ROVER">LAND ROVER</MenuItem>
                        <MenuItem value="LEXUS">LEXUS</MenuItem>
                        <MenuItem value="LINCOLN">LINCOLN</MenuItem>
                        <MenuItem value="MAZDA">MAZDA</MenuItem>
                        <MenuItem value="MERCEDES-BENZ">MERCEDES-BENZ</MenuItem>
                        <MenuItem value="MINI">MINI</MenuItem>
                        <MenuItem value="MITSUBISHI">MITSUBISHI</MenuItem>
                        <MenuItem value="NISSAN">NISSAN</MenuItem>
                        <MenuItem value="OLDSMOBILE">OLDSMOBILE</MenuItem>
                        <MenuItem value="PEUGEOT">PEUGEOT</MenuItem>
                        <MenuItem value="PONTIAC">PONTIAC</MenuItem>
                        <MenuItem value="PORSCHE">PORSCHE</MenuItem>
                        <MenuItem value="RAM">RAM</MenuItem>
                        <MenuItem value="RENAULT">RENAULT</MenuItem>
                        <MenuItem value="SAAB">SAAB</MenuItem>
                        <MenuItem value="SATURN">SATURN</MenuItem>
                        <MenuItem value="SUBARU">SUBARU</MenuItem>
                        <MenuItem value="SUZUKI">SUZUKI</MenuItem>
                        <MenuItem value="TESLA">TESLA</MenuItem>
                        <MenuItem value="TOYOTA">TOYOTA</MenuItem>
                        <MenuItem value="VOLKSWAGEN">VOLKSWAGEN</MenuItem>
                        <MenuItem value="VOLVO">VOLVO</MenuItem>
                    </Select>
                </FormControl>


                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="model"
                    label="Model"
                    name="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />

                <FormControl fullWidth required margin="normal" >
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={make}
                        label="make"
                        onChange={make}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 200,
                                },
                            },
                        }}
                    >

                        <MenuItem value="">
                            <em>Please Select Year</em>
                        </MenuItem>
                        {Array.from({ length: 2025 - 1998 + 1 }, (_, index) => (
                            <MenuItem key={index} value={1998 + index}>
                                {1998 + index}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="odometer"
                    label="Odometer"
                    name="odometer"
                    value={odometer}
                    onChange={(e) => setOdometer(e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">KM</InputAdornment>,
                    }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="sale"
                    label="Sale Price Of The Vehicle"
                    name="sale"
                    value={odometer}
                    onChange={(e) => setOdometer(e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">$</InputAdornment>,
                    }}

                />
                <FormControl fullWidth required margin="normal" >
                    <InputLabel id="demo-simple-select-label">Comprehensive Factory Warranty Valid?</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={comprehensiveFactoryWarrantyValid}
                        label="Comprehensive Factory Warranty Valid?"
                        onChange={comprehensiveFactoryWarrantyValid}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 200,
                                },
                            },
                        }}
                    >

                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>

                    </Select>
                </FormControl>


                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    {allStepsCompleted() ? (
                        <Button onClick={handleReset}>Reset</Button>
                    ) : (
                        <Button onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default BuildWarranty;
