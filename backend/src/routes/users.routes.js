import { json, Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
} from "../controllers/users.controllers.js";
import {
    createDesigns,
    getDesigns
} from "../controllers/designs.controllers.js"

const router = Router();

router.get("/users", getUsers);

//:id parametro (variable)
router.get("/users/:id", getUser);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

router.get("/designs/:artist_id", getDesigns);

router.post("/designs", createDesigns)


router.post('/jp', async (req, res) => { res.json({message: "hola",})})

export default router;