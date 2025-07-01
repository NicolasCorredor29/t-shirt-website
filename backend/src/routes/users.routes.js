import { json, Router } from "express";
import {
  login,
  createUser,
  deleteUser
} from "../controllers/users.controllers.js";

const router = Router();

router.post("/login", login);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

router.post("/jp", async (req, res) => {
  const data = req.body;
  res.json({ message: "hola" });
  console.log(typeof data);
});

export default router;
