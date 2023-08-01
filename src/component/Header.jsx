import "./Header.css"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function Header() {

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent: 'center'}}>
          <Typography variant="h4">
            TRELLO
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;

