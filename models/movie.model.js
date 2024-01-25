const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    link: {
        type: String,
        required: [true, "Movie link is required"],
    },
    title: {
        type: String,
        required: [true, "Movie title is required"],
    },
    description: {
        type: String,
        required: [true, "Movie description is required"],
    },
    thumbnail: {
        type: String,
        required: [true, "Movie thumbnail is required"],
    },
})

module.exports = mongoose.model("movie", MovieSchema);