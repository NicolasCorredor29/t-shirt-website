import e, { json, Router } from "express";
import { createAddress, deleteAddress, getAddress, updateAddress } from "../controllers/address.controllers.js";

const router = Router();

router.get("/getAddress/:user_id", getAddress);

router.post("/createAdress", createAddress);

router.put("/updateAddress", updateAddress);

router.delete("/deleteAddress/:user_id", deleteAddress);

export default router;