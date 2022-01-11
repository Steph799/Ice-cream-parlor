const mongoose = require('mongoose');
const express = require('express');
const app = express();

const shipments = require('./routes/shipments');
const employees = require('./routes/employees');
const messages = require('./routes/messages');
const comments = require('./routes/comments');
const auth = require('./routes/auth');

const cors = require('cors');

require('dotenv').config();


mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.log(`Could not connect to MongoDB...`));

// ROUTES CONFIGS
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/shipments', shipments);
app.use('/api/employees', employees);
app.use('/api/messages', messages);
app.use('/api/comments', comments);
app.use('/api/auth', auth);


// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`))