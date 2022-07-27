import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { format } from 'date-fns'
import { GraphQLClient } from 'graphql-request'
import ReactECharts from 'echarts-for-react'

import { Layout, DateRangePicker } from '../../components'
import { buildTimeSeriesChartConfig } from '../../utils'
import { TimeSeriesQuery } from '../../graphql'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

export default function TimeSeries() {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [options, setOptions] = React.useState()
  const [startDate, setStartDate] = React.useState(
    new Date('2021-01-01T10:00:00Z')
  )
  const [stopDate, setStopDate] = React.useState(
    new Date('2022-05-21T10:00:00Z')
  )

  const router = useRouter()
  const { metricId } = router.query

  React.useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        client.setHeader('authorization', 'Bearer ' + accessToken)

        const start = format(startDate, 'yyyy-MM-dd')
        const stop = format(stopDate, 'yyyy-MM-dd')

        const { metric } = await client.request(TimeSeriesQuery, {
          id: metricId,
          start,
          stop
        })

        setTitle(metric.uniqueName)
        setDescription(metric.description)
        setOptions(buildTimeSeriesChartConfig(metric.timeSeries))
      } catch (error) {
        console.log(error)
      }
    }

    if (startDate && stopDate && metricId) {
      fetchData()
    }
  }, [startDate, stopDate, metricId])

  return (
    <>
      <Head>
        <title>Propel Sample Time Series</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout appLink={<Link href="/">&larr; back to home</Link>}>
        <h1>{title}</h1>

        <p>{description}</p>

        {!options ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <DateRangePicker
                startDate={startDate}
                stopDate={stopDate}
                setStartDate={setStartDate}
                setStopDate={setStopDate}
              />
            </div>
            <ReactECharts option={options} />
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
