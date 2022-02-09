const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
    setTimeout(() => {

    }, 10000)

    res.send({ name: 'Manatsa Chinyeruse', token: '2342f2f1d131rf12', level: 'teacher' });
});

app.listen(8000, () => console.log('API is running on http://localhost:8000/login'));