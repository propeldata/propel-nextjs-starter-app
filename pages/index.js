import React from "react"
import router from "next/router"
import Head from "next/head"
import Link from "next/link"
import { ClientCredentials } from "simple-oauth2"
import { GraphQLClient, gql } from "graphql-request"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

import { Layout, Card } from "../components"
import { MetricsQuery } from "../graphql"

export async function getServerSideProps () {
  /**
   * Set the config for the OAuth2 client
   */
  const config = {
    client: {
      id: process.env.CLIENT_ID_SAMPLE_APP,
      secret: process.env.CLIENT_SECRET_SAMPLE_APP,
    },
    auth: {
      tokenHost: process.env.TOKEN_HOST,
      tokenPath: process.env.TOKEN_PATH,
    },
  }

  /**
   * Create the OAuth2 client
   */
  const oauth2Client = new ClientCredentials(config)
  const tokenParams = {
    scope: "<scope>",
  }

  /**
   * Get a token using the client credentials
   */
  const accessToken = await oauth2Client.getToken()

  return {
    props: {
      accessToken: accessToken.token.access_token,
    },
  }
}

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

export default function App ({ accessToken }) {
  const [metrics, setMetrics] = React.useState()
  const [selectedMetric, setSelectedMetric] = React.useState("")

  React.useEffect(() => {
    if (accessToken) {
      window.localStorage.setItem("accessToken", accessToken)
    }
  }, [accessToken])

  React.useEffect(() => {
    async function fetchData () {
      try {
        client.setHeader("authorization", "Bearer " + accessToken)
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
      <Layout appLink={<Link href="#">Docs</Link>}>
        <h1>
          Welcome to <a href="https://www.propeldata.com">Propel!</a>
        </h1>
        <p>How developers build data products.</p>
        <div className="select-container">
          {!metrics ? (
            "Loading..."
          ) : (
            <FormControl fullWidth sx={{ textAlign: "left" }}>
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
        </div>

        <style jsx>{`
          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 2rem;
          }

          .select-container {
            margin-top: 2rem;
            max-width: 300px;
            height: 58.86px;
            display: flex;
            justify-content: center;
            align-items: center;
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
