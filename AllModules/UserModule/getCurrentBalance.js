let con=require("../../MysqlDBConnection/DbConnection")


function getCurrentBalancecode(email)
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
  

    let query=`select balance from user where email='${email}'`; 
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  
    let balance=result[0]["balance"];
    //console.log("balance:"+JSON.stringify(balance));
    resolve(balance);
  }
  
  });
  
  }
  
  });




})



}





module.exports.getCurrentBalance= async function(email)
{


 
 let balance=await getCurrentBalancecode(email);

return balance;

}
