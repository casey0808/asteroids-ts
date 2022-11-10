const { override, adjustStyleLoaders } = require('customize-cra');

module.exports = override(
  adjustStyleLoaders((rule) => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push(
        { loader: 'sass-loader' },
        {
          loader: require.resolve('sass-resources-loader'),
          options: {
            resources: [path.resolve(__dirname, './src/styles/global.scss')],
          },
        }
      );
    }
  })
);
