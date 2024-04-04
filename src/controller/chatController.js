import chatService from "../service/chatService.js";

const getBroadcastMessages = (req, res) => {
    return res.status(200).send(chatService.fetchBroadcastMessages());
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
