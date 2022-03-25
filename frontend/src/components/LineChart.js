import { Tooltip } from '@mui/material';
import React from 'react'
import {Label, Legend, Line,LineChart,ResponsiveContainer,XAxis,YAxis} from 'recharts';


function LineChartOverall({data}) {
  return (
    <LineChart width={600} height={400} data={data}>
      <XAxis dataKey="obs_time"><Label value={'Time'} dy={15} /></XAxis>
      <YAxis><Label value={'Number of devices'} angle={90}/></YAxis>
      <Legend wrapperStyle={{padding: '10px'}}/>
      <Line name="All devices combined" type="monotone" dataKey="totalCounter" stroke="#8884d8" />
      <Line name="Wifi devices" type="monotone" dataKey="btCounter" stroke="#82ca9d" />
      <Line name="Bluetooth devices" type="monotone" dataKey="wifiCounter" stroke="#ca82b0" />
    </LineChart>
    
  )
}

export default LineChartOverall