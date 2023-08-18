import mongoose from "mongoose";
const categorySchema: mongoose.Schema = new mongoose.Schema({
  categoryName: {
    type: String,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
