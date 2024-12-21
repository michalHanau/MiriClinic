import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Hidden, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/UserProvider';
import Login from '../Login/Login';
import './NavBar.scss';

interface NavbarProps { }

const Navbar = (props: NavbarProps) => {
  const { userName, setUserName } = useUser();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    setUserName(null);
    handleMenuClose();
  };

  return (
    <Box className="navbar">
      <AppBar position="fixed" className="app-bar">
        <Toolbar className="toolbar">
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src="/images/logo.png" alt="Logo" className="logo" />
            </Link>
          </Typography>

          <Hidden smDown>
            <Box className="menu-items">
              <Button color="inherit" component={Link} to="/about">אודות</Button>
              <Button color="inherit" component={Link} to="/ChoiceTreatment">קביעת תור</Button>
              {/* <Button color="inherit" component={Link} to={userName ? "/ChoiceTreatment" : "/Auth"}>קביעת תור</Button> */}

              {userName && (
                <Button color="inherit" component={Link} to="/my-appointments">התורים שלי</Button>
              )}
              <Button color="inherit" component={Link} to="/my-appointments">יצירת קשר</Button>
            </Box>
          </Hidden>

          <Box className="user-section">
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>

            {userName ? (
              <>
                <Typography className="user-greeting">שלום, {userName}</Typography>
                <Hidden smDown>
                  <Button color="inherit" onClick={handleLogout}>התנתקות</Button>
                </Hidden>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={handleClick}>התחברות / הרשמה</Button>
                <Login open={open} onClose={handleClick} />
              </>
            )}

            <Hidden smUp>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose} sx={{ mt: 6 }}>
        <MenuItem component={Link} to="/about" onClick={handleMenuClose}>אודות</MenuItem>
        <MenuItem component={Link} to={userName ? "/ChoiceTreatment" : "/Auth"} onClick={handleMenuClose}>קביעת תור</MenuItem>
        {userName && <MenuItem component={Link} to="/my-appointments" onClick={handleMenuClose}>התורים שלי</MenuItem>}
        <MenuItem component={Link} to="/my-appointments" onClick={handleMenuClose}>יצירת קשר</MenuItem>
        {userName && <MenuItem onClick={handleLogout}>התנתקות</MenuItem>}
      </Menu>
    </Box>
  );
};

export default Navbar;
