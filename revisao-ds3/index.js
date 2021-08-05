const express = require('express');
const routerMath = require('./routes/math');
const routerAuth = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/math', routerMath);
app.use('/auth', routerAuth);

app.listen(3000, () => {
    console.log('Running in port 3000...')
})