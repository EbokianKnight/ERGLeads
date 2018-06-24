const { environment } = require('@rails/webpacker')
module: {
  rules: [
    {
      test: /\.js(\.erb)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['env', { modules: false, "targets": { "node": "current" }}],
          'react',
          'stage-0'
        ]
      }
    },
  ]
}
environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
  options: {
    attempts: 1
  }
});
module.exports = environment
