import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { format } from 'date-fns'
import { GraphQLClient } from 'graphql-request'
import { TimeSeries } from '@propeldata/react-time-series'

import { Layout, DateRangePicker } from '../../components'
import { MetricQuery } from '../../graphql'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

const TODAY_DATE = new Date()
const SIX_MONTHS_AGO_DATE = new Date(TODAY_DATE - 6 * 30 * 24 * 60 * 60 * 1000)

export default function TimeSeriesPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [uniqueName, setUniqueName] = React.useState()
  const [description, setDescription] = React.useState()
  const [startDate, setStartDate] = React.useState(SIX_MONTHS_AGO_DATE)
  const [stopDate, setStopDate] = React.useState(TODAY_DATE)
  const [accessToken, setAccessToken] = React.useState()

  const router = useRouter()
  const { metricId } = router.query

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const accessToken = window.localStorage.getItem('accessToken')
        setAccessToken(accessToken)
        client.setHeader('Authorization', `Bearer ${accessToken}`)
        const response = await client.request(MetricQuery, { metricId })
        const metric = response?.metric

        setUniqueName(metric?.uniqueName)
        setDescription(metric?.description)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (metricId) {
      fetchData()
    }
  }, [metricId])

  return (
    <>
      <Head>
        <title>Propel Sample Time Series</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout appLink={<Link href="/">&larr; back to home</Link>}>
        {isLoading ? (
          'Loading...'
        ) : (
          <>
            <h1>{uniqueName}</h1>
            <p>{description}</p>
            <div className="flex flex-col items-center mb-2">
              <DateRangePicker
                startDate={startDate}
                stopDate={stopDate}
                setStartDate={setStartDate}
                setStopDate={setStopDate}
              />
            </div>
            <TimeSeries
              variant="bar"
              query={{
                metric: uniqueName,
                accessToken,
                timeRange: {
                  start: format(startDate, 'yyyy-MM-dd'),
                  stop: format(stopDate, 'yyyy-MM-dd')
                },
                granularity: 'WEEK'
              }}
            />
            <style jsx>{`
              .flex {
                display: flex;
              }

              .flex-col {
                flex-direction: column;
              }

              .items-center {
                align-items: center;
              }
            `}</style>
          </>
        )}
      </Layout>
    </>
  )
}
