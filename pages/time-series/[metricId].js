import { TimeSeries } from '@propeldata/react-time-series'
import { format } from 'date-fns'
import { GraphQLClient } from 'graphql-request'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { DateRangePicker, Layout } from '../../components'
import { MetricQuery } from '../../graphql'
import { useDataFetching } from '../../utils'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

const TODAY_DATE = new Date()
const THIRTY_DAYS_AGO = new Date(TODAY_DATE - 30 * 24 * 60 * 60 * 1000)

export default function TimeSeriesPage() {
  const [uniqueName, setUniqueName] = React.useState()
  const [description, setDescription] = React.useState()
  const [startDate, setStartDate] = React.useState(THIRTY_DAYS_AGO)
  const [stopDate, setStopDate] = React.useState(TODAY_DATE)

  const router = useRouter()
  const { metricId } = router.query

  const { isLoading, accessToken, metric } = useDataFetching(
    client,
    metricId,
    MetricQuery
  )

  React.useEffect(() => {
    setUniqueName(metric?.uniqueName)
    setDescription(metric?.description)
  }, [metric])

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
            {uniqueName && (
              <TimeSeries
                variant="bar"
                styles={{
                  bar: {
                    thickness: 15,
                    borderWidth: '0',
                    borderRadius: 2,
                    borderColor: '#94A3B8',
                    backgroundColor: '#CBD5E0'
                  }
                }}
                query={{
                  metric: uniqueName,
                  accessToken,
                  timeRange: {
                    start: format(startDate, 'yyyy-MM-dd'),
                    stop: format(stopDate, 'yyyy-MM-dd')
                  },
                  granularity: 'DAY'
                }}
              />
            )}
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
