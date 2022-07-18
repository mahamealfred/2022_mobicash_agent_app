import React, { Component } from "react";
import TopNav from "../components/topNav/TopNav";
import Sidebar from "../components/sidebar/Sidebar";
import "../App.css";


export default class AgentDashboard extends Component {
  render() {
   
    return (
      <div>
        <TopNav />
        <div className="container">
        <Sidebar/>
          {this.props.children}
        <Sidebar/>
        </div>
       
      </div>
    );
  }
}
