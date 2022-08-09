import axios from "axios";
import {
    CBHI_PAYMENT_REQUEST,
    CBHI_PAYMENT_SUCCESS,
    CBHI_PAYMENT_FAILURE,
  } from "../types/cbhiPaymentTypes";
  


export const cbhiPayamentAction = (details,username,password,history) => async (dispatch) => {
  try {
    dispatch(cbhiPaymentRequest());
    const {houseHoldNID}=details
    const {paymentYear}=details
    const {amountPaid}=details
    const {payerName}=details
    const {houseHoldCategory}=details
    const {householdMemberNumber}=details
    const {totalPremium}=details
    const {payerPhoneNumber}=details
    const {agentCategory}=details
    const {userGroup}=details
    
  
    console.log("detailes, username , password,::",details,username,password)
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='http://52.36.87.202:107/api/agent/goverment-services/cbhi/rest/v.4.14.01/payment';
    const res = await axios.post(Url,{
    houseHoldNID:houseHoldNID,
    paymentYear:paymentYear,
    amountPaid:amountPaid,
    payerName:payerName,
    houseHoldCategory:houseHoldCategory,
    householdMemberNumber:householdMemberNumber,
    totalPremium:totalPremium,     
    payerPhoneNumber:payerPhoneNumber,   
    brokering:agentCategory,
    userGroup:userGroup
      // houseHoldNID:"1197070037691016",
      // paymentYear:"2022",
      // amountPaid:"1000",
      // payerName:"BEATRICE UZAMUKUNDA",
      // houseHoldCategory:3,
      // householdMemberNumber:5,
      // totalPremium:15000,     
      // payerPhoneNumber:"0788529611",   
      // brokering:"Broker",
      // userGroup:"retail_agents"
  
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
      if(res.data.responseCode==200){
       await dispatch(cbhiPaymentSuccess(data));
        console.log("Success ...")
        history.push('/dashboard/cbhi-payment-details',{push:true})
      }
      
  } catch (err) {
    if (err.response) {
       // const errorMessage = await err.response;
       let errorMessage = 'Invalid input'
      //   errorMessage="Please provide valid Pin"
     // const errorMessage = 'Error'
      // errorMessage=await err.response.data.message
        dispatch(cbhiPaymentFailure(errorMessage)); 
    } else {
      dispatch(cbhiPaymentFailure("Network Error"));
    }
  }
};

export const cbhiPaymentRequest = () => {
  return {
    type: CBHI_PAYMENT_REQUEST,
  };
};

export const cbhiPaymentSuccess = (details) => {
  return {
    type: CBHI_PAYMENT_SUCCESS,
    payload: details,
  };
};
export const cbhiPaymentFailure = (error) => {
  return {
    type: CBHI_PAYMENT_FAILURE,
    payload: error,
  };
};