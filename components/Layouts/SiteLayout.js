
import Head from "next/head"

export default function SiteLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>nirvana</title>
        <link rel="icon" href="/icon.png" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
      </Head>

      <main>
        {children}
      </main>
    </>
  )
}