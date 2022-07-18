import React from 'react'
import Header from '../../components/header/Header';
import Snippets from '../snippets/Snippets';
import "./home.css";
const Home = () => {
  return (
    <div className="home">
      <Header/>
      <div className='homeWidgets'>
      {/* <WidgetLarge/>
      <WidgetSmall/> */}
      <Snippets/>
      </div>
     
      </div>
  )
}

export default Home