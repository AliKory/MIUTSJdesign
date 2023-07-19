const { DataTypes } = require("sequelize");
   const db = require("../database/connection");

   const Comment = db.define("Comment", {
     content: {
       type: DataTypes.TEXT,
       allowNull: false,
     },
   });

   module.exports = Comment;