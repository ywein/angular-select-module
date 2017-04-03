module.exports = {
  plugins: [
    require('postcss-cssnext')({
      browsers: [
        "> 1%",
        "last 2 versions"
      ]
    }),
  ]
}