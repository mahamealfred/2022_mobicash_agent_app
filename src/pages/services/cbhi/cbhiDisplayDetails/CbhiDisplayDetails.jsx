import React ,{useRef} from 'react'
import Header from '../../../../components/header/Header';
import './cbhiDisplayDetails.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from "@mui/material/Button";
import { ButtonGroup, Box,TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ReactToPrint from "react-to-print";
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
const CbhiDisplayDetails = () => {
    const history=useHistory();
    const componentRef = useRef();


    const handleNewPayment=()=>{
history.push('/dashboard/cbhi',{push:true})
    }
  return (
    <div className='cbhiDisplayContainer'>
     
    
      
    
     {/* <ReactToPrint 
trigger={()=>{
  return <Button>Print form</Button>
}}
content={()=>this.componentRef}
documentTitle='new document'
pageStyle='print'

/> */}
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
    <Grid item xs={12} sm container >
      <Grid item xs container direction="column" spacing={2}>
        <Grid item xs ref={componentRef} >
          <Typography gutterBottom variant="subtitle1" component="div" mt={4} sx={{ fontSize: "28px", fontWeight: "bold" }}>
          Mutuwel Service Transaction Details
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
            Year of payment
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
            201
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            House Hold NID 
          </Typography>
          <Typography  variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
            1199680036352772
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
            12,000 Rwf
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            Datetiem
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
          13/06/2022 11:32:48
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
            Already Paid
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }}  color="text.secondary">
            12000 Rwf
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
                  <ReactToPrint
                  trigger={() => <Button
                  variant="contained"
                  sx={{ backgroundColor: "#F9842C" }}
                  className="buttonGroup"
                  >
                  Print
                  </Button>
              }
                 content={() => componentRef.current}
                 documentTitle='new document'
               />     
                </ButtonGroup>
              </Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" component="div">
          Mutuwel Service 
        </Typography>
      </Grid>
    </Grid>
  </Grid>
</Paper>           
                 
    </div>
  )
}

export default CbhiDisplayDetails