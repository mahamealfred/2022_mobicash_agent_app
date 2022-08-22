import React, { useState, useEffect,useRef } from "react";
import "./cbhiList.css";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import moment from "moment";
import { ButtonGroup, Stack } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ReactToPrint from "react-to-print";
import jwt from "jsonwebtoken";
import logo from "../../../../Assets/images/logo.png"
export let amountPaid=[]
const data = [
  {
    collectionDate: "12/12/2021",
    amount: 12000,
    service: "CBI",
    bank_reference: 125353663763,
    mobicash_reference: 1224255252,
  },
  {
    collectionDate: "04/06/2021",
    amount: 2000,
    service: "CBI",
    bank_reference: 115353663763,
    mobicash_reference: 13424255252,
  },
  {
    collectionDate: "03/06/2021",
    amount: 30000,
    service: "RRA",
    bank_reference: 132353663763,
    mobicash_reference: 15624255252,
  },
];

function CbhiList() {
  const todaydate = new Date().toISOString().slice(0, 10);
  const transactionsDetails = useSelector((state) => state.transactions);
 
  const cbhiPaymentDetails=useSelector((state)=>state.cbhiPayment);
  const [diplayPaymentDetails,setDisplayPaymentDetails]=useState('');
  const [agentTransactionsDetails, setAgentTransactionDetails] = useState([]);
  const [limit, setLimit] = useState(5);
  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [results, setResults] = useState({});
  const [search, setSearch] = useState(false);
  const [numberOfTransaction,setNumberOfTransaction]=useState(0)
  const [transactionId,setTransactionId]=useState('');
  const [agentName,setAgentName]=useState('')
  const componentRef = useRef();
 
  const trimString = (s) => {
    var l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] == " ") l++;
    while (r > l && s[r] == " ") r -= 1;
    return s.substring(l, r + 1);
  };
  const compareObjects = (o1, o2) => {
    var k = "";
    for (k in o1) if (o1[k] != o2[k]) return false;
    for (k in o2) if (o1[k] != o2[k]) return false;
    return true;
  };
  const itemExists = (haystack, needle) => {
    for (var i = 0; i < haystack.length; i++)
      if (compareObjects(haystack[i], needle)) return true;
    return false;
  };
  const searchHandle = async (e) => {
    setSearch(true);
    const searchKey = e.target.value;
    // console.log(e.target.value)
    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < agentTransactionsDetails.length; i++) {
        for (var key in agentTransactionsDetails[i]) {
          if (agentTransactionsDetails[i][key] != null) {
            if (
              agentTransactionsDetails[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, agentTransactionsDetails[i]))
                results.push(agentTransactionsDetails[i]);
            }
          }
        }
      }
      setResults(results);
    } catch (error) {
      console.log(error);
    }
  };
  const decode= (token) => {
    const JWT_SECRET="tokensecret";
    const payload =jwt.verify(token, JWT_SECRET);
     return payload;
  }
  useEffect(() => {
  
    const token =localStorage.getItem('mobicashAuth');
    if (token) {
    const {name}=decode(token);
    setAgentName(name)
  }

  }, []);

  useEffect(()=>{
    async function fetchData() {
      if (!cbhiPaymentDetails.loading) {
        if (cbhiPaymentDetails.details) {
          setDisplayPaymentDetails(cbhiPaymentDetails.details)
          
        }
      }
    }
    fetchData();
  },[cbhiPaymentDetails.details])


  useEffect(() => {
    async function fetchData() {
      if (!transactionsDetails.loading) {
        if (transactionsDetails.details) {
          setAgentTransactionDetails(transactionsDetails.details);
          setNumberOfTransaction(transactionsDetails.details.length)
        }
      }
    }
    fetchData();
  }, [transactionsDetails.details]);
  const headers = [
    { label: "Collection Date", key: "collectionDate" },
    { label: "Service", key: "service" },
    { label: "Amount", key: "amount" },
    { label: "Bank reference", key: "bank_reference" },
    { label: "Mobicash reference", key: "mobicash_reference" },
  ];

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.addImage(logo , "PNG", 20, 10, 50, 20);
    doc.setFont("Helvertica", "normal");
    doc.text("Mobicash Ltd", 20, 50);
    doc.text("Company Name: Mobicash", 20, 55);
    doc.text("Email: mobicash@reb.rw", 20, 60);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 65);
    doc.setFont("Helvertica", "bold");
    doc.text("List of Approved Transfer Report", 70, 75);
  
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };
  const company_logo = {
    w: 140,
    h: 60
  };
  const comapnyJSON={
    CompanyName:'ABCD TECHONOLOGIES',
    CompanyGSTIN:'37B76C238B7E1Z5',
    CompanyState:'KERALA (09)',
    CompanyPAN:'B76C238B7E',
    CompanyAddressLine1:'ABCDEFGD HOUSE,IX/642-D',
    CompanyAddressLine2:'ABCDEFGD P.O., NEDUMBASSERY',
    CompanyAddressLine3:'COCHIN',
    PIN: '683584',
    companyEmail:'xyz@gmail.com',
    companyPhno:'+918189457845',
  };
  
  const fontSizes={
    HeadTitleFontSize:18,
    Head2TitleFontSize:16,
    TitleFontSize:14,
    SubTitleFontSize:12,
    NormalFontSize:12,
    SmallFontSize:8
  };
  const lineSpacing={
    NormalSpacing:12,
  };

  const generatePdfs=(id)=>{
    console.log("transs id:",id)
    var doc = new jsPDF('p', 'pt');
    var rightStartCol1=400;
    var rightStartCol2=480;
    var InitialstartX=40;
    var startX=40;
    var InitialstartY=50;
    var startY=0;
    var lineHeights=12;
    var rightcol1=340;
    var rightcol2=230;
    doc.rect(
      18,
      18,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 42,
      "S"
    );
    doc.setFontSize(fontSizes.SubTitleFontSize);
    doc.setFont("Helvertica", "bold");
    //doc.setFontType('bold');
    //doc.addImage(logo , "PNG", 20, 10, 50, 20);
    doc.addImage(logo,'PNG',startX,startY+=50,company_logo.w,company_logo.h);
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text("MobiCash Ltd I KN 3 Road, Gasabo District",startX, startY+=15+company_logo.h,'left');
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text("ADDRESS",startX, startY+=lineSpacing.NormalSpacing);
    doc.setFont("Helvertica", "normal");
    doc.text("Remra, Rukiri 1, Kigali Rwanda", 80, startY);
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text("EMAIL",startX, startY+=lineSpacing.NormalSpacing);
    doc.setFont("Helvertica", "normal");
    doc.text("info@mobicashonline.com", 80, startY);
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text("Phone: ", startX, startY+=lineSpacing.NormalSpacing);
    doc.setFont("Helvertica", "normal");
    doc.text("+2507800000", 80, startY);
    var tempY=InitialstartY;
    doc.setFontSize(fontSizes.NormalFontSize);
    agentTransactionsDetails.map((details)=>{
      if(details.id===id){
        doc.text("Transacttion: ",rightStartCol1,tempY+=lineSpacing.NormalSpacing);
        doc.setFont("Helvertica", "normal");
        doc.text(`${id}`, rightStartCol2, tempY);
        doc.setFontSize(fontSizes.NormalFontSize);
        doc.text("Payemnt Date: ",  rightStartCol1, tempY+=lineSpacing.NormalSpacing);
        doc.setFont("Helvertica", "normal");
        doc.text(`${details.operationDate}`,rightStartCol2, tempY);
        doc.setFont('normal');
        doc.setLineWidth(1);
        doc.line(20, startY+lineSpacing.NormalSpacing, 220, startY+lineSpacing.NormalSpacing);
        doc.line(380, startY+lineSpacing.NormalSpacing, 580, startY+lineSpacing.NormalSpacing);
        doc.setFontSize(fontSizes.Head2TitleFontSize);
        doc.setFontSize(fontSizes.NormalFontSize);
        //doc.text("MUTUWEL INVOICE",startX,startY+=lineSpacing.NormalSpacing+2,null,null,'center');
        doc.setFontSize(fontSizes.NormalFontSize);
        doc.setFont('bold');
        doc.setFontSize(fontSizes.NormalFontSize);
        doc.text(`AGENT NAME: ${agentName}`,rightcol2, startY+=lineSpacing.NormalSpacing+25);
        doc.setFontSize(fontSizes.NormalFontSize);
        doc.text("DESCRIPTION",rightcol2, startY+=lineSpacing.NormalSpacing+25);
        const split=details.description.split(",")
        doc.text(`${split[0].trim()}`,rightcol2, startY+=lineSpacing.NormalSpacing+25);
        doc.text(`${split[1].trim()}`,rightcol2, startY+=lineSpacing.NormalSpacing+25);
        doc.text(`${split[2].trim()} Rwf`,rightcol2, startY+=lineSpacing.NormalSpacing+25);
        doc.setFontSize(fontSizes.NormalFontSize);
        doc.text(`PRINTED DATE: ${todaydate}`,rightcol2, startY+=lineSpacing.NormalSpacing+25);
        
      }
    })
    
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text('Authorised Signatory: ......................',rightcol2+10 , startY+=lineSpacing.NormalSpacing+55);
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`Invoice_${dateStr}.pdf`);
  }

  return (
    <>
    
      <div className="home">

        <div className="tableDisplay">
         {
          numberOfTransaction==0?<>
            <DialogTitle>PREVIOUS TRANSACTONS MADE</DialogTitle>
          </>:
          <DialogTitle>PREVIOUS {numberOfTransaction} TRANSACTONS MADE</DialogTitle>
         } 
          <Box component="div" sx={{ display: "inline" }}>
            <Box>
              <div className="datecontent">
                <Stack component="form" noValidate spacing={3}>
                  <ButtonGroup variant="text" aria-label="text button group">
                    {/* <Button onClick={generatePdf}>Generate PDF</Button> */}
                    <Button>
                      {data?.length && (
                        <CSVLink
                          headers={headers}
                          data={data}
                          filename="results.csv"
                          target="_blank"
                        >
                          {/* Generate Csv */}
                        </CSVLink>
                      )}
                    </Button>
                  </ButtonGroup>
                </Stack>
                <Box sx={{ maxWidth: 400, position:"center", display:"flex"}}>
              <TextField
                fullWidth
                onChange={(e) => searchHandle(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SearchIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search ..."
                variant="outlined"
              />
   
        </Box>
              </div>
            </Box>
          </Box>
          
          <TableContainer component={Paper}>
            <Table aria-label="caption table">
              <caption className="textTitle">Agent Transactions</caption>
              {/* <Button
                  variant="contained"
                  sx={{ backgroundColor: "#F9842C" }}
                  className="buttonGroup"
                  onClick={generatePdfs}
                  >
                  Print
                  </Button> */}
              
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell>OPERATION DATE</TableCell>
                  <TableCell align="center">AMOUNT</TableCell>
                  <TableCell align="center">DESCRIPTION</TableCell>
                  <TableCell align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                search?(
                  <>
                  {results.slice(0, limit).map((details) => (
                  <TableRow
                    hover
                    key={details.id}
                    selected={selectedExamIds.indexOf(details.id) !== -1}
                  >
                    <TableCell align="center">{details.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {details.operationDate}
                    </TableCell>
                    <TableCell align="center"> {details.amount * -1}</TableCell>
                    <TableCell align="center">{details.description}</TableCell>
                    <TableCell align="center">
                      {/* <Button>Print</Button> */}
                      <Button
                  variant="contained"
                  sx={{ backgroundColor: "#F9842C" }}
                  className="buttonGroup"
                 onClick={async()=>{
                    generatePdfs(details.id)
                   }}
                  >
                  Print
                  </Button>
                    </TableCell>
                  </TableRow>
                ))}
                  </>
                ):(
                  <>
                  {agentTransactionsDetails.slice(0, limit).map((details) => (
                  <TableRow
                    hover
                    key={details.id}
                    selected={selectedExamIds.indexOf(details.id) !== -1}
                  >
                    <TableCell align="center">{details.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {details.operationDate}
                    </TableCell>
                    <TableCell align="center"> {details.amount * -1}</TableCell>
                    <TableCell align="center">{details.description}</TableCell>
                    <TableCell align="center">
                      {/* <Button>Print</Button> */}
                    <Button
                  variant="contained"
                  sx={{ backgroundColor: "#F9842C" }}
                  className="buttonGroup"
                  onClick={async()=>{
                    generatePdfs(details.id)
                   }}
                  >
                  Print
                  </Button>
                    </TableCell>
                  </TableRow>
                ))}
                  </>
                )}
                
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default CbhiList;
