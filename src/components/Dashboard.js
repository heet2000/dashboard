// src/components/Dashboard.js
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import MultilineChart from './MultilineChart';
import Navbar from './Navbar';
import { Autocomplete, TextField } from '@mui/material';
import { employee } from '../constants/totalActivities.constant';
import PieChart from './PieChart';

const Dashboard = () => {
    const [selectEmployee, setEmployee] = useState(employee[0])

    const handleSelectEmployee = (evt,val) => {
        setEmployee(val)
    }
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: '20px',display:"  flex",flexDirection:"column" }}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:"3rem"}}>
                <Autocomplete
                    disablePortal
                    style={{justifyContent:"center"}}
                    options={employee}
                    value={selectEmployee}
                    onChange={handleSelectEmployee}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Employee" />}
                    />
            </div>
            <div>
                <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                    <MultilineChart selectEmployee={selectEmployee} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                    <PieChart selectEmployee={selectEmployee} />
                    </Paper>
                </Grid>
                </Grid>
            </div>
      </Container>
    </div>
  );
};

export default Dashboard;
