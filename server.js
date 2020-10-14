
const cors = require('cors');
const express = require('express');
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(express.static(__dirname + "/public"))

let history = require('./history.json') || [];

app.use(function (q, r) { 
    if (q.url === '/favicon.ico') {
      r.writeHead(200, {'Content-Type': 'image/x-icon'} );
      r.end();
      console.log('favicon requested');
      return;
    }
   })

app.use(express.json());
app.get('/', (req, res) => {
    res.send(
        fs.readFileSync("index.html", {encoding: 'utf-8'})
    )
    })
app.post('/history', (req, res) => {
    req.body.id = uuidv4();
    history.push(req.body)
    fs.writeFileSync("./history.json", JSON.stringify(history))
    res.send(history);
})
app.delete('/history', (req, res) => {
    history = [];
    fs.writeFileSync("./history.json",JSON.stringify(history));
    res.send(history);
})
app.delete('/history/:id', (req, res) => {
    let deleteId = req.params.id;
    let newArr = [];
   for(let item of history){
    if(item.id !== deleteId){
        newArr.push(item);
    }
   }
   history = newArr;
   fs.writeFileSync("./history.json", JSON.stringify(history))
   res.send(history);
})
app.put("/history/:id", async (req, res) => {
    const editId = req.params.id;
    let editMsg = req.body.message;
    for(let item of history){
        if(item.id === editId){
            item.message = editMsg;
        }
    }
    fs.writeFileSync("./history.json", JSON.stringify(history))
    res.send(history);
})

app.listen(8080)


