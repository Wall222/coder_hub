const app = require('./app')
const config = require('./app/config')


app.listen(8002, () => {
  console.log(`服务器在8002启动成功`);
})

