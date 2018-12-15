 const path = require("path");
 const HWP = require("html-webpack-plugin");

 module.exports = {
     entry: "./src/index.js",
     output: {
         filename: "index.js",
         path: "./public/assets"
     },
     module: {
         rules: [{
             test: /\.js$/,
             loader: "babel-loader",
             exclude: /node_modules/
         }]
     },
     plugins: [
         new HWP({
             template: path.join(__dirname, "/src/index.html")
         })
     ]
 }