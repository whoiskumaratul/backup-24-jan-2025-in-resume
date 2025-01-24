const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);
const dbName = 'quleepdb';

async function dbConnect()
{
    //handle promises
    let result = await client.connect();
    let db = result.db(dbName);
    console.log('Connected to database', db.databaseName);
    return db.collection("users")
    // let collection = db.collection('users');
    // let response = await collection.find({}).toArray();
    // console.log(response)
}

dbConnect();

