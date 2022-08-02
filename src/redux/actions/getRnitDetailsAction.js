import axios from "axios";
import {
    GET_RNIT_DETAILS_REQUEST,
    GET_RNIT_DETAILS_SUCCESS,
    GET_RNIT_DETAILS_FAILURE,
  } from "../types/getRnitDetailsTypes";
 


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
      if(res.data.code==200){
        dispatch(changePinSuccess(data));
      }
      
     // history.push('/dashboard',{push:true})
      
   
  } catch (err) {
    if (err.response) {
      //const errorMessage = await err.response.data.responseMessage;
      let errorMessage = ''
        errorMessage="Please provide valid Pin"
       // errorMessage=await err.response.data.message
        dispatch(changePinFailure(errorMessage));
      
    } else {
      dispatch(changePinFailure("Network Error"));
    }
  }
};

export const changePinRequest = () => {
  return {
    type: GET_RNIT_DETAILS_REQUEST,
  };
};

export const changePinSuccess = (users) => {
  return {
    type: GET_RNIT_DETAILS_SUCCESS,
    payload: users,
  };
};
export const changePinFailure = (error) => {
  return {
    type: GET_RNIT_DETAILS_FAILURE,
    payload: error,
  };
};