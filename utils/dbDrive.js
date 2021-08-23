import { MongoClient } from "mongodb";

// Replace the following with your Atlas connection string
const url = process.env.MONGO_URL;
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

export default connectDB;
