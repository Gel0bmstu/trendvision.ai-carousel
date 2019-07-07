const express = require('express');
const app = express();
const handlers = require('./server/handlers.js')

app.use(express.static('./'));

app.get('/api/apply',  (req, res) => {
    console.log(req.body);
    handlers.applyGet(res);    
});

app.post('/api/apply',  (req, res) => {
    console.log(req.body);
    handlers.apply(res);
});

app.get('/api/stats',  (req, res) => {
    res.send(JSON.stringify(`[
        {
          "count": 1, 
          "username": "val"
        }, 
        {
          "count": 189, 
          "username": ""
        }, 
        {
          "count": 37, 
          "username": "evv"
        }, 
        {
          "count": 3005, 
          "username": "share1"
        }, 
        {
          "count": 2489, 
          "username": "share8"
        }, 
        {
          "total": 5721
        }
      ]`));
});
  
app.listen(3000,  () => {
    console.log('Example app listening on port 3000!');
});