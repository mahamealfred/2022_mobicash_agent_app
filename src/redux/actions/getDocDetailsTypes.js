import axios from "axios";

import {
    GET_DOC_DETAILS_REQUEST,
    GET_DOC_DETAILS_SUCCESS,
    GET_DOC_DETAILS_FAILURE,
  } from "../types/getDocDetailsTypes";
  

export const getDocDetailsAction = (details,history) => async (dispatch) => {
  try {
    dispatch(getDocDetailsRequest());
    const docId=details.docId
    const Url ='http://52.36.87.202:105/api/agent/goverment-services/rra/rest/v.4.14.01/doc-id-validation'
//    const res = await axios.post(Url,{
//     details
//    });
   const res = await axios.post(Url,{
    rra_doc_id_ref:docId,
   }, {
    withCredentials: true,
    headers:{
      "Accept":"application/json",
    "Content-Type": "application/json",
    
  },
 
   });
    const {data} = await res;
    dispatch(getDocDetailsSuccess(data));
    console.log("data from doc details:",data);
   history.push('/dashboard/rra-payment',{push:true})
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(getDocDetailsFailure(errorMessage));
    } else {
      dispatch(getDocDetailsFailure("Network  Error"));
    }
  }
};

export const getDocDetailsRequest = () => {
  return {
    type:  GET_DOC_DETAILS_REQUEST,
  };
};

export const getDocDetailsSuccess = (details) => {
  return {
    type:  GET_DOC_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getDocDetailsFailure = (error) => {
  return {
    type:  GET_DOC_DETAILS_FAILURE,
    payload: error,
  };
};