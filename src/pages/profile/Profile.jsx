import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./profile.css"
import Header from '../../components/header/Header';
import EditIcon from '@mui/icons-material/Edit';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="profile">
              <Header />
              <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ padding: "40px", textAlign: "center" }}
        >
            <BottomNavigation sx={{ width: 500,alignItems:"center",display:"flex" }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Edit Profile"
        value="recents"
        icon={<EditIcon />}
      />
     
      <BottomNavigationAction
        label="Check Balance"
        value="nearby"
        icon={<CreditScoreIcon />}
      />
      <BottomNavigationAction label="Change Pin" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
            </Grid>

            </Box>
 
    </div>
   
  );
}
