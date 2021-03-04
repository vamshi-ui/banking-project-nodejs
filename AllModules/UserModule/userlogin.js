let con=require("../../MysqlDBConnection/DbConnection")


function userlogincode(accnoOremail,password)
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
  
  let query=`select * from user where (accno='${accnoOremail}' or email='${accnoOremail}') and (binary password='${password}')`;
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
    resolve("Login Success");
    /*
    resolve(JSON.stringify({

    "statusCode":200,
    "text":"Login Success"
     }));
     */
    }
    else
    {
      reject("Invalid Acno/Email or Password"); 
    }
  }
  
  });
  
  }
  
  });




})



}



module.exports.userlogin= async function(accnoOremail,password)
{

let user=await userlogincode(accnoOremail,password);
return user;
}
