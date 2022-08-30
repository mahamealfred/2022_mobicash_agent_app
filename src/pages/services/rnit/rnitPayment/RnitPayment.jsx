import React, {useState,useEffect} from 'react'
import Header from '../../../../components/header/Header';
import './rnitPayment.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from "@mui/material/Button";
import { ButtonGroup, Box,TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {useSelector,useDispatch} from "react-redux";
import jwt from "jsonwebtoken";
import { rraPayamentAction } from '../../../../redux/actions/rraPaymentAction';
import { transactionsAction } from '../../../../redux/actions/transactionsAction';
import { rnitPaymentAction } from '../../../../redux/actions/rnitPaymentAction';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export let rrnitPaidAmount=[]
const banks=[
    {
        value:"BK",
        label:"Bank of Kigali"
    },
    {
        value:"GTBank",
        label:"GT Bank"
    },
    {
        value:"Equity",
        label:"Equity"
    }
    , {
        value:"AccessBank",
        label:"Access Bank"
    }
]
const RnitPayment= () => {
  const dispatch=useDispatch();
  const getDocDetails = useSelector((state) => state.getDocDetails);
  const getRnitDetails= useSelector((state) => state.getRnitDetails);
  const rraPayment = useSelector((state) => state.rraPayment);
  const rnitPayment = useSelector((state) => state.rnitPayment);

  const [open, setOpen] = React.useState(true);
  const [amountPaid,setAmountPaid]=useState('');
  const [password,setPassword]=useState('');
  const [username,setUsername]=useState('')
  const [payerPhoneNumber,setPayerPhoneNumber]=useState('')  
  
  const [bankName,setBankName]=useState('');
 
  const [payerNid,setPayerNid]=useState('')
  const [payerName,setPayerName]=useState('')
  const [bankAccount,setBankAccount]=useState('')

  const [amountToPay,setAmountToPay]=useState('');


  const [amountToPayErrorMessage,setAmountToPayErrorMessage]=useState('');
  const [payerEmail,setPayerEmail]=useState('')
  const [payerEmailErrorMessage,setPayerEmailErrorMessage]=useState('');
  const [bankNameErrorMessage,setBankNameErrorMessage]=useState('');
  const [bankAccountErrorMessage,setBankAccountErrorMessage]=useState('');
  const [brokering,setBrokering]=useState('');


  //vvalidation
  const [phoneErrorMessage,setPhoneErrorMessage]=useState('')
  const [pinErrorMessage,setPinErrorMessage]=useState('')

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
    setUsername(username)
    setBrokering(role)
    
  }

  }, []);
  
  useEffect(()=>{
    async function fetchData() {
      if (!getRnitDetails.loading) {
        if (getRnitDetails.details) {
         setPayerName(getRnitDetails.details.fullName)
         setPayerNid(getRnitDetails.details.nid)
        }
      }
    }
    fetchData();
  },[getRnitDetails.details])

  const history=useHistory();
  const handleCancel=()=>{
    history.push('/dashboard/rnit',{push:true}) 
  }
  const handleSubmit=async()=>{
    let errorMessage=""
    if(bankName==""){
        errorMessage="Please Select Bank"
        setBankNameErrorMessage(errorMessage)   
    }
    else if(bankAccount==""){
        errorMessage="Bank Account is requires"
        setBankAccountErrorMessage(errorMessage)   
    }
  else if(amountToPay==""){
    errorMessage="Amount is required"
    setAmountToPayErrorMessage(errorMessage)
   }
   else if(payerEmail==""){
        errorMessage="Email is required"
        setPayerEmailErrorMessage(errorMessage)
      }
     
    else if(payerPhoneNumber==""){
      errorMessage="Phone number is required"
      setPhoneErrorMessage(errorMessage)
    }
    else if(payerPhoneNumber.length < 10){
      errorMessage="Phone number must be 10 number"
      setPhoneErrorMessage(errorMessage)
    }
    else if(!password){
      errorMessage="Pin is required"
      setPinErrorMessage(errorMessage) ;
    }
    else{
      errorMessage=""
      setPhoneErrorMessage("")
      setPinErrorMessage("") 
      setPayerEmailErrorMessage("")
      setAmountToPayErrorMessage('')
      rrnitPaidAmount.push(amountToPay)
      await dispatch(rnitPaymentAction({
        bankName,
        bankAccount,
        payerNid,
        amountToPay,
        payerName,
        payerPhoneNumber,
        payerEmail,
        brokering
  
      },username,password,history));
      await dispatch(transactionsAction(username,password))
    }
   
   // await dispatch(transactionsAction(username,password))
    if(rraPayment.error){
      setOpen(true)
    } 
  }
 
  return (
    <div className='rnitPayamentContainer'>
        <Header/>
        <Paper
      sx={{
        p: 4,
        margin: 'auto',
        maxWidth: 800,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Box sx={{ flexGrow: 4 }}>
      <Grid 
      container 
      spacing={2}
      sx={{ padding: "20px", textAlign: "center" }}
       >
      <Grid item xs={12}  spacing={2}>
            <Typography mt={2} sx={{ fontSize: "28px", fontWeight: "bold" }}>
              RNIT SERVICE
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
                  !rnitPayment.error? null:
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
                    {rnitPayment.error}
                   </Alert>
                 </Collapse>
                }     
                </Box>
                </Grid>
        <Grid item>
      
        </Grid>
        <Grid item xs={18} sm container>
          <Grid item xs container direction="column" spacing={12}>
            <Grid item xs>
                 <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
             Payer  Name
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                 {payerName}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Identification Number
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
               {payerNid}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Bank Name
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              <TextField
                    label="Bank Name "
                    name="amountToPay"
                    select
                    value={bankName}
                    helperText={bankNameErrorMessage ? bankNameErrorMessage : " "}
                    error={bankNameErrorMessage==""?null:bankNameErrorMessage}
                    onChange={(e)=>setBankName(e.target.value)}
                    placeholder="Enter amount"
                    variant="standard"
                    fullWidth
                    required
                  >
                    {banks.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))} 
                    </TextField>
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Bank Account
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              <TextField
                    label="Bank Account"
                    name="bankAccount"
                    value={bankAccount}
                    helperText={bankAccountErrorMessage? bankAccountErrorMessage : " "}
                    error={bankAccountErrorMessage==""?null:bankAccountErrorMessage}
                    onChange={(e)=>setBankAccount(e.target.value)}
                    placeholder="Enter Phone"
                    variant="standard"
                    fullWidth
                    required
                  />
              </Typography>
            </Grid>
           
          </Grid>
          <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Amount To Pay
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              <TextField
                    label="Amount "
                    name="amountToPay"
                    value={amountToPay}
                    helperText={amountToPayErrorMessage ? amountToPayErrorMessage : " "}
                    error={amountToPayErrorMessage==""?null:amountToPayErrorMessage}
                    onChange={(e)=>setAmountToPay(e.target.value)}
                    placeholder="Enter amount"
                    variant="standard"
                    fullWidth
                    required
                  />
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Payer Phone 
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              <TextField
                    label="Phone Number"
                    name="payerPhoneNumbert"
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
                Payer Email
              </Typography>
              <Typography variant="body3" sx={{ fontSize: "20px", fontWeight: "bold" }} color="text.secondary">
              <TextField
                    label="Email"
                    type="email"
                    name="payerEmail"
                    value={payerEmail}
                    helperText={payerEmailErrorMessage ? payerEmailErrorMessage : " "}
                    error={payerEmailErrorMessage==""?null:payerEmailErrorMessage}
                    onChange={(e)=>setPayerEmail(e.target.value)}
                    placeholder="Enter Email"
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
                      {rnitPayment.loading ? <Stack sx={{ color: 'grey.500'}} spacing={1} direction="row">
      <CircularProgress size={20} color="inherit" height="10px" width="10px" />
     
    </Stack> : "Make Payment"}    
    
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

export default RnitPayment