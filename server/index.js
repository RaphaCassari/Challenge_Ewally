const express = require('express'),
    app = express(),
    routes = require('./layers/routes/index'),
    cors = require('cors'),
    port = process.env.PORT || '3000'

// Para interpretar o require
app.use(express.json())

app.use(
    cors({
        origin: '*',
    })
)
app.options('*', cors())

app.use(routes)

app.listen(port, function() {
    console.log(`http://localhost:${port}`)
})