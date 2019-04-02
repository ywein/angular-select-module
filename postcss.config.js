module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-cssnext')({
      browsers: [
        "> 1%",
        "last 2 versions"
      ]
    }),
  ]
}