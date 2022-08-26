import axios from "axios";
import {
    CLIENT_DETAILS_REQUEST,
    CLIENT_DETAILS_SUCCESS,
    CLIENT_DETAILS_FAILURE,
  } from "../types/getClientDetailsTypes";
  
export const getClientDetailsAction = (identityNumber,username,password,history) => async (dispatch) => {
  try {
    dispatch(getClientDetailsRequest());
    
    
console.log("iiii:",identityNumber,username,password)
  
   let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentweb.mobicash.rw/api/agent/user/rest/v.4.14.01/user-validation';
   const res = await axios.post(Url,{
    useridentify:identityNumber
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
    console.log("datat",data)
      if(res.data.responseCode==200){
        dispatch(getClientDetailsSuccess(data));
        history.push('/dashboard/client-cashin',{push:true})
      }   
    //   if(res.data.responseCode==400){
    //     const errorMessage = await res.data.status;
    //     dispatch(getClientDetailsFailure(errorMessage));
    //   }
  } catch (err) {
    if (err.response) {
     // const errorMessage = await err.response.data.status;
       let errorMessage = ''
        errorMessage="Invalid Credentials"
     // const errorMessage = 'Transaction Faild '
       // errorMessage=await err.response.data.message
        dispatch(getClientDetailsFailure(errorMessage));
      
    } else {
      dispatch(getClientDetailsFailure("Network Error"));
    }
  }
};

export const getClientDetailsRequest = () => {
  return {
    type: CLIENT_DETAILS_REQUEST,
  };
};

export const getClientDetailsSuccess = (details) => {
  return {
    type: CLIENT_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getClientDetailsFailure = (error) => {
  return {
    type: CLIENT_DETAILS_FAILURE,
    payload: error,
  };
};