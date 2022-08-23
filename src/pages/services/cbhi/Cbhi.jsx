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
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from '@hookform/resolvers/yup';
 export let headIdDetails=[]
 export let year=[]
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
  const [open, setOpen] = React.useState(true);
  const [nIdErrorMessage,setNIdErrorMessage]=useState("");
  const [paymentYearErrorMessage,setPaymentYearErrorMessage]=useState("")
  const history=useHistory();

  const initialState = {houseHoldNID: '', password: ''};
 

  const handleError= ()=>{
    
  }
  const handleClose=()=>{
    setOpen(false)
  }
 
const handelSubmit= async()=>{
  let errorMessage=""
  if(houseHoldNID=="" ){
    errorMessage="HouseHold NID is required"
    setNIdErrorMessage(errorMessage)
  }
  else if(houseHoldNID.length<8 || houseHoldNID.length>16 ){
    errorMessage="NID lenght muster between 8 to 16 numbers"
    setNIdErrorMessage(errorMessage)
  }
  else if(paymentYear==""){
    errorMessage="Please select year of payment"
    setPaymentYearErrorMessage(errorMessage)
  }
  else{
    setNIdErrorMessage("")
    setPaymentYearErrorMessage("")
    errorMessage=""
    await dispach(getNidDetailsAction({ houseHoldNID, paymentYear },history));
    
  }
  if(getNidDetails.error){
    setOpen(true)
  }
  //history.push('/dashboard/cbhi-payment',{push:true})
  
  // setHouseHoldNID("")
  // setPaymentYear("")
  year.push(paymentYear)
 
  
 // history.push('/dashboard/cbhi-payment',{push:true})
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
       if(!getNidDetails.loading){
        if(getNidDetails.cbhidetails){
          //setHeadIdDetails(getNidDetails.details)
          headIdDetails.push(getNidDetails.cbhidetails)
        }
       }
  }
    fetchData();
  }, [!getYear.years.return,!getNidDetails.cbhidetails]); 
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
                    
            {
                  !getNidDetails.error? null:
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
                    {getNidDetails.error}
                   </Alert>
                 </Collapse>
                }     
                </Box>
            <Item>
              <div className="content">
                <div className="leftContent">
               
                <Typography mt={2} sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Household NID:
                </Typography>
                <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
                    <TextField
                     value={houseHoldNID}
                    //  error={houseHoldNID}
                     id="standard-error-helper-text"
                     helperText={nIdErrorMessage ? nIdErrorMessage : " "}
                     label="HouseHold NID"
                     name={houseHoldNID}
                     onChange={(e)=>setHouseHoldNID(e.target.value)}
                     placeholder="Enter Household NID"
                     variant="standard"
                    // fullWidth
                    error={nIdErrorMessage==""?null:nIdErrorMessage}
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
                    fullWidth
                   onChange={handleChange}
                   helperText={paymentYearErrorMessage? paymentYearErrorMessage : " "}
                   error={paymentYearErrorMessage==""?null:paymentYearErrorMessage}
                    variant="standard"
                  >
                    {years.map((option) => (
                      <MenuItem key={option.year} value={option.year}>{option.year}</MenuItem>
                    ))}
                  </TextField>
                  </Box>
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
                        {getNidDetails.loading ? <Stack sx={{ color: 'grey.500'}} spacing={1} direction="row">
       <CircularProgress size={20} color="inherit" height="10px" width="10px" />
       </Stack> : "Send"}
                  
                      </Button>
                    </ButtonGroup>
                  </Box>
                </div>
              </div>
            </Item>
           
          </Grid>
        
        </Grid>
         
      </Box>
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

export default Cbhi;
