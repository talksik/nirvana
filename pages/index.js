import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='container m-20'>
      <main className="space-y-10">
        <p id="main-title">nirvana</p>

        <p>🍃your minimalist social media</p>

        <p>
          tired of the rat race on{' '}
          <font className='text-gray-500'>insta, tiktok, snap, &quot;meta&quot;...</font>?
        </p>

        <p>
          start your detox with us and:
          <br />
          - live in the present
          <br />
          - build a more intimate inner circle
          <br />
          - cut out the noise
          <br />
          - focus on your personal goals
          <br />
        </p>

        <p>
          wanna test the beta? text us @ <font className='text-gray-300'>949.237.2715</font>
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
          p.s. we don&apos;t sell your data or hire phd&apos;s to drug you...
          <br />
          <Image src="/zuck.jpg" alt="mark zuckerberg" width={60} height={60} />
        </p>
      </main>
    </div>
  );
}
