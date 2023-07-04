import { Counter } from '@propeldata/react-counter'
import { GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'
import React from 'react'
import { Layout, Loader } from '../../components'
import { MetricQuery } from '../../graphql'
import { useDataFetching } from '../../utils'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

export default function CounterPage() {
  const [uniqueName, setUniqueName] = React.useState()
  const [description, setDescription] = React.useState()

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
    <Layout
      title={{
        url: 'https://www.propeldata.com/docs/metrics/counter',
        text: 'Counter'
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h4 style={{ marginTop: '2rem' }}>{uniqueName}</h4>
          <p style={{ marginBottom: '2rem' }}>{description}</p>
          {uniqueName && (
            <Counter
              localize
              prefixValue="$"
              query={{
                metric: uniqueName,
                accessToken,
                timeRange: {
                  relative: 'LAST_N_DAYS',
                  n: 30
                }
              }}
              styles={{
                font: {
                  size: '2rem',
                  weight: 'bold',
                  color: '#0081F1'
                }
              }}
            />
          )}
        </>
      )}
    </Layout>
  )
}
