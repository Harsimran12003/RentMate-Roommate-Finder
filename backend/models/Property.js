import mongoose from "mongoose";


const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rent: { type: Number, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true }, 
  tags: [{ type: [String], default: [] }],
  image: { type: String, default: "" },    
  tenant: {                                
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);
export default Property;
