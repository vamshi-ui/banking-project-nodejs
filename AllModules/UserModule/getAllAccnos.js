let con=require("../../MysqlDBConnection/DbConnection")


function getAllAccnosCode()
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
  
  let query=`select accno from user`;
  connection.query(query,function(error,result){
  
  if(error)
  {
      console.log("Internal Error:"+error);
      reject("Internal Error");
  }
  else
  {
  


    console.log(result);

    resolve(result);
    //console.log("userId:"+result[0]['max(accno)']); 


  /*
    if(result.length>0)
    {
    resolve(result[0]['max(accno)']);
    }
    else
    {
      resolve("Users Not Found"); 
    }

*/

  }
  
  });
  
  }
  
  });




})



}



module.exports.getAllAccnos= async function()
{

let result=await getAllAccnosCode();
if(result.length>0)
{

let accnos=[];
for(let i=0;i<result.length;i++)
{

    accnos.push(result[i]["accno"]);

}

return accnos;

}
else
{

    return "No Users Found";
}



}
