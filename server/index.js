const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'password',
   database: 'NBAPlayerDatabase'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/get', (req, res) => {

    const sql = "SELECT * FROM nba_players"
   db.query(sql, (err, result) => {

    if (err){
        console.log(err)
    } else {
        res.send(result)
    }
   
   });
});


app.post('/insert', (req, res) => {
    const { firstName, lastName, age, height, position } = req.body
 
    const sql = "INSERT INTO nba_players (first_name, last_name, age, height, position) VALUES (?,?,?,?,?)"
   db.query(sql, [firstName, lastName, age, height, position], (err, result) => {
       if (err){
           console.log(err)
       } else {
        res.send('player added sucessfully')
       }
   
   });
});

app.put('/update', () => {
    const id = req.body.id
    const sql = "UPDATE SET nba_players"
    db.query()
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM nba_players WHERE id = ?"
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001');
});