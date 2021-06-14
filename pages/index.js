import Head from 'next/head'
import Link from 'next/link'
import Styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
      <title>wonmo cyber shcool</title>
    </Head>
    <div className={Styles.container}>
      <h1>wonmo cyber school</h1>
      <p className={Styles.card}>제작 중</p>
      <Link href="http://localhost:7000/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth/test">
        oauth 2.0 google test
      </Link>
      <Link href="/about">
        about
      </Link>
    </div>
    </>
  )
}
