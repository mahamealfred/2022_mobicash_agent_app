import React ,{useEffect}from "react";
import {
    Button,
    Grid,
    Paper,
    TextField,
   
  } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import TopBar from "../../components/topNav/TopBar";

  
  export default function ForgotPassword() {
  
    const history = useHistory();
    
    useEffect(()=>{
      const isAuth=localStorage.getItem("mobicashAuth")
    if(isAuth){
      history.push('/dashboard',{push:true})
    }
    },[])
  
    const avatarStyle = {
      backgroundColor: "#3D426B",
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

     history.push('/reset-pin',{push:true})
    };
    const handleSubmit=(values, props)=>{
      
        history.push('/reset-pin',{push:true})
    }
    return (
      <Grid>
      <TopBar/>
        <Paper elevation={4}
         sx={{
          p: 2,
          margin: '60px auto',
          maxWidth: 280,
          flexGrow: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
            <Grid align="center" sx={{fontSize:'20px', fontWeight:'bold'}}>
            Forgot Pin
            
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
                    fullWidth
                    required
                    helperText={<ErrorMessage name="username" />}
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
                    onClick={handleSubmit}
                    style={btnStyle}
                    // disabled={props.isSubmitting}
                  >     
                    {/* {userLogin.loading ? "Loading" : "Sign in"} */}
                    Forgot Password
                  </Button>
                </Form>
    )}
            </Formik>
          </Grid>
        </Paper>
      </Grid>
    );
                }   
  