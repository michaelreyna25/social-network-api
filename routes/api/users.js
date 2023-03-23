const router = require('express').Router();

const {
    getUsers,
    getSingleUsers,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../contollers/userContoller');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUsers)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends')
    .post(addFriend);

router
    .route('/:userId/friends/:friendId')
    .delete(removeFriend);


module.exports = router