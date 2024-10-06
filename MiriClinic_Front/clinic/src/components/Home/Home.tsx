import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import './Home.scss'
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/UserProvider';

const HomePage = () => {
    const { userName, setUserName } = useUser();
    return (
        <div className="home-page">
          <h1>ברוכה הבאה לקליניקה שלי</h1>          
          <li className="appointment-button"><Link to={userName? "/ChoiceTreatment" : "/Auth"}>קביעת תור</Link></li> 
        </div>
      );

};

export default HomePage;
