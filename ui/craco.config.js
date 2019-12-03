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
  'object-src': "'self'",
  'form-action': "'self'",
  'img-src': ["'self'", "data:"],
  'script-src': ["'self'", "'unsafe-eval'"],
  'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
};

const cspConfigHash = {
  enabled: true,
  hashingMethod: 'sha256',
  hashEnabled: {
    'script-src': true,
    'style-src': true
  },
  nonceEnabled: {
    'script-src': true,
    'style-src': false
  }
};


module.exports = {
  webpack: {
    // alias: { react: 'preact-compat', 'react-dom': 'preact-compat' },
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === "development"
          ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
          : [])
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
