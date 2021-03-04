
module.exports.sendMessage=function(email,accno)
{


    console.log("email:"+email);
    console.log("accno:"+accno);
  
    let nm = require("nodemailer"); 
    let transporter=nm.createTransport({
        
        service:"gmail",
        auth:{
            
            user:"testmail578369@gmail.com",
            pass:"testmail578#"
        }
        ,
        tls: {
            rejectUnauthorized: false
            }
    });
    transporter.sendMail({
        
    to:email,
    subject:"Bank Account Deleted",
    from:"testmail578369@gmail.com",
    html:"<h2>"+accno+" Bank Account is Deleted,Please Visit Branch</h2>"
        
    },function(error,result){
        if(error)
            {
                console.log(error);
            }
        else
            {
                console.log(result);
            }
        }
       );

}