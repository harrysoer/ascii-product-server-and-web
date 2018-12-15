 const path = require("path");

 module.exports = {
     mode: "development",
     entry: ["@babel/polyfill", "./src/index.js"],
     output: {
         path: path.resolve("public/assets"),
         filename: "index.js"
     },
     module: {
         rules: [{
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: "babel-loader",
             query: {
                 presets: ["@babel/react", "@babel/env", "@babel/flow"],
                 plugins: [
                     "react-html-attrs",
                 ]
             }
         }]
     }
 };