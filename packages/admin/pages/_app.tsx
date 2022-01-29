import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}


// import { connection }from '@nirvana/common' 
// connection() 

export default MyApp
