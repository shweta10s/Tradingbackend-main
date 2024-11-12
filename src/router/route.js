const express = require("express");

const { PostPerformance, GetPerformance, UpdatePerformance, DeletePerformance, GetPerformanceById } = require("../controllers/performance-controller");
// const { PostRegister, PostLogin, GetUser, updateAmount, forgetPassword, getForgetPassword, PostResetPassword } = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const { PostCompetitor, GetCompetitor, deleteCompetitor } = require("../controllers/competitor-controller");
const { PostLive, GetLive, DeleteLive } = require("../controllers/liveaccount-controller");
const { PostImg, DeleteImg } = require("../controllers/imgupload-controller");
const upload = require("../middlewares/cloudinaryimg-middleware");

const router = express.Router();

router.post("/topperformance",  PostPerformance)
router.get("/topperformance" , GetPerformance)
router.patch("/topperformance/:id" , UpdatePerformance)
router.delete("/topperformance/:id" , DeletePerformance)
router.get("/topperformance/:id" , GetPerformanceById)


// router.post("/register" , PostRegister)
// router.post("/login" , PostLogin)
// router.get("/user" , authMiddleware, GetUser )
// router.post("/update-amount" , authMiddleware , updateAmount)
// router.post("/forget-password"  , forgetPassword)
// router.get("/forget-password/:id/:token"  , getForgetPassword)
// router.post("/forget-password/:id/:token"  , PostResetPassword)


router.post("/competitor-data" , upload.single('image'), PostCompetitor);
router.get("/competitor-data", GetCompetitor);
router.delete("/competitor-data/:id", deleteCompetitor);



// router.post("/live-data",upload.single('image'), PostLive)
// router.get("/live-data", GetLive)
// router.delete("/live-data/:id", DeleteLive)




router.post("/upload" , upload.single('image'), PostImg )
router.delete("/upload" , upload.single('image'), DeleteImg )

module.exports = router;