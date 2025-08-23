import express from 'express'
const r = express.Router()
r.get('/', (req,res)=> res.json({ appName:'Virtual SmartGrid', defaultTheme:'dark'}))
export default r
