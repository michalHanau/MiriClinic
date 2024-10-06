
const mongooseConnect = require('./db/mongoConnect');

const appointmentsRoute = require('./routes/appointmentsRoutes');
const customersRoute = require('./routes/customersRoutes');
const treatmentsRoute = require('./routes/treatmentsRoutes');
const authRoute = require('./routes/authRoutes');

const express = require('express');
const cors = require('cors');

const app = express();

const port = 3000;

app.use(express.json());

app.use(cors());

app.use('/api/appointments', appointmentsRoute);
app.use('/api/customers', customersRoute);
app.use('/api/treatments', treatmentsRoute);
app.use('/api/auth', authRoute);


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
