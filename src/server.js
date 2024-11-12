const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors"); 
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
const routerData = require("./router/route")
const authRoute = require("./router/authRoutes");
const adminRoute = require("./router/adminRoutes");
const withdrawalRoute = require("./router/withdrawalRoutes");
const upload = require("./middlewares/cloudinaryimg-middleware");
require("./db/conn")

app.use(cors());

app.use(express.json());

app.use("/api" , routerData)


app.use("/api/auth" , upload.single('image'), authRoute);
app.use("/api/admin",upload.single('image'), adminRoute);
app.use("/api/withdrawal" ,upload.single('image'), withdrawalRoute); 


app.use("*", (req, res) => {
    return res.status(404).json({msg:"Page not found"});
});

app.listen(PORT , () => {
    console.log(`server is running on port no ${PORT}`);
})
