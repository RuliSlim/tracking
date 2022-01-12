
require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/error');
const router = require('./routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || '3000';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => { console.log('running on port ' + PORT);});
