const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const fileUpload = require('express-fileupload')
const mysql = require('mysql');
var uuid = require('uuid');

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'password',
   database: 'NBAPlayerDatabase'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

app.use(express.static("./public"))

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

// ROUTES

app.get('/player/:id', (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM nba_players WHERE id = ?"
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})


app.post('/insert', (req, res) => {
    const { firstName, lastName, age, height, position, filePath} = req.body
 
    const sql = "INSERT INTO nba_players (first_name, last_name, age, height, position, img) VALUES (?,?,?,?,?,?)"
   db.query(sql, [firstName, lastName, age, height, position, filePath], (err, result) => {
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
            console.log(err)()
        } else {
           return res.send(result)
        }
    })
})


app.post('/uploadImage', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'})
    } 

    const file = req.files.file;



    file.mv(`${__dirname}/public/images/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/images/${file.name}`});
    })


        // var file = req.files.image
        // if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
        //     var imageName = file.name
        //     console.log(imageName)
        //     var uuidname = uuid.v1();

        //     var imgsrc = 'http://127.0.0.1:3001/images/' + uuidname + file.name
        //     var sql = "INSERT INTO nba_players(img)VALUES(?)"
        //     db.query(sql, [imgsrc], (err, result) => {
        //         if (err) throw err
        //              file.mv('public/images/' + uuidname + file.name)
        //             res.send("Data successfully save")
        //     })
        // }
    

})

app.listen(3001, () => {
    console.log('Server is up on port 3001');
});