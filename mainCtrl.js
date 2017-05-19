var app = require('./index.js');
var db = app.get('db');

module.exports = {

    getAllPeople: function(req, res, next){
        db.getAllPeople(function(err, people){
            return res.status(200).send(people);
        })
    },

    getPersonByid: function(req, res, next){
        let id = req.params.id;

        db.getPersonById([id], function(err, person){
            return res.status(200).send(person);
        })
    },

    getUniqueShoeTypes: function(req, res, next){
        db.getUniqueShoeTypes(function(err, shoes){
            return res.status(200).send(shoes);
        })
    },

    getPersonsShoesById: function(req, res, next){
        let id = req.params.id;

        db.getPersonsShoesById([id], function(err, shoes){
            let count = shoes.length;
            return res.status(200).json({"count": count});
        })
    },

    updatePersonById: function(req, res, next){
        let id = req.params.id;
        let name = req.body.name;
        let age = req.body.age;

        db.updatePersonById([id, name, age], function(err, person){
            return res.status(200).send('person has been updated');
        })
    },

    changeShoesOwner: function(req, res, next){
        let shoesid = req.params.shoesid;
        let newOwnerId = req.params.ownerid;

        db.changeShoesOwner([shoesid, newOwnerId], function(err, shoes){
            
            return res.status(200).json('owner has been updated');
        })
    },

    createPerson: function(req, res, next){
        let id = Number(req.body.id);
        let name = req.body.name;
        let age = req.body.age;

        db.createPerson([id, name, age], function(err, result){
            return res.status(200).send('person has been created');
        })
    },

    deletePersonById: function(req, res, next){
        let id = req.params.id;
        console.log(id);

        db.deletePersonById([id], function(err, result){
            return res.status(200).send('person has been deleted');
        })
    },

}