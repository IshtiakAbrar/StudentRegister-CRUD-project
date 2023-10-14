const express= require('express');
const router = express.Router();


const StudentsController= require('../Controllers/StudentsController');
const AuthVerifyMiddleware= require('../Middleware/AuthVerifyMiddleware');
const WorksController = require("../Controllers/WorksController");


router.post("/registration",StudentsController.registration);
router.post("/login",StudentsController.login);

 router.post("/profileUpdate",AuthVerifyMiddleware,StudentsController.profileUpdate);
 router.get("/profileDetails",AuthVerifyMiddleware,StudentsController.profileDetails);
 router.get("/RecoverVerifyEmail/:email",StudentsController.RecoverVerifyEmail);
 router.get("/RecoverVerifyOTP/:email/:otp",StudentsController.RecoverVerifyOTP);
 router.post("/RecoverResetPass",StudentsController.RecoverResetPass);
 router.post("/deleteUser",AuthVerifyMiddleware,StudentsController.deleteUser);


// Task Manage
 router.post("/createWork",AuthVerifyMiddleware,WorksController.createWork);
 router.get("/updateWorkStatus/:id/:status",AuthVerifyMiddleware,WorksController.updateWorkStatus);
 router.get("/listWorkByStatus/:status",AuthVerifyMiddleware,WorksController.listWorkByStatus);
 router.get("/workStatusCount",AuthVerifyMiddleware,WorksController.workStatusCount);
 router.get("/deleteWork/:id",AuthVerifyMiddleware,WorksController.deleteWork);


module.exports=router;