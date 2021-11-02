const express = require('express')
const app = express()
const port = 3000
const ecies = require('ecies-geth');


app.get('/secret', (req, res) => {
    const {id,  signature} = req.body;    
    const {v,r,s} = signature;

	// "signature": {
	// 	"v": 1, // bytes32
	// 	"r": 2, //  bytes32
	// 	"s": 1 //uint8
		
	// }
	

    // encrypt secret

    


    res.send({id, address}).status(200)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
