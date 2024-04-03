import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db;

const url = () => {
    return process.env.MONGODB_URL;
};

export const fetchCollection = async (name) => {
    const db = await fetchDatabase();
    return db.collection(name);
};

const fetchDatabase = async () => {
    if (db !== undefined) return db;

    const client = new MongoClient(url());

    await client.connect();

    db = client.db("chat");
    return db;
};
