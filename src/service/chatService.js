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
    // const messageId = (await fetchBroadcastMessages().messages.length) + 1;
    const result = await collection.updateOne(
        {
            _id: id,
        },
        { $set: { channelName }, $push: { messages: newMessage } },
        { upsert: true }
    );
    return newMessage; // returns newMessage
};
const fetchAllChannels = () => {
    return "not yet implemented";
};
const fetchChannelMessages = (id) => {
    return "not yet implemented";
};

// Async function that creates new channel in database
const createNewChannel = async (channelName) => {
	// fetching collection from database
    const collection = await fetchCollection(CHAT_COLLECTION_NAME);

	// inserting a new channel into the collection with ChannelName and empty array for messages
    const result = await collection.insertOne({
        channelName,
        messages: []
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
const removeChannel = (id) => {
    return "not yet implemented";
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
