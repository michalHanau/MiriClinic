// import React, { useState } from 'react';
// import { TextField, Button, Typography, Container, Paper, Grid, } from '@mui/material';
// import { Customers } from '../../models/customers.model';
// import AuthService from '../../services/login.service';
// import './Auth.scss'; 
// import { useUser } from '../../hooks/UserProvider'

// const Auth = () => {
//     const { setUserName } = useUser();

//     const [isLogin, setIsLogin] = useState(true);
//     const [formData, setFormData] = useState<Customers>(new Customers('', '', '', '', '', '', new Date()));

//     const handleChange = (event: any) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleRegister = async (event: any) => {
//         event.preventDefault();
//         const { password, confirmPassword } = formData;
//         if (password !== confirmPassword) {
//             alert("סיסמאות אינן תואמות");
//             return;
//         }
//         try {
//             const response = await AuthService.registerUser(formData);
//             if (!response.success) {
//                 alert("למה הוא נכנס לפה?");
//                 alert(response.message);
//                 return; 
//             }
//             const token = response.token;
//             console.log(token);
//             localStorage.setItem('token', token);    
//             alert("הרשמה הצליחה!");
//         } catch (error) {
//             console.error('Error during registration:', error);
//             alert("אירעה שגיאה בהרשמה");
//         }
//     };

//     const handleLogin = async (event: any) => {
//         event.preventDefault();
//         try {
//             const response = await AuthService.loginUser(formData);
//             if (!response.success) {
//                 alert(response.message);
//                 return;
//             }
//             const token = response.token;
//             console.log(token)
//             localStorage.setItem('token', token);
//             if (response.success) {
//                 setUserName(response.user.first_name);
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//             alert("אירעה שגיאה בהתחברות");
//         }
//     };

//     return (
//         <Container component="main" maxWidth="xs" className="auth-container">
//             <Paper elevation={3} className="auth-paper">
//                 <Typography component="h1" variant="h5" align="center">
//                     {isLogin ? 'התחברות' : 'הרשמה'}
//                 </Typography>
//                 <form onSubmit={isLogin ? handleLogin : handleRegister}>
//                     <Grid container spacing={2}>
//                         {!isLogin && (
//                             <>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         fullWidth
//                                         name="first_name"
//                                         label="שם פרטי"
//                                         value={formData.first_name}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         fullWidth
//                                         name="last_name"
//                                         label="שם משפחה"
//                                         value={formData.last_name}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         fullWidth
//                                         name="phone"
//                                         label="מספר טלפון"
//                                         value={formData.phone}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         fullWidth
//                                         type="email"
//                                         name="email"
//                                         label="מייל"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         fullWidth
//                                         type="date"
//                                         name="birthdate"
//                                         value={formData.birthdate}
//                                         onChange={handleChange}
//                                         required
//                                         InputLabelProps={{ shrink: true }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         fullWidth
//                                         type="password"
//                                         name="password"
//                                         label="סיסמא"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         fullWidth
//                                         type="password"
//                                         name="confirmPassword"
//                                         label="אימות סיסמא"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Grid>
//                             </>
//                         )}
//                         {isLogin && (
//                             <>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         fullWidth
//                                         type="email"
//                                         name="email"
//                                         label="מייל"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         fullWidth
//                                         type="password"
//                                         name="password"
//                                         label="סיסמא"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Grid>
//                             </>
//                         )}
//                         <Grid item xs={12}>
//                             <Button type="submit" variant="contained" color="primary" fullWidth>
//                                 {isLogin ? 'התחברות' : 'הרשמה'}
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//                 <Button onClick={() => setIsLogin(!isLogin)} color="secondary" fullWidth>
//                     {!isLogin ? 'כבר יש לך חשבון?' : 'עוד לא פתחת חשבון?'}
//                 </Button>
//             </Paper>
//         </Container>
//     );
// };

// export default Auth;


import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Customers } from '../../models/customers.model';
import AuthService from '../../services/login.service';
import { useUser } from '../../hooks/UserProvider';

interface AuthProps {
    open: boolean;
    onClose: () => void;
}

const Auth = (props: AuthProps) => {
    const { setUserName } = useUser();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<Customers>(new Customers('', '', '', '', '', '', new Date()));
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        console.log(Object.values(formData))
        const isValid = isLogin
            ? formData.email && formData.password
            : Object.values(formData).every(value => value);
        setIsButtonDisabled(!isValid);
    }, [formData, isLogin]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            alert('סיסמאות אינן תואמות');
            return;
        }
        try {
            const response = await AuthService.registerUser(formData);
            if (!response.success) {
                alert(response.message);
                return;
            }
            localStorage.setItem('token', response.token);
            alert('הרשמה הצליחה!');
            props.onClose();
        } catch (error) {
            console.error('Error during registration:', error);
            alert('אירעה שגיאה בהרשמה');
        }
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await AuthService.loginUser(formData);
            if (!response.success) {
                alert(response.message);
                return;
            }
            localStorage.setItem('token', response.token);
            setUserName(response.user.first_name);
            props.onClose();
        } catch (error) {
            console.error('Error during login:', error);
            alert('אירעה שגיאה בהתחברות');
        }
    };

    return (
        <Dialog 
            open={props.open} 
            onClose={props.onClose} 
            maxWidth={isLogin ? 'xs' : 'md'}
            fullWidth
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton
                    aria-label="close"
                    onClick={props.onClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" component="span" sx={{ textAlign: 'center' }}>
                    {isLogin ? 'התחברות' : 'הרשמה'}
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ padding: 2 }}>
                    <form onSubmit={isLogin ? handleLogin : handleRegister}>
                        <Grid container spacing={2}>
                            {!isLogin && (
                                <>
                                    <Grid item xs={12} sm={6} dir="rtl">
                                        <TextField
                                            name="first_name"
                                            label="שם פרטי"
                                            fullWidth
                                            required
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="last_name"
                                            label="שם משפחה"
                                            fullWidth
                                            required
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="phone"
                                            label="מספר טלפון"
                                            fullWidth
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="email"
                                            name="email"
                                            label="מייל"
                                            fullWidth
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="date"
                                            name="birthdate"
                                            label="תאריך לידה"
                                            fullWidth
                                            required
                                            value={formData.birthdate}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="password"
                                            name="password"
                                            label="סיסמא"
                                            fullWidth
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="password"
                                            name="confirmPassword"
                                            label="אימות סיסמא"
                                            fullWidth
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                            )}
                            {isLogin && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            type="email"
                                            name="email"
                                            label="מייל"
                                            fullWidth
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            type="password"
                                            name="password"
                                            label="סיסמא"
                                            fullWidth
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>

                        <Button
                            variant="outlined"
                            type="submit"
                            fullWidth
                            sx={{
                                marginTop: 2,
                                fontSize: '1.2rem',
                                padding: '10px',
                                borderColor: 'rgb(248, 146, 163)',
                                color: 'rgb(248, 146, 163)',
                            }}
                            disabled={isButtonDisabled}
                        >
                            {isLogin ? 'התחברות' : 'הרשמה'}
                        </Button>
                    </form>
                </Box>
            </DialogContent>

            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Button onClick={() => setIsLogin(!isLogin)} sx={{color: 'rgb(248, 146, 163)'}}>
                    {!isLogin ? 'כבר יש לך חשבון?' : 'עוד לא פתחת חשבון?'}
                </Button>
            </Box>
        </Dialog>
    );
};

export default Auth;

