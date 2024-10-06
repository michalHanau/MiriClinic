import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Grid, } from '@mui/material';
import { Customers } from '../../models/customers.model';
import AuthService from '../../services/auth.service';
import './Auth.scss'; 
import { useUser } from '../../hooks/UserProvider'

const Auth = () => {
    const { setUserName } = useUser();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<Customers>(new Customers('', '', '', '', '', '', new Date()));

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (event: any) => {
        event.preventDefault();
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            alert("סיסמאות אינן תואמות");
            return;
        }
        try {
            const response = await AuthService.registerUser(formData);
            if (!response.success) {
                alert("למה הוא נכנס לפה?");
                alert(response.message);
                return; 
            }
            const token = response.token;
            console.log(token);
            localStorage.setItem('token', token);    
            alert("הרשמה הצליחה!");
        } catch (error) {
            console.error('Error during registration:', error);
            alert("אירעה שגיאה בהרשמה");
        }
    };

    const handleLogin = async (event: any) => {
        event.preventDefault();
        try {
            const response = await AuthService.loginUser(formData);
            if (!response.success) {
                alert(response.message);
                return;
            }
            const token = response.token;
            console.log(token)
            localStorage.setItem('token', token);
            if (response.success) {
                setUserName(response.user.first_name);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert("אירעה שגיאה בהתחברות");
        }
    };

    return (
        <Container component="main" maxWidth="xs" className="auth-container">
            <Paper elevation={3} className="auth-paper">
                <Typography component="h1" variant="h5" align="center">
                    {isLogin ? 'התחברות' : 'הרשמה'}
                </Typography>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    <Grid container spacing={2}>
                        {!isLogin && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="first_name"
                                        label="שם פרטי"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="last_name"
                                        label="שם משפחה"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="phone"
                                        label="מספר טלפון"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="email"
                                        name="email"
                                        label="מייל"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="date"
                                        name="birthdate"
                                        value={formData.birthdate}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        name="password"
                                        label="סיסמא"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        name="confirmPassword"
                                        label="אימות סיסמא"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                            </>
                        )}
                        {isLogin && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="email"
                                        name="email"
                                        label="מייל"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        name="password"
                                        label="סיסמא"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {isLogin ? 'התחברות' : 'הרשמה'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Button onClick={() => setIsLogin(!isLogin)} color="secondary" fullWidth>
                    {!isLogin ? 'כבר יש לך חשבון?' : 'עוד לא פתחת חשבון?'}
                </Button>
            </Paper>
        </Container>
    );
};

export default Auth;
