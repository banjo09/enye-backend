const express = require('express');
const request = require('request');
const app = express();

app.get('/api/rates', function (req, res) {

    const base = req.query.base
    const {currency} = req.query;

    const url = 'https://api.exchangeratesapi.io/latest?base=' + base 
    request({url: url, json: true}, (err, response, body) => {
      const currencies = currency.split(",");
        if (!err && response.statusCode === 200) {
            const base = body.base
            const date = body.date
            const rates = {}
            for (let cur of currencies){
                rates[cur] = body.rates[cur];
            }
            let output = {
                "results": {
                    base,
                    date,
                    rates
                } 
            }
            res.status(200).json(output)
        }
        else {
            res.status(400).json(err)
        }
    })
});

const PORT = process.env.PORT || 9000
app.listen(PORT);
console.log('enye server is running on : 127.0.0.1: ' + PORT)