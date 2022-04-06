import { getProviders, signIn } from "next-auth/react"
import Head from "next/head"
import { Login } from "../../components/partials/Login"

export default function SignIn({ providers }) {
  return (
    <>
    <Head><title>Instagram 2.0 - Login</title></Head>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Login
          proName={provider.name}
          proId={provider.id}
          />
        </div>
      ))}
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}