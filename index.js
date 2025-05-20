
import Head from 'next/head'
import VoraCompanion from '../components/VoraCompanion'
import '../styles/globals.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>VORA – NAVORA AI Companion</title>
      </Head>
      <VoraCompanion />
    </>
  )
}
