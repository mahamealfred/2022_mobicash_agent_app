import React, { useEffect,useState } from 'react'
import Header from '../../../../components/header/Header';
import './cbhiPayment.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from "@mui/material/Button";
import { ButtonGroup, Box,TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from 'react-router-dom';
//import { headIdDetails } from '../Cbhi';
import {useSelector} from "react-redux";


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  
const CbhiPayment = () => {
  const [headIdDetails,setHeadIdDetails]=useState('');
  const history=useHistory();
  const getNidDetails=useSelector((state)=>state.getNidDetails);
  const getYear = useSelector((state) => state.getYear);
  const [members,setMembers]=useState('');
  
  useEffect(()=>{
    async function fetchData() {
      if (!getNidDetails.loading) {
        if (getNidDetails.details) {
          await setHeadIdDetails(getNidDetails.details);
         await setMembers(getNidDetails.details.members);
        }
      }
    }
    fetchData();
  },[getNidDetails.details])

  const handleSubmit=()=>{
history.push('/dashboard/cbhi-payment-details',{push:true})
  }
  const handleCancel=()=>{
    history.push('/dashboard/cbhi',{push:true}) 
  }
  return (
    <div className='cbhiPayment'>
  
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
              Mutuwel Service
              </Typography>
              {
               getNidDetails.loading?("Loading"):getNidDetails.details?(
                <>
                 <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               Name
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              {headIdDetails.headHouseHoldNames}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                House Hold NID
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
                {headIdDetails.headId}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Year of payment
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
                2022
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Total Premium 
              </Typography>
              <Typography  variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
                {headIdDetails.totalAmount} Rwf
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                House Hold Category 
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
                {headIdDetails.houseHoldCategory}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Number Of Members 
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
                {headIdDetails.totalHouseHoldMembers}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Name Of Members 
              </Typography>
              {
                !members?null:
                <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
                <TextField
                      id="standard-select-currency"
                      select
                      // value={paymentYear}
                      fullWidth
                      // onChange={handleChange}
                      helperText="Please Check Name Of Members"
                      variant="standard"
                    >
                      {members.map((option) => (
                        <MenuItem disabled key={option.fullNames} value={option.fullNames}>{option.fullNames}</MenuItem>
                      ))}
                    </TextField>
                </Typography>
              }
             {
              headIdDetails.totalPaidAmount>0?<>
               <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Already Paid
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
                {headIdDetails.totalPaidAmount} Rwf
              </Typography>
              </>:null
             }
                </>
               ):"No Details found"
              }
             
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Payer Phone 
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
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
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
              Mutuwel Service
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </div>
  )
}

export default CbhiPayment