import React from 'react'
import './widgetLarge.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import IMAGES from '../../Assets/Images'


const styles = {
  
images:{
  objectFit: 'cover',
  width:150,
  '@media only screen and (max-device-width: 480px)':{
    width:100
  }
 
},
buttonGroup:{
 
}
,
btnImage:{
height:160,
width:180,
'@media only screen and (max-device-width: 480px)':{
  width:120,
  height:120
}

},

};
  
const WidgetLarge = () => {
    const [spacing, setSpacing] = React.useState(2);
    const history = useHistory();
const handleCbhi=()=>{
  history.push("/dashboard/cbhi",{ push: true })
}
const handleElectricity=()=>{
  history.push("/dashboard/electricity",{ push: true })
}
  return (
    <div className='widgetLarge'>
     <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" style={styles.buttonGroup} className='btn' spacing={spacing}>
          <Grid  item>
          <Button onClick={handleElectricity} className="btnImage">
            <img src={IMAGES.electricity} alt='' className="images" />

              </Button>
            </Grid>
            <Grid  item>
          <Button  className="btnImage">
            <img src={IMAGES.rra} alt='' className="images" />

              </Button>
            </Grid>
            <Grid  item>
          <Button  className="btnImage" >
            <img src={IMAGES.rnit} alt='' className="images"/>
              
              </Button>
            </Grid>
            <Grid  item>
          <Button   className="btnImage"  >
            <img src={IMAGES.ejoheza} alt='' className="images" />
              </Button>
            </Grid>
            <Grid  item>
          <Button onClick={handleCbhi} className="btnImage" >
            <img src={IMAGES.rssb} alt=''className="images" />
              </Button>
            </Grid>
            <Grid  item>
          <Button className="btnImage" >
            <img src={IMAGES.canal} alt='' className="images"  />
            
              </Button>
            </Grid>
            <Grid  item>
          <Button className="btnImage" >
            <img src={IMAGES.startime}  className="images"alt='' />
             
              </Button>
            </Grid>
            <Grid  item>
          <Button className="btnImage" >
            <img src={IMAGES.logs} alt=''  className="images" />
              </Button>
            </Grid>
        </Grid>
      </Grid>
      
    </Grid>
    
    </div>
  )
}

export default WidgetLarge