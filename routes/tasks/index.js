const router = require("express").Router();
const task = require("../../controllers/tasks/tasks.controller");


router.post("/create", task.createTask);
router.get("/", task.getAllTask);
router.delete("/:id", task.deleteTask);
router.patch("/:id", task.updateTask);


module.exports = router;
