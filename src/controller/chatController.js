import chatService from "../service/chatService.js";
import { ObjectId } from "mongodb";

const getBroadcastMessages = async (req, res) => {
    try {
        const broadcast = await chatService.fetchBroadcastMessages();
        return res.status(200).send(broadcast);
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
};

// Function that get name and message from the reg.body. ID, time, date and channelname creates. We then sends them to service were is should save to the database
const createBroadcastMessage = async (req, res) => {
    const id = "broadcast";
    const { name, message } = req.body; // Gets name and message
    const time = new Date().toLocaleTimeString(); // Creates a time to a string
    const date = new Date().toLocaleDateString(); // Creates a date to a string
    const channelName = "Broadcast"; // Creates channel name

    //checks if name and message is undefined
    if (name === undefined && message === undefined) {
        return res.status(400).send({ err: "Missing parameters name or message" });
    }
    try {
        const newMessage = { name, time, date, message }; // Creates a new variabel for name, time, date & message
        return res.status(200).send(await chatService.createNewBroadcastMessage(id, newMessage, channelName)); // Sends id newMessage and channelName to service
    } catch (e) {
        res.status(404).send({ msg: "Messages was not added" });
    }
};

const getChannels = (req, res) => {
    return res.status(200).send(chatService.fetchAllChannels());
};

// Function that gets the id and checks with the database if that exists
const getChannelMessages = async (req, res) => {
    const { id } = req.params;
    let channel;
    if (id !== "broadcast") {
        let objectId;

        try {
            objectId = new ObjectId(id);
            console.log(objectId);
            channel = await chatService.fetchChannelMessages(objectId);
        } catch (e) {
            return res.status(400).send({ msg: "invalid id format" });
        }
    } else {
        channel = await chatService.fetchChannelMessages(id);
    }
    if (!channel) return res.status(400).send({ msg: "Could not find an order with that id" });
    res.status(201).send(channel);
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
