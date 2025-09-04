import Property from "../models/Property.js";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// Add Property
export const addProperty = async (req, res) => {
  try {
    const { title, description, rent, state, city, location } = req.body;
    let { tags } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please login" });
    }


    let normalizedTags = [];
    if (Array.isArray(tags)) {
      normalizedTags = tags.map((t) => t.trim());
    } else if (typeof tags === "string" && tags.length > 0) {
      normalizedTags = tags.split(",").map((t) => t.trim());
    }

    const property = new Property({
      title,
      description,
      rent,
      state,
      city,
      location,
      tags: normalizedTags,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      tenant: req.user._id,
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// getProperties
export const getProperties = async (req, res) => {
  try {
    const { state, city } = req.query; 
    let filter = {};

    if (state) filter.state = state;
    if (city) filter.city = city;

    // Exclude logged-in user's properties
    if (req.user) {
      filter.tenant = { $ne: new mongoose.Types.ObjectId(req.user._id) };
    }

    const properties = await Property.find(filter)
      .populate("tenant", "fullName age gender city occupation hobbies habits profilePhoto"); 
    
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ tenant: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single property with tenant
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("tenant", "fullName gender city occupation hobbies habits  profilePhoto");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// Update Property
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, rent, state, city, location } = req.body;
    let { tags } = req.body;

    let property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    if (property.tenant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let normalizedTags = property.tags;
    if (Array.isArray(tags)) {
      normalizedTags = tags.map((t) => t.trim());
    } else if (typeof tags === "string" && tags.length > 0) {
      normalizedTags = tags.split(",").map((t) => t.trim());
    }

    property.title = title || property.title;
    property.description = description || property.description;
    property.rent = rent || property.rent;
    property.state = state || property.state;
    property.city = city || property.city;
    property.location = location || property.location;
    property.tags = normalizedTags;

    if (req.file) {
      property.image = `/uploads/${req.file.filename}`;
    }

    await property.save();
    res.json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Error updating property", error });
  }
};


// Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    if (property.tenant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await property.deleteOne();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
};
