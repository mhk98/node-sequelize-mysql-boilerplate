const db = require("../../models");
const Product = db.product;

exports.createProduct = async (req, res) => {
  try {
    const result = await Product.create(req.body);

    res.status(200).send({
      status: "Success",
      message: "Successfully created product",
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

exports.getAllProduct = async (req, res) => {
  try {
    const result = await Product.findAll();

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
exports.singleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Product.findOne({
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
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Product.destroy({
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

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await Product.update(data, {
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