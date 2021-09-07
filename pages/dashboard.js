
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function Dashboard({ charts }) {
  console.log('charts', charts);
  return (
    <Layout>
    <div className="container">
      <Head>
        <title>Propel Sample Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <h1>Dashboard</h1>
      <div className="grid">
        first chart
      </div>
      <div className="grid">
        <Link href="/">
          <a href="https://nextjs.org/docs" className="card">
            <h3>&larr; Back to home</h3>
          </a>
          </Link>
        </div>
      </main>
      </div>
      </Layout>
  )
  }

  export async function getServerSideProps(context) {

    const { data } = await client.query({
      query: gql`
        query GetLaunches {
          launchesPast(limit: 10) {
            id
            mission_name
            launch_date_local
            launch_site {
              site_name_long
            }
            links {
              article_link
              video_link
              mission_patch
            }
            rocket {
              rocket_name
            }
          }
        }
      `
    });

    return {
      props: {
        charts: data.launchesPast
      }
    }
  }