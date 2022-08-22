import { format } from 'date-fns'
import ReactECharts from 'echarts-for-react'
import { GraphQLClient } from 'graphql-request'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { DateRangePicker, Layout } from '../../components'
import { CounterQuery, TimeSeriesQuery } from '../../graphql'
import {
  buildCounterChartConfig,
  buildTimeSeriesChartConfig
} from '../../utils'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

export default function MetricVisualization() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState('' as any)
  const [startDate, setStartDate] = useState(new Date('2021-01-01T10:00:00Z'))
  const [stopDate, setStopDate] = useState(new Date('2022-05-21T10:00:00Z'))

  const router = useRouter()
  const { metricId, metricType } = router.query

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        client.setHeader('authorization', 'Bearer ' + accessToken)

        const start = format(startDate, 'yyyy-MM-dd')
        const stop = format(stopDate, 'yyyy-MM-dd')

        let response = {} as any
        // ReturnType<typeof f>
        if (metricType === 'counter') {
          response = await client.request(CounterQuery, {
            id: metricId
          })
        }
        if (metricType === 'time-series') {
          response = await client.request(TimeSeriesQuery, {
            id: metricId,
            start,
            stop
          })
        }
        const { metric } = response

        setTitle(metric.uniqueName)
        setDescription(metric.description)
        if (metricType === 'counter') {
          setOptions(buildCounterChartConfig(metric.counter.value))
        }
        if (metricType === 'time-series') {
          setOptions(buildTimeSeriesChartConfig(metric.timeSeries))
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (metricId) {
      // Only attempt to fetch data if we've set all the required parameters.
      if (metricType === 'counter') fetchData()
      if (metricType === 'time-series' && startDate && stopDate) {
        fetchData()
      }
    }
  }, [startDate, stopDate, metricId, metricType])

  return (
    <>
      <Head>
        <title>
          Propel Sample {metricType === 'counter' && 'Counter'}
          {metricType === 'time-series' && 'Time Series'}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout appLink={<Link href="/">&larr; back to home</Link>}>
        <h1>{title}</h1>
        <p>{description}</p>
        {!options && <p>Loading...</p>}
        {options && (
          <>
            <div className="flex flex-col items-center">
              {metricType === 'time-series' && (
                <DateRangePicker
                  startDate={startDate}
                  stopDate={stopDate}
                  setStartDate={setStartDate}
                  setStopDate={setStopDate}
                />
              )}
            </div>
            <ReactECharts option={options} />
          </>
        )}
      </Layout>
    </>
  )
}
