// import connection of sequelizeconsole
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection re-synced");
  })
  .catch((err) => {
    console.log("Error on re-synced", err);
  });

// eslint-disable-next-line @typescript-eslint/no-var-requires
db.user = require("../models/users/user")(db.sequelize, DataTypes);

// db.Course.hasMany(db.Intake, { foreignkey: "Course_Id" });
// db.Intake.belongsTo(db.Course, { foreignkey: "Course_Id" });

// db.Teacher.hasMany(db.Intake, { foreignkey: "Teacher_Id" });
// db.Intake.belongsTo(db.Teacher, { foreignkey: "Teacher_Id" });

module.exports = db;
