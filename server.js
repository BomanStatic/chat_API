import express from "express";
import chatRouter from "./src/router/chatRouter.js";
import authRouter from "./src/router/authRouter.js";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());

app.use(chatRouter);
app.use(authRouter);

app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});
