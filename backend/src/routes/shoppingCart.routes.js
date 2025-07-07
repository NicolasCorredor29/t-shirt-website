import { json, Router } from "express";
import { createShoppingCart } from "../controllers/shoppingCart.controllers";
import router from "./users.routes";

router = Router();

router.post("/createShoppingCart/:user_id", createShoppingCart)

export default router;