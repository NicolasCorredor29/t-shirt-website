import { json, Router } from "express";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
} from "../controllers/reviews.controllers.js";

const router = Router();

router.get("/getReviews", getReviews);

router.get("/getReview", getReview);

router.post("/createReview", createReview);

router.delete("/deleteReview/:design_id", deleteReview);

export default router;
