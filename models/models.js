const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Post = sequelize.define("posts", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  // img: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING },

  user_id: { type: DataTypes.INTEGER },
  userId: { type: DataTypes.INTEGER },
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = { User, Post };
