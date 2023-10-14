const jwt = require('jsonwebtoken');
module.exports= (req,res,next)=>{
    const Token= req.headers['token'];
    jwt.verify(Token,process.env.SecretKey,function(err,decoded){
        if(err){
            console.log(Token);
            res.status(401).json({status:"unauthorized"});
        }
        else{
            let email=decoded['data'];
            //console.log(email);
            req.headers.email=email;
            next();
        }
    });

}