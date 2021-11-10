const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const kfzRoutes = require('./routes/kfz');
const kennzeichenRoutes = require('./routes/kennzeichen');

const { notFound, errorHandler } = require('./middleware/errorHandler');

require('colors');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());

app.use(express.json());

app.use('/kfz', kfzRoutes);
app.use('/kennzeichen', kennzeichenRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT);
