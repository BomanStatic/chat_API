/**
 * Validates the name and message parameters for a chat message.
 *
 * @param {string} name - The name of the sender.
 * @param {string} message - The chat message.
 * @throws {Error} If the name or message is missing, not a string, or empty.
 */
export const validateChatMessage = (name, message) => {
    //checks if the name and message exists
    if (!name || !message) {
        throw new Error("Missing parameters name or message");
    }

    //checks if the name and message are strings
    if (typeof name !== "string" || typeof message !== "string") {
        throw new Error("Invalid name or message type");
    }

    //checks if the name and message is not empty
    if (name.trim().length < 1 || message.trim().length < 1) {
        throw new Error("One or more parameters are empty");
    }
};
/**
 * Validates the name parameters for a channel.
 *
 * @param {string} channelName - The name of the channel.
 * @throws {Error} If the channelName is missing, not a string, or empty.
 */
export const validateChannelName = (channelName) => {
    //checks if channelName exists
    if (!channelName) {
        throw new Error("Missing channel name");
    }

    //checks if channelName are strings
    if (typeof channelName !== "string") {
        throw new Error("Invalid type of channel name");
    }

    //checks if channelName is not empty
    if (channelName.trim().length < 1) {
        throw new Error("Channel name can not be empty");
    }
};
