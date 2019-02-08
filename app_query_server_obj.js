console.log("Hello world, This is an app to connect to sql server.");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

var sql = require('mssql');
var connStr = "Server=localhost;Database=meifacil;User Id=????;Password=??????????;";

sql.connect(connStr)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));


 // TODO: problema com a conexão
 // Não retorna nenhum valor emresult porque não está conectando.   
function wrk(req, res) {
    new sql.Request().query('select holiday_date as date, description as description from holidays order by holiday_date', (err, result) => {
        console.dir(result);
        console.log(result.rowsAffected);
        return result;
    });

    sql.on('error', err => {
        // ... error handler
        console.log("Sql database connection error ", err);
        return new sql.Request().parameters.result;
    });    
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/query') {
        res.write('Connecting...');
        wrk(req, res)
            .then((result) => {
                var i;
                var length = result.recordset.length;
            
                for (i = 0; i < length; i++)
                    res.write(result.recordset[i].date + ' ' + result.recordset[i].description + '<br />');
            
                console.log("Done.");
            })
            .catch(() => console.log('Ops!')) ;
    } else {
        res.write('Hi!');
    }
    res.end('\nThat\'s all folks!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

