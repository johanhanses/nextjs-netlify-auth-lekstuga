import Head from "next/head"
import Header from "@components/Header"
import Footer from "@components/Footer"
import { useEffect, useState } from "react"
import netlifyAuth from "../netlifyAuth.js"

const login = () => {
  netlifyAuth.authenticate((user) => {
    setLoggedIn(!!user)
    setUser(user)
    netlifyAuth.closeModal()
  })
}

const logout = () => {
  netlifyAuth.signout(() => {
    setLoggedIn(false)
    setUser(null)
  })
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
  const [user, setUser] = useState(null)

  useEffect(() => {
    netlifyAuth.initialize((user) => {
      setLoggedIn(!!user)
      setUser(user)
    })
  }, [loggedIn])

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />

        {loggedIn ? (
          <div>
            You are logged in!
            {user && <>Welcome {user?.user_metadata.full_name}!</>}
            <br />
            <button onClick={logout}>Log out here.</button>
          </div>
        ) : (
          <button onClick={login}>Log in here.</button>
        )}
      </main>

      <Footer />
    </div>
  )
}
