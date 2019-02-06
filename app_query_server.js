console.log("Hello world, This is an app to connect to sql server.");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const sql = require('mssql');

const connStr = "Server=localhost;Database=meifacil;User Id=XXX;Password=XXXXXXX;";

sql.connect(connStr)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/query') {
        res.write('Connecting...');

        new sql.Request().query('select holiday_date as date, description as description from holidays order by holiday_date', (err, result) => {
            console.dir(result);                  
        });

        sql.on('error', err => {
            // ... error handler
            console.log("Sql database connection error ", err);
        });        
    } else {
        res.write('Hi!');
    }
    res.end('\nThat\'s all folks!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});