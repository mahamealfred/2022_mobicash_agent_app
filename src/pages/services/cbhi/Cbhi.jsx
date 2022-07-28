import React, { useState, useEffect } from "react";
import Header from "../../../components/header/Header";
import "./cbhi.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography, ButtonGroup, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
 import { getYearAction } from "../../../redux/actions/getYearAction";
 import { getNidDetailsAction } from "../../../redux/actions/getNidDetailsAction";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import CbhiList from "./cbhiList/CbhiList";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Cbhi = () => {
  const dispach = useDispatch();
  const getYear = useSelector((state) => state.getYear);
  const getNidDetails=useSelector((state)=>state.getNidDetails);
  const [years, setYears] = React.useState([]);
  const [paymentYear, setPaymentYear] = useState("");
  const [houseHoldNID,setHouseHoldNID]=useState("");
  const history=useHistory();
  
const handelSubmit= async()=>{
 
  await dispach(getNidDetailsAction({
    houseHoldNID,
    paymentYear
  }));
//   const formData={houseHoldNID,paymentYear}
//   console.log("data..:",JSON.stringify(formData))
//   const response = await fetch('http://52.36.87.202:105/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation', {
//     method: 'POST',
//     headers: { 
//         'Content-Type': 'application/json',
//      },
//     body: JSON.stringify(formData)
// });

// const result = await response.json();
// console.log("National id details:",result)
  setHouseHoldNID("")
  setPaymentYear("")
  history.push('/dashboard/cbhi-payment',{push:true})
}
const handleCancel=()=>{
  history.push('/dashboard',{push:true}) 
}
  useEffect(() => {
    async function fetchData() {
      await dispach(getYearAction());
      if (!getYear.loading) {
        if (getYear.years.return) {
          setYears(getYear.years.return);
        }
      }
  }
    fetchData();
  }, [!getYear.years.return]); 
  const handleChange = (event) => {
    setPaymentYear(event.target.value);
  };
  return (
    <div className="cbhi">
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ padding: "40px", textAlign: "center" }}
        >
          <Grid item xs={12}  spacing={2}>
            <Typography mt={2} sx={{ fontSize: "28px", fontWeight: "bold" }}>
              MUTUWEL SERVICE
            </Typography>
            <Item>
              <div className="content">
                <div className="leftContent">
                <Typography mt={2} sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Household NID:
                </Typography>
                 
                  <TextField
                    label="HouseHold NID"
                    name={houseHoldNID}
                    onChange={(e)=>setHouseHoldNID(e.target.value)}
                    placeholder="Enter Household NID"
                    variant="standard"
                    // fullWidth
                    required
                  />
                  <br />
                  <Typography mt={2} sx={{ fontSize: "20px", fontWeight: "bold" }}>
                  Year of Payament:
                </Typography>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={paymentYear}
                    // fullWidth
                    onChange={handleChange}
                    helperText="Please select year"
                    variant="standard"
                  >
                    {years.map((option) => (
                      <MenuItem key={option.year} value={option.year}>{option.year}</MenuItem>
                    ))}
                  </TextField>
                  <br />
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
                        sx={{ backgroundColor: "#F9842C" }}
                        className="buttonGroup"
                        onClick={handelSubmit}
                      >
                        {getNidDetails.loading ? "Loading" : "Submit"}
                      
                      </Button>
                    </ButtonGroup>
                  </Box>
                </div>
              </div>
            </Item>
          </Grid>
          <CbhiList/>
        </Grid>
         
      </Box>
    
    </div>
  );
};

export default Cbhi;
