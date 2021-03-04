module.exports.newPasswordGenerate=function()
{

    let spec=["@","#","$","%","&","*"];
    let nums=[0,1,2,3,4,5,6,7,8,9];
    let smallL=[];
    let capiL=[];
    for(let i=97;i<=122;i++)
    {
    smallL.push(String.fromCharCode(i));
    }
    for(let i=65;i<=90;i++)
    {
    capiL.push(String.fromCharCode(i));
    }
    
    let password="";
    for(let i=1;i<=6;i++)
    {
    let randomNum=Math.round(Math.random()*(4-1)+1);
    if(randomNum==1)
    {

     let totalElements=spec.length-1;
     let indexRandom=Math.floor(Math.random()*(totalElements));
     password=password+spec[indexRandom];


    }
    else if(randomNum==2)
    {
        let totalElements=nums.length-1;
     let indexRandom=Math.floor(Math.random()*(totalElements));
     password=password+nums[indexRandom];
     

    }
    else if(randomNum==3)
    {
        let totalElements=smallL.length-1;
        let indexRandom=Math.floor(Math.random()*(totalElements));
        password=password+smallL[indexRandom];
        
    }
    else 
    {

        let totalElements=capiL.length-1;
     let indexRandom=Math.floor(Math.random()*(totalElements));
     password=password+capiL[indexRandom];
     
    }
}

return password;
}