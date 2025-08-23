import { getFirebaseApp } from '../lib/firebaseAdmin.js'
export async function requireAuth(req,res,next){
  try{
    const h = req.headers.authorization||''
    const token = h.startsWith('Bearer ') ? h.slice(7) : null
    if (!token) return res.status(401).json({error:'Missing token'})
    const app = getFirebaseApp()
    const decoded = await app.auth().verifyIdToken(token)
    if (!decoded.email_verified) return res.status(403).json({error:'Email not verified'})
    req.user = { uid: decoded.uid, email: decoded.email }
    next()
  }catch(e){ return res.status(401).json({error:'Invalid token'}) }
}
