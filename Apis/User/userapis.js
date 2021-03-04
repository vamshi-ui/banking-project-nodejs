let exp=require("express");
let bp=require("body-parser");
let cors=require("cors");
let userInsertObj=require("../../AllModules/UserModule/insertOperation");
let usermaxIdObj=require("../../AllModules/UserModule/getMaxId")
let userAllObj=require("../../AllModules/UserModule/getAllUsers");
let permissionObj=require("../../AllModules/UserModule/permission");
let userLoginObj=require("../../AllModules/UserModule/userlogin");
let permissionCheckObj=require("../../AllModules/UserModule/checkPermission");
let getUserObj=require("../../AllModules/UserModule/getUser")
let changePasswordObj=require("../../AllModules/UserModule/changePassword");
let depositObj=require("../../AllModules/UserModule/deposit")
let transferObj=require("../../AllModules/UserModule/transferMoney")
let forgotPasswordObj=require("../../AllModules/UserModule/forgotPassword");
let getAllAccnosObj=require("../../AllModules/UserModule/getAllAccnos");
let deleteAccountObj=require("../../AllModules/UserModule/deleteAccnount");
let getDepositInfoAndMoneyTransferInfoObj=require("../../AllModules/UserModule/getDepositAndMoneyTransfer");
let app=exp();
app.use(bp.json());
app.use(cors());

/**************userinsert api starting**************/
app.post("/userinsert",(request,response)=>{

let userObj=request.body;
let result=userInsertObj.insertOperation(userObj);
result.then(x=>{

    response.send(x);

}).catch(y=>{
    response.send(y);  
})


});
/**************userinsert api ending**************/

/**************usermaxid api starting**************/


app.get("/usermaxid",(request,response)=>{


    let result=usermaxIdObj.getMaxUserId();

    result.then(x=>{

        console.log("x="+x);
        response.send(JSON.stringify({"id":x}));
    
    }).catch(y=>{
    
        response.send(JSON.stringify({"err":y}));  
    })



});



/**************usermaxid api ending**************/

/**************allusers api starting**************/

app.get("/allusers",(request,response)=>{


    let result=userAllObj.getAllUsers();

    result.then(x=>{

        
        response.send(JSON.stringify({"data":x}));
    
    }).catch(y=>{
    
        response.send(JSON.stringify({"err":y})); 
    })



});


/**************allusers api ending**************/


/**************userpermission api starting**************/
 
app.put("/permission",(request,response)=>{

    let accno=request.body.accno;
let result=permissionObj.getUserPermission(accno);
result.then(x=>{

        
    response.send(x);

}).catch(y=>{

    response.send(y); 
})


});

/**************userpermission api ending**************/



/**************userlogin api starting**************/

app.post("/userlogin",(request,response)=>{

    let accnoOremail=request.body.accnoOremail;
    let password=request.body.password;

    let result=userLoginObj.userlogin(accnoOremail,password);
    result.then(x=>{
    
            
        response.send(x);
    
    }).catch(y=>{
    
        response.send(y); 
    })  

});

/**************userlogin api ending**************/


/**************permission checking api starting**************/


app.get("/permissionCheck/:accnoOremail",(request,response)=>{

let accnoOremail=request.params.accnoOremail;

let result=permissionCheckObj.checkPermission(accnoOremail);

result.then(x=>{
    
            
    response.send(x);

}).catch(y=>{

    response.send(y); 
}) 

});

/**************permission checking api ending**************/

/**************getuser api starting**************/


app.get("/getUser/:accnoOremail",(request,response)=>{

let accnoOremail=request.params.accnoOremail;

let result=getUserObj.getUser(accnoOremail);
result.then(x=>{
    
            
    response.send(x);

}).catch(y=>{

    response.send(y); 
}) 



});

/**************getuser api ending**************/


/**************change password api starting**************/


app.put("/changePassword",(request,response)=>{

let email=request.body.email;
let password=request.body.password;

let result=changePasswordObj.changePassword(email,password);

result.then(x=>{
    
            
    response.send(x);

}).catch(y=>{

    response.send(y); 
}) 


});

/**************change password api ending**************/

/**************deposit api starting**************/


app.post("/deposit",(request,response)=>{

    let email=request.body.email;
    let balance=request.body.balance;

    let result=depositObj.deposit(email,balance);

    result.then(x=>{
    
            
        response.send(x);
    
    }).catch(y=>{
    
        response.send(y); 
    }) 



});

/**************deposit api ending**************/

/**************money transfer api starting**************/

app.post("/transfer",(request,response)=>{


    let senderEmail=request.body.senderEmail;
    let receiverEmail=request.body.receiverEmail;
    let balance=request.body.balance;

   let result=transferObj.transfer(senderEmail,receiverEmail,balance);
   
   
   result.then(x=>{
    
            
    response.send(x);

}).catch(y=>{

    response.send(y); 
}) 


});



/**************money transfer api ending**************/



/**************forgot password api starting**************/

app.get("/forgotPassword/:accnoOremail",(request,response)=>{

let accnoOremail=request.params.accnoOremail;

let result=forgotPasswordObj.forgotPassword(accnoOremail);

result.then(x=>{
    
            
    response.send(x);

}).catch(y=>{

    response.send(y); 
}); 


});




/**************forgot password api ending**************/


/**************getall accnos api starting**************/


app.get("/getAllAccnos",(request,response)=>{
let result=getAllAccnosObj.getAllAccnos();

result.then(x=>{
    
            
    response.send(x);

}).catch(y=>{

    response.send(y); 
}); 



});



/**************getall accnos api ending**************/


/**************delete Account api starting**************/


app.delete("/accountDelete/:accno/:email",(request,response)=>{

let accno=request.params.accno;
let email=request.params.email;
email=email.trim();


let result=deleteAccountObj.deleteAccount(accno,email);


result.then(x=>{
    
            
    response.send(x);

}).catch(y=>{

    response.send(y); 
}); 



});

/**************delete Account api ending**************/


/**************getDepositInfoAndMoneyTransferInfo api starting**************/


app.get("/getDepositInfoAndMoneyTransferInfo",(request,response)=>{

let accno=request.query.accno;
let result=getDepositInfoAndMoneyTransferInfoObj.getDepositAndMoneyTransfer(accno);

result.then(x=>{
    
            
    response.send(x);

}).catch(y=>{

    response.send(y); 
}); 

});

/**************getDepositInfoAndMoneyTransferInfo api ending**************/

app.listen(5050);
