const db = require("../../models");
const Task = db.task;

exports.createTask = async (req, res) => {
  try {
    const result = await Task.create(req.body);

    res.status(200).send({
      status: "Success",
      message: "Successfully created task",
      data: result,
    });
  } catch (error) {
    
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllTask = async (req, res) => {
  try {
    const result = await Task.findAll();

    res.status(200).send({
      status: "Success",
      message: "Successfully got all result",
      data: result,
    });
  } catch (error) {
   
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.singleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Task.findOne({
      where: { Id: id },
    });

    if (!result) {
      return res.status(401).send({
        status: "fail",
        message: "No result found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully got your result",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Task.destroy({
      where: { Id: id },
    });

    if (!result) {
      return res.status(401).send({
        status: "fail",
        message: "No result found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete your result",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await Task.update(data, {
      where: { Id: id },
    });

    if (!result) {
      return res.status(401).send({
        status: "fail",
        message: "No result found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully update your result",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};