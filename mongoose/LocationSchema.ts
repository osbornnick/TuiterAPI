import mongoose from "mongoose";
const LocationSchema = new mongoose.Schema(
    {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    { collection: "locations" }
);
export default LocationSchema;
