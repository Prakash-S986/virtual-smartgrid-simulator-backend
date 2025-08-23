import admin from 'firebase-admin'
let app
export function getFirebaseApp(){
  if (app) return app
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  let privateKey = process.env.FIREBASE_PRIVATE_KEY
  if (!projectId || !clientEmail || !privateKey) throw new Error('Missing Firebase service account envs')
  privateKey = privateKey.replace(/\\n/g,'\n')
  app = admin.initializeApp({ credential: admin.credential.cert({ projectId, clientEmail, privateKey }) })
  return app
}
