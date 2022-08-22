import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GraphQLClient, gql } from 'graphql-request'
import ReactECharts from 'echarts-for-react'

import { Layout } from '../../components'
import { buildCounterChartConfig } from '../../utils'
import { CounterQuery } from '../../graphql'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

export default function Counter() {
  const [title, setTitle] = React.useState()
  const [description, setDescription] = React.useState()
  const [options, setOptions] = React.useState()

  const router = useRouter()
  const { metricId } = router.query

  React.useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        client.setHeader('authorization', 'Bearer ' + accessToken)
        const { metric } = await client.request(CounterQuery, {
          id: metricId
        })

        setTitle(metric.uniqueName)
        setDescription(metric.description)
        setOptions(buildCounterChartConfig(metric.counter.value))
      } catch (error) {}
    }

    if (metricId) {
      fetchData()
    }
  }, [metricId])

  return (
    <Layout appLink={<Link href="/">&larr; back to home</Link>}>
      <h1>{title}</h1>
      <p>{description}</p>
      {!options ? <p>Loading...</p> : <ReactECharts option={options} />}
    </Layout>
  )
}
