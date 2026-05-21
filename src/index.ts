import app from "./app"
import config from "./config"
import { initDB } from "./db"



app.listen(config.port, () => {
initDB()
  console.log(`server listening on port ${config.port}`)
})