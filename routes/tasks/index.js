const router = require("express").Router();
const task = require("../../controllers/tasks/tasks.controller");
const auth = require("../../middlewares/auth");


router.post("/create", task.createTask);
router.get("/", task.getAllTask);
router.delete("/:id", auth('admin'), task.deleteTask);
router.patch("/:id", task.updateTask);


module.exports = router;
