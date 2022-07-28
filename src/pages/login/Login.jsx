import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  import Alert from '@mui/material/Alert';
  import Stack from '@mui/material/Stack';
  import { Formik, Form, Field, ErrorMessage } from "formik";
  import * as Yup from "yup";
  import { useHistory } from "react-router-dom";
  import {Link} from "react-router-dom"
import IMAGES from "../../Assets/Images";
import { useDispatch ,useSelector} from "react-redux";
// import {Link} from "react-router-dom"
import "./login.css"
import { loginAction } from "../../redux/actions/loginAction";
import TopBar from "../../components/topNav/TopBar";
  export default function Login() {
    const dispatch = useDispatch();
    const userLogin=useSelector((state)=>state.login)
    const [agentDetails,setAgentDetails]=useState('')
    const history = useHistory();
 
    
    console.log(window)
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
      dispatch(loginAction(values, history));
   
    };

    useEffect(()=>{
      const isAuth=localStorage.getItem("mobicashAuth")
      console.log("ssss",isAuth)
    if(isAuth){
      history.push('/dashboard',{push:true})
    }
    },[])
    return (
      <Grid>
     {/* <TopNav/> */}
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
          <Grid item xs={12} align="center">
            <Avatar style={avatarStyle}>
              {/* <LoginIcon /> */}
              <img src={IMAGES.mobicashdot} alt="" className="topAvatarLogin" />
            </Avatar>
            
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
                  <Field
                    as={TextField}
                    label="Pin"
                    name="password"
                    placeholder="Enter Pin"
                    type="password"
                    variant="standard"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="password" />}
                  />   
                   {
                  !userLogin.error? null:
                  <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                  {userLogin.error}
                   </Alert>
                   </Stack>
                }       
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={btnStyle}
                    // disabled={props.isSubmitting}
                  >   
                   {userLogin.loading?"loading":"Sign In"}
                  </Button>
                </Form>
    )}
            </Formik>
            <Typography>
              <Link to="/forgot-pin" style={forgotStyle}>
                Forgot password?
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
    }   