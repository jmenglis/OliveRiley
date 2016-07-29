import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import config from "../../webpack.config.dev.js"

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
})

server.listen(8080, 'localhost', function() {
  console.log("Dev-Server with Hot Reloading")
})
