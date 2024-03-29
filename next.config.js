const withPlugins = require("next-compose-plugins"); // for glsl file loaders
const withTM = require("next-transpile-modules")(["three"]);

const nextConfig = {
  webpack(config, { webpack, dev, isServer }) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};

module.exports = withPlugins(
  [withTM],
  Object.assign(nextConfig, { reactStrictMode: true })
);
