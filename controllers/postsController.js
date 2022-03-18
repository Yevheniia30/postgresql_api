const path = require("path");
const uuid = require("uuid");
const { Post } = require("../models/models");
const ApiError = require("../error/ApiError");
const { json } = require("express/lib/response");
// let fileName = uuid.v4() + ".jpg";

// console.log(fileName);

class PostsController {
  async create(req, res, next) {
    try {
      const { title, description, user_id } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const post = await Post.create({
        title,
        description,
        img: fileName,
        user_id,
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
    const post = await Post.findAndCountAll({ limit, offset });
    return res.json(post);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const post = await Post.findOne({
      where: { id },
    });
    return res.json(post);
  }

  async delete(req, res) {
    const { id } = req.params;
    const post = await Post.destroy({
      where: { id },
    });
    return res.json(post);
  }
}

module.exports = new PostsController();
