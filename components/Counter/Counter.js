
import React from 'react'
import { GraphQLClient, gql } from 'graphql-request'
import ReactECharts from 'echarts-for-react'

import { Layout } from '..'
import { buildCounterChartConfig } from '../../utils'

const QUERY = gql`
  query caseQueryCounter ($id: ID!) {
    metric (id: $id) {
      counter (input: {
        timeRange: {
          relative: PREVIOUS_WEEK
        }
      }) {
        value
      }
    }
  }
`

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2)

export default function Counter({ accessToken, metricId, setCurrentPage }) {
  const [options, setOptions] = React.useState()

  React.useEffect(() => {
    async function fetchData () {
      try {
        client.setHeader('authorization', 'Bearer ' + accessToken)
        const { metric } = await client.request(QUERY, {
          /**
           * Your Metric ID
           */
          id: metricId
        })

        console.log(metric)

        setOptions(buildCounterChartConfig(metric.counter.value))
      } catch (error) {}
    }

    if (accessToken) {
      fetchData()
    }
  }, [accessToken])

  const handleReturnHome = () => {
    setCurrentPage('home')
  }

  return (
    <>
      <Layout
        appLink={(
          <div className="link" onClick={handleReturnHome}>
            &larr; back to home
          </div>
        )}
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
    </>
  )
}
