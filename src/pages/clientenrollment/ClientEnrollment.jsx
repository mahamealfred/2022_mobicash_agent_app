import React ,{useState,useEffect} from 'react'
import Header from '../../components/header/Header'
import './clientEnrollment.css';
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
import { getClientNidDetailsAction } from '../../redux/actions/getClientNidDetailsTypes';
import { useSelector,useDispatch } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const Alerts = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ClientEnrollment = () => {
  const dispatch=useDispatch()
  const changePin=useSelector((state)=>state.changePin);
  const getClientNidDetails=useSelector((state)=>state.getClientNidDetails);
  const clientEnrollment=useSelector((state)=>state.clientEnrollment)
  const [open, setOpen] = React.useState(false);
  const [openClientEnrollment,setOpenClientEnrollment]=useState(false)
  const [openSnackbar,setOpenSnackbar]=React.useState(false);
  const [password,setPassword]=useState('')
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenClientEnrollment(false)
  };
  const isAuth = localStorage.getItem("mobicashAuth");
  const [username,setUsername]=useState('')

  const decode= (token) => {
    const JWT_SECRET="tokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
     return payload;
  }
  const history= useHistory();
  useEffect(() => {
  
    const token =localStorage.getItem('mobicashAuth');
    if (token) {
    const {username}=decode(token);
    const {password}=decode(token);
    setUsername(username)
    setPassword(password)
    
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
    clientNid: "",
    nidIssuePlace: "",
    nidBirthDate:"",
    activeEmail:"",
    activePhone:""

  };
  const validationSchema = Yup.object().shape({
    clientNid: Yup.number().required("Required"),
    nidIssuePlace: Yup.string().required("Required"),
    nidBirthDate:Yup.string().required("Required"),
    activeEmail:Yup.string().email('Invalid email').required('Required'),
    activePhone:Yup.string().required("Required")
  });
  

  const onSubmit = async(values, props) => {
    if(getClientNidDetails.error){   
      setOpen(true)
    }

   await dispatch(getClientNidDetailsAction(values,username,password, history));
   if(clientEnrollment.error){   
    setOpenClientEnrollment(true)
  }
  };
  return (
    <div className='changePin'>
      <Header/>
   
      <Grid>
        <Paper elevation={4}
         sx={{
          p: 6,
          margin: '50px auto',
          maxWidth: 400,
          flexGrow: 4,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
          <Grid align="center" sx={{fontSize:'20px', fontWeight:'bold'}}>
          Client Enrollment
          </Grid>
          {
                  !getClientNidDetails.error? null:
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
                    {getClientNidDetails.error}
                   </Alert>
                 </Collapse>
                }   
               
                {
                  !clientEnrollment.error? null:
                   <Collapse in={openClientEnrollment}>
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
                    { clientEnrollment.error}

                   </Alert>
                 </Collapse>
                } 
                {
                  !clientEnrollment.details? null:
                   <Collapse in={open}>
                   <Alert
                   severity="success"
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
                    { clientEnrollment.details}
                    
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
                    label="Enter NID"
                    name="clientNid"
                    placeholder="Enter NID"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="clientNid" />}
                  />
                   <Field
                    as={TextField}
                    label="Enter NID place of issue(Sector)"
                    name="nidIssuePlace"
                    placeholder="Enter NID place of issue(Sector)"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="nidIssuePlace" />}
                  />
                  <Typography>Select NID Date of Birth</Typography>
                  <Field
                    as={TextField}
                    
                    name="nidBirthDate"
                    placeholder="Select NID Date of Birth"
                    variant="standard"
                    type="date"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="nidBirthDate" />}
                  />
                   <Field
                    as={TextField}
                    label="Enter your Active or privte Email"
                    name="activeEmail"
                    placeholder="Enter active email"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="activeEmail" />}
                  />
                   <Field
                    as={TextField}
                    label="Enter your active phone number"
                    name="activePhone"
                    placeholder="Enter active phone number"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="activePhone" />}
                  />
                   
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={btnStyle}
                    // disabled={props.isSubmitting}
                  >
  
                    {getClientNidDetails.loading ? "Loading" : "Sign up"}
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

export default ClientEnrollment