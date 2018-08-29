/**
 * @author Gabriel Felipe, Ana Silva
 */


exports.listDatasets = () => {

    var pg = require("pg");

    var connectionURL = process.env.connectionURL || 'postgresql://postgres:simsab@localhost:5432/simsab_dataset';

    var client = new pg.Client(connectionURL);

    client.connect();

    client.query(`SELECT ds.name, ds.created_date, 
        ds.updated_date, ds.description, SUM(d.size) as size 
        FROM dataset as ds JOIN data as d ON d.dataset_id = ds.id
        GROUP BY ds.id;`, (err, res) => {
            
            var ret = res.rows;
            client.end;
            return ret;
        });
}