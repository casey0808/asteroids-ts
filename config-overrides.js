const {
  override,
  adjustStyleLoaders,
  addWebpackResolve,
} = require('customize-cra');

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
  }),
  addWebpackResolve({
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  })
);
// devServer(configFn) {
//   return (proxy, allowedHost) => {
//     const config = configFn(proxy, allowedHost);

//     config.headers ={
//       'Access-Control-Allow-Origin': '*',
//     }
//     return config;

//   }
// }
