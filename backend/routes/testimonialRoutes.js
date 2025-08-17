import express from "express";
import {
  getTestimonials,
} from "../controllers/testimonialController.js";

const router = express.Router();

// GET all testimonials
router.get("/", getTestimonials);

export default router;