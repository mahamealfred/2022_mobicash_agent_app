import axios from "axios";
import {
    CHANGE_PIN_REQUEST,
    CHANGE_PIN_SUCCESS,
    CHANGE_PIN_FAILURE,
  } from "../types/changePinTypes";
  
  import jwt from "jsonwebtoken";
  import dotenv from "dotenv";
  dotenv.config();


export const changePinAction = (user,username,history) => async (dispatch) => {
  try {
    dispatch(changePinRequest());
    const {oldPassword}=user 
    const {newPassword}=user
    const {newPasswordConfirmation}=user
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
   // let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='http://52.36.87.202:107/api/agent/user/rest/v.4.14.01/change-password';
   const res = await axios.post(Url,{
    oldPassword:oldPassword,
    newPassword:newPassword,
    newPasswordConfirmation:newPasswordConfirmation
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 },
  auth: {
    username,
    password:oldPassword
  }
   });
    const {data} = await res;

      dispatch(changePinSuccess(data));
      history.push('/dashboard',{push:true})
      
   
  } catch (err) {
    if (err.response) {
      //const errorMessage = await err.response.data.responseMessage;
      let errorMessage = ''
      if(err.response.data.code==400){
        // errorMessage="Invalid Pin, Please enter a valid Pin"
        errorMessage=await err.response.data.message
        dispatch(changePinFailure(errorMessage));
      }
      else{
        errorMessage="Login for authentication"
        dispatch(changePinFailure(errorMessage));
      }
      
    } else {
      dispatch(changePinFailure("Network Error"));
    }
  }
};

export const changePinRequest = () => {
  return {
    type: CHANGE_PIN_REQUEST,
  };
};

export const changePinSuccess = (exams) => {
  return {
    type: CHANGE_PIN_SUCCESS,
    payload: exams,
  };
};
export const changePinFailure = (error) => {
  return {
    type: CHANGE_PIN_FAILURE,
    payload: error,
  };
};