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
import {year} from "../Cbhi";
import {useSelector,useDispatch} from "react-redux";
import jwt from "jsonwebtoken";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { cbhiPayamentAction } from '../../../../redux/actions/cbhiPaymentAction';
import {transactionsAction} from '../../../../redux/actions/transactionsAction';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
export let amount=[]
const CbhiPayment = () => {
  const [headIdDetails,setHeadIdDetails]=useState('');
  const history=useHistory();
  const dispatch=useDispatch();
  const getNidDetails=useSelector((state)=>state.getNidDetails);
  const cbhiPayment = useSelector((state) => state.cbhiPayment);
  const [members,setMembers]=useState('');
  const [username,setUsername]=useState('')
  const [agentCategory,setAgentCategory]=useState('');

  const [houseHoldNID,setHouseHoldNID]=useState('')
  const [paymentYear,setPaymentYear]=useState('')
  const [amountPaid,setAmountPaid]=useState('');
  const [password,setPassword]=useState('');
  const [payerPhoneNumber,setPayerPhoneNumber]=useState('')   
  const [payerName,setPayerName]=useState('');

  const [houseHoldCategory,seHouseHoldCategory]=useState('');
  const [householdMemberNumber,setHouseholdMemberNumber]=useState('');
  const [totalPremium,setTotalPremium]=useState('');   
  
  //vlaidation
  const [phoneErrorMessage,setPhoneErrorMessage]=useState('')
  const [amountErrorMessage,setAmountErroMessage]=useState('')
  const [pinErrorMessage,setPinErrorMessage]=useState('');
 
  
  const [userGroup,setUserGroup]=useState('');
  const [open, setOpen] = React.useState(true);
  
  const handleClose=()=>{
    setOpen(false)
  }
  const decode= (token) => {
    const JWT_SECRET="tokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
     return payload;
  }
  useEffect(() => {
  
    const token =localStorage.getItem('mobicashAuth');
    if (token) {
    const {username}=decode(token);
    const {role}=decode(token);
    const {group}=decode(token);
    setUsername(username)
    setAgentCategory(role)
    setUserGroup(group);
  }

  }, []);

  useEffect(()=>{
    async function fetchData() {
      if (!getNidDetails.loading) {
        if (getNidDetails.cbhidetails) {
          await setHeadIdDetails(getNidDetails.cbhidetails);
         await setMembers(getNidDetails.cbhidetails.members);
         setHouseHoldNID(getNidDetails.cbhidetails.headId)
         setPaymentYear(year[0])
         setPayerName(getNidDetails.cbhidetails.headHouseHoldNames)
         seHouseHoldCategory(getNidDetails.cbhidetails.houseHoldCategory)
         setHouseholdMemberNumber(getNidDetails.cbhidetails.totalHouseHoldMembers)
         setTotalPremium(getNidDetails.cbhidetails.totalAmount)
         
        }
      }
    }
    fetchData();
  },[getNidDetails.cbhidetails])

  const handleSubmit=async()=>{
    let errorMessage=""
    if(payerPhoneNumber==""){
      errorMessage="Phone number is required"
      setPhoneErrorMessage(errorMessage)
    }
    else if(payerPhoneNumber.length < 10){
      errorMessage="Phone number must be 10 number"
      setPhoneErrorMessage(errorMessage)
    }
   else if(amountPaid==""){
      errorMessage="Amount is required"
      setAmountErroMessage(errorMessage)
    }
    else if(amountPaid%1000!==0){
      errorMessage="Amount must be divisible by 1000"
      setAmountErroMessage(errorMessage)
    }  
   else if(!password){
      errorMessage="Pin is required"
      setPinErrorMessage(errorMessage) 
    }
else{
  setPinErrorMessage("") 
  setAmountErroMessage("")
  setPhoneErrorMessage("")
  errorMessage=""
  await dispatch(cbhiPayamentAction({
    houseHoldNID,
    paymentYear,
    amountPaid,
    payerName,
    houseHoldCategory,
    householdMemberNumber,
    totalPremium,
    payerPhoneNumber,
    agentCategory,
    userGroup
  },username,password,history))
  await dispatch(transactionsAction(username,password))
}

if(cbhiPayment.error){
  setOpen(true)
}
}
  const handleCancel=()=>{
    history.push('/dashboard/cbhi',{push:true}) 
  }
  return (
    <div className='cbhiPayment'>
  
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
                }     
                </Box>
                </Grid>
        <Grid item>
      
        </Grid>
        <Grid item xs={18} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
           
              {
               getNidDetails.loading?("Loading"):getNidDetails.cbhidetails?(
                <>
                 <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               Name
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
              {headIdDetails.headHouseHoldNames}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                House Hold NID
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {headIdDetails.headId}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Year of payment
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {year[0]}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Total Premium 
              </Typography>
             
              <Typography  variant="body2"  sx={{ fontSize: "16px", fontWeight: "bold" }}  color="text.secondary">
                {headIdDetails.totalAmount} Rwf
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                House Hold Category 
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {headIdDetails.houseHoldCategory}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Number Of Members 
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {headIdDetails.totalHouseHoldMembers}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Name Of Members 
              </Typography>
              {
                !members?null:
                <Typography variant="body2" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
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
               <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold"  }}  variant="body2" gutterBottom>
                Already Paid
              </Typography>
              
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold",color:"green" }} color="text.secondary">
                {headIdDetails.totalPaidAmount} Rwf
              </Typography>
              </>:null
             }
                </>
               ):"No Details found"
              }
             
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
                    value={payerPhoneNumber}
                    helperText={phoneErrorMessage ? phoneErrorMessage : " "}
                    error={phoneErrorMessage==""?null:phoneErrorMessage}
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
                    value={amountPaid}
                    helperText={amountErrorMessage? amountErrorMessage : " "}
                    error={amountErrorMessage==""?null:amountErrorMessage}
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
                    value={password}
                    helperText={pinErrorMessage ? pinErrorMessage : " "}
                    error={pinErrorMessage==""?null:pinErrorMessage}
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
                      {cbhiPayment.loading ? <Stack sx={{ color: 'grey.500'}} spacing={1} direction="row">
      <CircularProgress size={20} color="inherit" height="10px" width="10px" />
     
    </Stack> : "Send"}   
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

export default CbhiPayment