import UserModel from "../models/user";

module.exports = {
  async me(req, res) {
    try {
      const userId = req.body.userId;
      console.log(userId);

      const user = await UserModel.findOne({ _id: userId });

      if (!user) throw new Error("Not found");

      user.password = undefined;
      res.send({
        data: user,
        status: true,
        message: "success"
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async creatUser(req, res) {
    try {
      const { username, password, email } = req.body;

      const user = new UserModel({ username, password, email });
      res.send(await user.save());
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
