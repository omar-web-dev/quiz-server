import mongoose from "mongoose";
const categorySchema: mongoose.Schema = new mongoose.Schema({
  categoryName: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Category Name is required."],
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
