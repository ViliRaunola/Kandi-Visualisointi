import React, { useEffect, useState } from 'react'
import WifiTable from './WifiTable'
import {Box} from '@mui/system'
import { Container } from '@mui/material'

function Wifi() {

  const [data, setData] = useState([{}])   //Wifi data fetched from the server

  //Fetching data from the api
  //Source for setting up useEffect with timer: https://stackoverflow.com/questions/67463964/react-useeffect-and-setinterval
  useEffect(() => {
    const getWifiData = () => {
      fetch('data/wifi')
      .then(res => res.json())
      .then(data => {
        setData(data.wifi)
      })
    }
   
    //Getting the data on landing the page
    getWifiData();
    //Setting an interval for 10 s.
    const interval = setInterval(() => {
      getWifiData()
    }, 10000);
    return () => clearInterval(interval);
  }, [])

  console.log(data)

  if(data.length < 2){
    return <div>Loading...</div>
  }else {
    return (
      <Container>
        <Box sx={{ width: '50%', m: 3}}>
          <WifiTable data_list={data}/>
        </Box>
      </Container>
      
    )
  }
}

export default Wifi