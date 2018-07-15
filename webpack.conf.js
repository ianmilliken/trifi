import webpack from "webpack";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default {
  module: {
    loaders: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {
          presets: ['react'],
          cacheDirectory: true
        }
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
     // "fetch": "imports?this=>global!exports?global.fetch!whatwg-fetch"
     // no longer allowed to omit the '-loader' suffix when using loaders
      "fetch": "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),
    new webpack.DefinePlugin({
      CONSUMER_KEY: JSON.stringify(process.env.CONSUMER_KEY),
      USER_ID: JSON.stringify(process.env.USER_ID),
      FLICKR_API_KEY: JSON.stringify(process.env.FLICKR_API_KEY),
      FLICKR_CONSUMER_SECRET: JSON.stringify(process.env.FLICKR_CONSUMER_SECRET),
    })
  ],

  context: path.join(__dirname, "src"),
  entry: {
    app: ["./js/app"],
    cms: ["./js/cms"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  externals:  [/^vendor\/.+\.js$/]
};
