let con=require("../../MysqlDBConnection/DbConnection")
let emailObj=require("../../EmailService/sendMail")


function forgotPasswordCode(accnoOremail)
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
  //console.log(result);
  resolve(result);
  }
  
  });
  
  }
  
  });




})



}



function sendPasswordFunction(email,password)
{

    return new Promise(function(resolve,reject){

      emailObj.sendPassword(email,password);
      resolve(true);

    })

}



module.exports.forgotPassword= async function(accnoOremail)
{
let msg="";
let result=await forgotPasswordCode(accnoOremail);
if(result.length==0)
{
msg="Invalid Accno or Email";
}
else
{
   
    let password=result[0]["password"];
    let email=result[0]["email"];

    let result1=await sendPasswordFunction(email,password);
if(result1==true)
{
    msg="Password sended to Your Email";
}
else
{
    msg="Internal Problem";
}


}

return msg;

}

