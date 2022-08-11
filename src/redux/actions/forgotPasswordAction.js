import axios from "axios";
import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
  } from "../types/forgotPasswordTypes";

  import dotenv from "dotenv";
  dotenv.config();


export const forgotPasswordAction = (user,history) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const {username}=user 
   // console.log("username ;;;",username)
    const Url='http://52.36.87.202:107/api/agent/user/rest/v.4.14.01/forgetten-password-request';
   const res = await axios.post(Url,{
    user:username
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
 }
   });
    const {data} = await res;
      if(res.data.code==200){
        dispatch(forgotPasswordSuccess(data));
        history.push('/reset-pin',{push:true})
      }
      
     // history.push('/dashboard',{push:true})
  } catch (err) {
    if (err.response) {
      //const errorMessage = await err.response.data.responseMessage;
      let errorMessage = ''
      if(err.response.data.code==400){
        // errorMessage="Invalid Pin, Please enter a valid Pin"
        errorMessage=await err.response.data.message
        dispatch(forgotPasswordFailure(errorMessage));
      }
    } else {
      dispatch(forgotPasswordFailure("Network Error"));
    }
  }
};

export const forgotPasswordRequest = () => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
  };
};

export const forgotPasswordSuccess = (users) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: users,
  };
};
export const forgotPasswordFailure = (error) => {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: error,
  };
};