import React, { useEffect, useState, useRef } from "react";
import Header from "../../../../components/header/Header";
import "./cashinDisplayDetails.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ButtonGroup, Box } from "@mui/material";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import CbhiList from "../../cbhi/cbhiList/CbhiList"
import jwt from "jsonwebtoken";
import moment from "moment";

import { getClientDetailsAction } from "../../../../redux/actions/getClientDetailsAction";
import { amountDiposited } from "../cashin/Cashin";

import MuiAlert from "@mui/material/Alert";
import Snackbar,  { SnackbarOrigin } from "@mui/material/Snackbar";



const Alerts = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CashinDisplayDetails= () => {
  const [headIdDetails, setHeadIdDetails] = useState("");
  const history = useHistory();
  const getNidDetails = useSelector((state) => state.getNidDetails);
  const cbhiPaymentDetails = useSelector((state) => state.cbhiPayment);
  const getClientDetails = useSelector((state) => state.cbhiPayment);
  const cashIn =useSelector((state)=>state.cashIn);
  const [members, setMembers] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [agentName, setAgentName] = useState("");
  const [diplayPaymentDetails, setDisplayPaymentDetails] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

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
      if (!cbhiPaymentDetails.loading) {
        if (cbhiPaymentDetails.details) {
          setDisplayPaymentDetails(cbhiPaymentDetails.details);
        }
      }
     
    }
    fetchData();
  }, [cbhiPaymentDetails.details]);

  const handleNewPayment = () => {
    history.push("/dashboard/client", { push: true });
  };
  useEffect(() => {
    async function fetchData() {
      if (!cashIn.loading) {
        if (cashIn.details) {
          setCustomerDetails(cashIn.details)
        }
      }
      if( customerDetails.code==200){
        setOpenSnackbar(true)
      }
    }
    fetchData();
  }, [cashIn.details,customerDetails.code]);

  return (
    <div className="cashinDisplayContainer">
      <Header />
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
             Thank you!, You have successful diposited
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
              Client Service Transaction Details
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
                    {customerDetails.transactionNumber}
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
                    Customer Names
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                   {customerDetails.toUser}
                  </Typography>
                  <Typography
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    variant="body2"
                    gutterBottom
                  >
                    Description
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                    {customerDetails.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  {/* <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
              Mobicash Reference ID
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
              MOBICASH0000000000023
              </Typography> */}
                  <Typography
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    variant="body2"
                    gutterBottom
                  >
                    Diposited Amount
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                  
                   {customerDetails.amount} Rwf
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
                    {moment(customerDetails.date).format("llll")}
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
                            New Diposit
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
          <CbhiList />
        </Grid>
      </Box>
    </div>
  );
};

export default CashinDisplayDetails;