import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { GraphQLClient } from 'graphql-request'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import { ClientCredentials } from 'simple-oauth2'

import { Card, Loader } from '../components'
import { MetricsQuery } from '../graphql'

export async function getServerSideProps() {
  /**
   * Set the config for the OAuth2 client
   */
  const config = {
    client: {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET
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

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

export default function App({ accessToken }) {
  const [metrics, setMetrics] = React.useState()
  const [selectedMetric, setSelectedMetric] = React.useState('')

  React.useEffect(() => {
    if (accessToken) {
      window.localStorage.setItem('accessToken', accessToken)
    }
  }, [accessToken])

  React.useEffect(() => {
    async function fetchData() {
      try {
        client.setHeader('authorization', 'Bearer ' + accessToken)
        const { metrics } = await client.request(MetricsQuery)

        setMetrics(metrics)
      } catch (error) {}
    }

    if (accessToken) {
      fetchData()
    }
  }, [accessToken])

  const handleChange = (event) => {
    setSelectedMetric(event.target.value)
  }

  const handleCardClick = (pageRef) => {
    router.push(`/${pageRef}/${selectedMetric}`)
  }

  return (
    <>
      <Head>
        <title>Propel Sample App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <Image
          src="/logo-lg.svg"
          width={153}
          height={153}
          alt="Propel"
          style={{ margin: 'auto' }}
        />
        <Image
          src="/logo-lg-text.svg"
          width={218}
          height={67}
          alt="Propel"
          style={{ margin: 'auto', marginBottom: 16 }}
        />
        <h5 style={{ marginBottom: '2rem' }}>
          How developers build data applications.
        </h5>
        <Link href="https://www.propeldata.com/docs" target="_blank">
          Documentation
        </Link>
        <div className="select-container">
          {!metrics ? (
            <Loader />
          ) : (
            <FormControl fullWidth sx={{ maxWidth: ['100%', 300] }}>
              <InputLabel id="select-metric-label">Select a Metric</InputLabel>
              <Select
                labelId="select-metric-label"
                label="Select a Metric"
                id="demo-simple-select"
                value={selectedMetric}
                onChange={handleChange}
              >
                {metrics.nodes.map((metric) => (
                  <MenuItem key={metric.id} value={metric.id}>
                    {metric.uniqueName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>

        <div className="grid">
          <Card
            title="Time Series"
            description="Build your first Time Series chart from your Metrics!"
            pageRef="time-series"
            onClick={handleCardClick}
            disabled={!selectedMetric}
          />
          <Card
            title="Counter"
            description="Build your first Metric Counter visualization!"
            pageRef="counter"
            onClick={handleCardClick}
            disabled={!selectedMetric}
          />
          <Card
            title="Leaderboard"
            description="Build your first Leaderboard Metric visualizations!"
            pageRef="leaderboard"
            onClick={handleCardClick}
            disabled={!selectedMetric}
          />
        </div>

        <style jsx>{`
          .container {
            max-width: 1200px;
            min-height: 100vh;
            margin: auto;
            margin-top: 1rem;
            align-items: center;
            text-align: center;
            padding: 1rem;
          }

          .grid {
            display: flex;
            align-items: stretch;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 1rem;
            margin-bottom: 1rem;
            width: 100%;
            display: grid;
            grid-auto-rows: 1fr;
            grid-template-columns: 1fr 1fr 1fr;
          }

          .select-container {
            margin: 2rem 1rem 0 1rem;
            height: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            align-items: center;
          }

          @media (max-width: 600px) {
            .container {
              min-width: 400px;
            }
            .grid {
              width: 100%;
              flex-direction: column;
              grid-auto-rows: unset;
              grid-template-columns: unset;
              justify-content: stretch;
            }
          }
        `}</style>
      </div>
    </>
  )
}
