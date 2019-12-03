const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

// Don't open the browser during development
process.env.BROWSER = "none";

const cspConfigPolicy = {
  'default-src': "'self'",
  'base-uri': "'self'",
  'object-src': "'none'",
  'form-action': "'self'",
  'script-src': ["'self'"],
  'style-src': ["'self'"],
  'image-src': ["'self", "'data:image:"],
  'frame-ancestors': "'none'"
};


module.exports = {
  webpack: {
    // alias: { react: 'preact-compat', 'react-dom': 'preact-compat' },
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === "development"
          ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
          : [new cspHtmlWebpackPlugin(cspConfigPolicy)])
    ]
  },

  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
            __dirname,
            "src/styles/variables.less"
        )
      }
    }
  ]
};
