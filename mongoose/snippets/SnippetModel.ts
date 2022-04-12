import mongoose from "mongoose";
import SnippetSchema from "./SnippetSchema";

const SnippetModel = mongoose.model("SnippetMode", SnippetSchema);
export default SnippetModel;