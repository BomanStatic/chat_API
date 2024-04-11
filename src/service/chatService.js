import { fetchCollection } from "../mongodb/mongoClient.js";

const CHAT_COLLECTION_NAME = "channels";
const BROADCAST_ID = "broadcast";

const fetchBroadcastMessages = async () => {
    const collection = await fetchCollection(CHAT_COLLECTION_NAME);
    const broadcast = await collection.findOne({
        _id: BROADCAST_ID,
    });
    if (!broadcast) {
        throw new Error("Could not find the broadcast channel");
    }
    return broadcast;
};
// A function that saves id, newMessage and channelName to the database
const createNewBroadcastMessage = async (id, newMessage, channelName) => {
    const collection = await fetchCollection(CHAT_COLLECTION_NAME);
    const result = await collection.updateOne(
        {
            _id: id,
        },
        { $set: { channelName }, $push: { messages: newMessage } },
        { upsert: true }
    );
    return newMessage; // returns newMessage
};

// function to fetch all channels from the database with their ids and names
const fetchAllChannels = async () => {
    // fetch the channel collection from mongodb
    const collection = await fetchCollection(CHAT_COLLECTION_NAME);

    // retrieve all channels from collection
    const channels = await collection.find().toArray();

    return channels.map((channel) => ({ id: channel._id, name: channel.channelName }));
};

// A function that takes in the id and then finds that channel in the database if it exist it will return that channel
const fetchChannelMessages = async (objectId) => {
    const collection = await fetchCollection(CHAT_COLLECTION_NAME);
    const channel = collection.findOne({ _id: objectId }); // Finds the channel by its id

    // if the channel does not exist it throws an error
    if (!channel) {
        throw new Error("Cloud not find the Channel");
    }
    return channel; // returns the channel
};

// Async function that creates new channel in database
const createNewChannel = async (channelName) => {
    // fetching collection from database
    const collection = await fetchCollection(CHAT_COLLECTION_NAME);

    // inserting a new channel into the collection with ChannelName and empty array for messages
    const result = await collection.insertOne({
        channelName,
        messages: [],
    });
    // Return the created channel from MongoDB operation
    return result;
};
const createNewChannelMessage = async (id, message) => {
    const collection = await fetchCollection(CHAT_COLLECTION_NAME);
    try {
        await collection.updateOne({ _id: id }, { $push: { messages: message } });
    } catch (e) {
        throw new Error("Failed to create new channel message");
    }
    return message;
};

// async function that removes a channel from the database by its ID
const removeChannel = async (objectId) => {
    try {
        // fetch collection for channel
        const collection = await fetchCollection(CHAT_COLLECTION_NAME);

        console.log("Channel ID:", objectId);

        // remove the channel from the collection based on its ID
        const result = await collection.deleteOne({ _id: objectId });
        console.log("Delete Result:", result);
        // Check if the channel was successfully removed
        if (result.deletedCount === 1) {
            return { success: true, message: "Channel deleted" };
        } else {
            return { success: false, message: "Channel not found or already deleted" };
        }
    } catch (error) {
        // Return an error message if an error occurs
        return { success: false, message: "Error removing channel" };
    }
};
export default {
    fetchBroadcastMessages,
    createNewBroadcastMessage,
    fetchAllChannels,
    fetchChannelMessages,
    createNewChannel,
    createNewChannelMessage,
    removeChannel,
};
