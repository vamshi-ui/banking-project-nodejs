let con=require("../../MysqlDBConnection/DbConnection")


function getMaxIdCode()
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
  
  let query=`select max(accno) from user`;
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  
    //console.log("userId:"+result[0]['max(accno)']); 
  
    if(result.length>0)
    {
    resolve(result[0]['max(accno)']);
    }
    else
    {
      resolve("Users Not Found"); 
    }
  }
  
  });
  
  }
  
  });




})



}



module.exports.getMaxUserId= async function()
{

let maxId=await getMaxIdCode();
return maxId;


}
