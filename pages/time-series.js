
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GraphQLClient, gql } from 'graphql-request'
import { ClientCredentials } from 'simple-oauth2'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import Box from '@mui/material/Box'

import { Layout } from '../components'
import timeSeriesBaseConfig from '../utils/timeSeriesBaseConfig'

export async function getServerSideProps(context) {
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
  query caseQuery ($id: ID!) {
    metric (id: $id) {
      timeSeries (input: {
        timeRange: {
          relative: LAST_YEAR
        }
        granularity: WEEK
      }) {
        labels
        values
      }
    }
  }
`

/**
 * Create a graphql client
 */
 const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2)

export default function TimeSeries({ accessToken }) {
  const [options, setOptions] = React.useState()
  const [timeSeries, setTimeSeries] = React.useState()
  const [timeRange, setTimeRange] = React.useState([null, null])

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

        setTimeSeries(metric.timeSeries)
        setOptions({
          ...timeSeriesBaseConfig,
          xAxis: {
            data: metric.timeSeries.labels,
            axisLabel: {
              formatter: (function(value){
                  return dayjs(value).format('MM/DD/YY');
              })
            }
          },
          series: [
            {
              data: metric.timeSeries.values,
              type: 'bar'
            }
          ]
        })
      } catch (error) {}
    }

    if (accessToken) {
      fetchData()
    }
  }, [accessToken])

  React.useEffect(() => {
    if (timeRange[0] && timeRange[1]) {
      const labelsByRange = timeSeries.labels.filter(label => label >= timeRange[0].toJSON() && label <= timeRange[1].toJSON())
      const valuesByRange = timeSeries.labels.reduce((values, label, index) => {
        if (label >= timeRange[0].toJSON() && label <= timeRange[1].toJSON()) {
          return [...values, timeSeries.values[index]]
        }
        return values
      }, [])

      setOptions({
        ...options,
        xAxis: {
          ...options.xAxis,
          data: labelsByRange
        },
        series: [
          {
            data: valuesByRange,
            type: 'bar'
          }
        ]
      })
    }
  }, [timeRange])

  return (
    <>
      <Head>
        <title>Propel Sample Time Series</title>
        <link rel='icon' href="/favicon.ico" />
      </Head>
      <Layout
        appLink={(
          <Link href="/">
            &larr; back to home
          </Link>
        )}
      >
        <h1>
          Metric Time Series
        </h1>

        <p>
          California COVID cases
        </p>

        {!options
          ? <p>Loading...</p>
          : (
          <div className="chart-container">
            <DateRangePicker
              startText="Start date"
              endText="End date"
              value={timeRange}
              onChange={(date) => setTimeRange(date)}
              disableCloseOnSelect={false}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
            <ReactECharts option={options} />
            <style jsx>{`
              .chart-container {
                display: flex;
                flex-direction: column;
                align-items: center;

                margin-top: 40px;
              }
            `}</style>
          </div>
        )}
      </Layout>
    </>
  )
}
