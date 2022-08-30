import React,{useEffect,useState} from 'react'
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
import {useSelector,useDispatch} from 'react-redux';
import jwt from "jsonwebtoken";
import CbhiList from '../../cbhi/cbhiList/CbhiList';
import moment from "moment";
import MuiAlert from "@mui/material/Alert";
import Collapse from '@mui/material/Collapse';
import Snackbar from "@mui/material/Snackbar";
const Alerts = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
const RraDisplayDetails = () => {
  const dispatch=useDispatch();
  const getDocDetails = useSelector((state) => state.getDocDetails);
  const rraPaymentDetails = useSelector((state) => state.rraPayment);
  const [displayRraPaymentDetails,setDisplayRraPaymentDetails]=useState('')
  const [agentName,setAgentName]=useState('');
  const [payerName,setPayerName]=useState('');
  const [amountPaid,setAmountPaid]=useState('');
    const history=useHistory();
    const [open, setOpen] = React.useState(false);
  const [openSnackbar,setOpenSnackbar]=React.useState(false);
  const handleClose = (event, reason) => {
    setOpenSnackbar(false)
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

    const decode = (token) => {
      const JWT_SECRET = "tokensecret";
      const payload = jwt.verify(token, JWT_SECRET);
      return payload;
    };
    //console.log("amount paid",amount[0])
    useEffect(() => {
      const token = localStorage.getItem("mobicashAuth");
      if (token) {
        const { name } = decode(token);
        setAgentName(name);
      }
    }, []);
    useEffect(() => {
      async function fetchData() {
        if (!rraPaymentDetails.loading) {
          if (rraPaymentDetails.details) {
            setDisplayRraPaymentDetails(rraPaymentDetails.details);
        
          }
        }
        if( displayRraPaymentDetails.status=="success"){
          setOpenSnackbar(true)
        }
      
      }
      fetchData();
    }, [rraPaymentDetails.details,displayRraPaymentDetails.status]);

    useEffect(() => {
      async function fetchData() {
        if (!getDocDetails.loading) {
          if (getDocDetails.details) {
            await setPayerName(getDocDetails.details.TAX_PAYER_NAME);
           setAmountPaid(getDocDetails.details.AMOUNT_TO_PAY)
            // setAmountPaid(amount[0])
          }
        }
      }
      fetchData();
    }, [getDocDetails.cbhidetails]);
  
    const handleNewPayment=()=>{
history.push('/dashboard/rra',{push:true})
    }
  return (
    <div className='electricityDisplayContainer'>
    <Header/>
    <Snackbar
     open={openSnackbar} 
     autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      
      >
            <Alerts
              onClose={handleClose}
              severity="success"
              variant="outlined" 
              color="success"
             
              sx={{ width: "80%",margin:"0px 80px", padding:"0 5px" }}
            >
             Thank you!, You have successful pay RRA Service
            </Alerts>
          </Snackbar>
          
    <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Box sx={{ flexGrow: 4 }}>
          <Grid
            container
            spacing={2}
            sx={{ padding: "5px", textAlign: "center" }}
          >
            <Typography mt={2} sx={{ fontSize: "28px", fontWeight: "bold" }}>
            RRA Service Transaction Details
            </Typography>
            <Grid item></Grid>
            <Grid item xs={18} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    variant="body2"
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    gutterBottom
                  >
                    Transaction ID
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                 {displayRraPaymentDetails.mobicashTransctionNo}
                  </Typography>
                  <Typography
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    variant="body2"
                    gutterBottom
                  >
                    Aget Name
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
             {agentName}
                  </Typography>
                  <Typography
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    variant="body2"
                    gutterBottom
                  >
                    Payer Name
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                 {payerName}
                  </Typography>
                 
                </Grid>
              </Grid>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                
                  <Typography
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    variant="body2"
                    gutterBottom
                  >
                    Paid Amount
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                    {amountPaid} Rwf
                  </Typography>
                  <Typography
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    variant="body2"
                    gutterBottom
                  >
                    Datetime
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                     {moment(displayRraPaymentDetails.date).format("llll")}
                  
                  </Typography>
                  <Typography
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    variant="body2"
                    gutterBottom
                  >
                    Status
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "green",
                    }}
                    color="text.secondary"
                  >
              success
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
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
                        <ButtonGroup aria-label="text button group">
                          <Button
                            className="buttonGroup"
                            sx={{ backgroundColor: "#778899" }}
                            variant="contained"
                            onClick={handleNewPayment}
                          >
                            New Payment
                          </Button>
                          {/* <ReactToPrint
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
               />      */}
                        </ButtonGroup>
                      </ButtonGroup>
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ padding: "40px", textAlign: "center" }}
        >
          <CbhiList/>
        </Grid>
      </Box>
    </div>
  )
}

export default RraDisplayDetails