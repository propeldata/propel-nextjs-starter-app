import { Counter } from '@propeldata/react-counter'
import { useRouter } from 'next/router'
import React from 'react'
import { Layout, Loader } from '../../components'
import { useDataFetching } from '../../utils'

export default function CounterPage() {
  const [uniqueName, setUniqueName] = React.useState()
  const [description, setDescription] = React.useState()

  const router = useRouter()
  const { metricId } = router.query

  const { isLoading, accessToken, metric } = useDataFetching(metricId)

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
                  n: 14
                }
              }}
              styles={{
                font: {
                  size: '2rem',
                  weight: 'bold',
                  color: '#6941C6'
                }
              }}
            />
          )}
        </>
      )}
    </Layout>
  )
}
