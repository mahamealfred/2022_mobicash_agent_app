import React,{useEffect,useState} from 'react'
import Header from '../../../../components/header/Header';
import './rnitDisplayDetails.css';
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
import { rrnitPaidAmount } from '../rnitPayment/RnitPayment';
import moment from "moment";
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
const RnitDisplayDetails = () => {
  const dispatch=useDispatch();
  const getDocDetails = useSelector((state) => state.getDocDetails);
  const getRnitDetails= useSelector((state) => state.getRnitDetails);
  const rraPaymentDetails = useSelector((state) => state.rraPayment);
  const rnitPaymentDetails = useSelector((state) => state.rnitPayment);

  const [displayRnitPaymentDetails,setDisplayRnitPaymentDetails]=useState('');
  const [agentName,setAgentName]=useState('');
  const [payerName,setPayerName]=useState('');
  const [amountPaid,setAmountPaid]=useState('');
  console.log("amount rnit paid",rrnitPaidAmount)
    const history=useHistory();
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
        if (!rnitPaymentDetails.loading) {
          if (rnitPaymentDetails.details) {
            setDisplayRnitPaymentDetails(rnitPaymentDetails.details);
        
          }
        }
      }
      fetchData();
    }, [rnitPaymentDetails.details]);

    useEffect(() => {
      async function fetchData() {
        if (!getRnitDetails.loading) {
          if (getRnitDetails.details) {
            await setPayerName(getRnitDetails.details.fullName);       
            // setAmountPaid(amount[0])
          }
        }
      }
      fetchData();
    }, [getRnitDetails.details]);
  
    const handleNewPayment=()=>{
history.push('/dashboard/rnit',{push:true})
    }
  return (
    <div className='rnitDisplayContainer'>
    <Header/>
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
            RNIT Service Transaction Details
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
                 {displayRnitPaymentDetails.mobicashTransctionNo}
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
                    {rrnitPaidAmount[0]} Rwf
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
                     {moment(displayRnitPaymentDetails.date).format("llll")}
                  
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

export default RnitDisplayDetails