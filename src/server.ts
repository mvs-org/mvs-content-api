import app from './app'

const PORT = (process.env.PORT) ? process.env.PORT : 80

app.listen(PORT, () => {
    console.log('Metaverse Content API server listening on port ' + PORT)
})
