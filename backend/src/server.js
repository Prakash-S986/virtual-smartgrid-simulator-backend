import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDb } from './lib/db.js'
import { requireAuth } from './middleware/auth.js'
import projects from './routes/projects.js'
import config from './routes/config.js'

dotenv.config()
const app = express()
app.use(helmet())
app.use(compression())
app.use(express.json({limit:'1mb'}))
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }))
app.use(morgan('tiny'))

app.get('/api/health', (req,res)=>res.json({ok:true}))
app.use('/api/config', config)
app.use('/api/projects', requireAuth, projects)

const port = process.env.PORT || 4001
connectDb(process.env.MONGO_URI).then(()=>{
  app.listen(port, ()=> console.log('API on :' + port))
}).catch(e=>{ console.error('DB error', e.message); process.exit(1) })
