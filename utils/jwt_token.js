const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.generateToken = (userInfo) => {
  // return jwt.sign({ email: email }, process.env.JWT_SECRET, {
  //   expiresIn: 60 * 60 * 24,
  // });

  // console.log('userInfo', userInfo)
  const payload = {
    User_Email: userInfo.User_Email,
    role: userInfo.role,
  };

  console.log('payload', payload)
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 30,
  });
  // console.log(token)
  return token;
};

// module.exports.verifyJWT = (token) => {
//   return jwt.verify(token, process.env.JWT_SECRET);
// };
