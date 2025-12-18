import express from "express";
import router from "./flights/router.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/flights", router);
app.use(errorHandler);

export default app;
