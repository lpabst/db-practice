const express = require('express')
, bodyParser = require('body-parser')
, session = require('express-session')
, massive = require('massive')
, config = require('./config.js')

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: false
}))

var massiveInstance = massive.connectSync({
    connectionString: 'postgres://zhtbbfpfdilwgq:c5605d5ccdb1b8a1dfacd53c3b1df190b37769d11144da7b15e6a30f67ddcaba@ec2-54-227-237-223.compute-1.amazonaws.com:5432/d49jk4vt7vsbft?ssl=true'
});

app.set('db', massiveInstance);
var db = app.get('db');


const mainCtrl = require('./mainCtrl.js');

app.get('/api/people', mainCtrl.getAllPeople);
app.get('/api/people/:id', mainCtrl.getPersonByid);
app.get('/api/shoetypes', mainCtrl.getUniqueShoeTypes);
app.get('/api/shoes/:id', mainCtrl.getPersonsShoesById)

app.put('/api/people/:id', mainCtrl.updatePersonById);
app.put('/api/shoes/:shoesid/changeOwner/:ownerid', mainCtrl.changeShoesOwner);

app.post('/api/people', mainCtrl.createPerson);

app.delete('/api/people/:id', mainCtrl.deletePersonById);




app.listen(3000, console.log('3000 yo'));