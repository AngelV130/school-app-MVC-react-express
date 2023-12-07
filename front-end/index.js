import express, { json } from 'express'
import { to_do } from './app/routes/Routes.js'
import { corsMiddleware } from './app/middlewares/cors.js'

import TableTODO from './app/database/table_todos.js'
const creteTableTODO = TableTODO
await creteTableTODO()


const app = express()
app.use(json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Origin', '*')
    corsMiddleware()
    next()
})
app.disable('x-powered-by')


app.use('/api', to_do)

const PORT = 3000

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});