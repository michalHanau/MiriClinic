import React, { useState } from 'react';
import './App.css';
import Calender from './components/Calender/Calendar';
import ChoiceTreatment from './components/ChoiceTreatment/ChoiceTreatment';
//import Auth from './components/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { UserProvider } from './hooks/UserProvider';
//import AvailableAppointments from './components/AvailableAppointments/AvailableAppointments';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [username, setUsername] = useState<string>(''); // שם המשתמש אם מחוברים

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  //   setUsername('מיכל'); // שם משתמש לדוגמה
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUsername('');
  // };

  return (
    <UserProvider>
    <Router>
      {/* סרגל הכלים יישאר קבוע */}
      <Navbar/>
      
      {/* תוכן הדפים יוחלף */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Auth" element={ <Auth/>} /> */}
        <Route path="/ChoiceTreatment" element={ <ChoiceTreatment/>} />
        <Route path="/Calender/:treatmentId" element={ <Calender/>} />
        {/* <Route path="/AvailableAppointments/:treatmentId" element={ <AvailableAppointments/>} /> */}
        {/* ניתן להוסיף עוד דפים עם Route */}
      </Routes>
    </Router>
    </UserProvider>

    // <div className="App">
    //   <header className="App-header">
    //       {/* <Calender/> */}
    //       {/* <ChoiceTreatment/> */}
    //       <Auth/>
    //   </header>
    // </div>
  );
}

export default App;
