const express = require("express")
const morgan = require('morgan')
const app = express()
const store = require("./db/store")

const PORT = process.env.PORT || 3001; 

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app)

app.listen(PORT, ()=> {
    console.log("Listening on port", PORT)
})








