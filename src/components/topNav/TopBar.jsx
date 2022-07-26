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
import {

    ButtonGroup,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
import './topbar.css'

const TopBar= () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.up("sm"));
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"#ffff"}}>
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
        <Button className="buttonGroup"><PersonIcon/>MobicoreAdmin</Button>
        <Button  className="buttonGroup"><LogoutIcon/>Logout</Button>
      </ButtonGroup>
    </Box>
}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TopBar;