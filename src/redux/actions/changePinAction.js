import axios from "axios";
import {
    CHANGE_PIN_REQUEST,
    CHANGE_PIN_SUCCESS,
    CHANGE_PIN_FAILURE,
  } from "../types/changePinTypes";
  
  import dotenv from "dotenv";
  dotenv.config();


export const changePinAction = (user,username,history) => async (dispatch) => {
  try {
    dispatch(changePinRequest());
    const {oldPassword}=user 
    const {newPassword}=user
    const {newPasswordConfirmation}=user
    const password=oldPassword
  //  console.log("o new c ",oldPassword,newPassword,newPasswordConfirmation,username, password);
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentweb.mobicash.rw/api/agent/user/rest/v.4.14.01/change-password';
   const res = await axios.post(Url,{
    oldPassword:oldPassword,
    newPassword:newPassword,
    newPasswordConfirmation:newPasswordConfirmation
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
    'Authorization': + basicAuth,
 },
  auth: {
    username,
    password
  }
   });
    const {data} = await res;
      if(res.data.code===200){
        dispatch(changePinSuccess(data));
          localStorage.removeItem("mobicashAuth");
           sessionStorage.removeItem("mobicash-auth")
          history.push('/',{push:true})
          window.location.reload(true);

      }
      
   
  } catch (err) {
    if (err.response) {
      
      const errorMessage = 'Please provide valid Pin'
       // errorMessage=await err.response.data.message
        dispatch(changePinFailure(errorMessage));
      
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

export const changePinSuccess = (users) => {
  return {
    type: CHANGE_PIN_SUCCESS,
    payload: users,
  };
};
export const changePinFailure = (error) => {
  return {
    type: CHANGE_PIN_FAILURE,
    payload: error,
  };
};