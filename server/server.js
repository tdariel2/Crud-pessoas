var express = require ("express")
var parser = require ("body-parser")

var dados = require ("./routes/dados")
var cors = require ("cors")

var port = 3000
var app = express ()
app.use(cors ())
app.use(parser.json ())
app.use(parser.urlencoded({extended:false}))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    //res.header('Access-Control-Allow-Credentials', true)
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use("/api", dados)

app.listen(port, function () {
    console.log('server started on port' + port)
})

