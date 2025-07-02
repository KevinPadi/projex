import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'

export default function App() {

  const { isSignedIn, user } = useUser()

  const handleProtectedClick = async () => {
    fetch('http://localhost:3000/protected', {
      method: 'GET',
      credentials: 'include', // importante para enviar cookies de sesión Clerk
    })
    .then(res => res.json())
    .then(data => {
      console.log('Usuario autenticado:', data.user)
    })
    .catch(err => {
      console.error('Error:', err)
    })
  }

  useEffect(() => {
    if (isSignedIn) console.log(user)
    else console.log('Usuario NO logueado:', user)
  }, [isSignedIn, user])

  return (
    <header>
      <SignedOut>
        <SignInButton  />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <button onClick={handleProtectedClick} style={{ backgroundColor: "white", color: "black", border: "1px solid black", padding: "10px 20px", borderRadius: "5px" }}>
        Protected
      </button>
    </header>
  )
}