import authService from "../service/authService.js";

// Takes in username and password from the body and then checks if it is undefined. Then sends them to the service
const login = async (req, res) => {
    const { username, password } = req.body;

    if (username === undefined && password === undefined) {
        return res.status(400).send({ err: "invalid parameters" });
    }

    try {
        const token = await authService.exists({ username, password });
        res.status(200).send({ token });
    } catch (e) {
        return res.status(401).send({ err: "Failed to login" });
    }
};

// Takes in username and password from the body and then checks if it is undefined. Then sends them to the service
const signUp = async (req, res) => {
    const { username, password } = req.body;

    if (username === undefined && password === undefined) {
        return res.status(400).send({ err: "invalid parameters" });
    }

    await authService.create({ username, password });

    return res.status(201).send({ err: "Account was created" });
};

// exports login, signUp
export default { login, signUp };
