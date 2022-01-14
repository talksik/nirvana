import '../styles/globals.css'
import 'antd/dist/antd.css';
import Head from 'next/head'
import { AuthProvider } from '../contexts/authContext'
import SiteLayout from '../components/Layouts/SiteLayout'

function MyApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SiteLayout>
  )
}

export default MyApp
