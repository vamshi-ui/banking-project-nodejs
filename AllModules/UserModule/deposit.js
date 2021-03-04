let con=require("../../MysqlDBConnection/DbConnection");
let sendBalanceMailObj=require("../../EmailService/sendBalanceMail");
let getCurrentBalanceObj=require("./getCurrentBalance");
let getUserObj=require("./getUser");

function depositCode(email,balance)
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
  
  let query=`update user set balance=balance+${balance} where email='${email}'`;
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

function depositInfoStore(depositObj)
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
  
  let query=`insert into depositinfo(accno,name,mobileno,email,depositamount,datetime) values(${depositObj["accno"]},'${depositObj["name"]}','${depositObj["mobileno"]}','${depositObj["email"]}',${depositObj["depositamount"]},'${depositObj["datetime"]}')`;
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




function getCurrentBalance(email)
{

    return new Promise(function(resolve,reject){

    let balance = getCurrentBalanceObj.getCurrentBalance(email);
       
       console.log("result:"+balance);
      resolve(balance);

    })

}



function sendBalanceFunction(email,balance)
{

    return new Promise(function(resolve,reject){

       sendBalanceMailObj.sendBalance(email,balance);
      
     
      resolve(true);

    })

}





module.exports.deposit= async function(email,balance)
{

let msg;
  let result=await depositCode(email,balance);
  if(result==true)
  {

  
    let cuurentBalance=await getCurrentBalance(email);

    
    console.log("cuurentBalance:"+cuurentBalance);
    let result1=await sendBalanceFunction(email,cuurentBalance);
if(result1==true)
{



let user=await getUserObj.getUser(email);
user=JSON.parse(user);
let userObj=user.data;
let d=new Date();
let datetime=d.toLocaleDateString()+" "+d.toLocaleTimeString();

let depositObj={
  "accno":userObj["accno"],
  "name":userObj["name"],
  "mobileno":userObj["mobileno"],
  "email":userObj["email"],
  "depositamount":balance,
  "datetime":datetime
};

let depositInfoResult=await depositInfoStore(depositObj);
if(depositInfoResult==true)
{

  msg="Deposit Success";

}



}
else
{
  msg="Deposit Fail";
}

  }
  else
  {
   msg="Deposit Fail";
  }

 

return msg;
}
