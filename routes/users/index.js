const router = require("express").Router();
const user = require("../../controllers/users/users.controller");
const auth = require("../../middlewares/auth");
const { singleUpload } = require("../../middlewares/upload");


router.post("/signup", singleUpload, user.signup);
router.post("/login", user.login);
router.patch("/forgot-password", user.forgotPassword);
router.post("/refresh-token", user.refreshToken);
router.get("/", user.getAllUsers);
router.delete("/:id", user.deleteUser);
router.get("/:id", auth("admin"), user.getSingleUser);


// router.post("/signup", user.signup);
// router.post("/login", user.login);
// router.get("/", user.getAllUsers);
// router.delete("/", user.deleteUser);
// router.patch("/", user.updateUser);


// router.get("/", verifyToken, authorization("super_admin"), user.getAllUsers);
router.get("/:id", user.getSingleUser);
// router.get("/", verifyToken, user.getAllUsers);

module.exports = router;
