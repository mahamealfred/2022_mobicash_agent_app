import React, { Component } from 'react'
import {  Switch, Route } from "react-router-dom";
import ForgotPassword from '../pages/forgotPassword/ForgotPassword';
import ResetPassword from '../pages/resetPassword/ResetPassword';
import Hero from '../pages/hero/Hero';
import Login from '../pages/login/Login';

import AgentDashboardRoute from "./AgentDashoard.routes"





export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth:localStorage.getItem("mobicasAuth")
    };
  }
    render() {
        return (
          
          <Switch>
          <Route exact path="/" component={Hero}/>
             <Route path="/dashboard">
             <AgentDashboardRoute />
              </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot-pin">
          <ForgotPassword/>
          </Route>
          <Route path="/reset-pin">
          <ResetPassword/>
          </Route>
         </Switch>
          
        )
    }
}
