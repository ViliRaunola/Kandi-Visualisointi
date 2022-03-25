import React, { useEffect, useState } from 'react'
import LineChartOverall from './LineChart';
import {Box, typography} from '@mui/system'
import { Container } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';
import { Typography } from '@mui/material';

function Overall() {

  const [data, setData] = useState({});
  const [amountDevices, setAmountDevices] = useState([{}]);

  //Fetching data from the api
  //Source for setting up useEffect with timer: https://stackoverflow.com/questions/67463964/react-useeffect-and-setinterval
  useEffect(() => {
    const getData = () => {
      fetch('data')
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
    }
   
    //Getting the data 
    getData();
    //Setting an interval to 60 s.
    const interval = setInterval(() => {
      getData()
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    
    if(Object.keys(data).length !== 0){
      var today = new Date();
      var wifiCounter = 0;
      var btCounter = 0;
      var totalCounter = 0;
      //Going through the wifi devices to check if there are devices detected less than 30s ago
      data.wifi.map((wifiData) => {
        let last_seen_dateobj = new Date(wifiData.Last_Seen);
        let time_since_seen = (today - last_seen_dateobj) / 1000;

        if(time_since_seen <= 60){
          //setWifiDevicesCounter(prev => prev + 1);
          wifiCounter++;
        }
        
      })
  
      data.bt.map((btData) => {
        let last_seen_dateobj = new Date(btData.Last_Seen);
        let time_since_seen = (today - last_seen_dateobj) / 1000;
        if(time_since_seen <= 60){
          btCounter++;
        }
      })
      
      var obs_time = today.toTimeString().split(' ')[0];
      totalCounter = btCounter + wifiCounter;
      setAmountDevices(amountDevices => [...amountDevices, {obs_time, totalCounter, btCounter, wifiCounter}]);
    }
  }, [data])

  return (
    <Container  sx={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
      
      {/* Live chart */}
      <Box marginTop={5}>
        <LineChartOverall data={amountDevices}/>
      </Box>
      

      {/* Line names & colors */}
      {/* <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <SquareIcon sx={{paddingLeft: 10, color: '#8884d8', fontSize: 'medium'}}/>
        <Typography  fontSize={12} paddingLeft={2} >All devices combined</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <SquareIcon sx={{paddingLeft: 10, color: '#ca82b0', fontSize: 'medium'}}/>
        <Typography  fontSize={12} paddingLeft={2} >Wifi devices</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <SquareIcon sx={{paddingLeft: 10, color: '#82ca9d', fontSize: 'medium'}}/>
        <Typography  fontSize={12} paddingLeft={2} >Bluetooth devices</Typography>
      </Box> */}
      
    </Container>
  )
}

export default Overall