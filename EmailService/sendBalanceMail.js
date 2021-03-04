
module.exports.sendBalance=function(email,balance)
{


    //console.log("balance:"+balance);
  
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
    subject:"Current Balance",
    from:"testmail578369@gmail.com",
    html:"<h2>Your Current Balance is:"+balance+"</h2>"
        
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