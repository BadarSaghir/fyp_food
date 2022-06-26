const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const connectDB = require('./config/db');
var cors = require('cors')

app.use(cors())
app.use(morgan('dev'));

// Init Middleware
app.use(express.json({ limit: '50mb', extended: false }));

connectDB();
app.use('/api/uploads', express.static('uploads'))

app.use('/api/user', require('./routes/User'));
app.use('/api/auth/user', require('./routes/auth/user'));
app.use('/api/menu', require('./routes/Menu'));
app.use('/api/edit', require('./routes/Menu'));
app.use('/api/menuresturent', require('./routes/ResturentMenu'));
app.use('/api/order', require('./routes/Order'));
app.use('/api/orderresturent', require('./routes/OrderResturent'));
app.use('/api/favorite', require('./routes/Favourite'));

if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('front-end/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { console.log('server started on port' + PORT) });


module.exports = server;