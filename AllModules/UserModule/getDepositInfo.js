let con=require("../../MysqlDBConnection/DbConnection")


function getDepositInfocode(accno)
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
  
  let query=`select * from depositinfo where accno='${accno}'`;
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



module.exports.getDepositInfo= async function(accno)
{

let result=await getDepositInfocode(accno);
return result;
}
