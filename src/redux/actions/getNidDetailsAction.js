import axios from "axios";

import {
    GET_NID_DETAILS_REQUEST,
    GET_NID_DETAILS_SUCCESS,
    GET_NID_DETAILS_FAILURE,
  } from "../types/getNidDetailsTypes";
  

export const getNidDetailsAction = (details,history) => async (dispatch) => {
  try {
    dispatch(getNidDetailsRequest());
    const houseHoldNID={details}
    const paymentYear={details}
    console.log("details ...:",details)
    const Url ='http://52.36.87.202:105/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation'
//    const res = await axios.post(Url,{
//     details
//    });
   const res = await axios.post(Url,{
    // houseHoldNID:houseHoldNID,
    // paymentYear:paymentYear
    details
   }, {
    withCredentials: true,
    headers:{
      "Accept":"application/json",
      "Content-Type": "application/json",
    
  },
   });
    const {data} = await res;
    dispatch(getNidDetailsSuccess(data));
    console.log("data from Nid",data);
   history.push('/dashboard/cbhi-payment',{push:true})
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(getNidDetailsFailure(errorMessage));
    } else {
      dispatch(getNidDetailsFailure("Network  Error"));
    }
  }
};

export const getNidDetailsRequest = () => {
  return {
    type:  GET_NID_DETAILS_REQUEST,
  };
};

export const getNidDetailsSuccess = (details) => {
  return {
    type:  GET_NID_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getNidDetailsFailure = (error) => {
  return {
    type:  GET_NID_DETAILS_FAILURE,
    payload: error,
  };
};