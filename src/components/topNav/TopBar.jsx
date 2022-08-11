import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import IMAGES from "../../Assets/Images";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getBalanceAction } from "../../redux/actions/getBalanceAction";
import { ButtonGroup, useMediaQuery, useTheme } from "@mui/material";
import Grid from '@mui/material/Grid';
import "./topbar.css";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const TopBar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("md"));
  const isMatchWith = useMediaQuery(theme.breakpoints.up("lg"));
  const userLogin = useSelector((state) => state.login);
  const dispatch=useDispatch();
  const balance=useSelector(state=>state.balance);
  const [balanceDetails,setBalanceDetails]=useState([])
 console.log("B LL:",balanceDetails)
  const isAuth = localStorage.getItem("mobicashAuth");
  const [agentName, setAgentName] = useState("");
  const token = localStorage.getItem("mobicashAuth");
  const decode = (token) => {
    const JWT_SECRET = "tokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  };
 
  const history = useHistory();
  useEffect(() => {
    if (token) {
      const { name } = decode(token);
      setAgentName(name);
    }
  }, []);
  useEffect(()=>{
    async function fetchData() {
      if (token) {
        const { username } = decode(token);
        const {password}= decode(token);
        await dispatch(getBalanceAction({username,password}))
      }
    }
    fetchData();
  },[])
  useEffect(()=>{
    async function fetchData() {
     
      if (!balance.loading) {
        if (balance.details){
          setBalanceDetails(balance.details.balance)
        }
      }
    }
    fetchData();
  },[!balance.details])
  const handleLogout = () => {
    localStorage.removeItem("mobicashAuth");
    history.push("/", { push: true });
    window.location.reload(true);
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar
      sx={{
        backgroundColor: "#ffff",
        position: "sticky",
        top: "0",
        Zindex: "999",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { lg: "flex", sm: "block" },
            fontSize: "1rem",
            paddingLeft: "5%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <img
              src="../../../Assets/images/logo.png"
              alt=""
              className="topAvatar"
            />
          </Box>
        </Typography>
        {!isAuth ? null : (
        <>
        {
           
  isMatchWith && (
    
    <Typography
    variant="h6"
    noWrap
    component="div"
    sx={{
      flexGrow: 1,
      display: { lg: "flex", sm: "block" },
      fontSize: "1rem",
      paddingLeft: "5%",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
          {/* <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.primary" gutterBottom>
       BALANCE
       </Typography> */}
       {balance.loading ? (
                  null
                ) : balance.details.balance ? (
        <>
        <Typography variant="body2"  sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.primary" >
            Balance: {balance.details.balance[1].details.balance} Rwf   Available float: {balance.details.balance[1].details.availableBalance} Rwf
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.primary" gutterBottom>
            Reserved amount: {balance.details.balance[1].details.reservedAmount} Rwf
          </Typography>
        </>
                ):"No data"
       }
          </Grid>
          </Grid>
    </Box>
  </Typography>
  )
}
        </>
        )
}

        {!isAuth ? null : (
          <>
            {isMatch && (
              <Box
                sx={{
                  display: { lg: "flex", md:"block",sm: "block" },
                  flexDirection: "column",
                  alignItems: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button className="buttonGroup">
                    <EmailIcon />
                  </Button>
                  <Button className="buttonGroup">
                    <NotificationsIcon />
                  </Button>
                  <Button className="buttonGroup" >
                    <PersonIcon />
                    {agentName}
                  </Button>
                  <Button className="buttonGroup" onClick={handleLogout}>
                    <LogoutIcon />
                    Logout
                  </Button>
                </ButtonGroup>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
    //</Box>
  );
};
export default TopBar;
