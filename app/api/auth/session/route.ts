import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { functions } from 'firebase-functions'

// Initialize Firebase Admin if it hasn't been initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.EVKE_PROJECT_ID,
      clientEmail: process.env.EVKE_CLIENT_EMAIL,
      privateKey: process.env.EVKE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.EVKE_DATABASE_URL,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()
    
    // Verify the ID token
    const decodedToken = await getAuth().verifyIdToken(idToken)
    
    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn })
    
    // Create response
    const response = NextResponse.json({ status: 'success' })
    
    // Set the cookie
    response.cookies.set('__session', sessionCookie, {
      maxAge: expiresIn / 1000, // Convert to seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
    
    return response
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ status: 'success' })
  response.cookies.delete('__session')
  return response
}

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('__session')?.value
    
    if (!sessionCookie) {
      throw new Error('No session cookie')
    }
    
    // Verify the session cookie
    const decodedClaims = await getAuth().verifySessionCookie(sessionCookie, true)
    
    return NextResponse.json({ 
      status: 'success',
      user: decodedClaims
    })
  } catch (error) {
    console.error('Error verifying session:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
} 