import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

// Replace the following with your Atlas connection string
const url = process.env.MONGO_URL;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Database is alreadly initialized");
    return callback(null, _db);
  }
  MongoClient.connect(url)
    .then((client) => {
      // _db = client.db(); // leave on db()
      _db = client; //means you call db() when u call getDb => getDB().db(), perferd method
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialzed");
  }
  return _db;
};

export { initDb, getDb };
