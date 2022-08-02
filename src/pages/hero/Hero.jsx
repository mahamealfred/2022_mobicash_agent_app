import React,{useEffect} from 'react';
import IMAGES from '../../Assets/Images';

import {Link} from "react-router-dom";
import TopBar from '../../components/topNav/TopBar';
import { useHistory } from 'react-router-dom';
const Hero = () => {
  const  history=useHistory();
  useEffect(()=>{
    const isAuth=localStorage.getItem("mobicashAuth")
  if(isAuth){
    history.push('/dashboard',{push:true})
  }
  },[])
  return (
    <>
   
    <TopBar/>
      <header className="header">
        <div className="header__img">
          <img src="../../../Assets/images/mobicashdot.png" alt="logo" />
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