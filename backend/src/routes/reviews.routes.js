import { json, Router } from "express";
import { 
    createReview,
    getReview, 
    getReviews 
} from "../controllers/reviews.controllers.js"

const router = Router()

router.get("/getReviews", getReviews)

router.get("/getReview", getReview)

router.post("/createReview", createReview)

export default router