const path = require("path");
const uuid = require("uuid");
const { Post } = require("../models/models");
const ApiError = require("../error/ApiError");
// let fileName = uuid.v4() + ".jpg";

// console.log(fileName);

class PostsController {
  async create(req, res, next) {
    try {
      console.log(req.body);
      const { title, description } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const post = await Post.create({
        title,
        description,
        img: fileName,
        // userId,
      });
      return res.json(post);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async get(req, res) {
    let { search, limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    const post = await Post.findAll({ limit, offset });
    return res.json(post);
  }
  async getOne(res, req) {}
  async delete(req, res) {}
}

module.exports = new PostsController();
