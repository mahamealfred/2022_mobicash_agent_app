import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "../types/loginTypes";
  
  import jwt from "jsonwebtoken";
  import dotenv from "dotenv";
  dotenv.config();


export const loginAction = (user,history) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const {username}=user
    const {password}=user 
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='http://52.36.87.202:107/api/agent/user/rest/v.4.14.01/auth';
   const res = await axios.post(Url,{}, {
     withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 },
  auth: {
    username,
    password
  }
   });
    const {data} = await res;
    const jwt_secret="tokensecret"
    console.log("response",)
    if(res.data.code==200){
      const userId=res.data.id
      const name=res.data.display
      const role=res.data.brokering
      const group=res.data.group
      console.log(userId,name,role)
      const claims={userId,name,role,username,group,password}
      const token= jwt.sign(claims,jwt_secret, { expiresIn: "7d"});
      dispatch(loginSuccess(data));
      history.push('/dashboard',{push:true})
      return localStorage.setItem('mobicashAuth',token);
    }else{
     history.push('/',{push:true})
    }
  } catch (err) {
    if (err.response) {
      //const errorMessage = await err.response.data.responseMessage;
      const errorMessage = 'Invalid Username or Pin'
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

export const loginSuccess = (users) => {
  return {
    type: LOGIN_SUCCESS,
    payload: users,
  };
};
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};