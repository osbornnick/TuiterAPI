import { Schema } from "mongoose";

export default class Tuit {
    private tuit: string = "";
    private postedOn: Date = new Date();
    private postedBy: Schema.Types.ObjectId | null = null;
}
