const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    email:{type:String,unique:true,immutable:true},//immutable prevents email update.
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:String},
    password:{type:String},
    address:{type:String},
    roll:{type:String},
    class:{type:String}
},{timestamps: true,versionKey:false});
const StudentsModel=mongoose.model('students',DataSchema);
module.exports=StudentsModel
