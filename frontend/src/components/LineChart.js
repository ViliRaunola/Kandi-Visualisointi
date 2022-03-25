import React from 'react'
import {Line,LineChart,XAxis,YAxis} from 'recharts';

function LineChartOverall({data}) {
  return (
    <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="obs_time"/>
    <YAxis/>
    <Line type="monotone" dataKey="totalCounter" stroke="#8884d8" />
  </LineChart>
  )
}

export default LineChartOverall