import axios from "axios";
import {
    TRANSACTIONS_REQUEST,
    TRANSACTIONS_SUCCESS,
    TRANSACTIONS_FAILURE,
  } from "../types/transactionsTypes";
  
export const transactionsAction = (username,password,history) => async (dispatch) => {
  try {
    dispatch(transactionsRequest());
  
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='http://52.36.87.202:107/api/agent/utilities/user/rest/v.4.14.01/all-transacion-by-id';
   const res = await axios.post(Url,{},{
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
      if(res.data.responseCode==200){
        dispatch(transactionsSuccess(data.transactions));
      }   
  } catch (err) {
    if (err.response) {
      //const errorMessage = await err.response.data.responseMessage;
      // let errorMessage = ''
      //   errorMessage="Please provide valid Pin"
      const errorMessage = 'Transaction Faild '
       // errorMessage=await err.response.data.message
        dispatch(transactionsFailure(errorMessage));
      
    } else {
      dispatch(transactionsFailure("Network Error"));
    }
  }
};

export const transactionsRequest = () => {
  return {
    type: TRANSACTIONS_REQUEST,
  };
};

export const transactionsSuccess = (details) => {
  return {
    type: TRANSACTIONS_SUCCESS,
    payload: details,
  };
};
export const transactionsFailure = (error) => {
  return {
    type: TRANSACTIONS_FAILURE,
    payload: error,
  };
};