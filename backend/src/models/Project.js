import mongoose from 'mongoose'
const Project = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  type: { type: String, default: 'grid' },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
},{timestamps:true})
export default mongoose.model('Project', Project)
