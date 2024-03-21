import { useRef, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'

const defaultOption = {
  grid: {
    top: 45,
    left: 0,
    right: 0,
    bottom: 25,
    containLabel: true,
  },
  tooltip: { appendToBody: true },
  legend: {
    icon: 'circle',
  },
}

const Chart = ({ option, handler, data }) => {
  const chartRef = useRef()

  const setOption = (origin) => {
    const data = handler ? handler(origin) : origin
    let series = data
    if (!Array.isArray(data)) {
      series = data.series
    }
    const chart = chartRef.current?.getEchartsInstance()
    const { series: originSeries } = chart.getOption()

    const newSeries = series.map((s) => {
      const match = originSeries.find((os) => os.name === s.name)
      return { ...match, ...s }
    })

    let option = {
      series: newSeries,
    }

    if (!Array.isArray(data)) {
      option = { ...data, ...option }
    }

    chart?.setOption(option, {
      replaceMerge: ['series'],
    })
  }

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance()
    chart?.setOption(defaultOption)
  }, [])

  useEffect(() => {
    setOption(data)
  }, [data])

  return <ReactECharts ref={chartRef} option={option} />
}

export default Chart
