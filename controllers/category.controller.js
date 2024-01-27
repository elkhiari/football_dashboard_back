const categoryModel = require('../models/category.model');
const channelModel = require('../models/channel.model');

const create = async (req, res) => {
    try {
        const {
            name,
            logo,
            description
        } = req.body;
        const category = new categoryModel({
            name,
            logo,
            description
        });
        const data = await category.save();
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Category.',
        });
    }
}

const findAll = async (req, res) => {
    try {
        const data = await categoryModel.aggregate([{
            $lookup: {
                from: 'channels',
                localField: '_id',
                foreignField: 'category',
                as: 'channels',
            },
        }, ]);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving categories.',
        });
    }
}
const finddd = async (req, res) => {
    try {
        const data = await categoryModel.find();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving categories.',
        });
    }
}

const findOne = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const data = await categoryModel.findById(id);
        if (!data) {
            return res.status(404).send({
                message: `Category with id ${id} not found`,
            });
        }
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error retrieving category with id ${id}`,
        });
    }
}

const update = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            logo,
            description
        } = req.body;
        const data = await categoryModel.findByIdAndUpdate(id, {
            name,
            logo,
            description
        }, {
            new: true
        });
        if (!data) {
            return res.status(404).send({
                message: `Category with id ${id} not found`,
            });
        }
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error updating category with id ${id}`,
        });
    }
}

const remove = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const data = await categoryModel.findByIdAndRemove(id);
        if (!data) {
            return res.status(404).send({
                message: `Category with id ${id} not found`,
            });
        }
        await channelModel.deleteMany({
            category: id
        });
        res.send({
            message: 'Category was deleted successfully!',
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not delete category with id ${id}`,
        });
    }
}



module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
    finddd
}