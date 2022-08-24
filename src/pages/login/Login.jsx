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
import { getBalanceAction } from "../../redux/actions/getBalanceAction";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TopBar from "../../components/topNav/TopBar";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Footer from "../../components/footer/Footer";
import {  InputAdornment } from '@mui/material';
import { transactionsAction } from "../../redux/actions/transactionsAction";
import Iconify from "../../components/Iconify";
import { styled } from '@mui/material/styles';
import { Card} from '@mui/material';
import { ButtonGroup, useMediaQuery, useTheme } from "@mui/material";

  export default function Login() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.up("md"));
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();
    const userLogin=useSelector((state)=>state.login)
    const [agentDetails,setAgentDetails]=useState('');
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);

    const handleClose=()=>{
      setOpen(false)
    }
    const SectionStyle = styled(Card)(({ theme }) => ({
      width: '100%',
      maxWidth: 464,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: theme.spacing(2, 0, 2, 2),
    }));
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
      username: Yup.string()
      .required('Username is required'),
      // .min(3, 'Username must be at least 6 characters')
      // .max(20, 'Username must not exceed 20 characters'),
      password: Yup.string().required("Password is required"),
    });
    const {
      register,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });
    const onSubmit = async(values, props) => {
      await dispatch(loginAction(values, history));
      
      if(userLogin.error){
        setOpen(true);
      }
      await dispatch(getBalanceAction(values, history));
      await dispatch(transactionsAction(values.username,values.password))
    };
    useEffect(()=>{
      const isAuth=localStorage.getItem("mobicashAuth")
    if(isAuth){
      history.push('/dashboard',{push:true})
    }
    },[])
    return (
      <Grid>
     <TopBar/>
    
     {/* {isMatch&& (
          <SectionStyle> */}
            {/* <Typography variant="h3" sx={{ px: 5, mt: 2, mb: 5 }}>
            MobiCash Agent Application
            </Typography> */}
            {/* <img src="/Asstes/images/logo.png" alt="login" />
          </SectionStyle>
        )} */}
      <Paper elevation={2}
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
                   helperText={<ErrorMessage name="username" color="red"/>}
                  />
                 
                  <Field
                    as={TextField}
                    label="Pin"
                    name="password"
                    placeholder="Enter Pin"
                    //type="password"
                    variant="standard"
                    fullWidth
                    error={errors.password ? true : false}
                    helperText={<ErrorMessage name="password" />}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
        <Footer/>
      </Grid>
    );
    }   