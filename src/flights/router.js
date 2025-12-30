import { Router } from "express";
import { search } from "../flights/controler.js";

const router = Router();

router.get("/search", search);

export default router;
