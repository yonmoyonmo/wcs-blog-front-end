import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  
  const oauth2EndPoint = "http://localhost:7000/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth/test"


  return (
    <>
    <Head>
      <title>wonmo cyber shcool</title>
    </Head>
    <div>
      <h1>wonmo cyber school</h1>
      <p>제작 중</p>
      <Link href={oauth2EndPoint}>
        oauth 2.0 google test
      </Link>
      <Link href="/about">
        about
      </Link>
    </div>
    </>
  )
}
