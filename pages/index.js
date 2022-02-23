import Head from 'next/head'
import Link from 'next/link'

import { Layout } from '../components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Propel Sample App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        appLink={(
          <Link href="#">
            Docs
          </Link>
        )}
      >
        <h1>
          Welcome to <a href="https://www.propeldata.com">Propel!</a>
        </h1>

        <p>
          How developers build data products.
        </p>

        <div className="grid">
          <Link href="/time-series">
            <div className="card">
              <h3>Time Series &rarr;</h3>
              <p>Build your first Time Series chart from your Metrics!</p>
            </div>
          </Link>
          <Link href="/counter">
            <div className="card">
              <h3>Counter &rarr;</h3>
              <p>Build your first metric counter visualization!</p>
            </div>
          </Link>
        </div>

        <style jsx>{`
          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
  
            max-width: 800px;
            margin-top: 3rem;
          }
          .card {
            padding: 1.5rem;
            margin: 1rem;
            flex-basis: 45%;

            text-align: left;
            text-decoration: none;
            color: inherit;

            border-radius: 4px;
            box-shadow: 0px 27px 123px rgba(6, 18, 154, 0.04), 0px 8.1px 37px rgba(6, 18, 154, 0.02),
    0px 3.3px 15.4px rgba(6, 18, 154, 0.02), 0px 1.2px 5.5px rgba(6, 18, 154, 0.01);

            transition: color 0.15s ease, border-color 0.15s ease;
            cursor: pointer;
          }
          .card:hover,
          .card:focus,
          .card:active {
            color: var(--color-primary);
            border-color: var(--color-primary);
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.00rem;
            line-height: 1.5;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
      </Layout>
    </>
  )
}
