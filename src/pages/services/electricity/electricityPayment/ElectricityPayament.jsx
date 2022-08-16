import React,{useState} from 'react'
import Header from '../../../../components/header/Header';
import './electricityPayment.css';
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
 
const ElectricityPayment= () => {
  const [amountPaid,setAmountPaid]=useState('');
  const [password,setPassword]=useState('');
  const [payerPhoneNumber,setPayerPhoneNumber]=useState('')   
  const history=useHistory();
  const handleCancel=()=>{
    history.push('/dashboard/electricity',{push:true}) 
  }
  const handleSubmit=()=>{
    history.push('/dashboard/electricity-payment-details',{push:true}) 
  }
 
  return (
    <div className='electricityPayamentContainer'>
        <Header/>
        <Paper
      sx={{
        p: 1,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Box sx={{ flexGrow: 4 }}>
      <Grid 
      container 
      spacing={2}
      sx={{ padding: "30px", textAlign: "center" }}
       >
      <Grid item xs={12}  spacing={2}>
            <Typography mt={2} sx={{ fontSize: "28px", fontWeight: "bold" }}>
              ELECTRICITY SERVICE
            </Typography>
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
                    
            {/* {
                  !cbhiPayment.error? null:
                   <Collapse in={open}>
                   <Alert
                   severity="error"
                   sx={{mb: 0.2 }}
                     action={
                       <IconButton
                         aria-label="close"
                         color="inherit"
                         size="small"
                         onClick={handleClose}
                        //  onClick={() => {
                        //    setOpen(false);
                        //  }}
                       >
                         <CloseIcon fontSize="inherit" />
                       </IconButton>
                     }
                   >
                    {cbhiPayment.error}
                   </Alert>
                 </Collapse>
                }      */}
                </Box>
                </Grid>
        <Grid item>
      
        </Grid>
        <Grid item xs={18} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
                 <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
             Payer  Name
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
              Uwase Nicole
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Meter No
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                004536227272
              </Typography>
            </Grid>
           
          </Grid>
          <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Payer Phone 
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              <TextField
                    label="Phone Number"
                    name="amount"
                    onChange={(e)=>setPayerPhoneNumber(e.target.value)}
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
                     onChange={(e)=>setAmountPaid(e.target.value)}
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
                    onChange={(e)=>setPassword(e.target.value)}
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
                      {/* {cbhiPayment.loading ? <Stack sx={{ color: 'grey.500'}} spacing={1} direction="row">
      <CircularProgress size={20} color="inherit" height="10px" width="10px" />
     
    </Stack> : "Send"}    */} Send
                      </Button>
                    </ButtonGroup>
                  </Box>
              </Typography>
            </Grid>
          </Grid>
         
        </Grid>
      </Grid>
    </Box>
    </Paper>
        </div>
  )
}

export default ElectricityPayment