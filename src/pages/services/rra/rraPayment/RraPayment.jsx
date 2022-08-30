import React, {useState,useEffect} from 'react'
import Header from '../../../../components/header/Header';
import './rraPayment.css';
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
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const RraPayment= () => {
  const dispatch=useDispatch();
  const getDocDetails = useSelector((state) => state.getDocDetails);
  const rraPayment = useSelector((state) => state.rraPayment);
  const [open, setOpen] = React.useState(true);
  const [amountPaid,setAmountPaid]=useState('');
  const [password,setPassword]=useState('');
  const [username,setUsername]=useState('')
  const [payerPhoneNumber,setPayerPhoneNumber]=useState('')  
  
  const [bankName,setBankName]=useState('');
  const [rraRef,setRraRef]=useState('');
  const [tin,setTin]=useState('');
  const [taxPayerName,setTaxPayerName]=useState('');
  const [taxTypeDesc,setTaxTypeDesc]=useState('');
  const [taxCenterNo,setTaxCenterNo]=useState('');
  const [taxTypeNo,setTaxTypeNo]=useState('');
  const [assessNo,setAssessNo]=useState('');
  const [rraOrginNo,setRraOrginNo]=useState('');
  const [amountToPay,setAmountToPay]=useState('');
  const [descId,setDescId]=useState('');
  const [payerPhone,setPayerPhone]=useState('');
  const [brokering,setBrokering]=useState('');
const [userGroup,setUserGroup]=useState('');

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
    const {group}=decode(token);
    setUsername(username)
    setBrokering(role)
    setUserGroup(group)
    
  }

  }, []);
  
  useEffect(()=>{
    async function fetchData() {
      if (!getDocDetails.loading) {
        if (getDocDetails.details) {
          setBankName(getDocDetails.details.bank_name)
          setRraRef(getDocDetails.details.RRA_REF)
          setTin(getDocDetails.details.TIN)
          setTaxPayerName(getDocDetails.details.TAX_PAYER_NAME)
          setTaxTypeDesc(getDocDetails.details.TAX_TYPE_DESC)
          setTaxCenterNo(getDocDetails.details.TAX_CENTRE_NO)
          setTaxTypeNo(getDocDetails.details.TAX_TYPE_NO)
          setAssessNo(getDocDetails.details.ASSESS_NO)
          setRraOrginNo(getDocDetails.details.RRA_ORIGIN_NO)
          setAmountToPay(getDocDetails.details.AMOUNT_TO_PAY)
          setDescId(getDocDetails.details.DEC_ID)
          
        }
      }
    }
    fetchData();
  },[getDocDetails.details])

  const history=useHistory();
  const handleCancel=()=>{
    history.push('/dashboard/rra',{push:true}) 
  }
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
    else if(!password){
      errorMessage="Pin is required"
      setPinErrorMessage(errorMessage) ;
    }
    else{
      errorMessage=""
      setPhoneErrorMessage("")
      setPinErrorMessage("") ;
      await dispatch(rraPayamentAction({
        bankName,
        rraRef,
        tin,
        taxPayerName,
        taxTypeDesc,
        taxCenterNo,
        taxTypeNo,
        assessNo,
        rraOrginNo,
        amountToPay,
        descId,
        payerPhoneNumber,
        userGroup,
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
    <div className='rraPayamentContainer'>
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
              RRA SERVICE
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
                  !rraPayment.error? null:
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
                    {rraPayment.error}
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
             Payer  Name
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
              {taxPayerName}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                RRA Reference
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {rraRef}
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }}  variant="body2" gutterBottom>
                Amount To Pay
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {amountToPay} Rwf
              </Typography>
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
                      {rraPayment.loading ? <Stack sx={{ color: 'grey.500'}} spacing={1} direction="row">
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

export default RraPayment