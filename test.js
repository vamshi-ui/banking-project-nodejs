
let testObj=require("./AllModules/UserModule/getDepositAndMoneyTransfer")
testObj.getDepositAndMoneyTransfer(501011).then(x=>{
console.log("x:"+x);
}).catch(y=>{

    console.log(y);
});


