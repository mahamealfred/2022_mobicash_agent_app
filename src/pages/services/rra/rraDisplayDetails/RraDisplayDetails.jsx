import React from 'react'
import Header from '../../../../components/header/Header';
import './rraDisplayDetails.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from "@mui/material/Button";
import { ButtonGroup, Box,TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from 'react-router-dom';
const members=[{
  
  name:"Bwiza Leatitia"
},
{
  name:"Mahame Alfred"
},
{
 name:"Rushema Prince Kanuma"
  }
]
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
const RraDisplayDetails = () => {
    const history=useHistory();

    const handleNewPayment=()=>{
history.push('/dashboard/rra',{push:true})
    }
  return (
    <div className='electricityDisplayContainer'>
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
          RRA Service Transaction Details
          </Typography>
          <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
           Transaction ID
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
            BCDRT12347363726
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            Aget Name
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
            Bizimana Jean Claude
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            Payer Name
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
            Mudenge
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            Token
          </Typography>
          <Typography  variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
          30709790049814143303
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            Mobicash Reference ID
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
            MOBICASH0000000000023
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            Paid Amount
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
            2,000 Rwf
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            Datetime
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
          13/06/2022 11:32:48
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            Status
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
           Success
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
                    onClick={handleNewPayment}
                  >
                    New Payment
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#F9842C" }}
                    className="buttonGroup"
                  >
                    Print
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

export default RraDisplayDetails