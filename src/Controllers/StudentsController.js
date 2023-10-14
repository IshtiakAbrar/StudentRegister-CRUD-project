const jwt= require('jsonwebtoken');
const StudentsModel=require('../Models/StudentsModel');
const OTPModel=require('../Models/OTPModel');
const SendEmailUtility= require('../Utility/SendEmailUtility');

exports.registration=async (req,res)=>{
    let reqBody= req.body;
    try {
        let result = await StudentsModel.create(reqBody);
        res.status(200).json({status: "Success", data: result});
    }
    catch(e){
        res.status(200).json({status: "Fail", data: e.toString()});
    }

}

exports.login=async (req,res)=>{
    let reqBody= req.body;
    try{
        let result =await StudentsModel.find(reqBody).count();
        if (result===1){
            let payload={
                exp:Math.floor(Date.now()/1000+(24*60*60)),
                data:reqBody['email']
            }
        let token= jwt.sign(payload,process.env.SecretKey);
        res.status(200).json({status: "Success", data: token});

        }
        else{
            res.status(200).json({status: "Fail", data: "No user found!"});
        }
    }
    catch(e){
        res.status(200).json({status: "Fail", data: e.toString()});
    }

}

exports.profileDetails= async (req,res)=>{ //READ operation
    try{
        let email=req.headers['email'];
        let result =await StudentsModel.find({email:email});
        res.status(200).json({status: "Success", data:result});

    }
    catch(e){
        res.status(200).json({status: "Fail", data: e.toString()});
    }
}

exports.profileUpdate= async (req,res)=>{
    try {
        let email = req.headers['email'];
        let newData=req.body;
        let result = await StudentsModel.updateOne({email:email},newData);
        res.status(200).json({status:"Success",data:result});
    }
    catch(e){
        res.status(200).json({status: "Fail", data: e.toString()});
    }
    }

    exports.RecoverVerifyEmail= async(req,res)=>{
    try{
        let email=req.params.email;
        let result = await StudentsModel.find({email:email}).count();
        if (result === 1){
            let OTP = Math.floor(100000+Math.random()*900000);
            let EmailTo=email;
            let EmailText= "Your OTP is : "+OTP;
            let EmailSubject="Recover password";
            await SendEmailUtility(EmailTo,EmailText,EmailSubject);
            await OTPModel.create({email:email,otp:OTP});
            res.status(200).json({status:"Success",data:"6 digit OTP sent successful"});

        }
        else{
            res.status(200).json({status:"Failed",data:"No user found!"});
        }
    }
    catch(e){
        res.status(200).json({status:"Failed",data:e.toString()});
    }
    }

    exports.RecoverVerifyOTP=async (req,res)=>{
        let email=req.params.email;
        let OTP=req.params.otp;
        try{
            let result= await OTPModel.find({email:email,otp:OTP,status:0}).count();
            if (result===1){
                await OTPModel.updateOne({email:email,otp:OTP,status:0},{status:1});
                res.status(200).json({status:"Success",data:"Otp verification success!"});
            }
            else{
                res.status(200).json({status:"Failed",data:"wrong OTP"});
            }

        }
        catch(e){
            res.status(200).json({status:"Failed",data:e.toString()});
        }

    }

    exports.RecoverResetPass=async (req,res)=>{

    let email= req.body['email'];
    let OTP= req.body['otp'];
    let newPass= req.body['newPass'];
    try {
        let result = await OTPModel.find({email: email, otp: OTP, status: 1}).count();
        if (result === 1) {
            await StudentsModel.updateOne({email: email}, {password: newPass});
            res.status(200).json({status: "Success", data: "password Updated"});
        } else {
            res.status(200).json({status: "Failed", data: "Unauthorised"});
        }
    }
    catch (e){
        res.status(200).json({status:"Failed",data:e.toString()});
    }

    }

exports.deleteUser= async (req,res)=>{
    try{
        let email=req.headers['email'];
        let result =await StudentsModel.deleteOne({email:email});
        res.status(200).json({status: "Success", data:result});

    }
    catch(e){
        res.status(200).json({status: "Fail", data: e.toString()});
    }
}