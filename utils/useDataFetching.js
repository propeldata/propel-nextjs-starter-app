import { GraphQLClient } from 'graphql-request'
import React from 'react'
import { MetricQuery } from '../graphql'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2
)

export default function useDataFetching(metricId) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [accessToken, setAccessToken] = React.useState()
  const [metric, setMetric] = React.useState()

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const accessTokenValue = window.localStorage.getItem('accessToken')
        setAccessToken(accessTokenValue)
        client.setHeader('Authorization', `Bearer ${accessTokenValue}`)
        const response = await client.request(MetricQuery, { metricId })
        setMetric(response?.metric)
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

  return {
    isLoading,
    accessToken,
    metric
  }
}
