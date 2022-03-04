
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GraphQLClient, gql } from 'graphql-request'
import ReactECharts from 'echarts-for-react'

import { Layout } from '../../components'
import { buildCounterChartConfig } from '../../utils'
import { CaseQueryCounter } from '../../graphql'

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2)

export default function Counter() {
  const [options, setOptions] = React.useState()

  const router = useRouter()
  const { metricId } = router.query

  React.useEffect(() => {
    async function fetchData () {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        client.setHeader('authorization', 'Bearer ' + accessToken)
        const { metric } = await client.request(CaseQueryCounter, {
          /**
           * Your Metric ID
           */
          id: metricId
        })

        setOptions(buildCounterChartConfig(metric.counter.value))
      } catch (error) {}
    }

    if (metricId) {
      fetchData()
    }
  }, [metricId])

  return (
    <Layout
      appLink={
        <Link href="/">
          &larr; back to home
        </Link>
      }
    >
      <h1>
        Metric Counter
      </h1>
      <p>
        California COVID cases yesterday
      </p>
      {!options ? <p>Loading...</p> : <ReactECharts option={options} />}
      <style jsx>{`
        .link-container {
          margin-top: 20px;
        }

        .link {
          color: var(--color-primary);
          cursor: pointer;
        }
      `}</style>
    </Layout>
  )
}
