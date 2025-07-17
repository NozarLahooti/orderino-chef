import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './db.js'
import recipeRoutes from './routes/recipeRoutes.js'


const app = express()
const port = process.env.PORT || 8080


app.use(cors())
app.use(express.json())

connectDb()

app.get('/', (req, res) => {
    res.json('Hello (from server)')
    
})

// Mount routes
app.use('/api/recipes', recipeRoutes)

app.listen(port, () => {
     console.log('listining on port:' + port)
    })