let con=require("../../MysqlDBConnection/DbConnection")


function getTransferInfoCode(accno)
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
  
  let query=`select * from moneytransferinfo where saccno='${accno}'`;
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



module.exports.getTransferInfo= async function(accno)
{

let result=await getTransferInfoCode(accno);
return result;
}
