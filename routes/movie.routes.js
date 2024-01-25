const {
    create,
    findAll,
    findOne,
    update,
    remove
} = require('../controllers/movie.controller')

const categoryRoutes = require('express').Router();
const { auth } = require('../middlewares/auth.middleware');

categoryRoutes.route('/').post(auth, create).get(findAll);
categoryRoutes.route('/:id').get(findOne).put(auth, update).delete(auth, remove);

module.exports = categoryRoutes;

