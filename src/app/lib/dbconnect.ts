import mongoose from "mongoose";

const connection: { isConnected?: number } = {}; // This is a singleton pattern since it is defined outside the function

async function dbConnect() {
    if (connection.isConnected) {
        // console.log("Using Existing MongoDB connection");
        return; 
    } else {
        const db = await mongoose.connect(process.env.MONGODB_URI!);
        // console.log("New Connection created to MongoDB");
        connection.isConnected = db.connections[0].readyState;
    }
}

export default dbConnect;