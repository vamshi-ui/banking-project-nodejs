let con=require("../../MysqlDBConnection/DbConnection")


function checkPermissionCode(accnoOremail)
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
  
  let query=`select * from user where (accno='${accnoOremail}' or email='${accnoOremail}') and (binary permission='true')`;
  console.log(query);
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  
    //console.log("userId:"+result[0]['max(accno)']); 
  
    if(result.length==1)
    {
    //resolve(result[0]);
    resolve("Permission Granted");
    /*
    resolve(JSON.stringify({

    "statusCode":200,
    "text":"Login Success"
     }));
     */
    }
    else
    {
      reject("Permission Not Granted"); 
    }
  }
  
  });
  
  }
  
  });




})



}



module.exports.checkPermission= async function(accnoOremail)
{

let permission=await checkPermissionCode(accnoOremail);
return permission;
}
