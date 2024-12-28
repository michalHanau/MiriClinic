const mongooseConnect = require('./db/mongoConnect');

const appointmentsRoute = require('./routes/appointmentsRoutes');
const customersRoute = require('./routes/customersRoutes');
const treatmentsRoute = require('./routes/treatmentsRoutes');
const loginRoute = require('./routes/loginRoutes');
const authRoutes = require('./routes/authRoutes'); 


const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

// app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://miriclinic-server.onrender.com', // הכתובת של השרת שלך
//       changeOrigin: true,
//     })
//   );

  app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/app/index.html'));
  })
  
app.use('/api/appointments', appointmentsRoute);
app.use('/api/customers', customersRoute);
app.use('/api/treatments', treatmentsRoute);
app.use('/api/login', loginRoute);
app.use('/api/auth', authRoutes);


(async function() {
    try {
        await mongooseConnect();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('An error in app, please try later.')
})

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
})
