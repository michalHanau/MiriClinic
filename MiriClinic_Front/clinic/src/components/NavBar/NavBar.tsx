import React, { useEffect, useState } from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/UserProvider'

interface NavbarProps {
}

const Navbar = (props: NavbarProps) => {
    const { userName, setUserName } = useUser();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        setUserName(null); // להסיר את שם המשתמש מהקונטקסט
    };


    return (
        <nav className="navbar">

            {/* כפתור לתפריט */}
            <button className="menu" onClick={toggleMenu}></button>

            {/* לוגו */}
            <div className="logo">
                <Link to="/">Logo</Link> 
            </div>

            {/* קישורים */}
            <ul className={menuOpen ? 'menu-open' : 'list'}>
                <li><Link to="/about">About</Link></li> 
                <li><Link to="/appointments">Appointments</Link></li> 
            </ul>

            {/* התחברות / שם המשתמש / התנתקות */}
            <div className="auth">
                {userName ? (
                    <>
                        <span>שלום {userName}</span>
                        {/* <Link to="/my-appointments" className="personal-appointments">My Appointments</Link>  */}
                        <button className="logout-button" onClick={handleLogout}>התנתקות</button>
                    </>
                ) : (
                    <Link to="/Auth" className="login-button">התחברות / הרשמה</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
