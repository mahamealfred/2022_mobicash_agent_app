import axios from "axios";
import {
    CASHIN_REQUEST,
    CASHIN_SUCCESS,
    CASHIN_FAILURE,
  } from "../types/cashInTypes";
  


export const cashInAction = (details,username,password,history) => async (dispatch) => {
  try {
    dispatch(cashInRequest());
    const {amountPaid}=details
    const {accountNumber}=details
    
   // let errorMessage =''
  console.log(" cash in details:",details,username,password)
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentweb.mobicash.rw/api/banking/finance/rest/v.4.14.01/cash-in';
    const res = await axios.post(Url,{
      amount:amountPaid,
    account:accountNumber
     
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
    console.log("cash in response",data)
      if(res.data.code===200){
       await dispatch(cashInSuccess(data));
    
        history.push('/dashboard/client-cashin-details',{push:true})
      }
    //   if(res.data.responseCode==400){
    //     let errorMessage = 'Invalid Credential, Please provide valid Pin'
    //       dispatch(rraPaymentFailure(errorMessage)); 
    //   }
      // else{
      //   history.push('/dashboard/cbhi',{push:true})
      // }
      
  } catch (err) {
    if (err.response) {
       // const errorMessage = await err.response;
       let errorMessage = 'Invalid Crendentials'
      //   errorMessage="Please provide valid Pin"
     // const errorMessage = 'Error'
      // errorMessage=await err.response.data.message
        dispatch(cashInFailure(errorMessage)); 
    } else {
      dispatch(cashInFailure("Network Error"));
    }
  }
};

export const cashInRequest = () => {
  return {
    type: CASHIN_REQUEST,
  };
};

export const cashInSuccess = (details) => {
  return {
    type: CASHIN_SUCCESS,
    payload: details,
  };
};
export const cashInFailure = (error) => {
  return {
    type: CASHIN_FAILURE,
    payload: error,
  };
};