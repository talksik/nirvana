import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Teams() {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />

        <title>nirvana for teams</title>

        <link rel="icon" href="/icon.png" />

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
      </Head>

      <main className="space-y-10">
        <p id="main-title">nirvana</p>

        <p>🍃voice first collaboration for remote teams</p>

        <p>
          tired of spending most of the work day on{' '}
          <font color="grey" className="text-3xl">slack, <font className="text-2xl">zoom,</font> <font className="text-xl">ms teams,</font> <font className="text-lg">trello,</font> <font className="text-base">outlook,</font> <font className="text-base">gcal, </font><font className="text-sm">notion,</font> <font className="text-xs">gmail...</font>?</font>
        </p>

        <p>
          focus on actually working and:
          <br />
          - cut the texting, emojis, and notifications
          <br />
          - increase collaboration without endless threads
          <br />
          - avoid 80% of meetings with asynchronous and spontaneous convos
          <br />
          - form better relationships with your team
          <br />
        </p>

        <p>
          wanna test the beta? text us @ <font color="grey">949.237.2715</font>
        </p>

        {/* <marquee
          direction="left"
          width="100%"
          height="100%"
          behavior="scroll"
          scrollamount="12"
          offset="0%"
        >
          <p id="marquee-text">waitlist currently sitting at 2,324 people...</p>
        </marquee> */}

        <p id="side-note">
          why? we live in a distracted world. let's fix it, because less is more. 
        </p>
      </main>
    </div>
  );
}
