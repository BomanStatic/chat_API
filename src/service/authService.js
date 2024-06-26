import jwtUtils from "../utils/jwtUtils.js";
import bcrypt from "bcrypt";
import { fetchCollection } from "../mongodb/mongoClient.js";

// Creates a Users collection
const USER_COLLECTION = "Users";

// Function that checks if the username exiist, if it does it will check the password and then return a token
const exists = async ({ username, password }) => {
    const collection = await fetchCollection(USER_COLLECTION);
    let result = await collection.findOne({ username });

    if (!result) {
        throw new Error("Account does not exist");
    }

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, result.hash, (err, isValid) => {
            if (err) {
                reject(err);
            } else if (isValid) {
                const token = jwtUtils.generate({
                    username,
                    role: result.role,
                });
                resolve(token);
            } else {
                reject(new Error("Invalid password"));
            }
        });
    });
};

// Function that creates a user based on the username and password, it then saves it to the database
const create = async ({ username, password }) => {
    const collection = await fetchCollection(USER_COLLECTION);
    let result = await collection.findOne({ username });

    if (result != null) {
        return false;
    }

    bcrypt.hash(password, 12, async (err, hash) => {
        result = await collection.insertOne({
            username,
            hash,
            role: "User",
        });
    });
};

export default { create, exists };
