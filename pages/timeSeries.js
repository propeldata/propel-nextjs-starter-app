
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import { GraphQLClient, request, gql } from 'graphql-request'
import { ClientCredentials } from "simple-oauth2";
import ReactECharts from 'echarts-for-react';



export default function TimeSeries({ timeSeries }) {
  console.log('timeSeries', timeSeries);
  const options = {
    xAxis: {
      data: timeSeries.labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: timeSeries.values,
        type: 'line',
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  return (
    <Layout>
    <div className="container">
      <Head>
        <title>Propel Sample Time Series</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <h1>Time Series</h1>
      <p>California COVID cases</p>
      <div className="grid">
      <ReactECharts option={options} />
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
    
    //Set the query

    const query = gql`
      query caseQuery ($id: ID!) {
        metric (id: $id) {
          timeSeries (input: {
            timeRange: {
              relative: LAST_3_MONTHS
            }
            granularity: DAY
          }) {
            labels
            values
          }
        }
      }
    `
    const variables = {
      id: 'MET01FT9PAYDWAE91EEY31KXRTC73',
    }
      

    // Set the config for the OAuth2 client
    const config = {
        client: {
            id: process.env.CLIENT_ID_SAMPLE_APP,
            secret: process.env.CLIENT_SECRET_SAMPLE_APP
        },
        auth: {
            tokenHost: process.env.TOKEN_HOST,
            tokenPath: process.env.TOKEN_PATH
        }
    };

    // Create the OAuth2 client
    const oauth2Client = new ClientCredentials(config);
    const tokenParams = {
        scope: '<scope>',
    };

    // Get a token using the client credentials
    const accessToken = await oauth2Client.getToken()

    // Create a GraphQL client
    const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT_US_EAST_2)
    client.setHeader('authorization', 'Bearer ' + accessToken.token.access_token)
    const data = await client.request(query, variables)

    return {
      props: {
        timeSeries: data.metric.timeSeries
      }
    }
  }