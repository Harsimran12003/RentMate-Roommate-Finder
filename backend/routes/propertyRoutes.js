import express from "express";
import { addProperty, upload, getProperties, 
        getPropertyById, getMyProperties, updateProperty, 
        deleteProperty  } from "../controllers/propertyController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProperties);
router.post("/", protect, upload.single("image"), addProperty);
router.get("/my", protect, getMyProperties);
router.get("/:id", getPropertyById);
router.put("/:id", protect, upload.single("image"), updateProperty);
router.delete("/:id", protect, deleteProperty);


export default router;
