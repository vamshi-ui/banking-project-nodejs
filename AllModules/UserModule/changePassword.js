let con=require("../../MysqlDBConnection/DbConnection")
let emailObj=require("../../EmailService/sendMail");

function changePasswordcode(email,password)
{

  console.log("email:"+email);
  console.log("password:"+password);

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
  

    console.log("connection created");
  let query=`update user set password='${password}' where email='${email}'`;
  console.log(query);
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  
   resolve("Password Updated Success");
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



module.exports.changePassword= async function(email,password)
{


 
 let result=await sendPasswordFunction(email,password);
 console.log("result:"+result);
if(result==true)
{
let msg=await changePasswordcode(email,password);
return msg;
}
else
{
  return "Internal Server Problem";
}

}
