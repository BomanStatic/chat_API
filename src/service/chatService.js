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
const createNewChannel = () => {
    return "not yet implemented";
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
