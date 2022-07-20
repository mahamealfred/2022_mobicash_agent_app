import React from 'react'
import Header from '../../../../components/header/Header';
import './rraPayment.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from "@mui/material/Button";
import { ButtonGroup, Box,TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from 'react-router-dom';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
 
const RraPayment= () => {
  const history=useHistory();
  const handleCancel=()=>{
    history.push('/dashboard/rra',{push:true}) 
  }
  const handleSubmit=()=>{
    history.push('/dashboard/rra-payment-details',{push:true}) 
  }
 
  return (
    <div className='rraPayamentContainer'>
        <Header/>
        <Paper
      sx={{
        p: 4,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2} >
        <Grid item>
          {/* <ButtonBase sx={{ width: 158, height: 128 }}>
            <Img alt="complex" src="../../images/electricity.png" />
          </ButtonBase> */}
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" mt={4} sx={{ fontSize: "28px", fontWeight: "bold" }}>
              RRA Service
              </Typography>
              <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               Payer Name
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
                Nahimana Moses
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                RRA Ref
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
                045678388389
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              <TextField
                    label="Phone Number"
                    name="amount"
                    // onChange={(e)=>setHouseHoldNID(e.target.value)}
                    placeholder="Enter Phone"
                    variant="standard"
                    fullWidth
                    required
                  />
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Amount
              </Typography>
              <Typography  variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              <TextField
                    label="Amount"
                    name="amount"
                    // onChange={(e)=>setHouseHoldNID(e.target.value)}
                    placeholder="Enter Amount to Pay"
                    variant="standard"
                    fullWidth
                    required
                  />
              </Typography>
              
             
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Agent PIN
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              <TextField
                    label="Pin"
                    name="amount"
                    type="password"
                    // onChange={(e)=>setHouseHoldNID(e.target.value)}
                    placeholder="Enter Pin"
                    variant="standard"
                    fullWidth
                    required
                  />
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "& > *": {
                        m: 2,
                      },
                    }}
                  >
                    <ButtonGroup aria-label="text button group">
                      <Button
                        className="buttonGroup"
                        sx={{ backgroundColor: "#778899" }}
                        variant="contained"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ backgroundColor: "#F9842C" }}
                        className="buttonGroup"
                      >
                        Submit
                      </Button>
                    </ButtonGroup>
                  </Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              RRA Service
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </div>
  )
}

export default RraPayment