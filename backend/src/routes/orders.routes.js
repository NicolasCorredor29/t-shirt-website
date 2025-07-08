import { json, Router } from "express";
import { addtoOrder, createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/orders.controllers.js";

const router = Router();

router.get("/getOrders/:user_id", getOrders);

router.post("/createOrder", createOrder)

router.post("/addtoOrder", addtoOrder);

router.put("/updateOrder", updateOrder);

router.delete("/deleteOrder/:order_id", deleteOrder);

export default router;