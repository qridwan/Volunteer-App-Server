const express= require('express')
const cors = require('cors')
const port = process.env.PORT || 4000
const app = express()
app.use(cors())

app.post('/', (req, res) => {
    res.send("lollllllllll")
})
app.listen(port)