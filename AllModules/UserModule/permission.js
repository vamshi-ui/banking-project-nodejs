let con=require("../../MysqlDBConnection/DbConnection")

function getPermission(accno)
{

return new Promise(function(resolve,reject){



  let connection=con.connection();
  connection.connect(function(error){
  
  if(error)
  {
      console.log("Connection Not Created:"+error);
      reject("Connection Not Created");
  }
  else
  {
  
  let query=`update user set permission='true' where accno=${accno}`;
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  resolve("Permission Granted");
   
  }
  
  });
  
  }
  
  });




})



}

module.exports.getUserPermission= async function(accno)
{

let msg=await getPermission(accno);
return msg;


}