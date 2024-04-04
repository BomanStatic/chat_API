import { fetchCollection } from "../mongodb/mongoClient.js";

const CHAT_COLLECTION_NAME = "channels";

const fetchBroadcastMessages = () => {
    return "not yet implemented";
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
const createNewChannelMessage = (id) => {
    return "not yet implemented";
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
