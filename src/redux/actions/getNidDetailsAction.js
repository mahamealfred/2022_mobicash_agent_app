import axios from "axios";
import {
    GET_NID_DETAILS_REQUEST,
    GET_NID_DETAILS_SUCCESS,
    GET_NID_DETAILS_FAILURE,
  } from "../types/getNidDetailsTypes";
  

export const getNidDetailsAction = (details,history) => async (dispatch) => {
  try {
    dispatch(getNidDetailsRequest());
    const  {houseHoldNID}=details
    const  {paymentYear}=details
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
   // let basicAuth='Basic ' + btoa(username + ':' + password);
   const Url='http://52.36.87.202:107/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation';
   const res = await axios.post(Url,{
    houseHoldNID:houseHoldNID,
    paymentYear:paymentYear
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 },
   });
    const {data} = await res;
      if(res.data.responsecode==200){
        dispatch(getNidDetailsSuccess(data.response));
        history.push('/dashboard/cbhi-payment',{push:true})
      }else if(res.data.responsecode==400){
        let errMsg=res.data.response.message
        dispatch(getNidDetailsFailure(errMsg));
      }
    // history.push('/dashboard/cbhi-payment',{push:true})
      
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Invalid input, HeadId or Year of payment is invalid "
       // errorMessage=await err.response.data.message
        dispatch(getNidDetailsFailure(errorMessage));
      
    } else {
      dispatch(getNidDetailsFailure("Network Error"));
    }
  }
};

export const getNidDetailsRequest = () => {
  return {
    type: GET_NID_DETAILS_REQUEST,
  };
};

export const getNidDetailsSuccess = (details) => {
  return {
    type: GET_NID_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getNidDetailsFailure = (error) => {
  return {
    type: GET_NID_DETAILS_FAILURE,
    payload: error,
  };
};