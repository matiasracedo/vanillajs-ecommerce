const express = require('express');
require('dotenv').config();
const routes = require('./src/routes/index');
const app = express();

app.use('/', routes);
// Error catching endware.
app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`App listening on port ${port}...`))