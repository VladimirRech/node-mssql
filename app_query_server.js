console.log("Hello world, This is an app to connect to sql server.");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

var sql = require('mssql');

var config = {
    "user": "sa", //default is sa
    "password": "***",
    "server": "localhost", // for local machine
    "database": "meifacil", // name of database
    "timeout": 10000, 
    "options": {
        "encrypt": true
    }
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/query') {
        res.write('Connecting...');

        sql.connect(config, err => {            
            if (err) {
                throw err;
            }
            new sql.Request().query('select holiday_date as date, description as description from holidays order by holiday_date', (err, result) => {
                res.write("Connection Successful !");
                console.dir(result);                  
            })
        });
    
        sql.close();
    
        sql.on('error', err => {
            // ... error handler
            console.log("Sql database connection error ", err);
        });        
    } else {
        res.write('Hi!');
        res.end('\nThat\'s all folks!\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});