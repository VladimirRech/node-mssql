console.log("Hello world, This is an app to connect to sql server.");
var sql = require('mssql');

var config = {
    "user": "sa", //default is sa
    "password": "??????",
    "server": "localhost", // for local machine
    "database": "meifacil", // name of database
    "options": {
        "encrypt": true
    }
}

sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful !");
    new sql.Request().query('select holiday_date as date, description as description from holidays order by holiday_date', (err, result) => {
        //handle err
        console.dir(result)
        // This example uses callbacks strategy for getting results.
    })
});

sql.on('error', err => {
    // ... error handler
    console.log("Sql database connection error ", err);
})