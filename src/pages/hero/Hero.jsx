import React from 'react';
import IMAGES from '../../Assets/Images';

import {Link} from "react-router-dom";
import TopBar from '../../components/topNav/TopBar';
const Hero = () => {
  // const  history=useHistory();
  return (
    <>
   
    <TopBar/>
      <header className="header">
        <div className="header__img">
          <img src={IMAGES.mobicashdot} alt="logo" />
        </div>
        <h1>MobiCash</h1>
        <p className="desktop__text">
        The MobiCash super app allows you to make payments anytime, anywhere. 
        From shopping at your local store to paying online and even donating to charity by.
        </p>
        <div className="buttons">   
      <Link to="/login">Get Started</Link>
    </div>
      </header>
    </>
  )
}

export default Hero