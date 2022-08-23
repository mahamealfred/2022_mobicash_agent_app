import Header from '../../../components/header/Header';
import './client.css';
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography, ButtonGroup, TextField } from "@mui/material";
import { getDocDetailsAction } from '../../../redux/actions/getDocDetailsTypes';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from 'react-router-dom';
import CbhiList from '../cbhi/cbhiList/CbhiList';
import jwt from "jsonwebtoken";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Client = () => {
  const dispach = useDispatch();
  
  const getDocDetails = useSelector((state) => state.getDocDetails);
  const [identityNumber,setIdentityNumber]=useState('');
  const [password,setPassword]=useState('')
  const [open, setOpen] = React.useState(true);
  const [pinErrorMessage,setPinErrorMessage]=useState("")
 const [username,setUsername]=useState('');
  const [identityNumberErrorMessage,setIdentityNumberErrorMessage]=useState('')
    const history=useHistory()

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
         
      }
    
      }, []);
    const handelSubmit= async()=>{
      let errorMessage=""
      if(identityNumber==""){
        errorMessage="Identity Number is required"
        setIdentityNumberErrorMessage(errorMessage)
      }
      else if(password==""){
        errorMessage="PiN is required"
        setPinErrorMessage(errorMessage)
      }
      else{
        setIdentityNumberErrorMessage("")
        errorMessage=""
        await dispach(getDocDetailsAction({identityNumber},password,username,history));
      }
     
      if(getDocDetails.error){
        setOpen(true)
      }
    }
    const handleClose=()=>{
      setOpen(false)
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
                  !getDocDetails.error? null:
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
                    {getDocDetails.error}
                   </Alert>
                 </Collapse>
                }     
                </Box>
            <Item>
              <div className="content">
                <div className="leftContent">
                <Typography mt={2} sx={{ fontSize: "20px", fontWeight: "bold" }}>
                     IDENTITY NUMBER:
                </Typography>

                  <TextField
                    label="Identity Number "
                    name={identityNumber}
                    value={identityNumber}
                    helperText={identityNumberErrorMessage ? identityNumberErrorMessage : " "}
                    error={identityNumberErrorMessage==""?null:identityNumberErrorMessage}
                    onChange={(e)=>setIdentityNumber(e.target.value)}
                    placeholder="Enter Identity number"
                    variant="standard"
                    // fullWidth
                    required
                  />
                  <Typography mt={2} sx={{ fontSize: "20px", fontWeight: "bold" }}>
                     PIN:
                </Typography>
                   <TextField
                    label="PIN "
                    name={password}
                    value={password}
                    helperText={pinErrorMessage ? pinErrorMessage : " "}
                    error={pinErrorMessage==""?null:pinErrorMessage}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter Pin"
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
                        {/* {getDocDetails.loading ? "Loading" : "Submit"} */}
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
  )
}

export default Client;