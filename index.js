const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my_db'
})

connection.connect()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/getUes', (req, res) => {
    connection.query('SELECT * FROM User', (err, rows, fields) => {
        if (err) throw err

        res.send(rows)
    })
})

app.post('/register', (req, res) => {
    const { email, pass } = req.body
    const query = "INSERT INTO User (email,password) VALUES (?,?)"
    const params = [email, pass]
    connection.query(query, params, (err, result, fields) => {
        if (err) throw err
        
        res.send("Insert Successfully")
    })
})

app.put('/updateUser', (req, res) => {
    const { id, email, pass } = req.body
    const query = "UPDATE  User SET email = ?,password = ? WHERE ID = ? "
    const params = [email, pass, id]
    connection.query(query, params, (err, result, fields) => {
        if (err) throw err

        res.send("UPDETE Successfully")
    })
})

app.delete('/deleteUse', (req, res) => {
    const { id } = req.body
    const query = "DELETE  FROM User WHERE ID = ?"
    const params = [id]
    connection.query(query, params, (err, result, fields) => {
        if (err) throw err

        res.send("Delete Successfully")
    })
})




app.listen(3000)