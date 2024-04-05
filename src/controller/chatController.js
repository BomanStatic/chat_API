import chatService from "../service/chatService.js";
import { ObjectId } from "mongodb";
import { validateChatMessage } from "../utils/chatValidation.js";


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

// handles GET request for retrieving all channels
const getChannels = async (req, res) => {
    try {
        // call the service function to fetch all channels
        const channels = await chatService.fetchAllChannels();

        // return list of channels as a response
        return res.status(200).send(channels);
    } catch (e) {
        // send 500 response if there's an error
        return res.status(500).send({ err: "Error fetching channels" });
    }
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
// handles creation of new channel
const createChannel = async (req, res) => {
    const { channelName } = req.body; // takes channel name of request body

    // checks if channelName is missing
    if (channelName === undefined) {
        // sends error response if channelName is missing
        return res.status(400).send({ err: "Missing parameter: Channel Name" });
    }

    try {
        // creating a new channel
        const newChannel = await chatService.createNewChannel(channelName);

        // sends 200 response with new channel data
        return res.status(200).send(newChannel);
    } catch (e) {
        // sends 500 response if there's an error creating channel
        return res.status(500).send({ err: "Error creating channel" });
    }
};

const createChannelMessage = async (req, res) => {
    const id = req.params.id;
    const { name, message } = req.body;
    const time = new Date().toLocaleTimeString(); // Creates a time to a string
    const date = new Date().toLocaleDateString(); // Creates a date to a string

    try {
        validateChatMessage(name, message);
    } catch (e) {
        return res.status(400).send({ msg: e.message });
    }

    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch (e) {
        return res.status(400).send({ msg: "Invalid id format" });
    }

    const newMessage = { name, time, date, message };
    try {
        const result = await chatService.createNewChannelMessage(objectId, newMessage);
        return res.status(200).send(result);
    } catch (e) {
        return res.status(500).send({ msg: e.message });
    }
};

const deleteChannel = async (req, res) => {
	try{

		// extract channel ID from request parameters
		const { id } = req.params;

		let objectId;

		try {
            objectId = new ObjectId(id);
        } catch (error) {
            return res.status(400).send({ message: "Invalid ID format" });
        }


		// call function from service to remove channel
		const result = await chatService.removeChannel(objectId);

		// check if successfull
		if (result.success) {
			return res.status(200).send ({message : result.message});
		} else {
			return res.status(404).send ({message: result.message});
	 }
	} catch (error) {
		// return a 500 error response
		return res.status(500).send({message : "Cannot delete channel"})
	}


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
