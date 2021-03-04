module.exports.connection=function()
{
    let mysql=require("mysql");
    let con=mysql.createConnection({


        host:"localhost",
        user:"root",
        password:"1234",
        database:"banking"

    });

return con;
}