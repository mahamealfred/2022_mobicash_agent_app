import axios from "axios";
import {
    RRA_PAYMENT_REQUEST,
    RRA_PAYMENT_SUCCESS,
    RRA_PAYMENT_FAILURE,
  } from "../types/rraPaymentTypes";
  


export const rraPayamentAction = (details,username,password,history) => async (dispatch) => {
  try {
    dispatch(rraPaymentRequest());
    const {bankName}=details
    const {rraRef}=details
    const {tin}=details
    const {taxPayerName}=details
    const {taxTypeDesc}=details
    const {taxCenterNo}=details
    const {taxTypeNo}=details
    const {assessNo}=details
    const {rraOrginNo}=details
    const {amountToPay}=details
    const {descId}=details
    const {payerPhoneNumber}=details
    const {brokering}=details
    const {userGroup}=details
    
   // let errorMessage =''
  console.log(" rra details:",details,username,password)
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentweb.mobicash.rw/api/agent/goverment-services/rra/rest/v.4.14.01/payment';
    const res = await axios.post(Url,{
        bankName:bankName,
        rraRef:rraRef,
        tin:tin,
        taxPayerName:taxPayerName,
        taxTypeDesc:taxTypeDesc,
        taxCenterNo:taxCenterNo,
        taxTypeNo:taxTypeNo,
        assessNo:assessNo,
        rraOriginNo:rraOrginNo,
        amountToPay:amountToPay,
        descId:descId,
        payerPhone:payerPhoneNumber,
        userGroup:userGroup,
        brokering:brokering
     
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
      if(res.data.responseCode===200){
       await dispatch(rraPaymentSuccess(data));
    
        history.push('/dashboard/rra-payment-details',{push:true})
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
        dispatch(rraPaymentFailure(errorMessage)); 
    } else {
      dispatch(rraPaymentFailure("Network Error"));
    }
  }
};

export const rraPaymentRequest = () => {
  return {
    type: RRA_PAYMENT_REQUEST,
  };
};

export const rraPaymentSuccess = (details) => {
  return {
    type: RRA_PAYMENT_SUCCESS,
    payload: details,
  };
};
export const rraPaymentFailure = (error) => {
  return {
    type: RRA_PAYMENT_FAILURE,
    payload: error,
  };
};