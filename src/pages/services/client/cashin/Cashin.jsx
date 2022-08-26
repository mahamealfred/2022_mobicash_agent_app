import React, { useEffect,useState } from 'react'
import Header from '../../../../components/header/Header';
import './cashin.css';
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
import { getClientDetailsAction } from "../../../../redux/actions/getClientDetailsAction";
import { cashInAction } from '../../../../redux/actions/cashInAction';
export let amountDiposited=[]
const Cashin = () => {
  const [headIdDetails,setHeadIdDetails]=useState('');
  const history=useHistory();
  const dispatch=useDispatch();
  const getNidDetails=useSelector((state)=>state.getNidDetails);
  const cbhiPayment = useSelector((state) => state.cbhiPayment);

  const getClientDetails=useSelector((state)=>state.getClientDetails);
  const cashIn =useSelector((state)=>state.cashIn);

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
  const  [accountNumber,setAccountNumber]=useState('');
  const [accountNumberErrorMessage,setAccountNumberErrorMessage]=useState('')

  const [diposerName,setDiposerName]=useState('')
  
  
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
      if (!getClientDetails.loading) {
        if (getClientDetails.details) {
         setDiposerName(getClientDetails.details.names)
         setAccountNumber(getClientDetails.details.id)
        }
      }
    }
    fetchData();
  },[getClientDetails.details])

  const handleSubmit=async()=>{
    let errorMessage=""
     
    if(amountPaid==""){
      errorMessage="Amount is required"
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
 amountDiposited.push(amountPaid)
 errorMessage=""
  await dispatch(cashInAction({
   
    amountPaid,
    accountNumber
    
  
  },username,password,history))
  await dispatch(transactionsAction(username,password))
}

if(cashIn.error){
  setOpen(true)
}
}
  const handleCancel=()=>{
    history.push('/dashboard/client',{push:true}) 
  }
  return (
    <div className="cashin">
  
        <Header/>
        <Paper
      sx={{
        p: 1,
        margin: 'auto',
        maxWidth: 600,
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
              CLIENT SERVICE
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
                  !cashIn.error? null:
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
                    {cashIn.error}
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
           
                 <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               Name
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
            {diposerName}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Account No
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {accountNumber}
              </Typography>
   
            </Grid>
           
          </Grid>
          <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            
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
                      {cashIn.loading ? <Stack sx={{ color: 'grey.500'}} spacing={1} direction="row">
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

export default Cashin