if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const chalk = require('chalk');
const path = require('path');

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongoose'));

const indexRouter = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);

app.listen(PORT, () => console.log(`Listening on PORT ${chalk.green(PORT)}`));
