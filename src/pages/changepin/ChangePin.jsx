import React from 'react'
import Header from '../../components/header/Header'
import './changePin.css'
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
const Alerts = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ChangePin = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
 
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
    oldPin: "",
    newPin: "",
    confirmPin:"",
   
  };
  const validationSchema = Yup.object().shape({
    oldPin: Yup.string().required("Required"),
    newPin: Yup.string().required("Required"),
    confirmPin: Yup.string().required("Required"),
  });

  const onSubmit = (values, props) => {
    console.log("values",values)
    // dispatch(loginAction(values, history));
    setOpen(true);
    
  };
  return (
    <div className='changePin'>
      <Header/>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
                    name="oldPin"
                    placeholder="Enter Old PIN"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="oldPin" />}
                  />
                  <Field
                    as={TextField}
                    label="Enter New PIN"
                    name="newPin"
                    placeholder="Enter New PIN"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="newPin" />}
                  />
                   <Field
                    as={TextField}
                    label="Confirm New PIN"
                    name="confirmPin"
                    placeholder="Confirm New PIN"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="confirmPin" />}
                  />
                  {/* {
                    !userLogin.error? null:
                    <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                    {userLogin.error}
                     </Alert>
                     </Stack>
                  }
                   {/* <p>{userLogin.error}</p>
                  */} 
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={btnStyle}
                    // disabled={props.isSubmitting}
                  >
                      Submit
                    {/* {userLogin.loading ? "Loading" : "Sign in"} */}
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