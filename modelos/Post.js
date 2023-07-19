const { DataTypes } = require("sequelize");
   const db = require("../database/connection");

   const Post = db.define("Post", {
     title: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     content: {
       type: DataTypes.TEXT,
       allowNull: false,
     },
     rating: {
       type: DataTypes.INTEGER,
       defaultValue: 0,
     },
   });

   module.exports = Post;