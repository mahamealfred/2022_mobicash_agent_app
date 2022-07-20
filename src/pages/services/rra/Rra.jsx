import Header from '../../../components/header/Header';
import './rra.css';
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography, ButtonGroup, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Rra = () => {
    const history=useHistory()
    const handelSubmit=()=>{
history.push('/dashboard/rra-payment',{push: true});
    }
    const handleCancel=()=>{
      history.push('/dashboard',{push:true}) 
    }
  return (
    <div className='rraContainer'>
        <Header/>
        <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ padding: "40px", textAlign: "center" }}
        >
          <Grid item xs={12} spacing={2}>
            <Typography mt={2} sx={{ fontSize: "28px", fontWeight: "bold" }}>
              RRA SERVICE
            </Typography>
            <Item>
              <div className="content">
                <div className="leftContent">
                <Typography mt={2} sx={{ fontSize: "20px", fontWeight: "bold" }}>
                     DOC ID:
                </Typography>
                  <TextField
                    label="Doc ID"
                    // name={houseHoldNID}
                    // onChange={(e)=>setHouseHoldNID(e.target.value)}
                    placeholder="Enter Doc ID"
                    variant="standard"
                    // fullWidth
                    required
                  />
                  <br />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "& > *": {
                        m: 3,
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
                        sx={{ backgroundColor: "#F9842C" }}
                        className="buttonGroup"
                        onClick={handelSubmit}
                      >
                        {/* {getNidDetails.loading ? "Loading" : "Submit"} */}
                        Submit
                      </Button>
                    </ButtonGroup>
                  </Box>
                
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
     </div>
  )
}

export default Rra;