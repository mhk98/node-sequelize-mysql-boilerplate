const router = require("express").Router();
const user = require("../../controllers/users/users.controller");


router.post("/signup", user.signup);
router.post("/login", user.login);
router.get("/", user.getAllUsers);
router.post("/", user.getAllUsers);
router.post("/", user.getAllUsers);


// router.get("/", verifyToken, authorization("super_admin"), user.getAllUsers);
router.get("/:id", user.getSingleUser);
// router.get("/", verifyToken, user.getAllUsers);

module.exports = router;
