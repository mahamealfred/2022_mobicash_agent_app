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
                 M2876
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
             Bizimana Jean Claude
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
                 Mahame Alfred
                  </Typography>
                  <Typography
                    mt={1}
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                    variant="body2"
                    gutterBottom
                  >
                    Token
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                    color="text.secondary"
                  >
                 30709790049814143303
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
                    10000 Rwf
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
                    12/12/2022 12:08 AM
                    {/* {moment(diplayPaymentDetails.date).format("llll")} */}
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
          {/* <CbhiList /> */}
        </Grid>
      </Box>
    </div>
  )
}

export default RraDisplayDetails