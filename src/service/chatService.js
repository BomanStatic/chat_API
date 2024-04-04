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
const createNewBroadcastMessage = () => {
    return "not yet implemented";
};
const fetchAllChannels = () => {
    return "not yet implemented";
};
const fetchChannelMessages = (id) => {
    return "not yet implemented";
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
