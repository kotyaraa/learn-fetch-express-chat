const express = require('express');
const app = express();
express.json()
const fs = require('fs');
const port = 3000

// app.use(function (q, r) { 
//     if (q.url === '/favicon.ico') {
//       r.writeHead(200, {'Content-Type': 'image/x-icon'} );
//       r.end();
//       console.log('favicon requested');
//       return;
//     }
//    })
app.use(express.json());

let history = require("./history.json") || [];

app.get('/', (req, res) => {
  res.send(
      fs.readFileSync('index.html',{encoding: 'utf-8'})
  )
})
app.post('/history', (req, res) => {
    
    history.push(req.body)
    fs.writeFileSync("./history.json", JSON.stringify(history))
    res.send(history);
})
app.put("/history/:id", async (req, res) => {
    
    let editMsg = req.body.message;
    
    fs.writeFileSync("./history.json", JSON.stringify(history))
    res.send(history);
})


app.listen(port)