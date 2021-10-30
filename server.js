const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cutomerRoute = require("./routes/customer");

const app = express();

// connect to mongo db
/* mongoose.connect("mongodb://localhost:27017/dalia",{ useNewUrlParser: true,useUnifiedTopology: true  })
        .then(()=>{ console.log("DB Connected"); })
        .catch((error)=>{ console.log(error+""); }) */

// middleware to enable CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use((req, res, next)=>{
    console.log(req.url, req.method);
    next();
});

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.get('/',(req, res)=>{
    res.send('welcome in home page');
});

app.use('/customer', cutomerRoute);

// error MW
app.use((err, req, res, next)=>{
    console.log('error', err);
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
