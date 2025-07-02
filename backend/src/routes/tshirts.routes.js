import { json, Router } from "express";
import {
  createTshirt,
  deleteTshirt,
  updateTshirt
} from "../controllers/tshirt.controllers.js";

const router = Router();

router.post("/createTshirt", createTshirt);

router.put("/updateTshirt", updateTshirt);

router.delete("/deleteTshirt", deleteTshirt);

export default router;
