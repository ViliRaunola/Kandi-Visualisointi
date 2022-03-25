import React, { useEffect, useState } from 'react'
import {Box} from '@mui/system'
import { Container,Typography } from '@mui/material'
import BluetoothTable from './BluetoothTable'

function Bluetooth() {
  const [data, setData] = useState([{}])   //Wifi data fetched from the server

  //Fetching data from the api
  //Source for setting up useEffect with timer: https://stackoverflow.com/questions/67463964/react-useeffect-and-setinterval
  useEffect(() => {
    const getBtData = () => {
      fetch('data/bt')
      .then(res => res.json())
      .then(data => {
        setData(data.bt)
      })
    }
   
    //Getting the data on landing the page
    getBtData();
    //Setting an interval for 10 s.
    const interval = setInterval(() => {
      getBtData()
    }, 10000);
    return () => clearInterval(interval);
  }, [])

  if(data.length < 2){
    return <div>Loading...</div>
  }else {
    return (
      <Container>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '75%', m: 3}}>
          <Typography variant='h4' color='headerPrimary' component='h1' padding={2}>
                Devices heard less than a minute ago
          </Typography>
          <BluetoothTable data_list={data}/>
        </Box>
      </Container>
      
    )
  }
}

export default Bluetooth