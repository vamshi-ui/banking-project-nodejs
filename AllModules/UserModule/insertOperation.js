let pwordObj=require("../../PasswordGenerate/password");
let emailObj=require("../../EmailService/sendMail");
let con=require("../../MysqlDBConnection/DbConnection");


function newPasswordGenerateFunction()
{

    return new Promise(function(resolve,reject){

        let password=pwordObj.newPasswordGenerate();

        resolve(password);



    })


}


function sendPasswordFunction(email,password)
{

    return new Promise(function(resolve,reject){

      emailObj.sendPassword(email,password);
      resolve(true);

    })

}








function insertDataFunction(user,password)
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
        
             let query=`insert into user values(${user["accno"]},'${user["name"]}','${password}','${user["gender"]}','${user["mobileno"]}','${user["email"]}',${user["balance"]},'${user["state"]}','${user["city"]}','${user["permission"]}')`;
            
console.log('query'+query);
             
   connection.query(query,function(error,result){
        
        if(error)
        {
            console.log("user data not inserted:"+error);
            reject("user data not inserted:");
        }
        else
        {
            
        
            
            console.log("user data inserted succesfully");
            resolve("User Data Inserted Succesfully");
        
        }
             });
           }
        
        });


        
    })



}


module.exports.insertOperation=async function(user)
{
    
let password=await newPasswordGenerateFunction();

let sendPwordResult=await sendPasswordFunction(user["email"],password);

if(sendPwordResult==true)
{
    let result=await insertDataFunction(user,password);
   
   return result;
}
else
{

    return "Internal Server Problem";

}




}