
const WorksModel=require('../Models/WorksModel');

exports.createWork=async (req,res)=>{
    let reqBody= req.body;
    let email=req.headers['email'];
    reqBody.email=email;
    try {
        let result = await WorksModel.create(reqBody);
        res.status(200).json({status: "Success", data: result});
    }
    catch(e){
        res.status(200).json({status: "Fail", data: e.toString()});
    }

}

exports.updateWorkStatus=async (req,res)=>{
    let id = req.params.id;
    let newStatus= req.params.status;
    try{
        let result =await WorksModel.updateOne({_id:id},{status:newStatus});
            res.status(200).json({status: "Success", data: result});
    }

    catch(e){
        res.status(200).json({status: "Fail", data: e.toString()});
    }

}

exports.listWorkByStatus= async (req,res)=>{
    try{
        let email=req.headers['email'];
        let status=req.params.status;
        let result =await WorksModel.find({email:email,status:status});
        res.status(200).json({status:"Success",data:result});

    }
    catch(e){
        res.status(200).json({status: "Fail", data: e.toString()});
    }
}

exports.workStatusCount= async (req,res)=>{
    try {
        let email = req.headers['email'];
        let result = await WorksModel.aggregate([
            {$match:{email:email}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ]);
        res.status(200).json({status:"Success",data:result});
    }
    catch(e){
        res.status(200).json({status: "Fail", data: e.toString()});
    }
}

exports.deleteWork= async(req,res)=>{
    try{
        let id=req.params.id;
        let result = await WorksModel.deleteOne({_id:id});
        res.status(200).json({status:"Success",data:result});
    }
    catch(e){
        res.status(200).json({status:"Failed",data:e.toString()});
    }
}

