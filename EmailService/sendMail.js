
module.exports.sendPassword=function(email,password)
{


    console.log("pword:"+password);
  
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
    subject:"Password",
    from:"testmail578369@gmail.com",
    html:"<h2>Your Password is:"+password+"</h2>"
        
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