const express = require('express');
const app = express();
const handlers = require('./server/handlers.js')

app.use(express.static('static'));

app.get('/api/apply',  (req, res) => {
    console.log(req.body);
    handlers.apply(res);    
});

app.post('/api/apply',  (req, res) => {
    handlers.apply(res);
});
  
app.listen(3000,  () => {
    console.log('Example app listening on port 3000!');
});