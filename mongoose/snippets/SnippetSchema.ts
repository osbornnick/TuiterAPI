import mongoose, { Schema } from "mongoose";
import Snippet from "../../models/snippets/snippet";

const SnippetSchema = new mongoose.Schema<Snippet> (
    {
        code: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref: "UserModel"},
        created: {type: Date, default: Date.now},
    },
    {collection: "snippets"}
);
export default SnippetSchema;