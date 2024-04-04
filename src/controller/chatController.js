import chatService from "../service/chatService.js";

const getBroadcastMessages = async (req, res) => {
    try {
        const broadcast = await chatService.fetchBroadcastMessages();
        return res.status(200).send(broadcast);
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
};

const createBroadcastMessage = (req, res) => {
    return res.status(200).send(chatService.createNewBroadcastMessage());
};

const getChannels = (req, res) => {
    return res.status(200).send(chatService.fetchAllChannels());
};

const getChannelMessages = (req, res) => {
    return res.status(200).send(chatService.fetchChannelMessages());
};

const createChannel = (req, res) => {
    return res.status(200).send(chatService.createNewChannel());
};

const createChannelMessage = (req, res) => {
    return res.status(200).send(chatService.createNewChannelMessage());
};

const deleteChannel = (req, res) => {
    return res.status(200).send(chatService.removeChannel());
};

export default {
    getBroadcastMessages,
    createBroadcastMessage,
    getChannels,
    getChannelMessages,
    createChannel,
    createChannelMessage,
    deleteChannel,
};
