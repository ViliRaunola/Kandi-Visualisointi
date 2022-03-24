import React from 'react'

function LineChart({data}) {
  return (
    <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="time"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="count" stroke="#8884d8" />
  </LineChart>
  )
}

export default LineChart