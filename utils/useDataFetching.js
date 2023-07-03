import React from 'react'

export default function useDataFetching(client, metricId, MetricQuery) {
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
  }, [client, metricId, MetricQuery])

  return {
    isLoading,
    accessToken,
    metric
  }
}
