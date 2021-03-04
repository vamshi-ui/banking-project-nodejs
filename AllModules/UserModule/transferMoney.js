let con=require("../../MysqlDBConnection/DbConnection")
let sendBalanceMailObj=require("../../EmailService/sendBalanceMail");
let getCurrentBalanceObj=require("./getCurrentBalance");
let getUserObj=require("./getUser");
const { getuid } = require("process");

function transferCode(senderEmail,receiverEmail,balance)
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
  
  let query=`update user set balance=balance-${balance} where email='${senderEmail}'`;
  console.log(query);
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  
let query1=`update user set balance=balance+${balance} where email='${receiverEmail}'`;
connection.query(query1,function(error1,result1){

    if(error1)
    {
        console.log("Internal Error:"+error1);
        reject("Internal Error");
    }
    else
    {
        resolve(true);
    }
});

 }
  
  });
  
  }
  
  });

})
}



function moneyTransferInfoStore(transferObj)
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
  
  let query=`insert into moneytransferinfo(saccno,sname,smobileno,semail,transferamount,raccno,rname,rmobileno,remail,datetime) values(${transferObj["saccno"]},'${transferObj["sname"]}','${transferObj["smobileno"]}','${transferObj["semail"]}',${transferObj["transferamount"]},${transferObj["raccno"]},'${transferObj["rname"]}','${transferObj["rmobileno"]}','${transferObj["remail"]}','${transferObj["datetime"]}')`;
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





module.exports.transfer= async function(senderEmail,receiverEmail,balance)
{

    let msg="";

let checkSenderBalance=await getCurrentBalance(senderEmail);
if(checkSenderBalance>=500)
{


    let bal=checkSenderBalance-balance;

if(bal>=500)
{
    if(balance>checkSenderBalance)
    {

        msg="Insufficient Balance";  

    }
    else
    {
    

let result=await transferCode(senderEmail,receiverEmail,balance);
if(result==true)
{






 let senderBalance=await getCurrentBalance(senderEmail);
 let receiverBalance=await getCurrentBalance(receiverEmail);
 
 let res1=await sendBalanceFunction(senderEmail,senderBalance);
 let res2=await sendBalanceFunction(receiverEmail,receiverBalance);
 if(res1==true && res2==true)
{

let snobj=await getUserObj.getUser(senderEmail);
let senderObj=JSON.parse(snobj);
let sender=senderObj["data"];

let reobj=await getUserObj.getUser(receiverEmail);
let receiverObj=JSON.parse(reobj);
let receiver=receiverObj["data"];

let d=new Date();
let datetime=d.toLocaleDateString()+" "+d.toLocaleTimeString();


let transferObj={

"saccno":sender["accno"],
"sname":sender["name"],
"smobileno":sender["mobileno"],
"semail":sender["email"],
"transferamount":balance,
"raccno":receiver["accno"],
"rname":receiver["name"],
"rmobileno":receiver["mobileno"],
"remail":receiver["email"],
"datetime":datetime
};

console.log("transferObj:"+transferObj);

let mtis=await moneyTransferInfoStore(transferObj);
if(mtis==true)
{
    msg="Money Transfered Successfully...";
}

}
else
{
    msg="Money Not Transfered";   

}
}
else
{

    msg="Money Not Transfered";

}



}

}
else
{
    msg="Please Maintain Minimum Balance";   
}



}
else
{
    msg="Insufficient Balance(below 500)";
}

return msg;
}
