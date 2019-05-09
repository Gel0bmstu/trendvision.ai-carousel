const express = require('express');
const app = express();
const router = express.Router();
const handlers = require('./server/handlers.js')

app.use(express.static('static'));

router.get('/',  (req, res) => {
    res.send('salaaam');
});

router.post('/api/apply',  (req, res) => {
    handlers.apply(res);
});
  
app.listen(3000,  () => {
    console.log('Example app listening on port 3000!');
});