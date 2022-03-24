import React, { useEffect, useState } from 'react'

function Overall() {

  const [data, setData] = useState({});
  const [amountDevices, setAmountDevices] = useState({});
  const [wifiDevicesCounter, setWifiDevicesCounter] = useState(0);
  const [btDevicesCounter, setBtDevicesCounter] = useState(0)

  //Fetching data from the api
  //Source for setting up useEffect with timer: https://stackoverflow.com/questions/67463964/react-useeffect-and-setinterval
  useEffect(() => {
    const getData = () => {
      fetch('data')
      .then(res => res.json())
      .then(data => {
        setAmountDevices(0);
        setBtDevicesCounter(0);
        setWifiDevicesCounter(0);
        setData(data)
      })
    }
   
    //Getting the data 
    getData();
    //Setting an interval to 60 s.
    const interval = setInterval(() => {
      getData()
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    
    if(Object.keys(data).length !== 0){
      var today = new Date();
      var wifiCounter = 0;
      var btCounter = 0;
      console.log('ei pitäs näkyy')
      //Going through the wifi devices to check if there are devices detected less than 30s ago
      data.wifi.map((wifiData) => {
        let last_seen_dateobj = new Date(wifiData.Last_Seen);
        let time_since_seen = (today - last_seen_dateobj) / 1000;

        if(time_since_seen < 3000000){
          //setWifiDevicesCounter(prev => prev + 1);
          wifiCounter++;
        }
        setWifiDevicesCounter(wifiCounter)
      })
  
      data.bt.map((btData) => {
        let last_seen_dateobj = new Date(btData.Last_Seen);
        let time_since_seen = (today - last_seen_dateobj) / 1000;
        if(time_since_seen < 3000000){
          btCounter++;
        }
      })
      setBtDevicesCounter(btCounter)
  
      setAmountDevices(btCounter + wifiCounter);
      console.log(btCounter + wifiCounter)
    }
  }, [data])


  return (
    <div>Overall</div>
  )
}

export default Overall