import mongoose from "mongoose";
import { authorSchema } from "./Author.js";

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { 
    type: String, 
    required: [true, "Book's title is required" ] 
  },
  publisher: { type: String },
  price: { type: Number },
  pages: { 
    type: Number,
    min: [10, "The number of pages must be a value between 10 and 5000. Value typed: {VALUE}"],
    max: [5000, "The number of pages must be a value between 10 and 5000. Value typed: {VALUE}"]
  },
  author: authorSchema
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;