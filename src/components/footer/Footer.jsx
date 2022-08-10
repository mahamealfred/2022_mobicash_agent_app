import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
//import {Link} from "react-router-dom";
import "./footer.css"
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" className="link-n" href="https://www.mobicashonline.com/">
      www.mobicashonline.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// interface FooterProps {
//   description: string;
//   title: string;
// }

export default function Footer(props) {
  const { description, title } = props;

  return (
    <div className="main-footer">
 <Box component="footer" sx={{ bgcolor: '#ffff', py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{fontSize:"20px", fontWeight:"bold"}} align="center" gutterBottom>
          Mobicash
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Make payment anytime, anywhere.
        </Typography>
        <Copyright />
      </Container>
    </Box>
    </div>
   
  );
}