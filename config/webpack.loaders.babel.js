module.exports = {
  test: /\.js$/,
  use: [
    {
      loader: 'babel-loader',
      query: {
        presets: [
          'env',
          'react',
          'es2015'
        ],
        plugins: [
          'transform-class-properties',
          'transform-async-to-generator',
          'transform-object-rest-spread'
        ]
      }
    }
  ],
  include: [
    /src/
  ]
}