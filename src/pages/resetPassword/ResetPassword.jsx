import React ,{useEffect}from "react";
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
import TopBar from "../../components/topNav/TopBar";
import { useHistory } from "react-router-dom";
import Footer from "../../components/footer/Footer";
  
  export default function ResetPassword() {
    const history = useHistory();
    
    useEffect(()=>{
      const isAuth=localStorage.getItem("mobicashAuth")
    if(isAuth){
      history.push('/dashboard',{push:true})
    }
    },[])
  
    const avatarStyle = {
      backgroundColor: "#FFFF",
      margin: "6px 0px",
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
    const forgotStyle = {
      color:"#3D426B",
      textDecoration: "none",
    };
    const initialValues = {
      username: "",
      password: "",
     
    };
    const validationSchema = Yup.object().shape({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    });
    const onSubmit = (values, props) => {
     history.push('/',{push:true});
    };
    return (
      <Grid>
      <TopBar/>
        <Paper elevation={4}
         sx={{
          p: 4,
          margin: '60px auto',
          maxWidth: 320,
          flexGrow: 4,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
          <Grid item xs={12} align="center">
            <Avatar style={avatarStyle}>
              {/* <LoginIcon /> */}
              <img src="../../../Assets/images/mobicashdot.png" alt="" className="topAvatarLogin" />
            </Avatar>
          </Grid>
            <Grid align="center" sx={{fontSize:'20px', fontWeight:'bold'}}>
            Reset Pin
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
                    label="Username"
                    name="username"
                    placeholder="Enter username"
                    variant="standard"
                    disabled
                    fullWidth
                    required
                    helperText={<ErrorMessage name="username" />}
                  />
                   <Field
                    as={TextField}
                    label="code"
                    name="username"
                    placeholder="Code"
                    variant="standard"
                    disabled
                    fullWidth
                    required
                    helperText={<ErrorMessage name="username" />}
                  />
                  <Field
                    as={TextField}
                    label="New Pin"
                    name="password"
                    placeholder="Enter New Pin"
                    type="password"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="password" />}
                  />
                   <Field
                    as={TextField}
                    label="Confirm Pin"
                    name="password"
                    placeholder="Confirm New Pin"
                    type="password"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="password" />}
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
                    {/* {userLogin.loading ? "Loading" : "Sign in"} */}
                    Reset Password
                  </Button>
                </Form>
    )}
            </Formik>
          </Grid>
        </Paper>
        <Footer/>
      </Grid>
    );
                }   
  