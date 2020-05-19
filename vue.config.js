module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/login": {
        ws: true,
        changeOrigin: true,
        target: "http://localhost:8000"
      }
    }
  }
};
