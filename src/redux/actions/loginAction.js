import axios from "axios";


import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "../types/loginTypes";
  

export const loginAction = (user,history) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const {username}=user
    const {password}=user 
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    const Url='http://52.36.87.202:105/api/agent/user/rest/v.4.14.01/auth';
   const res = await axios.post(Url,{}, {
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods":"POST, GET, OPTIONS, PUT, DELETE",
    // "Access-Control-Allow-Headers":"Content-Type, X-Auth-Token, Origin, Authorization",
  },
  auth: {
    username,
    password
  }
   });
   console.log("Username and Pin:",username, password);
   console.log("Response from Login:",res)
    const {data} = await res;
    dispatch(loginSuccess(data));
    history.push('/dashboard',{push:true})
  
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(loginFailure(errorMessage));
    } else {
      dispatch(loginFailure("Network Error"));
    }
  }
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (exams) => {
  return {
    type: LOGIN_SUCCESS,
    payload: exams,
  };
};
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};