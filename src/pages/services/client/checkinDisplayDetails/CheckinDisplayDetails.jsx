import React, { useEffect, useState, useRef } from "react";
import Header from "../../../../components/header/Header";
import "./cbhiDisplayDetails.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ButtonGroup, Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import { year } from "../Cbhi";
import { useSelector } from "react-redux";
import CbhiList from "../cbhiList/CbhiList";
import jwt from "jsonwebtoken";
import moment from "moment";
import { cbhiPaidAmount } from "../cbhiPayment/CbhiPayment";
import { getClientDetailsAction } from "../../../../redux/actions/getClientDetailsAction";


const ChekinDisplayDetails= () => {
  const [headIdDetails, setHeadIdDetails] = useState("");
  const history = useHistory();
  const getNidDetails = useSelector((state) => state.getNidDetails);
  const cbhiPaymentDetails = useSelector((state) => state.cbhiPayment);
  const getClientDetails = useSelector((state) => state.cbhiPayment);
  
  const [members, setMembers] = useState("");
  const [agentName, setAgentName] = useState("");
  const [diplayPaymentDetails, setDisplayPaymentDetails] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

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
    history.push("/dashboard/cbhi", { push: true });
  };
  useEffect(() => {
    async function fetchData() {
      if (!getNidDetails.loading) {
        if (getNidDetails.cbhidetails) {
          await setHeadIdDetails(getNidDetails.cbhidetails);
          await setMembers(getNidDetails.cbhidetails.members);
          // setAmountPaid(amount[0])
        }
      }
    }
    fetchData();
  }, [getNidDetails.cbhidetails]);

  return (
    <div className="checkinDisplayContainer">
      <Header />
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
              Mutuwel Service Transaction Details
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
                    {diplayPaymentDetails.transfersId}
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
                    Year of payment
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                    {year[0]}
                  </Typography>
                  <Typography
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    variant="body2"
                    gutterBottom
                  >
                    House Hold NID
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                    {headIdDetails.headId}
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
                    Paid Amount
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                    {cbhiPaidAmount[0]} Rwf
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
                    {moment(diplayPaymentDetails.date).format("llll")}
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
                    {diplayPaymentDetails.status}
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
          <CbhiList />
        </Grid>
      </Box>
    </div>
  );
};

export default ChekinDisplayDetails;
