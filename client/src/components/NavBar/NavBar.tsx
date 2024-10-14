// import React, { useEffect, useState } from 'react';
// import './NavBar.scss';
// import { Link } from 'react-router-dom';
// import { useUser } from '../../hooks/UserProvider'

// interface NavbarProps {
// }

// const Navbar = (props: NavbarProps) => {
//     const { userName, setUserName } = useUser();

//     const [menuOpen, setMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setMenuOpen(prevState => !prevState);
//     };

//     const handleLogout = () => {
//         setUserName(null); // להסיר את שם המשתמש מהקונטקסט
//     };


//     return (
//         <nav className="navbar">

//             {/* כפתור לתפריט */}
//             <button className="menu" onClick={toggleMenu}></button>

//             {/* לוגו */}
//             <div className="logo">
//                 <Link to="/">Logo</Link> 
//             </div>

//             {/* קישורים */}
//             <ul className={menuOpen ? 'menu-open' : 'list'}>
//                 <li><Link to="/about">About</Link></li> 
//                 <li><Link to="/appointments">Appointments</Link></li> 
//             </ul>

//             {/* התחברות / שם המשתמש / התנתקות */}
//             <div className="auth">
//                 {userName ? (
//                     <>
//                         <span>שלום {userName}</span>
//                         {/* <Link to="/my-appointments" className="personal-appointments">My Appointments</Link>  */}
//                         <button className="logout-button" onClick={handleLogout}>התנתקות</button>
//                     </>
//                 ) : (
//                     <Link to="/Auth" className="login-button">התחברות / הרשמה</Link>
//                 )}
//             </div>
//         </nav>
//     );
// }

// export default Navbar;
// Navbar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Hidden, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/UserProvider';
import Auth from '../Auth/Auth';

interface NavbarProps {
}


const Navbar = (props: NavbarProps) => {
  const { userName, setUserName } = useUser();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const [open, setOpen] = useState(false); // מצב הפתיחה של הדיאלוג

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
    setUserName(null); // התנתקות והסרת שם המשתמש
    handleMenuClose();
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar עם צבע רקע שקוף */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(8px)',
          transition: '0.3s ease-out',
          zIndex: 1201
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px',  height: '70px' }}>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{ height: '70px', width: 'auto', objectFit: 'contain' }} 
              />
            </Link>
          </Typography>

          <Hidden smDown>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" component={Link} to="/about">About</Button>
              <Button color="inherit" component={Link} to={userName? "/ChoiceTreatment" : "/Auth"}>קביעת תור</Button>
              {userName && (
                <Button color="inherit" component={Link} to="/my-appointments">My Appointments</Button>
              )}
            </Box>
          </Hidden>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>

            {userName ? (
              <>
                <Typography sx={{ marginLeft: 2 }}>שלום, {userName}</Typography>
                <Button color="inherit" onClick={handleLogout}>התנתקות</Button>
              </>
            ) : (
              <><Button color="inherit" onClick={handleClick}>התחברות / הרשמה</Button>
              <Auth open={open} onClose={handleClick} /></>
            )}

            <Hidden smUp>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        sx={{ mt: 6 }}
      >
        <MenuItem component={Link} to="/about" onClick={handleMenuClose}>About</MenuItem>
        <MenuItem component={Link} to="/appointments" onClick={handleMenuClose}>Appointments</MenuItem>
        {userName && (
          <MenuItem component={Link} to="/my-appointments" onClick={handleMenuClose}>My Appointments</MenuItem>
        )}
        {userName && <MenuItem onClick={handleLogout}>התנתקות</MenuItem>}
      </Menu>


    </Box>
  );
};

export default Navbar;
