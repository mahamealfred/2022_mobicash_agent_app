import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';

import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import IMAGES from '../../Assets/Images';
import { useDispatch ,useSelector} from "react-redux";
import {useEffect,useState} from "react";
import { useHistory } from 'react-router-dom';
import {

    ButtonGroup,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
import './topbar.css'
import jwt from "jsonwebtoken";
  import dotenv from "dotenv";
  dotenv.config();

const TopBar= () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.up("sm"));
    const userLogin=useSelector((state)=>state.login)
    const isAuth = localStorage.getItem("mobicashAuth");
    const [agentName,setAgentName]=useState('')

    const decode= (token) => {
      const JWT_SECRET="tokensecret";
      const payload =jwt.verify(token, JWT_SECRET);
       return payload;
    }
    const history= useHistory();
    useEffect(() => {
    
      const token =localStorage.getItem('mobicashAuth');
      if (token) {
      const {name}=decode(token);
      setAgentName(name)
    }
  
    }, [])

    const handleLogout = () => {
      localStorage.removeItem("mobicashAuth");
      history.push("/", { push: true });
    };

  return (
    // <Box sx={{ flexGrow: 1 }}>
      <AppBar  sx={{backgroundColor:"#ffff",position:"sticky",top:"0",Zindex:"999",}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { lg:'flex', sm: 'block' },fontSize: "1rem" ,paddingLeft: "5%"}}
          >
             <Box
          sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
<img src={IMAGES.logo} alt="" className="topAvatar"/>
    </Box>
          </Typography>
          {
            !isAuth?null:
            <>
          {isMatch &&
          <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="text button group">
      <Button className="buttonGroup"><EmailIcon/></Button>
        <Button className="buttonGroup"><NotificationsIcon/></Button>
        <Button className="buttonGroup"><PersonIcon/>{agentName}</Button>
        <Button  className="buttonGroup" onClick={handleLogout}><LogoutIcon/>Logout</Button>
      </ButtonGroup>
    </Box>
}
</>
}
        </Toolbar>
        
      </AppBar>
    //</Box>
  );
};
export default TopBar;