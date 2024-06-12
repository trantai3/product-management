const mongoose = require('mongoose') // add module mongoose

module.exports.connect = async () => {   // check success or fail
    try {
        await mongoose.connect(process.env.MONGO_URL) // connect mongoose
        console.log("Connect Success!")
    } catch(error) {
        console.log("Connect Error!")
    }
}
