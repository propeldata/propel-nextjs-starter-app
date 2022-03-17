import { format } from 'date-fns'

const baseConfig = {
  yAxis: {
    type: 'value',
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  }
}

export default function buildTimeSeriesChartConfig (timeSeries) {
  return {
    ...baseConfig,
    xAxis: {
      data: timeSeries.labels,
      axisLabel: {
        formatter: (function(value){
          return format(new Date(value), 'MM/dd/yyyy');
        })
      }
    },
    series: [
      {
        data: timeSeries.values,
        type: 'bar'
      }
    ]
  }
}