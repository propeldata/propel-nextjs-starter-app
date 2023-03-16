import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GraphQLClient } from 'graphql-request'
import { Counter } from '@propeldata/react-counter'

import { Layout } from '../../components'
import { MetricQuery } from '../../graphql'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

export default function CounterPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [uniqueName, setUniqueName] = React.useState()
  const [description, setDescription] = React.useState()
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
    <Layout appLink={<Link href="/">&larr; back to home</Link>}>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <h1>{uniqueName}</h1>
          <p>{description}</p>
          <Counter
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
          <style jsx>{`
            .link-container {
              margin-top: 20px;
            }

            .link {
              color: var(--color-primary);
              cursor: pointer;
            }
          `}</style>
        </>
      )}
    </Layout>
  )
}
