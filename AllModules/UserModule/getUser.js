let con=require("../../MysqlDBConnection/DbConnection")


function getUsercode(accnoOremail)
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
  
  let query=`select * from user where accno='${accnoOremail}' or email='${accnoOremail}'`;
  console.log(query);
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  
  resolve(

    JSON.stringify({

     "data":result[0]


    })

  );
  }
  
  });
  
  }
  
  });




})



}



module.exports.getUser= async function(accnoOremail)
{

let result=await getUsercode(accnoOremail);
return result;
}
