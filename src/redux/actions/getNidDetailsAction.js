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
    const dt=JSON.stringify(details)
    const Url ='http://52.36.87.202:105/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation'
  //  const res = await axios.post(Url,{
  //   details
  //  });
  const token = document.querySelector('meta[name="csrf-token"]');
  console.log("token..:",token.content)
   const res = await axios.post(Url,{},{
    withCredentials: true,
    headers:{
      "Accept":"application/json",
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': token.content,
  },
  body:dt
   });
  //  const res=await axios.post(Url, dt).then(({data})=>{
    
  //  console.log(data)
  // }).catch(({response})=>{
  //  console.log(response)
  // })

    const {data} = await res;
    dispatch(getNidDetailsSuccess(data));
  // history.push('/dashboard/cbhi-payment',{push:true})
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