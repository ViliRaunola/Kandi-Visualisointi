import React, { useEffect, useState } from 'react'
import {Box} from '@mui/system'
import { Container,Typography,TextField, Button } from '@mui/material'
import BluetoothTable from './BluetoothTable'

function Bluetooth() {
  const [data, setData] = useState([{}])   //Wifi data fetched from the server
  const [displayTimer, setDisplayTimer] = useState(60);
  const [userInput, setUserInput] = useState('');

  //Fetching data from the api
  //Source for setting up useEffect with timer: https://stackoverflow.com/questions/67463964/react-useeffect-and-setinterval
  useEffect(() => {
    const getBtData = () => {
      fetch('data/bt', {mode:'cors'})   //For production: https://sheltered-lake-40542.herokuapp.com/api/
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
  }, [userInput])

  const submitNewValue = (event) => {
    setDisplayTimer(Number(userInput));
    setUserInput('');
  }

  if(data.length < 2){
    return <div>Loading...</div>
  }else {
    return (
      <Container sx={{display:'flex', flexDirection: 'row', alignItems: 'top'}}>
        <Box sx={{width: '75%', mt: '3%' }}>
          <Typography variant='h4' color='headerPrimary' component='h1' padding={2}>
            Devices heard less than {displayTimer}s ago
          </Typography>
          <BluetoothTable data_list={data} displayTimer={displayTimer}/>
        </Box>
        <Box sx={{width: '25%', mt: '10%'}}>
          <TextField label='Set seconds for display filter' value={userInput} onChange={(event) => setUserInput(event.target.value)}/>
          <Button onClick={() => submitNewValue()} >Set</Button>
        </Box>
      </Container>
      
    )
  }
}

export default Bluetooth