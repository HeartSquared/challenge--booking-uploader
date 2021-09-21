const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  babel: {
    plugins: ["@vanilla-extract/babel-plugin"],
  },
  webpack: {
    plugins: {
      add: [new VanillaExtractPlugin()]
    },
    configure: (config) => {
      config.module.rules.push({
        test: /\.vanilla\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              url: false
            }
          }
        ]
      })
      return config;
    },
  }
};
