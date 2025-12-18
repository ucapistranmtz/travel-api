import { search } from "./controller.js";
import { Router } from "express";

const router = Router();

router.get("/search", search);

export default router;
