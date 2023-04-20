const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  createHouse,
  getAllHouses,
  getAllUsersTest,
  createUserTest,
} = require("../controllers/userRouterHandlers");

const router = require("express").Router();

// router
//   .route("/")
//   .get(getAllUsers)
//   .post(createUser)
//   .patch(updateUser)
//   .delete(deleteUser);
// router.route("/house").get(getAllHouses).post(createHouse);

router.route("/users").get(getAllUsersTest).post(createUserTest);
module.exports = router;
