import mongoose from "mongoose";


const healthSchema = mongoose.Schema({
    Name:String,
    Age:Number,
    Blood_group:String,
    reason:String,
    health_id:String
})


export default mongoose.model('health_rec',healthSchema);
