const express = require("express");
const mongoose = require("mongoose");
const customerRoute = express.Router();

require("../models/customer");
const customerSchema = mongoose.model("customer");

const DB_URL = 'mongodb+srv://mohammedElmorsy:GAkDhy4ab6chLrNF@cluster0.abrtp.mongodb.net/dalia?retryWrites=true&w=majority';

customerRoute.get('/', (req, res) => {
    mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB Connected");

        customerSchema.find({})
                        .then((customers) => {
                            res.send(customers);
                            mongoose.disconnect();
                        })
                        .catch((err) => console.log(err));
    })
    .catch((err) => {
        console.log('error while connecting to db', err);
    });
});

customerRoute.post('/add', (req, res) => {
    mongoose.connect(DB_URL)
        .then(() => {
            console.log("DB Connected");

            let customer = new customerSchema({
                email: req.body.email,
                timestamp: Date.now()
            });
            
            customer.save()
                .then(() => {
                    res.end();
                    mongoose.disconnect();
                })
                .catch((err) => {
                    console.log('error adding customer');
                    mongoose.disconnect();
                })
        })
        .catch((err) => {
            console.log('error while connecting to db', err);
        });
});


module.exports = customerRoute;