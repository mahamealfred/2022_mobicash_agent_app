import React, { useState, useEffect } from "react";
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
import IMAGES from "../../../../Assets/Images";
import { useSelector } from "react-redux";
import moment from "moment";
import { ButtonGroup, Stack } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

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
  const [agentTransactionsDetails, setAgentTransactionDetails] = useState([]);
  const [limit, setLimit] = useState(5);
  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [results, setResults] = useState({});
  const [search, setSearch] = useState(false);
  const [numberOfTransaction,setNumberOfTransaction]=useState(0)
 
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
  console.log("search result:",results);
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
    doc.addImage(IMAGES.logo, "JPEG", 20, 10, 50, 20);
    doc.setFont("Helvertica", "normal");
    doc.text("Mobicash Ltd", 20, 50);
    doc.text("Company Name: Mobicash", 20, 55);
    doc.text("Email: mobicash@reb.rw", 20, 60);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 65);
    doc.setFont("Helvertica", "bold");
    doc.text("List of Approved Transfer Report", 70, 75);
    const tableColumn = [
      "Collection Date",
      "Service",
      "Amount",
      "Bank Referance",
      "Mobicash Referance",
    ];
    const tableRows = [];
    data.map((d) => {
      const Data = [
        d.collectionDate,
        d.service,
        d.amount,
        d.bank_reference,
        d.mobicash_reference,

        // format(new Date(student.updated_at), "yyyy-MM-dd")
      ];
      tableRows.push(Data);
    });
    doc.autoTable(tableColumn, tableRows, {
      startY: 80,
      theme: "striped",
      margin: 10,
      styles: {
        font: "courier",
        fontSize: 12,
        overflow: "linebreak",
        cellPadding: 3,
        halign: "center",
      },
      head: [tableColumn],
      body: [tableRows],
    });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };

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
                      <Button>Print</Button>
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
                      <Button>Print</Button>
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
