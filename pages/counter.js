
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GraphQLClient, request, gql } from 'graphql-request'
import { ClientCredentials } from 'simple-oauth2'
import ReactECharts from 'echarts-for-react'

import { Layout } from '../components'
import chartBaseConfig from '../utils/counterBaseConfig'

export async function getServerSideProps() {
  /**
   * Set the config for the OAuth2 client
   */
  const config = {
    client: {
      id: process.env.CLIENT_ID_SAMPLE_APP,
      secret: process.env.CLIENT_SECRET_SAMPLE_APP
    },
    auth: {
      tokenHost: process.env.TOKEN_HOST,
      tokenPath: process.env.TOKEN_PATH
    }
  }

  /**
   * Create the OAuth2 client
   */
  const oauth2Client = new ClientCredentials(config)
  const tokenParams = {
      scope: '<scope>',
  }

  /**
   * Get a token using the client credentials
   */
  const accessToken = await oauth2Client.getToken()

  return {
    props: {
      accessToken: accessToken.token.access_token
    }
  }
}

/**
 * Set the query
 */
const QUERY = gql`
  query caseQueryCounter ($id: ID!) {
    metric (id: $id) {
      counter (input: {
        timeRange: {
          relative: PREVIOUS_WEEK
        }
      }) {
        value
      }
    }
  }
`

/**
 * Create a graphql client
 */
const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2)

export default function Counter({ accessToken }) {
  const [options, setOptions] = React.useState()

  React.useEffect(() => {
    async function fetchData () {
      try {
        client.setHeader('authorization', 'Bearer ' + accessToken)
        const { metric } = await client.request(QUERY, {
          /**
           * Your Metric ID
           */
          id: 'MET01FV2JKFHCJTVNTXWGYFJ2Q8T8'
        })

        setOptions({
          series: [{
            ...chartBaseConfig,
            data: [
              {
                value: metric.counter.value
              }
            ]
          }]
        })
      } catch (error) {}
    }

    if (accessToken) {
      fetchData()
    }
  }, [accessToken])

  return (
    <>
      <Head>
        <title>Propel Sample Time Series</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        appLink={(
          <Link href="/">
            &larr; back to home
          </Link>
        )}
      >
        <h1>
          Metric Counter
        </h1>

        <p>
          California COVID cases yesterday
        </p>

        {!!options && <ReactECharts option={options} />}
      </Layout>
    </>
  )
}
