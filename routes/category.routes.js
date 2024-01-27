const categoryRoutes = require('express').Router();
const { auth, authAdmin } = require('../middlewares/auth.middleware');

const {
    create,
    findAll,
    findOne,
    update,
    remove,
    finddd
} = require('../controllers/category.controller');

categoryRoutes.route('/').post(auth, authAdmin, create).get(finddd);
categoryRoutes.route('/chan/cate').get(findAll);
categoryRoutes.route('/:id').get(findOne).put(auth, update).delete(auth, remove);


module.exports = categoryRoutes;