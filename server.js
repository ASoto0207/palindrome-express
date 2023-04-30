const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')




MongoClient.connect('mongodb+srv://angelsoto9597:tacoman@cluster2.vfpqr0h.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true, })
    .then(client => {
        console.log('connected to DataBase')
         db = client.db('palindromeBase')
        db.collection('names')
       
    })
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    console.log('public')
    app.use(bodyParser.json())

    app.listen(8888, function () {
        console.log('hello world!')
    })
    app.get('/', (req, res) => {
        db.collection('names').find().toArray()
            .then(result => {
                res.render('index.ejs', { names: result })
               
            })
           
            .catch(error => console.error(error))

    })
    

    app.post('/names', (req, res) => {
     let names = req.body.names
     console.log(req.body)
      let  palindrome = names === req.body.names.toLowerCase().split('').reverse().join('')    
               
                const objToJson = {
                    success: palindrome,
                    result: palindrome ? 'Your Name is a palindrome' : 'No! your name is not a palindrome'
                }
                
        
        db.collection('names').insertOne({name:req.body.names})
            .then(result => {
                res.end(JSON.stringify(objToJson))
                console.log(result)
            })
    })
    app.put('/names', (req, res) => {
        db.collection('names').findOneAndUpdate({ name: req.body.names},
            {

                $set: {
                    names: req.body.names
                    
                },
            },
            options
        )
            .then(result => {
                console.log(result)
            })
            .catch(error => console.error(error))
    })


    app.delete('/names', (req, res) => {
        console.log(req.body)
        db.collection('names').findOneAndDelete({names: req.body.names })
            .then(result => {
                if(result.deletedCount === 0){
                    return res.json('Please add a name')
                }
                res.json('See ya later!!')
            })
            .catch(error => console.error(error))
    })
       






