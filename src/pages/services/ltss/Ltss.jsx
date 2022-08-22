import Header from '../../../components/header/Header';
import './ltss.css';
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography, ButtonGroup, TextField } from "@mui/material";
import { getDocDetailsAction } from '../../../redux/actions/getDocDetailsTypes';
import { getLtssIdDetailsAction } from '../../../redux/actions/getLtssIdentificationDetailsAction';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Ltss = () => {
  const dispach = useDispatch();
  
  const getDocDetails = useSelector((state) => state.getDocDetails);
  const getLtssIndDetails=useSelector((state)=>state.getLtssIndDetails)
  const [docId,setDocId]=useState('');
  const [open, setOpen] = React.useState(true);
  const [docErrorMessage,setDocErrorMessage]=useState("");
  const [identificationId,setIdentificationId]=useState("");
  const [identErrorMessage,setIdentErrorMessage]=useState("");
    const history=useHistory()
    const handelSubmit= async()=>{
      let errorMessage=""
      if(identificationId==""){
        errorMessage="Identification Id is required"
        setIdentErrorMessage(errorMessage)
      }
      else{
        setIdentErrorMessage("")
        errorMessage=""
        await dispach(getLtssIdDetailsAction({identificationId},history));
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
    <div className='ltssContainer'>
        <Header/>
        <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ padding: "40px", textAlign: "center" }}
        >
          <Grid item xs={12} spacing={2}>
            <Typography mt={2} sx={{ fontSize: "28px", fontWeight: "bold" }}>
              Ejo Heza SERVICE
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
                  !getLtssIndDetails.error? null:
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
                    {getLtssIndDetails.error}
                   </Alert>
                 </Collapse>
                }     
                </Box>
            <Item>
              <div className="content">
                <div className="leftContent">
                <Typography mt={2} sx={{ fontSize: "20px", fontWeight: "bold" }}>
                     IDENTIFICATION ID:
                </Typography>

                  <TextField
                    label="Identification ID"
                    name={identificationId}
                    value={identificationId}
                    helperText={identErrorMessage ? identErrorMessage : " "}
                    error={identErrorMessage==""?null:identErrorMessage}
                    onChange={(e)=>setIdentificationId(e.target.value)}
                    placeholder="Enter Identification ID"
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
                        {getLtssIndDetails.loading ? "Loading" : "Submit"}
                      
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

export default Ltss;