import express from 'express'
import Project from '../models/Project.js'
const r = express.Router()
r.post('/', async (req,res)=>{
  const { name, type, data } = req.body||{}
  if (!name) return res.status(400).json({error:'name is required'})
  const doc = await Project.create({ userId: req.user.uid, name, type, data })
  res.status(201).json(doc)
})
r.get('/', async (req,res)=>{
  const docs = await Project.find({ userId: req.user.uid }).sort({updatedAt:-1}).lean()
  res.json(docs)
})
r.delete('/:id', async (req,res)=>{
  const d = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.uid })
  if (!d) return res.status(404).json({error:'Not found'})
  res.json({ok:true})
})
export default r
