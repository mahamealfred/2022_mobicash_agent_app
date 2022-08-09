import React, { Component } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import "../App.css";
import TopBar from "../components/topNav/TopBar";
import Footer from "../components/footer/Footer";


export default class AgentDashboard extends Component {
  render() {
    return (
      <div>
        <TopBar/>
        <div className="container">
        <Sidebar/>
          {this.props.children}
        <Sidebar/>
        </div>
        <Footer/>
      </div>
    );
  }
}
