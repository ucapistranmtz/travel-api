import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./flights/router.js";
const app = express();
app.use(express.json());
app.use("/api/flights", router);
app.use(errorHandler);

export default app;
