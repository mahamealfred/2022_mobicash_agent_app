import axios from "axios";

import {
    GET_LTSSID_DETAILS_REQUEST,
    GET_LTSSID_DETAILS_SUCCESS,
    GET_LTSSID_DETAILS_FAILURE,
  } from "../types/getLtssIdentificationDetailsTypes";
  

export const getLtssIdDetailsAction = (details,history) => async (dispatch) => {
  try {
    dispatch(getLtssIdDetailsRequest());
    const identificationId=details.identificationId
   console.log("id ...:",identificationId)
    const Url ='http://apiagent.mobicash.rw/api/agent/goverment-services/ltss/rest/v.4.14.01/identification-validation'

   const res = await axios.post(Url,{
    identification:identificationId
    
   }, {
    withCredentials: true,
    headers:{
      "Accept":"application/json",
    "Content-Type": "application/json",
  },
   });
    const data = await res.data;
    if(data.responseCode===200){
      dispatch(getLtssIdDetailsSuccess(data));
      history.push('/dashboard/ltss-payment',{push:true})
    }
  
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.responseDescription;
      dispatch(getLtssIdDetailsFailure(errorMessage));
    } else {
      dispatch(getLtssIdDetailsFailure("Network  Error"));
    }
  }
};

export const getLtssIdDetailsRequest = () => {
  return {
    type:  GET_LTSSID_DETAILS_REQUEST,
  };
};

export const getLtssIdDetailsSuccess = (details) => {
  return {
    type:  GET_LTSSID_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getLtssIdDetailsFailure = (error) => {
  return {
    type:  GET_LTSSID_DETAILS_FAILURE,
    payload: error,
  };
};