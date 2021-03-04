let con=require("../../MysqlDBConnection/DbConnection")
let emailObj=require("../../EmailService/sendAccountDeleteMsg")


function deleteAccountCode(accno)
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
  
  let query=`delete from user where accno='${accno}'`;
  console.log(query);
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {

resolve(true);
  }
  
  });
  
  }
  
  });
})
}



function sendMessageFunction(email,accno)
{

    return new Promise(function(resolve,reject){

      

      emailObj.sendMessage(email,accno);
      resolve(true);

    });

}



module.exports.deleteAccount= async function(accno,email)
{

let msg="";
    let result=await deleteAccountCode(accno);

    console.log("result:"+result);
    if(result==true)
    {


        let result1=await sendMessageFunction(email,accno);
        console.log("result1:"+result1);
        if(result1==true)
        {
            msg="Account Deleted";
        }
        else
        {

         msg="Internal Problem";   

        }


    }
    else
    {
        msg="Account Not Deleted";
    }

    return msg;

}

