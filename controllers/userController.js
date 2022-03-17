const ApiError = require("../error/ApiError");

class UserController {
  async register(req, res) {}
  async login(req, res) {}
  async check(req, res, next) {
    const query = req.query;
    if (5 < 3) {
      return next(ApiError.badRequest("err"));
    }
    res.json(query);
  }
}

module.exports = new UserController();
