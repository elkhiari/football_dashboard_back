const movieModel = require('../models/movie.model');

const create = async (req, res) => {
    try {
        const {
            link,
            title,
            description,
            thumbnail
        } = req.body;
        const movie = new movieModel({
            link,
            title,
            description,
            thumbnail
        });
        const data = await movie.save();
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Movie.',
        });
    }
}

const findAll = async (req, res) => {
    try {
        const data = await movieModel.find();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving movies.',
        });
    }
}

const findOne = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const data = await movieModel.findById(id);
        if (!data) {
            return res.status(404).send({
                message: `Movie with id ${id} not found`,
            });
        }
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error retrieving movie with id ${id}`,
        });
    }
}

const update = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            link,
            title,
            description,
            thumbnail
        } = req.body;
        const movie = await movieModel.findByIdAndUpdate(id, {
            link,
            title,
            description,
            thumbnail
        }, {
            new: true
        });
        if (!movie) {
            return res.status(404).send({
                message: `Movie with id ${id} not found`,
            });
        }
        res.send(movie);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error updating movie with id ${id}`,
        });
    }
}


const remove = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const data = await movieModel.findByIdAndRemove(id);
        if (!data) {
            return res.status(404).send({
                message: `Movie with id ${id} not found`,
            });
        }
        res.send({
            message: 'Movie was deleted successfully!',
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not delete movie with id ${id}`,
        });
    }
}


module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
}