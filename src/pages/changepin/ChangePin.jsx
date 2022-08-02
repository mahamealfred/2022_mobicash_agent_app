import React ,{useState,useEffect} from 'react'
import Header from '../../components/header/Header'
import './changePin.css';
import { useHistory } from 'react-router-dom';
import jwt  from 'jsonwebtoken';
import {
  Avatar,
  Button,
  Checkbox,
  Link,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { changePinAction } from '../../redux/actions/changePinAction';
import { useSelector,useDispatch } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const Alerts = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ChangePin = () => {
  const dispatch=useDispatch()
  const changePin=useSelector(state=>state.changePin);
  const [open, setOpen] = React.useState(false);
  const [openSnackbar,setOpenSnackbar]=React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const isAuth = localStorage.getItem("mobicashAuth");
  const [username,setUsername]=useState('')

  const decode= (token) => {
    const JWT_SECRET="tokensecret";
    const payload =jwt.verify(token, JWT_SECRET);
     return payload;
  }
  const history= useHistory();
  useEffect(() => {
  
    const token =localStorage.getItem('mobicashAuth');
    if (token) {
    const {username}=decode(token);
    setUsername(username)
  }

  }, [])

 
  const btnStyle = {
   backgroundColor: "#F9842C",
    //backgroundColor: "#3D426B",
    margin: "6px 0px",
    color:"#FFFF",
  };
  const textStyle = {
    margin: "30px 0px",
  };
 
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation:"",
   
  };
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required"),
    newPasswordConfirmation:Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Pin must match')
  });

  const onSubmit = (values, props) => {
     dispatch(changePinAction(values,username, history));
    if(changePin.users){
      setOpenSnackbar(true)
    }
    if(changePin.error){
      setOpen(true)
    }
    
  };
  return (
    <div className='changePin'>
      <Header/>
      {
        changePin.error? null:
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alerts
              onClose={handleClose}
              severity="success"
              variant="outlined" 
              color="success"
             
              sx={{ width: "80%",margin:"0px 80px", padding:"0 5px" }}
            >
             Pin Changed successfull
            </Alerts>
          </Snackbar>
      }
      
      <Grid>
        <Paper elevation={4}
         sx={{
          p: 4,
          margin: '50px auto',
          maxWidth: 280,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
          <Grid align="center" sx={{fontSize:'20px', fontWeight:'bold'}}>
            Please Change Your PIN.
          </Grid>
          {
                  !changePin.error? null:
                   <Collapse in={open}>
                   <Alert
                   severity="error"
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
                     sx={{ mb: 0.2 }}
                   >
                    {changePin.error}
                   </Alert>
                 </Collapse>
                }    
          <Grid style={textStyle}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form>
                  <Field
                    as={TextField}
                    label="Enter Old PIN"
                    name="oldPassword"
                    placeholder="Enter Old PIN"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="oldPassword" />}
                  />
                  <Field
                    as={TextField}
                    label="Enter New PIN"
                    name="newPassword"
                    placeholder="Enter New PIN"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="newPassword" />}
                  />
                   <Field
                    as={TextField}
                    label="Confirm New PIN"
                    name="newPasswordConfirmation"
                    placeholder="Confirm New PIN"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="newPasswordConfirmation" />}
                  />
                   {/* {
                    !changePin.error? null:
                    <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                    {changePin.error}
                     </Alert>
                     </Stack>
                  } */}
                   {/* {/* <p>{userLogin.error}</p>
                    */}
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={btnStyle}
                    // disabled={props.isSubmitting}
                  >
  
                    {changePin.loading ? "Loading" : "Sign in"}
                  </Button>
                </Form>
    )}
            </Formik>
           
          </Grid>
        </Paper>
      </Grid>
      </div>
  )
}

export default ChangePin