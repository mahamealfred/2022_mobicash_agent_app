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
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TopBar from "../../components/topNav/TopBar";
  export default function Login() {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();
    const userLogin=useSelector((state)=>state.login)
    const [agentDetails,setAgentDetails]=useState('');
    const history = useHistory();
 
    const handleClose=()=>{
      setOpen(false)
    }
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
    const onSubmit = async(values, props) => {
      await dispatch(loginAction(values, history));
      if(userLogin.error){
        setOpen(true);
      }
    };
    useEffect(()=>{
      const isAuth=localStorage.getItem("mobicashAuth")
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
              <img src="../../../Assets/images/mobicashdot.png" alt="" className="topAvatarLogin" />
            </Avatar>
          </Grid>
          {
                  !userLogin.error? null:
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
                    {userLogin.error}
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
                   {/* {
                  !userLogin.error? null:
                  <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                  {userLogin.error}
                   </Alert>
                   </Stack>
                }    */}
               
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