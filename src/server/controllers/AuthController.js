// var users = [{ id:1 , email: 'hongly@slash.co', password: '123' }];
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

import JWTUtils from "../utils/JWTUtils";
module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (email && password) {
        // const user = users.find(user => user.email === email && user.password === password);
        const user = await userModel.findOne({ email });
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (user && isPasswordCorrect) {
          res.send({
            status: true,
            token: JWTUtils.sign(user._id),
            message: "Login successfully"
          });
        } else {
          res.status(401).send({
            status: false,
            message: "Email or Password is incorrect"
          });
        }
      }
    } catch (error) {
      console.log(error);

      res.status(400).send(error);
    }
  }
};
