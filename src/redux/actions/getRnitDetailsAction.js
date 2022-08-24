import axios from "axios";
import {
    GET_RNIT_DETAILS_REQUEST,
    GET_RNIT_DETAILS_SUCCESS,
    GET_RNIT_DETAILS_FAILURE,
  } from "../types/getRnitDetailsTypes";
 


export const getRnitDetailsAction = (identityNumber,history) => async (dispatch) => {
  try {
    dispatch(getRnitDetailsRequest());
  
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
   // let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentweb.mobicash.rw/api/agent/goverment-services/rnit/rest/v.4.14.01/identification-validation';
   const res = await axios.post(Url,{
    identification:identityNumber
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 }
   });
    const {data} = await res;
      if(res.data.responseCode==200){
        dispatch(getRnitDetailsSuccess(data.Response));
         history.push('/dashboard/rnit-payment',{push:true})
      }  
      if(res.data.responseCode==400){
        let errorMessage = ''
        errorMessage="Invalid Identification number"
       // errorMessage=await err.response.data.message
        dispatch(getRnitDetailsFailure(errorMessage));
         
      }  
   
  } catch (err) {
    if (err.response) {
      //const errorMessage = await err.response.data.responseMessage;
      let errorMessage = ''
        errorMessage="Invalid Identification number"
       // errorMessage=await err.response.data.message
        dispatch(getRnitDetailsFailure(errorMessage));
      
    } else {
      dispatch(getRnitDetailsFailure("Network Error"));
    }
  }
};

export const getRnitDetailsRequest = () => {
  return {
    type: GET_RNIT_DETAILS_REQUEST,
  };
};

export const getRnitDetailsSuccess = (details) => {
  return {
    type: GET_RNIT_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getRnitDetailsFailure = (error) => {
  return {
    type: GET_RNIT_DETAILS_FAILURE,
    payload: error,
  };
};