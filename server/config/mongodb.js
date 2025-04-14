// In which we add the function that will connect us with the mongodb database

import mongoose from "mongoose";
// add functions
const connectdb = async ()=>{
    mongoose.connection.on('connected', ()=>{
        console.log('database connected')
    })
    await mongoose.connect(`${process.env.MONGODB_URL}`)//in this provide mongodb connection url we have store in the envirment variable  
}
export default connectdb;