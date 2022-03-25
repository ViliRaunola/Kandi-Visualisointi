const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(port) 