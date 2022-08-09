import React,{useEffect,useState} from "react";
import IMAGES from "../../Assets/Images"
import WidgetLarge from "../../components/widgetLarge/WidgetLarge";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ButtonGroup, Box,TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
function Snippets() {

  const dispatch=useDispatch();
  const balance=useSelector(state=>state.balance);
  const [balanceDetails,setBalanceDetails]=useState([])
 console.log("B LL Alfred:",balanceDetails)
  const isAuth = localStorage.getItem("mobicashAuth");
  const [agentName, setAgentName] = useState("");
  const token = localStorage.getItem("mobicashAuth");
  
 
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
  return (
    <>
      <section className="snippets">
        <div className="snippets__head">
          <h1>Mobicash Services</h1>
          <p className="desktop__text">
          Make payments anytime, anywhere.
          </p>
        </div>
        <div className="snippets__body">
          <div className="snippets__body__img">
            {/* <img src={IMAGES.logo} alt="computers" /> */}
            <WidgetLarge/>
          </div>
          <div className="snippets__body__text">
          {/* <h2>Balance Transactions</h2>
            <h3>Commission</h3>
            <p>
              8,000,000 Rwf
            </p>
            <h3>Available Float</h3>
            <p>67,000,000 Rwf</p> */}
            {/* <h2>Commission Transactions</h2>
            <h3>Commission</h3>
            <p>
              8,000,000 Rwf
            </p>
            <h3>Available Float</h3>
            <p>67,000,000 Rwf</p> */}

            <Paper
      sx={{
        p: 1,
        margin: 'auto',
        maxWidth: 400,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Box sx={{ flexGrow: 4 }}>
      <Grid 
      container 
      spacing={2}
      sx={{ padding: "20px", textAlign: "center" }}
       >
      <Grid item xs={12}  spacing={2}>
            <Typography  mt={1} sx={{ fontSize: "24px", fontWeight: "bold" ,color:"black" }}>
            Commission
            </Typography>
                </Grid>
        <Grid item>
      
        </Grid>
        <Grid item xs={10} sm container>
          <Grid item xs container direction="column" spacing={4}>
            <Grid item xs>
                {balance.loading ? (
                  "loading.."
                ) : balance.details.balance ? (

       <>
      { console.log("kkkk",balance.details.balance[0].details.availableBalance)}
      
        <Typography variant="body2" mt={1} sx={{ fontSize: "16px", fontWeight: "bold"}} color="text.secondary"  gutterBottom>
               Balance: <Typography sx={{color:"green"}} >{balance.details.balance[0].details.balance} Rwf</Typography>
              </Typography>
              {/* <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
             1,000,000,000 Rwf
              </Typography> */}
              <Typography mt={1} sx={{ fontSize: "16px", fontWeight: "bold" }}  variant="body2" color="text.secondary"  gutterBottom>
               Available: <Typography sx={{color:"red"}} >{balance.details.balance[0].details.availableBalance} Rwf</Typography>
              </Typography>
              {/* <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
              0.00 Rwf
              </Typography> */}
              
             
             <Typography mt={1} sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary"   variant="body2" gutterBottom>
               Reserved Amount: <Typography sx={{color:"blue"}} >{balance.details.balance[0].details.reservedAmount} Rwf</Typography>
              </Typography>
       </>
                ):"Not data"
                
              }
                
              
            </Grid>
           
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </Paper>
   </div>
   </div>
      </section>
    </>
  );
}

export default Snippets;
