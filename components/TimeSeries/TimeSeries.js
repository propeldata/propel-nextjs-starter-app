
import React from 'react'
import Head from 'next/head'
import { GraphQLClient, gql } from 'graphql-request'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import Box from '@mui/material/Box'

import { Layout } from '..'
import { buildTimeSeriesChartConfig } from '../../utils'
import CaseQuery from './CaseQuery.graphql'

/**
 * Create a graphql client
 */
 const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2)

export default function TimeSeries({ accessToken, metricId, setCurrentPage }) {
  const [options, setOptions] = React.useState()
  const [timeRange, setTimeRange] = React.useState([
    dayjs('2021-01-01'),
    dayjs('2022-05-21')
  ])

  const startDate = timeRange[0].format('YYYY-MM-DD')
  const stopDate = timeRange[1].format('YYYY-MM-DD')

  React.useEffect(() => {
    if (accessToken) {
      client.setHeader('authorization', 'Bearer ' + accessToken)
    }
  }, [accessToken])

  React.useEffect(() => {
    async function fetchData () {
      try {
        const { metric } = await client.request(CaseQuery, {
          /**
           * Your Metric ID
           */
          id: metricId,
          start: startDate,
          stop: stopDate
        })

        setOptions(buildTimeSeriesChartConfig(metric.timeSeries))
      } catch (error) {}
    }

    if (startDate && stopDate) {
      fetchData()
    }
  }, [startDate, stopDate])

  const handleReturnHome = () => {
    setCurrentPage('home')
  }

  return (
    <>
      <Head>
        <title>Propel Sample Time Series</title>
        <link rel='icon' href="/favicon.ico" />
      </Head>
      <Layout
        appLink={(
          <>
            <div className="link" onClick={handleReturnHome}>
              &larr; back to home
            </div>
            <style jsx>{`  
              .link {
                color: var(--color-primary);
                cursor: pointer;
              }
            `}</style>
          </>
          
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
              autoOk
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
