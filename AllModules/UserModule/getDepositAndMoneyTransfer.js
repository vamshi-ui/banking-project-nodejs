let con=require("../../MysqlDBConnection/DbConnection")


function getDepositInfoCode(accno)
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
  
  let query=`select * from depositinfo where accno=${accno}`;
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  
    //console.log("userId:"+result[0]['max(accno)']); 
  
   
    resolve(result);
   
  }
  
  });
  
  }
  
  });




})



}




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
  
  let query=`select * from moneytransferinfo where saccno=${accno}`;
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  
    
    resolve(result);
    
  }
  
  });
  
  }
  
  });




})



}



module.exports.getDepositAndMoneyTransfer= async function(accno)
{

let depositinfo=await getDepositInfoCode(accno);
//console.log("depositinfo:"+JSON.stringify(depositinfo));

let moneytransferinfo=await getTransferInfoCode(accno);
//console.log("moneytransferinfo:"+JSON.stringify(moneytransferinfo));
let depositAndMoneyTransferInfo={

"depositinfo":depositinfo,
"moneytransferinfo":moneytransferinfo
};


return JSON.stringify(depositAndMoneyTransferInfo);
}
