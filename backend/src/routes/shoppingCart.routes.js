import { json, Router } from "express";
import {
    addtoCart,
  createShoppingCart,
  deletetoCart,
  getShoppingCart,
  updatetoCart,
} from "../controllers/shoppingCart.controllers";
import router from "./users.routes";

router = Router();

router.post("/createShoppingCart/:user_id", createShoppingCart);

router.get("/shoppingCart/:user_id", getShoppingCart);

router.post("/addtoCart", addtoCart);

router.put("/updatetoCart", updatetoCart);

router.delete("/deletetoCart", deletetoCart);

export default router;
