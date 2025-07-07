import { json, Router } from "express";
import {
    createDesign,
    deleteDesign,
    getDesigns,
    getArtDesigns,
    getFavDesigns,
    updateDesign,
    getDesign,
    getOneDesign
} from "../controllers/designs.controllers.js"

const router = Router();

router.get("/designs", getDesigns)

router.get("/designs/:artist_id", getArtDesigns);

router.get("/designs/fav/:user_id", getFavDesigns)

router.get("/searchDesign/:title", getDesign)

router.get("/oneDesign/:id", getOneDesign)

router.post("/designs", createDesign)

router.put("/updateDesign", updateDesign)

router.delete("/deleteDesign", deleteDesign)

export default router;