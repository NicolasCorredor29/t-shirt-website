import { json, Router } from "express";
import {
    addtoCart,
  createShoppingCart,
  deletetoCart,
  getShoppingCart,
  updatetoCart,
} from "../controllers/shoppingCart.controllers.js";

const router = Router();

router.get("/createShoppingCart/:user_id", createShoppingCart);

router.get("/shoppingCart/:user_id", getShoppingCart);

router.post("/addtoCart", addtoCart);

router.put("/updatetoCart", updatetoCart);

router.delete("/deletetoCart", deletetoCart);

export default router;
