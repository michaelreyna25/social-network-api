const router = require('express').Router();

const {
    getUsers,
    getSingleUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../../contollers/userContoller');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUsers)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router