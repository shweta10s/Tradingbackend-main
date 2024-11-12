const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("db connected succesfully")
})
.catch((err) => {
    console.log("database error" , err)
})

